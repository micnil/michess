import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@michess/api-schema';
import { io, Socket } from 'socket.io-client';

export const socketClient: Socket<ServerToClientEvents, ClientToServerEvents> =
  io({
    autoConnect: false,
  });
