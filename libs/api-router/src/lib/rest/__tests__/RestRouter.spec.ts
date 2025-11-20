import {
  CreateGameV1,
  GameDetailsV1,
  LobbyPageResponseV1,
  PlayerGameInfoPageResponseV1,
} from '@michess/api-schema';
import {
  Api,
  AuthService,
  BotService,
  GameplayService,
  GamesService,
  Session,
  UsageMetricsService,
} from '@michess/api-service';
import { RestRouter } from '../RestRouter';

jest.mock('@michess/api-service');

const mockSession: Session = {
  userId: 'test-user-id',
  sessionId: 'test-session-id',
  token: 'test-token',
  expiresAt: new Date(),
  userAgent: 'test-agent',
  username: 'testuser',
  name: 'Test User',
  ipAddress: '127.0.0.1',
  isAnonymous: false,
};

const apiMock: Api = {
  games: new GamesService({} as never),
  gameplay: new GameplayService(
    {} as never,
    {} as never,
    {} as never,
    {} as never,
    {} as never,
    {} as never,
  ),
  bots: new BotService({} as never),
  auth: new AuthService({} as never, {} as never, {} as never, {
    google: { clientId: '', clientSecret: '' },
  }),
  usageMetrics: new UsageMetricsService({} as never, {} as never, {} as never),
  gameJobScheduler: {} as never,
};

describe('RestRouter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock auth.getSession to return a valid session by default
    apiMock.auth.getSession = jest.fn().mockResolvedValue(mockSession);
  });

  describe('/games', () => {
    describe('POST /api/games', () => {
      it('should create a new game', async () => {
        const mockGameDetails: GameDetailsV1 = {
          id: 'game-123',
          status: 'WAITING',
          players: {
            white: undefined,
            black: undefined,
          },
          variant: 'standard',
          isPrivate: false,
          timeControl: {
            classification: 'no_clock',
          },
          clock: undefined,
          actionOptions: [],
          moves: [],
        };

        apiMock.games.createGame = jest.fn().mockResolvedValue(mockGameDetails);

        const app = RestRouter.from(apiMock, {
          cors: { origins: ['http://localhost:3000'] },
        });

        const createGamePayload: CreateGameV1 = {
          variant: 'standard',
          isPrivate: false,
        };

        const response = await app.request('/api/games', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          },
          body: JSON.stringify(createGamePayload),
        });

        expect(response.status).toBe(200);
        expect(apiMock.games.createGame).toHaveBeenCalledWith(
          createGamePayload,
        );

        const data = await response.json();
        expect(data).toEqual(mockGameDetails);
      });

      it('should return 401 when not authenticated', async () => {
        apiMock.auth.getSession = jest.fn().mockResolvedValue({
          userId: undefined,
          sessionToken: undefined,
        });

        const app = RestRouter.from(apiMock, {
          cors: { origins: ['http://localhost:3000'] },
        });

        const response = await app.request('/api/games', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ variant: 'standard' }),
        });

        expect(response.status).toBe(401);
        const data = await response.json();
        expect(data).toEqual({ error: 'Unauthorized' });
      });

      it('should return validation error for invalid payload', async () => {
        const app = RestRouter.from(apiMock, {
          cors: { origins: ['http://localhost:3000'] },
        });

        const response = await app.request('/api/games', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          },
          body: JSON.stringify({ variant: 'invalid-variant' }),
        });

        expect(response.status).toBe(400);
      });
    });

    describe('GET /api/games/lobby', () => {
      it('should fetch lobby games', async () => {
        const mockLobbyResponse: LobbyPageResponseV1 = {
          items: [
            {
              id: 'game-123',
              availableColor: 'white',
              opponent: {
                id: 'opponent-123',
                name: 'Opponent Player',
              },
              variant: 'standard',
              createdAt: new Date().toISOString(),
            },
          ],
          currentPage: 1,
          pageSize: 10,
          totalPages: 1,
        };

        apiMock.games.queryLobby = jest
          .fn()
          .mockResolvedValue(mockLobbyResponse);

        const app = RestRouter.from(apiMock, {
          cors: { origins: ['http://localhost:3000'] },
        });

        const response = await app.request('/api/games/lobby?page=1&limit=10', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer test-token',
          },
        });

        expect(response.status).toBe(200);
        expect(apiMock.games.queryLobby).toHaveBeenCalledWith({
          page: 1,
          limit: 10,
        });

        const data = await response.json();
        expect(data).toEqual(mockLobbyResponse);
      });

      it('should return 401 when not authenticated', async () => {
        apiMock.auth.getSession = jest.fn().mockResolvedValue({
          ...mockSession,
          userId: '',
        });

        const app = RestRouter.from(apiMock, {
          cors: { origins: ['http://localhost:3000'] },
        });

        const response = await app.request('/api/games/lobby?page=1&limit=10', {
          method: 'GET',
        });

        expect(response.status).toBe(401);
      });
    });

    describe('GET /api/games/my', () => {
      it('should fetch player games', async () => {
        const mockPlayerGamesResponse: PlayerGameInfoPageResponseV1 = {
          items: [
            {
              id: 'game-123',
              opponent: {
                id: 'opponent-123',
                name: 'Opponent Player',
              },
              ownSide: 'white',
              turn: 'white',
              variant: 'standard',
            },
          ],
          currentPage: 1,
          pageSize: 10,
          totalPages: 1,
        };

        apiMock.games.queryPlayerGames = jest
          .fn()
          .mockResolvedValue(mockPlayerGamesResponse);

        const app = RestRouter.from(apiMock, {
          cors: { origins: ['http://localhost:3000'] },
        });

        const response = await app.request('/api/games/my?page=1&limit=10', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer test-token',
          },
        });

        expect(response.status).toBe(200);
        expect(apiMock.games.queryPlayerGames).toHaveBeenCalledWith(
          'test-user-id',
          {
            page: 1,
            limit: 10,
          },
        );

        const data = await response.json();
        expect(data).toEqual(mockPlayerGamesResponse);
      });

      it('should return 401 when not authenticated', async () => {
        apiMock.auth.getSession = jest.fn().mockResolvedValue({
          ...mockSession,
          userId: '',
        });

        const app = RestRouter.from(apiMock, {
          cors: { origins: ['http://localhost:3000'] },
        });

        const response = await app.request('/api/games/my?page=1&limit=10', {
          method: 'GET',
        });

        expect(response.status).toBe(401);
      });
    });
  });
});
