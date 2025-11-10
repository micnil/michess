import { Api } from '@michess/api-service';
import { Hono } from 'hono';
import Redis from 'ioredis';
import { Server } from 'socket.io';
import { RouterConfig } from './model/RouterConfig';
import { RestRouter } from './rest/RestRouter';
import { SocketRouter } from './socket/SocketRouter';

export type App = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  restRouter: Hono<any>;
  socketRouter: Server;
  init: () => Promise<void>;
  close: () => Promise<void>;
};

const from = (
  api: Api,
  redisClient: Redis,
  routerConfig: RouterConfig,
): App => {
  const restRouter = RestRouter.from(api, routerConfig);
  const socketRouter = SocketRouter.from(api, redisClient, routerConfig);
  return {
    restRouter,
    socketRouter,
    init: async () => {
      await api.gameJobScheduler.initialize();
      await api.usageMetrics.initialize();
    },
    close: async () => {
      socketRouter.close();
      await api.gameplay.close();
      await api.gameJobScheduler.close();
      await api.usageMetrics.close();
    },
  };
};
export const App = {
  from,
};
