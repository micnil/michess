import {
  ClientToServerEvents,
  EventResponse,
  JoinGamePayloadV1Schema,
  MakeMovePayloadV1Schema,
  ServerToClientEvents,
} from '@michess/api-schema';
import { Api, Session } from '@michess/api-service';
import { logger } from '@michess/be-utils';
import { IncomingHttpHeaders } from 'http2';
import { DefaultEventsMap, Server, Socket } from 'socket.io';
import { RouterConfig } from '../model/RouterConfig';
import { ApiErrorMapper } from './util/ApiErrorMapper';

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
const from = (api: Api, config: RouterConfig) => {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    DefaultEventsMap,
    SocketData
  >({
    cors: {
      origin: config.cors.origins,
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

    socket.on('join-game', async (payload: unknown, callback) => {
      try {
        const joinGamePayloadV1 = JoinGamePayloadV1Schema.parse(payload);

        logger.info(
          `User ${socket.data.session.userId} joining game ${joinGamePayloadV1.gameId} as ${joinGamePayloadV1.side}`
        );
        const gameState = await api.games.joinGame(
          socket.data.session,
          joinGamePayloadV1
        );
        if (!socket.rooms.has(joinGamePayloadV1.gameId)) {
          socket.join(joinGamePayloadV1.gameId);
          socket.to(joinGamePayloadV1.gameId).emit('user-joined', gameState);
        }

        callback(EventResponse.ok(gameState));
      } catch (error) {
        logger.error(error);
        callback(EventResponse.error(ApiErrorMapper.from(error)));
      }
    });

    socket.on('make-move', async (payload: unknown, callback) => {
      try {
        const makeMovePayloadV1 = MakeMovePayloadV1Schema.parse(payload);
        await api.games.makeMove(socket.data.session, makeMovePayloadV1);
        socket
          .to(makeMovePayloadV1.gameId)
          .emit('move-made', makeMovePayloadV1);
        callback(EventResponse.ok(makeMovePayloadV1));
      } catch (error) {
        logger.error(error);
        callback(EventResponse.error(ApiErrorMapper.from(error)));
      }
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
