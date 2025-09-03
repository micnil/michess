import { ServerType } from '@hono/node-server/.';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { AppConfig } from './config/model/AppConfig';

const start = (app: Hono, appConfig: AppConfig): ServerType => {
  const server = serve({
    fetch: app.fetch,
    port: appConfig.server.port,
  }).on('listening', () => {
    console.log('Server is running on:');
    console.log(server.address());
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
