import { WebSocket } from 'ws';

interface LastRequest {
    event: string;
    body: any;
}

export interface ExtendedWebSocket extends WebSocket {
    id?: string;
    isAlive?: boolean;
    lastRequest?: LastRequest;
}
