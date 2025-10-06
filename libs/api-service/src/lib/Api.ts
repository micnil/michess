import { Repositories } from '@michess/infra-db';
import { EmailClient } from '@michess/infra-email';
import { randomUUID } from 'crypto';
import { Sql } from 'postgres';
import { AuthConfig } from './auth/model/AuthConfig';
import { AuthService } from './auth/service/AuthService';
import { GamesService } from './games/service/GamesService';
import { UsageMetricsService } from './metrics/UsageMetricsService';

export type Api = {
  games: GamesService;
  auth: AuthService;
  usageMetrics: UsageMetricsService;
};

const from = (
  repos: Repositories,
  sql: Sql,
  emailClient: EmailClient,
  authConfig: AuthConfig
): Api => {
  const processId = randomUUID();
  const gamesService = new GamesService(repos.game, repos.move);
  const authService = new AuthService(
    sql,
    repos.cache,
    emailClient,
    authConfig
  );
  const usageMetrics = new UsageMetricsService(
    processId,
    repos.cache,
    repos.game
  );

  return {
    games: gamesService,
    auth: authService,
    usageMetrics,
  };
};
export const Api = {
  from,
};
