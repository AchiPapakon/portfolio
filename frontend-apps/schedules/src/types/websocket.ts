export interface ExtendedWebSocket extends WebSocket {
    // eslint-disable-next-line no-unused-vars
    sendEvent: (event: string, data?: unknown) => void;
}
