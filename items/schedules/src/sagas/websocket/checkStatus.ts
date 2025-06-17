import { delay, put, select } from 'redux-saga/effects';
import { websocketsIsOpenSelector } from '../../redux/websocket/selectors';
import type { ExtendedWebSocket } from '../../types/websocket';
import { setIsOpen, websocketRestart } from '../../redux/websocket/reducer';
import logger from '../../helpers/Logger';

export default function* checkStatus(socket: ExtendedWebSocket) {
    while (true) {
        const oldOpen: boolean = yield select(websocketsIsOpenSelector);
        const newOpen = socket.readyState === socket.OPEN;
        if (oldOpen !== newOpen) {
            yield put(setIsOpen(newOpen));
        }

        if (socket.readyState === socket.CLOSED) {
            logger.info('Closed! Reconnecting...');
            yield put(websocketRestart());
        }
        yield delay(1_000);
    }
}
