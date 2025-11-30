import { AuthClient } from './infra/AuthClient';
import { RestClient } from './infra/RestClient';
import { SocketClient } from './infra/SocketClient';
import { AuthService } from './service/AuthService';
import { BotService } from './service/BotService';
import { GameService } from './service/GameService';
import { MetricsService } from './service/MetricsService';

export type Api = {
  games: GameService;
  auth: AuthService;
  metrics: MetricsService;
  bots: BotService;
};

export const Api = {
  create(
    restClient: RestClient,
    authClient: AuthClient,
    socketClient: SocketClient,
  ): Api {
    const auth = new AuthService(authClient, socketClient);
    const games = new GameService(restClient, socketClient, auth);
    const metrics = new MetricsService(restClient, socketClient);
    const bots = new BotService(restClient);
    return {
      games,
      auth,
      metrics,
      bots,
    };
  },
};
