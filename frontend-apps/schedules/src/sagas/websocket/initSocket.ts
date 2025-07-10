import type { ExtendedWebSocket } from '../../types/websocket';

const initSocket = () => {
    const ws = new WebSocket(import.meta.env.VITE_REMOTE_HOST) as ExtendedWebSocket;

    // Directly send a message
    ws.sendEvent = (event: string, data?: unknown) => {
        ws.send(JSON.stringify({ event, data }));
    };

    return ws;
};

export default initSocket;
