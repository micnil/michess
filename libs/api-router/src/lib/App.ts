import { Api } from '@michess/api-service';
import { Hono } from 'hono';
import { Server } from 'socket.io';
import { RestRouter } from './rest/RestRouter';
import { SocketRouter } from './socket/SocketRouter';

export type App = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  restRouter: Hono<any>;
  socketRouter: Server;
};

const from = (api: Api): App => {
  const restRouter = RestRouter.from(api);
  const socketRouter = SocketRouter.from(api);
  return { restRouter, socketRouter };
};
export const App = {
  from,
};
