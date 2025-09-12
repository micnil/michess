import { KyInstance } from 'ky';

export class GameService {
  constructor(private restClient: KyInstance) {}

  async createGame(isPrivate: boolean) {
    const response = await this.restClient
      .post('games', {
        json: {
          isPrivate,
        },
      })
      .json();
    return response;
  }
}
