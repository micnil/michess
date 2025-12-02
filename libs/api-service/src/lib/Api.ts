import { Repositories } from '@michess/infra-db';
import { EmailClient } from '@michess/infra-email';
import { randomUUID } from 'crypto';
import { Sql } from 'postgres';
import { AuthConfig } from './auth/model/AuthConfig';
import { AuthService } from './auth/service/AuthService';
import { GameJobSchedulerService } from './games/service/GameJobSchedulerService';
import { GameplayService } from './games/service/GameplayService';
import { GamesService } from './games/service/GamesService';
import { LlmConfig } from './llm/config/LlmConfig';
import { LockService } from './lock/service/LockService';
import { MatchmakingService } from './matchmaking/service/MatchmakingService';
import { UsageMetricsService } from './metrics/UsageMetricsService';
import { BotService } from './user/service/BotService';
import { RatingsService } from './user/service/RatingsService';

export type Api = {
  games: GamesService;
  gameplay: GameplayService;
  auth: AuthService;
  usageMetrics: UsageMetricsService;
  gameJobScheduler: GameJobSchedulerService;
  bots: BotService;
  matchmaking: MatchmakingService;
};

const from = (
  repos: Repositories,
  sql: Sql,
  emailClient: EmailClient,
  authConfig: AuthConfig,
  llmConfig: LlmConfig,
): Api => {
  const processId = randomUUID();
  const lockService = new LockService(repos.cache.client);
  const ratingsService = new RatingsService(
    repos.rating,
    repos.game,
    repos.cache,
    lockService,
  );
  const gameJobSchedulerService = new GameJobSchedulerService(
    repos.game,
    repos.cache,
  );
  const gameplayService = new GameplayService(
    repos.game,
    repos.move,
    repos.action,
    repos.cache,
    ratingsService,
    lockService,
  );
  const gamesService = new GamesService(
    repos.game,
    repos.user,
    gameplayService,
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
  const botService = new BotService(
    repos.user,
    repos.game,
    gameplayService,
    repos.cache,
    llmConfig,
  );
  const matchmakingService = new MatchmakingService(
    repos.cache.client,
    gamesService,
    ratingsService,
    lockService,
    repos.matchmaking,
  );

  return {
    games: gamesService,
    gameplay: gameplayService,
    auth: authService,
    usageMetrics,
    gameJobScheduler: gameJobSchedulerService,
    bots: botService,
    matchmaking: matchmakingService,
  };
};
export const Api = {
  from,
};
