import { GameDetailsV1, LobbyPageResponseV1 } from '@michess/api-schema';
import { FenStr } from '@michess/core-board';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

export const mswHandlers = [
  http.get('/api/auth/get-session', () => {
    return HttpResponse.json({
      user: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emailVerified: true,
        isAnonymous: true,
        image: null,
        id: 'test-user-id',
        name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
      },
      session: {
        id: 'test-session-id',
        userId: 'test-user-id',
        token: 'test-token',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
    });
  }),

  http.get('/api/games/lobby', () => {
    return HttpResponse.json<LobbyPageResponseV1>({
      items: [
        {
          id: 'default-game-1',
          availableColor: 'white',
          opponent: {
            name: 'Default Player 1',
            id: 'opponent-1',
            isBot: false,
          },
          variant: 'standard',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'default-game-2',
          opponent: {
            name: 'Default Player 2',
            id: 'opponent-2',
            isBot: false,
          },
          availableColor: 'black',
          variant: 'standard',
          createdAt: new Date().toISOString(),
        },
      ],
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    });
  }),

  http.post('/api/games', () => {
    return HttpResponse.json<GameDetailsV1>({
      id: 'new-game-id',
      timeControl: {
        classification: 'no_clock',
      },
      clock: undefined,
      players: { white: undefined, black: undefined },
      variant: 'standard',
      isPrivate: false,
      initialPosition: FenStr.standardInitial(),
      status: 'WAITING',
      actionOptions: [],
      moves: [],
      startedAt: undefined,
    });
  }),

  http.delete('/api/matchmaking/leave', () => {
    return HttpResponse.json(null, { status: 200 });
  }),
];

export const server = setupServer(...mswHandlers);

export { http, HttpResponse } from 'msw';
export { mswHandlers as handlers };
