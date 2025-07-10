import { createSelector } from '@reduxjs/toolkit';
import type { ListSuggestion } from 'types/ListSuggestion';
import type { RootState } from '../store';

export const stationsSuggestionsListSelector = createSelector(
    (state: RootState) => state.stations.suggestions,
    (suggestions) => {
        const listSuggestions: ListSuggestion[] = suggestions.list.map((station) => ({
            id: station.id,
            label: station.name,
        }));

        return listSuggestions;
    }
);

export const stationsSuggestionsFetchingSelector = (state: RootState) => state.stations.suggestions.fetching;

export const stationDetailsFetchingSelector = (state: RootState) => state.stations.stationDetails.fetching;

export const stationDetailsObjectSelector = (state: RootState) => state.stations.stationDetails.object;

export const selectedStationSelector = (state: RootState) => state.stations.selectedStation;

export const nearbyStationErrorSelector = (state: RootState) => state.stations.nearbyStationError;
