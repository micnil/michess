import { Api } from '@michess/api-service';
import { Hono } from 'hono';
import { GamesController } from './games/GamesController';

export const RestRouter = {
  from: (api: Api) => {
    const gamesController = GamesController(api.games);
    const HonoApp = new Hono()
      .basePath('/api')
      .route('/games', gamesController)
      .on(['POST', 'GET'], '/api/auth/**', (c) => api.auth.handle(c.req.raw));
    return HonoApp;
  },
};
