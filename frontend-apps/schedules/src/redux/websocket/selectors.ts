import type { RootState } from '../store';

export const websocketsIsOpenSelector = (state: RootState) => state.websockets.isOpen;
