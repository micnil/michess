import { Api, Session } from '@michess/api-service';
import { logger } from '@michess/be-utils';
import { Maybe } from '@michess/common-utils';
import { Hono } from 'hono';
import { pinoLogger } from 'hono-pino';
import { cors } from 'hono/cors';
import { createMiddleware } from 'hono/factory';
import { requestId } from 'hono/request-id';
import { RestContext } from '../model/RestContext';
import { RouterConfig } from '../model/RouterConfig';
import { BotsController } from './bots/BotsController';
import { GamesController } from './games/GamesController';
import { MetricsController } from './metrics/MetricsController';

export const RestRouter = {
  from: (api: Api, config: RouterConfig) => {
    const gamesController = GamesController(api.games);
    const metricsController = MetricsController(api.usageMetrics);
    const botsController = BotsController(api.bots);
    const honoApp = new Hono().basePath('/api');
    honoApp
      .use(requestId())
      .use(
        pinoLogger({
          pino: logger,
        }),
      )
      .use(
        cors({
          credentials: true,
          origin: config.cors.origins,
        }),
      );

    honoApp.on(['GET'], '/health', (c) => c.json({ status: 'ok' }));
    honoApp.on(['POST', 'GET'], '/auth/**', (c) => api.auth.handle(c.req.raw));

    honoApp
      .use(
        '*',
        createMiddleware<{
          Variables: { session: Maybe<Session> };
        }>(async (c, next) => {
          const session = await api.auth.getSession(c.req.raw.headers);
          c.set('session', session);
          await next();
        }),
      )
      .use(
        '*',
        createMiddleware<RestContext>(async (c, next) => {
          if (!c.get('session').userId) {
            c.status(401);
            return c.json({ error: 'Unauthorized' });
          }
          await next();
        }),
      );

    honoApp.route('/games', gamesController);
    honoApp.route('/bots', botsController);
    honoApp.route('/metrics', metricsController);

    return honoApp;
  },
};
