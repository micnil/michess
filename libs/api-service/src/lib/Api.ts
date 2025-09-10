import { Repositories } from '@michess/infra-db';
import { Sql } from 'postgres';
import { AuthService } from './auth/service/AuthService';
import { GamesService } from './games/service/GamesService';

export type Api = {
  games: GamesService;
  auth: AuthService;
};

const from = (repos: Repositories, sql: Sql): Api => {
  const gamesService = new GamesService(repos.game, repos.move);
  const authService = new AuthService(sql, repos.cache);

  return {
    games: gamesService,
    auth: authService,
  };
};
export const Api = {
  from,
};
