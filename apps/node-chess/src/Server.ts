import { serve } from '@hono/node-server';
import { ServerType } from '@hono/node-server/.';
import { App } from '@michess/api-router';
import { AppConfig } from './config/model/AppConfig';

const start = (app: App, appConfig: AppConfig): ServerType => {
  const server = serve({
    fetch: app.restRouter.fetch,
    port: appConfig.server.port,
  }).on('listening', () => {
    console.log('Server is running on:');
    console.log(server.address());
  });

  app.socketRouter.attach(server);

  app.socketRouter.engine.on('connection_error', (err) => {
    console.log(`${err.code}: ${err.message}`);
  });

  // graceful shutdown
  process.on('SIGINT', () => {
    server.close();
    process.exit(0);
  });
  process.on('SIGTERM', () => {
    server.close((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      process.exit(0);
    });
  });
  return server;
};

export const Server = {
  start,
};
