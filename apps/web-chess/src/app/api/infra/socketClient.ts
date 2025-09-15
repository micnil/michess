import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@michess/api-schema';
import { io, Socket } from 'socket.io-client';

export type SocketClient = Socket<ServerToClientEvents, ClientToServerEvents>;

export const socketClient: SocketClient = io({
  autoConnect: false,
  reconnection: false,
});
