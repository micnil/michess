import { AuthService } from './AuthService';
import { GameService } from './GameService';
import { authClient } from './infra/authClient';
import { restClient } from './infra/restClient';

export const api = {
  games: new GameService(restClient),
  auth: new AuthService(authClient),
};
