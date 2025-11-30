import { App } from '@michess/api-router';
import { Api } from '@michess/api-service';
import { Repositories } from '@michess/infra-db';
import { EmailClient } from '@michess/infra-email';
import Redis from 'ioredis';
import postgres from 'postgres';
import { AppConfigService } from './config/service/AppConfigService';
import { Server } from './Server';

const main = async () => {
  const appConfig = AppConfigService.get();

  const pgClient = postgres(appConfig.database.url);

  const redis = new Redis(appConfig.redis.url, {
    maxRetriesPerRequest: null,
  });

  const emailClient = new EmailClient(
    appConfig.email,
    'no-reply@chessmonky.com',
  );

  const repos = Repositories.from(pgClient, redis);
  const api = Api.from(
    repos,
    pgClient,
    emailClient,
    appConfig.auth,
    appConfig.llm,
  );
  const app = App.from(api, redis, { cors: appConfig.cors });

  Server.start(app, appConfig);
};

main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
