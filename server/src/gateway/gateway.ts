import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import {
    GetNearestStationResponse,
    GetStationDepartures,
    GetStationDeparturesResponse,
    StationDetails,
    StationDeparture,
    StationDepartures,
    Stops,
} from 'types/gateway';
import singleFetch from 'src/SingleFetch';
import { v4 as uuidv4 } from 'uuid';
import { OnModuleDestroy } from '@nestjs/common';
import getBoundingBox from 'src/helpers/getBoundingBox';
import { PointsByBoundingBox } from 'types/GetPointsByBoundingBox';
import { NextDeparture } from 'types/NextDeparture';
import { ExtendedWebSocket } from 'src/types/websocket';

const nearestStops: Stops = {};

const getKey = () => `${Date.now()}${Math.floor(Math.random() * 10_000_000_000)}`;

@WebSocketGateway()
export class Gateway implements OnGatewayConnection, OnGatewayInit, OnModuleDestroy {
    private intervals = {
        pingEachClient: <NodeJS.Timeout | undefined>undefined,
        repeatLastRequests: <NodeJS.Timeout | undefined>undefined,
    };
    private clients: Set<ExtendedWebSocket> = new Set();

    afterInit() {
        this.intervals.pingEachClient = setInterval(() => {
            this.pingEachClient();
        }, 10_000);

        this.intervals.repeatLastRequests = setInterval(() => {
            this.repeatLastRequests();
        }, 60_000);
    }

    onModuleDestroy() {
        clearInterval(this.intervals.pingEachClient);
        clearInterval(this.intervals.repeatLastRequests);
    }

    private pingEachClient() {
        this.clients.forEach((client) => {
            if (client.isAlive && client.OPEN) {
                client.isAlive = false;
                client.send(JSON.stringify({ name: 'ping' }));
            } else {
                client.terminate();
            }
        });
    }

    private repeatLastRequests() {
        this.clients.forEach((client) => {
            if (client.isAlive && client.OPEN) {
                if (client.lastRequest?.event === 'getStationDepartures') {
                    this.onGetStationDepartures(client.lastRequest.body as GetStationDepartures, client)
                        .then((response) => {
                            client.send(JSON.stringify(response));
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            }
        });
    }

    handleConnection(client: ExtendedWebSocket) {
        client.id = (uuidv4 as () => string)();
        client.isAlive = true;

        this.clients.add(client);
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: ExtendedWebSocket) {
        this.clients.delete(client);
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('pong')
    onPong(@ConnectedSocket() client: ExtendedWebSocket) {
        client.isAlive = true;
    }

    @SubscribeMessage('getStationDepartures')
    async onGetStationDepartures(
        @MessageBody() body: GetStationDepartures,
        @ConnectedSocket() client: ExtendedWebSocket,
    ): Promise<GetStationDeparturesResponse> {
        client.lastRequest = {
            event: 'getStationDepartures',
            body,
        };

        try {
            const { id } = body;

            const json = (await singleFetch.get(
                `${process.env.SCHEDULES_BASE_URL}/media/api/v1/fr/Schedules/LogicalStop/${id}/NextDeparture`, // ?lineId=&direction=
            )) as NextDeparture;

            if (!json?.length) {
                return {
                    name: 'getStationDeparturesResponse',
                    payload: {},
                };
            }

            const groupedByTransportMode: StationDetails = json.reduce((acc, cur) => {
                const title: string = [cur.transportMode, nearestStops[id]?.name ?? ''].filter(Boolean).join(' | ');

                const times: StationDepartures = cur.lines.reduce((acc: StationDepartures, line) => {
                    line.times.forEach((time) => {
                        acc[line.direction.id] = [
                            ...(acc[line.direction.id] ?? []),
                            {
                                lineNumber: line.line.number,
                                color: line.line.color,
                                destinationName: time.destination.name,
                                dateTime: time.realDateTime || time.dateTime,
                                isRealTime: Boolean(time.realDateTime),
                                key: getKey(),
                            },
                        ];
                    });

                    return acc;
                }, {});

                const timesSorted: StationDepartures = Object.entries(times).reduce(
                    (acc: StationDepartures, [directionId, directionDepartures]: [string, StationDeparture[]]) => {
                        acc[directionId] = directionDepartures.toSorted(
                            (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
                        );

                        return acc;
                    },
                    {},
                );

                acc[title] = timesSorted;
                return acc;
            }, {});

            return {
                name: 'getStationDeparturesResponse',
                payload: groupedByTransportMode,
            };
        } catch (err) {
            console.error('[onGetStationDepartures]', err);
        }

        return {
            name: 'getStationDeparturesResponse',
            payload: {},
        };
    }

    @SubscribeMessage('getNearestStation')
    async onGetNearestStation(
        @MessageBody('lat') lat: number,
        @MessageBody('lon') lon: number,
    ): Promise<GetNearestStationResponse> {
        try {
            const { northLat, southLat, eastLon, westLon } = getBoundingBox(lat, lon, 150);

            const searchParams = {
                MinimumLatitude: String(northLat),
                MinimumLongitude: String(westLon),
                MaximumLatitude: String(southLat),
                MaximumLongitude: String(eastLon),
                PointTypes: String(2),
                UserLat: String(lat),
                UserLon: String(lon),
            };

            const searchParamsString = new URLSearchParams(searchParams).toString();

            const { Data } = (await singleFetch.get(
                `${process.env.SCHEDULES_BASE_URL}/api/map/v2/GetPointsByBoundingBox/json?${searchParamsString}`,
            )) as PointsByBoundingBox;

            Data.sort((a, b) => a.Distance - b.Distance);

            const nearestStation = Data[0];

            if (nearestStation) {
                return {
                    name: 'getNearestStationResponse',
                    payload: {
                        id: nearestStation.LogicalId,
                        label: nearestStation.Name,
                    },
                };
            }
        } catch (error) {
            console.error('[getNearestStation]', error);
        }

        return {
            name: 'getNearestStationResponse',
        };
    }
}
