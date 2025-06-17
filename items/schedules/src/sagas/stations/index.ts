import { put, takeLatest, takeLeading } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ListSuggestion } from 'types/ListSuggestion';
import {
    getNearestStations,
    getStationDepartures,
    getStationDetails,
    getStations,
    resetStationDetails,
    setSelectedStation,
    setStationDetailsFetching,
    setStations,
    setStationsFetching,
} from '../../redux/stations/reducer';
import type { ExtendedWebSocket } from '../../types/websocket';

interface Stop {
    Id: number;
    Name: string;
    Latitude: string;
    Longitude: string;
    PointType: string;
}

interface SearchResponse {
    Cities: unknown[];
    Lines: unknown[];
    Stops: Stop[];
}

function* getStationsSaga({ payload: userInput }: PayloadAction<string>) {
    try {
        yield put(setStationsFetching(true));

        const fetchResponse: Response = yield fetch(
            `${import.meta.env.VITE_SCHEDULES_BASE_URL}/media/api/v1/fr/schedules/Search?keywords=${userInput}`
        );

        const response: SearchResponse = yield fetchResponse.json();

        yield put(
            setStations(
                response.Stops.map((stop) => ({
                    id: stop.Id,
                    name: stop.Name,
                }))
            )
        );
    } catch (error) {
        console.error(error);
    } finally {
        yield put(setStationsFetching(false));
    }
}

function* getStationDetailsSaga({ payload: stationId }: PayloadAction<number>, socket: ExtendedWebSocket) {
    try {
        yield put(setStationDetailsFetching(true));
        socket.sendEvent('getStationDepartures', { id: stationId });
    } catch (error) {
        console.error('[getStationDetailsSaga]', error);
    }
}

function* getNearestStationsSaga(
    { payload: { lat, lon } }: PayloadAction<{ lat: number; lon: number }>,
    socket: ExtendedWebSocket
) {
    try {
        yield put(setStationDetailsFetching(true));
        yield put(resetStationDetails());
        socket.sendEvent('getNearestStation', { lat, lon });
    } catch (error) {
        console.error('[getNearestStationsSaga]', error);
    }
}

function* getStationDeparturesSaga({ payload: listSuggestion }: PayloadAction<ListSuggestion | null>) {
    try {
        let selectedStation: ListSuggestion | null = null;
        const selectedStationLocalStorage = localStorage.getItem('selectedStation');

        if (listSuggestion && selectedStationLocalStorage !== JSON.stringify(listSuggestion)) {
            // We provide details and it's different than the existing local storage
            localStorage.setItem('selectedStation', JSON.stringify(listSuggestion));
            selectedStation = listSuggestion;
        } else if (selectedStationLocalStorage) {
            // We don't provide anything, but there's something in localStorage
            selectedStation = JSON.parse(selectedStationLocalStorage);
        }

        if (selectedStation) {
            yield put(setSelectedStation(selectedStation));
            yield put(getStationDetails(selectedStation.id));
        }
    } catch (error) {
        console.error('[getStationDeparturesSaga]', error);
    }
}

function* stationsSaga(socket: ExtendedWebSocket) {
    yield takeLatest(getStations.type, getStationsSaga);
    yield takeLatest(getStationDetails.type, (action: PayloadAction<number>) => getStationDetailsSaga(action, socket));
    yield takeLatest(getStationDepartures.type, getStationDeparturesSaga);

    yield takeLeading(getNearestStations.type, (action: PayloadAction<{ lat: number; lon: number }>) =>
        getNearestStationsSaga(action, socket)
    );
}

export default stationsSaga;
