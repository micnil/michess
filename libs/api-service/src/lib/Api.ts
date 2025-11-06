import { Repositories } from '@michess/infra-db';
import { EmailClient } from '@michess/infra-email';
import { randomUUID } from 'crypto';
import { Sql } from 'postgres';
import { AuthConfig } from './auth/model/AuthConfig';
import { AuthService } from './auth/service/AuthService';
import { GamesService } from './games/service/GamesService';
import { LockService } from './lock/service/LockService';
import { UsageMetricsService } from './metrics/UsageMetricsService';
import { RatingsService } from './user/service/RatingsService';

export type Api = {
  games: GamesService;
  auth: AuthService;
  usageMetrics: UsageMetricsService;
};

const from = (
  repos: Repositories,
  sql: Sql,
  emailClient: EmailClient,
  authConfig: AuthConfig,
): Api => {
  const processId = randomUUID();
  const ratingsService = new RatingsService(repos.rating);
  const lockService = new LockService(repos.cache.client);
  const gamesService = new GamesService(
    repos.game,
    repos.move,
    repos.action,
    repos.cache,
    ratingsService,
    lockService,
  );
  const authService = new AuthService(
    sql,
    repos.cache,
    emailClient,
    authConfig,
  );
  const usageMetrics = new UsageMetricsService(
    processId,
    repos.cache,
    repos.game,
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
