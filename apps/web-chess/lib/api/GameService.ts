import { GameDetailsV1 } from '@michess/api-schema';
import { KyInstance } from 'ky';

export class GameService {
  constructor(private restClient: KyInstance) {}

  async createGame(isPrivate: boolean): Promise<GameDetailsV1> {
    const response = await this.restClient
      .post<GameDetailsV1>('games', {
        json: {
          isPrivate,
        },
      })
      .json();
    return response;
  }
}
