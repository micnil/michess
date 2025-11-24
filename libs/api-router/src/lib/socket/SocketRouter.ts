import {
  ClientToServerEvents,
  EventResponse,
  JoinGamePayloadV1Schema,
  LeaveGamePayloadV1,
  LeaveGamePayloadV1Schema,
  MakeActionPayloadV1Schema,
  MakeMovePayloadV1Schema,
  ServerToClientEvents,
} from '@michess/api-schema';
import { Api, Session } from '@michess/api-service';
import { logger } from '@michess/be-utils';
import { createAdapter } from '@socket.io/redis-streams-adapter';
import { IncomingHttpHeaders } from 'http2';
import Redis from 'ioredis';
import { DefaultEventsMap, Socket as IoSocket, Server } from 'socket.io';
import z from 'zod';
import { RouterConfig } from '../model/RouterConfig';
import { ApiErrorMapper } from './util/ApiErrorMapper';

type Socket = IoSocket<ClientToServerEvents, ServerToClientEvents>;

const convertIncomingHeadersToHeaders = (
  incomingHeaders: IncomingHttpHeaders,
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
  leaveGamePayloadV1: LeaveGamePayloadV1,
) => {
  const gameState = await api.gameplay.leaveGame(
    socket.data.session,
    leaveGamePayloadV1,
  );

  socket.leave(leaveGamePayloadV1.gameId);
  if (gameState) {
    socket.to(leaveGamePayloadV1.gameId).emit('game-updated', gameState);
  }
};

type SocketData = {
  session: Session;
};
const from = (api: Api, redis: Redis, config: RouterConfig) => {
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
    adapter: createAdapter(redis),
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
      'User connected',
    );

    socket.on('join-game', async (payload: unknown, callback) => {
      try {
        const joinGamePayloadV1 = JoinGamePayloadV1Schema.parse(payload);

        logger.info(
          {
            userId: socket.data.session.userId,
            gameId: joinGamePayloadV1.gameId,
            side: joinGamePayloadV1.side,
          },
          `User joining game`,
        );
        const gameState = await api.gameplay.joinGame(
          {
            id: socket.data.session.userId,
            name: socket.data.session.name,
            role: socket.data.session.role,
          },
          joinGamePayloadV1,
        );
        if (!socket.rooms.has(joinGamePayloadV1.gameId)) {
          socket.join(joinGamePayloadV1.gameId);
          socket.to(joinGamePayloadV1.gameId).emit('game-updated', gameState);
        }

        callback(EventResponse.ok(gameState));
      } catch (error) {
        logger.error(error);
        callback(EventResponse.error(ApiErrorMapper.from(error)));
      }
    });

    socket.on('leave-game', async (payload: unknown, callback) => {
      try {
        const leaveGamePayloadV1 = LeaveGamePayloadV1Schema.parse(payload);
        logger.debug(
          {
            userId: socket.data.session.userId,
            gameId: leaveGamePayloadV1.gameId,
          },
          `User leaving game`,
        );
        await leaveGame(socket, api, leaveGamePayloadV1);
        callback(EventResponse.ok(undefined));
      } catch (error) {
        logger.error(error);
        callback(EventResponse.error(ApiErrorMapper.from(error)));
      }
    });

    socket.on('make-move', async (payload: unknown, callback) => {
      try {
        const makeMovePayloadV1 = MakeMovePayloadV1Schema.parse(payload);
        logger.debug(
          { ...makeMovePayloadV1, rooms: Array.from(socket.rooms) },
          'Received make-move event',
        );
        const { gameDetails, move } = await api.gameplay.makeMove(
          socket.data.session.userId,
          makeMovePayloadV1,
        );
        socket.to(move.gameId).emit('move-made', move);

        callback(EventResponse.ok(move));
        if (gameDetails) {
          io.to(makeMovePayloadV1.gameId).emit('game-updated', gameDetails);
        }
      } catch (error) {
        logger.error(error);
        callback(EventResponse.error(ApiErrorMapper.from(error)));
      }
    });

    socket.on('make-action', async (payload: unknown, callback) => {
      try {
        const makeActionPayload = MakeActionPayloadV1Schema.parse(payload);
        logger.debug(
          {
            userId: socket.data.session.userId,
            gameId: makeActionPayload.gameId,
            action: makeActionPayload.action,
          },
          'User made action',
        );
        const gameDetails = await api.gameplay.makeAction(
          socket.data.session,
          makeActionPayload,
        );
        socket.to(makeActionPayload.gameId).emit('game-updated', gameDetails);
        callback(EventResponse.ok(gameDetails));
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
        'User disconnecting',
      );
      const gameIds = Array.from(socket.rooms)
        .map((room) => z.uuid().safeParse(room))
        .filter((result) => result.success)
        .map((result) => result.data);
      await Promise.all(
        gameIds.map((gameId) => leaveGame(socket, api, { gameId })),
      );
    });

    socket.on('disconnect', async () => {
      await api.usageMetrics.setClientCount(io.engine.clientsCount);
    });
    socket.on('error', (error) => {
      logger.error(
        {
          socketId: socket.id,
          error,
        },
        'Socket error',
      );
    });

    if (!socket.recovered) {
      await api.usageMetrics.setClientCount(io.engine.clientsCount);
    }
  });

  api.gameplay.subscribe((event) => {
    io.to(event.data.id).emit('game-updated', event.data);
  }, 'flag_timeout');

  return io;
};

export const SocketRouter = {
  from,
};
