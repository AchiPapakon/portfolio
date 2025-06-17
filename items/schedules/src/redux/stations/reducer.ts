/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { StationDetails } from 'types/gateway';
import type { ListSuggestion } from 'types/ListSuggestion';

interface Station {
    id: number;
    name: string;
}

interface BackendFetchList<T> {
    list: T[];
    fetching: boolean;
}
interface BackendFetchObject<T> {
    object: T;
    fetching: boolean;
}

interface StationsStore {
    selectedStation: ListSuggestion | null;
    stationDetails: BackendFetchObject<StationDetails>;
    suggestions: BackendFetchList<Station>;
}

const initialState: StationsStore = {
    selectedStation: null,
    stationDetails: {
        object: {},
        fetching: false,
    },
    suggestions: {
        list: [],
        fetching: false,
    },
};

const stationsSlice = createSlice({
    name: 'stations',
    initialState,
    reducers: {
        getStationDetails: {
            reducer: (state) => state,
            prepare: (stationId: number) => ({ payload: stationId }),
        },
        resetStationDetails: (state) => {
            state.stationDetails.object = {};
        },
        setStationDetails: (state, { payload }: PayloadAction<StationDetails>) => {
            state.stationDetails.object = payload;
        },
        setStationDetailsFetching: (state, { payload }: PayloadAction<boolean>) => {
            state.stationDetails.fetching = payload;
        },
        setSelectedStation: (state, { payload }: PayloadAction<ListSuggestion | null>) => {
            state.selectedStation = payload;
        },
        setStationsFetching: (state, { payload }: PayloadAction<boolean>) => {
            state.suggestions.fetching = payload;
        },
        getStations: {
            reducer: (state) => state,
            prepare: (userInput: string) => ({ payload: userInput }),
        },
        setStations: (state, { payload }: PayloadAction<Station[]>) => {
            state.suggestions.list = payload;
        },
        resetStations: (state) => {
            state.suggestions.list = [];
        },
        getNearestStations: {
            reducer: (state) => state,
            prepare: ({ lat, lon }: { lat: number; lon: number }) => ({ payload: { lat, lon } }),
        },
        getStationDepartures: {
            reducer: (state) => state,
            prepare: (listSuggestion?: ListSuggestion) => ({ payload: listSuggestion ?? null }),
        },
    },
});

export const {
    getStationDetails,
    resetStationDetails,
    setStationDetails,
    setStationDetailsFetching,
    getStations,
    resetStations,
    setSelectedStation,
    setStations,
    setStationsFetching,
    getNearestStations,
    getStationDepartures,
} = stationsSlice.actions;

const stationsSliceReducer = stationsSlice.reducer;

export default stationsSliceReducer;
