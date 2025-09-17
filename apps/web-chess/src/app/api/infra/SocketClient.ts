import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@michess/api-schema';
import { io, Socket } from 'socket.io-client';

export type SocketClient = Socket<ServerToClientEvents, ClientToServerEvents>;

export const SocketClient = {
  create: (): SocketClient => {
    const socket = io({
      autoConnect: false,
      reconnection: false,
    });

    socket.on('connect', () => {
      console.log('Socket connected', socket.active);
    });

    socket.on('connect_error', (err) => {
      console.log('Socket connection error:', err);
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });
    return socket;
  },
};
