import { serve } from '@hono/node-server';
import { App } from '@michess/hono-app';

const server = serve({
  fetch: App.fetch,
  port: 5000,
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
