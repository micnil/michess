import { serve } from '@hono/node-server';
import { ServerType } from '@hono/node-server/.';
import { App } from '@michess/api-router';
import { logger } from '@michess/be-utils';
import { AppConfig } from './config/model/AppConfig';

const start = (app: App, appConfig: AppConfig): ServerType => {
  const server = serve({
    fetch: app.restRouter.fetch,
    port: appConfig.server.port,
    hostname: '0.0.0.0',
  }).on('listening', () => {
    logger.info('Server is running on:');
    logger.info(server.address());
  });

  app.socketRouter.attach(server);

  app.socketRouter.engine.on('connection_error', (err) => {
    logger.info(`${err.code}: ${err.message}`);
  });

  app.init().catch((err) => {
    logger.error(err, 'Failed to initialize app');
    process.exit(1);
  });

  // graceful shutdown
  process.on('SIGINT', () => {
    app.close();
    server.close();
    process.exit(0);
  });
  process.on('SIGTERM', () => {
    server.close((err) => {
      if (err) {
        logger.error(err);
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
