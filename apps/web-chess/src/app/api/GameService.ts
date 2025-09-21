import { GameDetailsV1, MakeMovePayloadV1 } from '@michess/api-schema';
import { Maybe, Observable } from '@michess/common-utils';
import { Move } from '@michess/core-board';
import { AuthService } from './AuthService';
import { RestClient } from './infra/RestClient';
import { SocketClient } from './infra/SocketClient';
import { ParticipantGameDetails } from './model/ParticipantGameDetails';

export class GameService {
  constructor(
    private restClient: RestClient,
    private socketClient: SocketClient,
    private auth: AuthService
  ) {}

  toParticipantGameDetails(
    gameDetails: GameDetailsV1,
    playerId: Maybe<string>
  ): ParticipantGameDetails {
    // Perhaps move to backend.
    const playerSide =
      gameDetails.players.white?.id === playerId
        ? 'white'
        : gameDetails.players.black?.id === playerId
        ? 'black'
        : 'spectator';
    return {
      playerSide,
      moves: gameDetails.moves.map((m) => Move.fromUci(m.uci)),
      blackPlayer: gameDetails.players.black
        ? {
            username: gameDetails.players.black.name,
            avatar: undefined,
          }
        : undefined,
      whitePlayer: gameDetails.players.white
        ? {
            username: gameDetails.players.white.name,
            avatar: undefined,
          }
        : undefined,
    };
  }

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
  ): Promise<ParticipantGameDetails> {
    const authState = await this.auth.getSession();
    const response = await this.socketClient.emitWithAck('join-game', {
      gameId,
      side,
    });
    if (response.status === 'error') {
      throw new Error(response.error.message, { cause: response.error });
    } else {
      return this.toParticipantGameDetails(response.data, authState?.user.id);
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
