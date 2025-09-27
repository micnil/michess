import { Api } from '@michess/api-service';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { RestContext } from '../model/RestContext';
import { RouterConfig } from '../model/RouterConfig';
import { GamesController } from './games/GamesController';
import { MetricsController } from './metrics/MetricsController';

export const RestRouter = {
  from: (api: Api, config: RouterConfig) => {
    const gamesController = GamesController(api.games);
    const metricsController = MetricsController(api.usageMetrics);
    const honoApp = new Hono<RestContext>().basePath('/api');
    honoApp.use(
      '*',
      cors({
        credentials: true,
        origin: config.cors.origins,
      })
    );

    honoApp.on(['POST', 'GET'], '/auth/**', (c) => api.auth.handle(c.req.raw));

    honoApp.use('*', async (c, next) => {
      const session = await api.auth.getSession(c.req.raw.headers);
      c.set('session', session);
      await next();
    });
    honoApp.use('*', async (c, next) => {
      if (!c.get('session')?.userId) {
        c.status(401);
        return c.json({ error: 'Unauthorized' });
      }
      await next();
    });

    honoApp.route('/games', gamesController);
    honoApp.route('/metrics', metricsController);

    return honoApp;
  },
};
