import { END, eventChannel, type AnyAction, type EventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import type { StationDetails, WebSocketMessage } from 'types/gateway';
import type { ListSuggestion } from 'types/ListSuggestion';
import type { ExtendedWebSocket } from '../../types/websocket';
import { setIsOpen } from '../../redux/websocket/reducer';
import {
    getStationDepartures,
    setNearbyStationError,
    setSelectedStation,
    setStationDetails,
    setStationDetailsFetching,
} from '../../redux/stations/reducer';
import logger from '../../helpers/Logger';

const websocketConnection = (socket: ExtendedWebSocket) => {
    return eventChannel<AnyAction>((emit) => {
        const ws = socket;

        // When the WebSocket connection is opened:
        ws.onopen = () => {
            logger.info('Connection established!');

            emit(getStationDepartures());
            emit(setIsOpen(true));
        };

        // When a message is received:
        ws.onmessage = (incomingMessage) => {
            const { data: messageString } = incomingMessage;

            try {
                const { name, payload } = JSON.parse(messageString) as WebSocketMessage;

                switch (name) {
                    case 'getStationDeparturesResponse': {
                        emit(setStationDetails(payload as StationDetails));
                        emit(setStationDetailsFetching(false));
                        return;
                    }
                    case 'ping': {
                        ws.sendEvent('pong');
                        return;
                    }
                    case 'getNearestStationResponse': {
                        if (payload) {
                            emit(getStationDepartures(payload as ListSuggestion));
                        } else {
                            emit(setNearbyStationError(true));
                            emit(setSelectedStation(null));
                            localStorage.setItem('selectedStation', JSON.stringify(null));
                            emit(setStationDetailsFetching(false));
                        }
                        return;
                    }
                    default: {
                        console.error(`Unhandled event name: '${name}'`);
                    }
                }
            } catch (error) {
                console.error('Cannot parse message:', error);
            }
        };

        ws.onclose = () => {
            emit(END);
        };

        // Unsubscribe function
        return () => {
            logger.info('Websocket disconnected.');
            emit(setIsOpen(false));
        };
    });
};

function* handleWebsocketConnection(socket: ExtendedWebSocket) {
    let channel: EventChannel<AnyAction> | undefined;
    try {
        channel = yield call(websocketConnection, socket);

        while (true) {
            if (channel) {
                const actionFromWebsocket: AnyAction = yield take(channel);
                yield put(actionFromWebsocket);
            } else {
                break;
            }
        }
    } catch (error) {
        console.error('[handleWebsocketConnection]', error);
    } finally {
        if (channel) {
            channel.close();
        }
        if (socket && socket.readyState === 1) {
            socket.close();
        }
    }
}

export default handleWebsocketConnection;
