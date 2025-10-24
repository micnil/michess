import {
  GameDetailsV1,
  JoinGamePayloadV1,
  MakeMovePayloadV1,
  MakeMoveResponseV1,
} from '@michess/api-schema';
import {
  Api,
  AuthService,
  GamesService,
  Session,
  UsageMetricsService,
} from '@michess/api-service';
import { createEventIterator } from '@michess/be-utils';
import Redis from 'ioredis-mock';
import { createServer } from 'node:http';
import { Server, Socket as ServerSocket } from 'socket.io';
import { Socket as ClientSocket, io as ioClient } from 'socket.io-client';
import { SocketRouter } from '../SocketRouter';
jest.mock('@michess/api-service');

const apiMock: Api = {
  games: new GamesService({} as never, {} as never, {} as never, {} as never),
  auth: new AuthService({} as never, {} as never, {} as never, {
    google: { clientId: '', clientSecret: '' },
  }),
  usageMetrics: new UsageMetricsService({} as never, {} as never, {} as never),
};

const waitFor = <T>(
  socket: ServerSocket | ClientSocket,
  event: string,
): Promise<T> => {
  return new Promise((resolve) => {
    socket.once(event, (data) => {
      resolve(data);
    });
  });
};

const leaveAllRooms = (socket: ServerSocket) => {
  socket.rooms.forEach((room) => {
    if (room !== socket.id) {
      socket.leave(room);
    }
  });
};

const connectClientSocket = (port: number, id: string): ClientSocket => {
  return ioClient(`http://localhost:${port}`, {
    transports: ['websocket'],
    multiplex: false,
    auth: {
      token: id,
    },
  });
};
describe('SocketRouter', () => {
  let io: Server;
  let clientSocket1: ClientSocket;
  let clientSocket2: ClientSocket;
  let serverSocket1: ServerSocket;
  let serverSocket2: ServerSocket;
  const redis = new Redis();

  let httpServer: ReturnType<typeof createServer>;

  const sessionMock: Session = {
    userId: 'test-user-id',
    sessionId: 'test-session-id',
    token: 'test-token',
    name: 'Test User',
    username: 'testuser',
    expiresAt: new Date(Date.now() + 3600000),
    userAgent: 'test-agent',
    ipAddress: '127.0.0.1',
    isAnonymous: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    leaveAllRooms(serverSocket1);
    leaveAllRooms(serverSocket2);
  });

  beforeAll(async () => {
    apiMock.auth.getSession = jest.fn().mockResolvedValue(sessionMock);
    httpServer = createServer();
    io = SocketRouter.from(apiMock, redis, { cors: { origins: ['*'] } });
    io.attach(httpServer);

    using connectionIter = createEventIterator<ServerSocket>(io, 'connection');

    httpServer.listen(() => {
      const address = httpServer.address();

      const port = typeof address === 'object' && address ? address.port : 0;

      clientSocket1 = connectClientSocket(port, 'client1');
      clientSocket2 = connectClientSocket(port, 'client2');
    });

    const firstConnection = await connectionIter.next();
    const secondConnection = await connectionIter.next();

    firstConnection.value.handshake.auth.token === 'client1'
      ? ((serverSocket1 = firstConnection.value),
        (serverSocket2 = secondConnection.value))
      : ((serverSocket2 = firstConnection.value),
        (serverSocket1 = secondConnection.value));
  });

  afterAll(() => {
    io.close();
    clientSocket1.disconnect();
    clientSocket2.disconnect();
    if (httpServer) {
      httpServer.close();
    }
  });

  describe('join-game', () => {
    it('should handle valid join-game event', async () => {
      expect.assertions(4);
      const joinGamePayload: JoinGamePayloadV1 = {
        gameId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        side: 'white',
      };
      const mockGameState: GameDetailsV1 = {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        status: 'WAITING',
        players: { white: { name: 'Test User', id: 'u1' }, black: undefined },
        isPrivate: false,
        moves: [],
        variant: 'standard',
        actionOptions: [],
        clock: undefined,
      };
      serverSocket2.join(joinGamePayload.gameId);

      apiMock.games.joinGame = jest.fn().mockResolvedValue(mockGameState);

      const gameUpdatedPromise = waitFor(clientSocket2, 'game-updated');

      const response = await clientSocket1.emitWithAck(
        'join-game',
        joinGamePayload,
      );
      const gameUpdatedData = await gameUpdatedPromise;

      expect(gameUpdatedData).toEqual(mockGameState);

      expect(response.status).toEqual('ok');
      expect(response.status === 'ok' && response.data).toEqual(mockGameState);
      expect(apiMock.games.joinGame).toHaveBeenCalled();
    });
  });

  describe('make-move', () => {
    it('should handle valid make-move event', async () => {
      expect.assertions(4);
      const makeMovePayload: MakeMovePayloadV1 = {
        gameId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        uci: 'e2e4',
      };
      serverSocket1.join(makeMovePayload.gameId);
      serverSocket2.join(makeMovePayload.gameId);

      apiMock.games.makeMove = jest.fn().mockResolvedValue(undefined);

      const moveMadePromise = waitFor<MakeMovePayloadV1>(
        clientSocket2,
        'move-made',
      );

      const response: MakeMoveResponseV1 = await clientSocket1.emitWithAck(
        'make-move',
        makeMovePayload,
      );

      const data = await moveMadePromise;
      expect(data).toEqual(makeMovePayload);
      expect(response.status).toEqual('ok');
      expect(response.status === 'ok' && response.data).toEqual(
        makeMovePayload,
      );
      expect(apiMock.games.makeMove).toHaveBeenCalled();
    });
  });
});
