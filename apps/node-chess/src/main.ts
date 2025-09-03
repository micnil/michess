import postgres from 'postgres';
import { App } from '@michess/hono-app';
import dotenv from 'dotenv';
import { AppConfigService } from './config/service/AppConfigService';
import { Api } from '@michess/api-service';
import { Repositories } from '@michess/infra-db';
import { Server } from './Server';

dotenv.config();

const main = () => {
  const appConfig = AppConfigService.get();

  const client = postgres(appConfig.database.url);

  const repos = Repositories.from(client);
  const api = Api.from(repos);
  const app = App.from(api);

  Server.start(app, appConfig);
};

main();
