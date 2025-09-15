import { KyInstance } from 'ky';
import { AuthService } from './AuthService';
import { GameService } from './GameService';
import { AuthClient } from './infra/authClient';
import { SocketClient } from './infra/socketClient';

export type Api = {
  games: GameService;
  auth: AuthService;
};

export const Api = {
  create(
    restClient: KyInstance,
    authClient: AuthClient,
    socketClient: SocketClient
  ): Api {
    return {
      games: new GameService(restClient, socketClient),
      auth: new AuthService(authClient, socketClient),
    };
  },
};
