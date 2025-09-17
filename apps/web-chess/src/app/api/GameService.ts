import { GameDetailsV1, MakeMovePayloadV1 } from '@michess/api-schema';
import { Observable } from '@michess/common-utils';
import { Move } from '@michess/core-board';
import { RestClient } from './infra/RestClient';
import { SocketClient } from './infra/SocketClient';

export class GameService {
  constructor(
    private restClient: RestClient,
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

  async joinGame(
    gameId: string,
    side?: 'white' | 'black' | 'spectator'
  ): Promise<GameDetailsV1> {
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

  observeMovesForGame(gameId: string): Observable<Move> {
    return {
      subscribe: (callback: (move: Move) => void) => {
        const handleMove = (movePayload: MakeMovePayloadV1) => {
          if (movePayload.gameId === gameId) {
            try {
              const move = Move.fromUci(movePayload.uci);
              callback(move);
            } catch (error) {
              console.error(
                'Failed to parse move from UCI:',
                error,
                movePayload
              );
            }
          }
        };

        this.socketClient.on('move-made', handleMove);

        // Return unsubscribe function
        return () => {
          this.socketClient.off('move-made', handleMove);
        };
      },
    };
  }
}
