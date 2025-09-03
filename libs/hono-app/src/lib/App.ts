import { Hono } from 'hono';
import { GamesController } from './games/GamesController';
import { Api } from '@michess/api-service';

const from = (api: Api) => {
  const gamesController = GamesController(api.games);
  const HonoApp = new Hono().basePath('/api').route('/games', gamesController);
  return HonoApp;
};
export const App = {
  from,
};
