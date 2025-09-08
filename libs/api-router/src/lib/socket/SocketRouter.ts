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
      // IncomingHttpHeaders can have string | string[] values
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

    socket.on('join-game', (payload: unknown) => {
      const joinGamePayloadV1 = JoinGamePayloadV1Schema.parse(payload);
      api.games.joinGame(socket.data.session, joinGamePayloadV1);
      socket.join(joinGamePayloadV1.gameId);
    });

    socket.on('make-move', (payload: unknown) => {
      const makeMovePayloadV1 = MakeMovePayloadV1Schema.parse(payload);
      api.games.makeMove(socket.data.session, makeMovePayloadV1);
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
