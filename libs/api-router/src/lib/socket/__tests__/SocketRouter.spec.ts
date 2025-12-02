import {
  GameDetailsResponseV1,
  GameDetailsV1,
  JoinGamePayloadV1,
  MakeActionPayloadV1,
  MakeMovePayloadV1,
  MakeMoveResponseV1,
  MoveMadeV1,
} from '@michess/api-schema';
import {
  Api,
  AuthService,
  BotService,
  GamesService,
  MatchmakingService,
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

let gameplayEventHandler: ((event: any) => void) | undefined;

const mockGameplayService = {
  subscribe: jest.fn((handler: (event: any) => void) => {
    gameplayEventHandler = handler;
    return () => {
      gameplayEventHandler = undefined;
    };
  }),
  makeMove: jest.fn(),
  joinGame: jest.fn(),
  makeAction: jest.fn(),
  leaveGame: jest.fn(),
  close: jest.fn(),
};

const apiMock: Api = {
  matchmaking: new MatchmakingService(
    {} as never,
    {} as never,
    {} as never,
    {} as never,
    {} as never,
  ),
  bots: new BotService(
    {} as never,
    {} as never,
    {} as never,
    {} as never,
    {} as never,
  ),
  games: new GamesService({} as never, {} as never, {} as never),
  gameplay: mockGameplayService as any,
  auth: new AuthService({} as never, {} as never, {} as never, {
    google: { clientId: '', clientSecret: '' },
  }),
  usageMetrics: new UsageMetricsService({} as never, {} as never, {} as never),
  gameJobScheduler: {} as never,
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
    role: 'user',
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
      const joinGamePayload: JoinGamePayloadV1 = {
        gameId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        side: 'white',
      };
      const mockGameState: GameDetailsV1 = {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        status: 'WAITING',
        timeControl: {
          classification: 'no_clock',
        },
        players: {
          white: { name: 'Test User', id: 'u1', isBot: false },
          black: undefined,
        },
        isPrivate: false,
        moves: [],
        variant: 'standard',
        actionOptions: [],
        clock: undefined,
      };
      serverSocket2.join(joinGamePayload.gameId);

      mockGameplayService.joinGame.mockResolvedValue(mockGameState);

      const gameUpdatedPromise = waitFor(clientSocket2, 'game-updated');

      const response = await clientSocket1.emitWithAck(
        'join-game',
        joinGamePayload,
      );
      const gameUpdatedData = await gameUpdatedPromise;

      expect(gameUpdatedData).toEqual(mockGameState);

      expect(response.status).toEqual('ok');
      expect(response.status === 'ok' && response.data).toEqual(mockGameState);
      expect(mockGameplayService.joinGame).toHaveBeenCalled();
    });
  });

  describe('make-move', () => {
    it('should handle valid make-move event', async () => {
      const makeMovePayload: MakeMovePayloadV1 = {
        gameId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        uci: 'e2e4',
      };
      serverSocket1.join(makeMovePayload.gameId);
      serverSocket2.join(makeMovePayload.gameId);

      const moveV1: MoveMadeV1 = {
        uci: 'e2e4',
        gameId: makeMovePayload.gameId,
        clock: { whiteMs: 300000, blackMs: 300000 },
      };
      const mockGameState: GameDetailsV1 = {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        status: 'IN_PROGRESS',
        timeControl: {
          classification: 'no_clock',
        },
        players: {
          white: { name: 'Test User', id: 'u1', isBot: false },
          black: { name: 'Bot', id: 'bot1', isBot: true },
        },
        isPrivate: false,
        moves: [{ uci: 'e2e4' }],
        variant: 'standard',
        actionOptions: [],
        clock: undefined,
      };

      mockGameplayService.makeMove.mockImplementation(async () => {
        // Trigger the event handler directly
        gameplayEventHandler?.({
          type: 'move_made',
          data: {
            moveMade: moveV1,
            gameDetails: mockGameState,
            statusChanged: false,
            moveColor: 'black',
          },
        });
        return { move: moveV1 };
      });

      const moveMadePromise = waitFor<MoveMadeV1>(clientSocket2, 'move-made');

      const response: MakeMoveResponseV1 = await clientSocket1.emitWithAck(
        'make-move',
        makeMovePayload,
      );

      const data = await moveMadePromise;
      expect(data).toEqual(moveV1);
      expect(response.status).toEqual('ok');
      expect(response.status === 'ok' && response.data).toEqual(moveV1);
      expect(mockGameplayService.makeMove).toHaveBeenCalled();
    });
  });

  describe('make-action', () => {
    it('should handle valid make-action event', async () => {
      const makeActionPayload: MakeActionPayloadV1 = {
        gameId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        action: { type: 'offer_draw' },
      };
      serverSocket1.join(makeActionPayload.gameId);
      serverSocket2.join(makeActionPayload.gameId);

      const mockGameState: GameDetailsV1 = {
        id: makeActionPayload.gameId,
        status: 'IN_PROGRESS',
        timeControl: {
          classification: 'no_clock',
        },
        players: {
          white: { name: 'Test User', id: 'u1', isBot: false },
          black: { name: 'Test User 2', id: 'u2', isBot: false },
        },
        isPrivate: false,
        moves: [],
        variant: 'standard',
        actionOptions: [
          {
            type: 'accept_draw',
            reason: 'by_agreement',
          },
        ],
        clock: undefined,
      };
      mockGameplayService.makeAction.mockResolvedValue(mockGameState);

      const actionMadePromise = waitFor<GameDetailsV1>(
        clientSocket2,
        'game-updated',
      );

      const response: GameDetailsResponseV1 = await clientSocket1.emitWithAck(
        'make-action',
        makeActionPayload,
      );

      const data = await actionMadePromise;
      expect(data).toEqual(mockGameState);
      expect(response.status).toEqual('ok');
      expect(response.status === 'ok' && response.data).toEqual(mockGameState);
      expect(mockGameplayService.makeAction).toHaveBeenCalled();
    });
  });
});
