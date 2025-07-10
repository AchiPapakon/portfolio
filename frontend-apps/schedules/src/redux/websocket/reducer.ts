/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface WebsocketsStore {
    isOpen: boolean;
}

const initialState: WebsocketsStore = {
    isOpen: false,
};

const websocketsSlice = createSlice({
    name: 'websockets',
    initialState,
    reducers: {
        websocketRestart: {
            reducer: (state) => state,
            prepare: () => ({ payload: null }),
        },
        setIsOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.isOpen = payload;
        },
    },
});

export const { websocketRestart, setIsOpen } = websocketsSlice.actions;

const websocketsSliceReducer = websocketsSlice.reducer;

export default websocketsSliceReducer;
