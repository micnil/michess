import { App } from '@michess/api-router';
import { Api } from '@michess/api-service';
import { Repositories } from '@michess/infra-db';
import dotenv from 'dotenv';
import postgres from 'postgres';
import { AppConfigService } from './config/service/AppConfigService';
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
