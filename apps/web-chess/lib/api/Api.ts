import { KyInstance } from 'ky';
import { AuthService } from './AuthService';
import { GameService } from './GameService';
import { AuthClient } from './infra/authClient';

export type Api = {
  games: GameService;
  auth: AuthService;
};

export const Api = {
  create(restClient: KyInstance, authClient: AuthClient): Api {
    return {
      games: new GameService(restClient),
      auth: new AuthService(authClient),
    };
  },
};
