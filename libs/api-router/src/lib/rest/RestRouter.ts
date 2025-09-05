import { Api } from '@michess/api-service';
import { Hono } from 'hono';
import { GamesController } from './games/GamesController';

export const RestRouter = {
  from: (api: Api) => {
    const gamesController = GamesController(api.games);
    const HonoApp = new Hono()
      .basePath('/api')
      .route('/games', gamesController);
    return HonoApp;
  },
};
