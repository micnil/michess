import { GameDetailsV1 } from '@michess/api-schema';
import { KyInstance } from 'ky';
import { SocketClient } from './infra/socketClient';

export class GameService {
  constructor(
    private restClient: KyInstance,
    private socketClient: SocketClient
  ) {}

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

  async joinGame(gameId: string, side?: 'white' | 'black' | 'spectator') {
    const response = await this.socketClient.emitWithAck('join-game', {
      gameId,
      side,
    });
    if (response.status === 'error') {
      throw new Error(response.error.message, { cause: response.error });
    } else {
      return response.data;
    }
  }

  async makeMove(gameId: string, uci: string) {
    const response = await this.socketClient.emitWithAck('make-move', {
      gameId,
      uci,
    });
    if (response.status === 'error') {
      throw new Error(response.error.message, { cause: response.error });
    } else {
      return response.data;
    }
  }
}
