import { cancel, fork, take } from 'redux-saga/effects';
import stationsSaga from './stations';
import handleWebsocketConnection from './websocket/handleWebsocketConnection';
import checkStatus from './websocket/checkStatus';
import initSocket from './websocket/initSocket';
import { websocketRestart } from '../redux/websocket/reducer';
import type { ExtendedWebSocket } from '../types/websocket';

function* socketTasks(socket: ExtendedWebSocket) {
    yield fork(handleWebsocketConnection, socket);
    yield fork(checkStatus, socket);
    yield fork(stationsSaga, socket);
}

function* rootSaga(): Generator {
    while (true) {
        const socket = initSocket();
        const tasks = yield fork(socketTasks, socket);

        yield take(websocketRestart.type);
        yield cancel(tasks);
    }
}

export default rootSaga;
