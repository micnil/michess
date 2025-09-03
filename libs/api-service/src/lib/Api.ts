import { GamesService } from './games/service/GamesService';
import { Repositories } from '@michess/infra-db';

export type Api = {
  games: GamesService;
};

const from = (repos: Repositories): Api => {
  const gamesService = new GamesService(repos.game);

  return {
    games: gamesService,
  };
};
export const Api = {
  from,
};
