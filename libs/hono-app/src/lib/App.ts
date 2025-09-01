import { Hono } from 'hono';
import { GamesController } from './games/GamesController';

const HonoApp = new Hono().basePath('/api').route('/games', GamesController);

export const App = HonoApp;
