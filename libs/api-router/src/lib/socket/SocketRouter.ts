import {
  JoinGamePayloadV1Schema,
  MakeMovePayloadV1Schema,
} from '@michess/api-schema';
import { Api, Session } from '@michess/api-service';
import { IncomingHttpHeaders } from 'http2';
import { DefaultEventsMap, Server, Socket } from 'socket.io';

const convertIncomingHeadersToHeaders = (
  incomingHeaders: IncomingHttpHeaders
): Headers => {
  const headers = new Headers();

  Object.entries(incomingHeaders).forEach(([key, value]) => {
    if (value !== undefined) {
      const headerValue = Array.isArray(value) ? value.join(', ') : value;
      headers.set(key.toLowerCase(), headerValue);
    }
  });

  return headers;
};
type SocketData = {
  session: Session;
};
const from = (api: Api) => {
  const io = new Server<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    SocketData
  >({
    cors: {
      origin: '*',
    },
  });

  io.use((socket: Socket, next) => {
    const headers = convertIncomingHeadersToHeaders(socket.handshake.headers);
    api.auth
      .getSession(headers)
      .then((session) => {
        socket.data.session = session;
        next();
      })
      .catch((err) => {
        console.error('Failed to authenticate socket:', err);
        next(new Error('Unauthorized'));
      });
  });

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join-game', async (payload: unknown) => {
      const joinGamePayloadV1 = JoinGamePayloadV1Schema.parse(payload);
      const gameState = await api.games.joinGame(
        socket.data.session,
        joinGamePayloadV1
      );
      socket.join(joinGamePayloadV1.gameId);
      io.to(joinGamePayloadV1.gameId).emit('user-joined', gameState);
    });

    socket.on('make-move', async (payload: unknown) => {
      const makeMovePayloadV1 = MakeMovePayloadV1Schema.parse(payload);
      await api.games.makeMove(socket.data.session, makeMovePayloadV1);
      io.to(makeMovePayloadV1.gameId).emit('move-made', makeMovePayloadV1);
    });

    socket.on('disconnect', (reason) => {
      console.log(`user disconnected: ${reason}`);
    });
  });

  return io;
};

export const SocketRouter = {
  from,
};
