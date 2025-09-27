import { AuthClient } from './infra/AuthClient';
import { RestClient } from './infra/RestClient';
import { SocketClient } from './infra/SocketClient';
import { AuthService } from './service/AuthService';
import { GameService } from './service/GameService';
import { MetricsService } from './service/MetricsService';

export type Api = {
  games: GameService;
  auth: AuthService;
  metrics: MetricsService;
};

export const Api = {
  create(
    restClient: RestClient,
    authClient: AuthClient,
    socketClient: SocketClient
  ): Api {
    const auth = new AuthService(authClient, socketClient);
    const games = new GameService(restClient, socketClient, auth);
    const metrics = new MetricsService(restClient, socketClient);
    return {
      games,
      auth,
      metrics,
    };
  },
};
