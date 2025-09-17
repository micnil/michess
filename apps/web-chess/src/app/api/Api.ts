import { AuthService } from './AuthService';
import { GameService } from './GameService';
import { AuthClient } from './infra/AuthClient';
import { RestClient } from './infra/RestClient';
import { SocketClient } from './infra/SocketClient';

export type Api = {
  games: GameService;
  auth: AuthService;
};

export const Api = {
  create(
    restClient: RestClient,
    authClient: AuthClient,
    socketClient: SocketClient
  ): Api {
    const auth = new AuthService(authClient, socketClient);
    const games = new GameService(restClient, socketClient, auth);
    return {
      games,
      auth,
    };
  },
};
