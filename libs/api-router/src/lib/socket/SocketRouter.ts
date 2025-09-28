import {
  ClientToServerEvents,
  EventResponse,
  JoinGamePayloadV1Schema,
  LeaveGamePayloadV1,
  LeaveGamePayloadV1Schema,
  MakeMovePayloadV1Schema,
  ServerToClientEvents,
} from '@michess/api-schema';
import { Api, Session } from '@michess/api-service';
import { logger } from '@michess/be-utils';
import { IncomingHttpHeaders } from 'http2';
import { DefaultEventsMap, Server, Socket } from 'socket.io';
import z from 'zod';
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

const leaveGame = async (
  socket: Socket,
  api: Api,
  leaveGamePayloadV1: LeaveGamePayloadV1
) => {
  const gameState = await api.games.leaveGame(
    socket.data.session,
    leaveGamePayloadV1
  );

  socket.leave(leaveGamePayloadV1.gameId);
  if (gameState) {
    socket.to(leaveGamePayloadV1.gameId).emit('user-left', gameState);
  }
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
    connectionStateRecovery: {
      maxDisconnectionDuration: 15000,
      skipMiddlewares: true,
    },
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
        logger.error(err, 'Failed to authenticate socket');
        next(new Error('Unauthorized'));
      });
  });

  io.on('connection', async (socket) => {
    logger.debug(
      {
        socketId: socket.id,
        recovered: socket.recovered,
      },
      'User connected'
    );
    if (!socket.recovered) {
      await api.usageMetrics.incrementClientCount();
    }

    socket.on('join-game', async (payload: unknown, callback) => {
      try {
        const joinGamePayloadV1 = JoinGamePayloadV1Schema.parse(payload);

        logger.info(
          {
            userId: socket.data.session.userId,
            gameId: joinGamePayloadV1.gameId,
            side: joinGamePayloadV1.side,
          },
          `User joining game`
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

    socket.on('leave-game', async (payload: unknown) => {
      try {
        const leaveGamePayloadV1 = LeaveGamePayloadV1Schema.parse(payload);
        logger.debug(
          {
            userId: socket.data.session.userId,
            gameId: leaveGamePayloadV1.gameId,
          },
          `User leaving game`
        );
        await leaveGame(socket, api, leaveGamePayloadV1);
      } catch (error) {
        logger.error(error);
      }
    });

    socket.on('make-move', async (payload: unknown, callback) => {
      try {
        const makeMovePayloadV1 = MakeMovePayloadV1Schema.parse(payload);
        logger.debug(
          { ...makeMovePayloadV1, rooms: Array.from(socket.rooms) },
          'Received make-move event'
        );
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

    socket.on('disconnecting', async (reason) => {
      logger.debug(
        {
          socketId: socket.id,
          reason,
          socketRooms: Array.from(socket.rooms),
        },
        'User disconnecting'
      );
      await api.usageMetrics.decrementClientCount();
      const gameIds = Array.from(socket.rooms)
        .map((room) => z.uuid().safeParse(room))
        .filter((result) => result.success)
        .map((result) => result.data);
      await Promise.all(
        gameIds.map((gameId) => leaveGame(socket, api, { gameId }))
      );
    });
    socket.on('error', (error) => {
      logger.error(
        {
          socketId: socket.id,
          error,
        },
        'Socket error'
      );
    });
  });

  return io;
};

export const SocketRouter = {
  from,
};
