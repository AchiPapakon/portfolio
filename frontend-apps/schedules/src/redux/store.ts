import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import stationsSliceReducer from './stations/reducer';
import rootSaga from '../sagas';
import websocketsSliceReducer from './websocket/reducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        stations: stationsSliceReducer,
        websockets: websocketsSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// // Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()));

// Get the type of our store variable
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export default store;
