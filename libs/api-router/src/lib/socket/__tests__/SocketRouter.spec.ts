import {
  GameDetailsV1,
  JoinGamePayloadV1,
  MakeMovePayloadV1,
} from '@michess/api-schema';
import { Api, AuthService, GamesService, Session } from '@michess/api-service';
import { createServer } from 'node:http';
import { Server, Socket as ServerSocket } from 'socket.io';
import { Socket as ClientSocket, io as ioClient } from 'socket.io-client';
import { SocketRouter } from '../SocketRouter';
jest.mock('@michess/api-service');

const apiMock: Api = {
  games: new GamesService({} as any, {} as any),
  auth: new AuthService({} as any, {} as any),
};

function waitFor(socket: ServerSocket | ClientSocket, event: string) {
  return new Promise((resolve) => {
    socket.once(event, resolve);
  });
}

describe('SocketRouter', () => {
  let io: Server;
  let clientSocket: ClientSocket;
  let serverSocket: ServerSocket;

  let httpServer: ReturnType<typeof createServer>;

  const sessionMock: Session = {
    userId: 'test-user-id',
    sessionId: 'test-session-id',
    token: 'test-token',
    expiresAt: new Date(Date.now() + 3600000),
    userAgent: 'test-agent',
    ipAddress: '127.0.0.1',
    isAnonymous: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    serverSocket.rooms.forEach((room) => {
      if (room !== serverSocket.id) {
        serverSocket.leave(room);
      }
    });
  });
  beforeAll((done) => {
    apiMock.auth.getSession = jest.fn().mockResolvedValue(sessionMock);
    httpServer = createServer();
    io = SocketRouter.from(apiMock);
    io.attach(httpServer);

    httpServer.listen(() => {
      const address = httpServer.address();

      const port = typeof address === 'object' && address ? address.port : 0;
      io.on('connection', (socket) => {
        serverSocket = socket;
      });

      clientSocket = ioClient(`http://localhost:${port}`, {
        autoConnect: false,
        forceNew: true,
        transports: ['websocket'],
      });

      clientSocket.on('connect', done);
      clientSocket.connect();
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.disconnect();
    if (httpServer) {
      httpServer.close();
    }
  });

  describe('join-game', () => {
    it('should handle valid join-game event', (done) => {
      const joinGamePayload: JoinGamePayloadV1 = {
        gameId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        side: 'white',
      };
      const mockGameState: GameDetailsV1 = {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        players: { white: { name: 'Test User' }, black: undefined },
        isPrivate: false,
        moves: [],
        variant: 'standard',
      };

      apiMock.games.joinGame = jest.fn().mockResolvedValue(mockGameState);

      clientSocket.on('user-joined', (data) => {
        expect(data).toEqual(mockGameState);
        expect(apiMock.games.joinGame).toHaveBeenCalled();
        done();
      });

      // Send the event
      clientSocket.emit('join-game', joinGamePayload);
    });
  });

  describe('make-move', () => {
    it('should handle valid make-move event', (done) => {
      const makeMovePayload: MakeMovePayloadV1 = {
        gameId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        uci: 'e2e4',
      };
      serverSocket.join(makeMovePayload.gameId);

      apiMock.games.makeMove = jest.fn().mockResolvedValue(undefined);

      clientSocket.on('move-made', (data) => {
        expect(data).toEqual(makeMovePayload);
        expect(apiMock.games.makeMove).toHaveBeenCalled();
        done();
      });

      // Send the event
      clientSocket.emit('make-move', makeMovePayload);
    });
  });
});
