import { Api } from '@michess/api-service';
import { Server } from 'socket.io';

type JoinRoomPayload = {
  gameId: string;
  userId?: string;
  isPlayer?: boolean;
};

const from = (api: Api) => {
  const io = new Server({
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join-game', (payload: JoinRoomPayload) => {
      console.log(`user joined game: ${payload.gameId}`);
    });

    socket.on('disconnect', (reason) => {
      console.log(`user disconnected: ${reason}`);
    });
  });

  io.engine.on('connection_error', (err) => {
    console.log(`${err.code}: ${err.message}`);
  });

  return io;
};

export const SocketRouter = {
  from,
};
