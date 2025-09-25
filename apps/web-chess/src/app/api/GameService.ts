import {
  GameDetailsV1,
  LobbyPageResponseV1,
  MakeMovePayloadV1,
} from '@michess/api-schema';
import { Maybe, Observable } from '@michess/common-utils';
import { Move } from '@michess/core-board';
import { AuthService } from './AuthService';
import { RestClient } from './infra/RestClient';
import { SocketClient } from './infra/SocketClient';
import { GameViewModel } from './model/GameViewModel';
import { ParticipantGameViewModel } from './model/ParticipantGameViewModel';

export class GameService {
  constructor(
    private restClient: RestClient,
    private socketClient: SocketClient,
    private auth: AuthService
  ) {}

  toGameViewModel(gameDetails: GameDetailsV1): GameViewModel {
    return {
      moves: gameDetails.moves.map((m) => Move.fromUci(m.uci)),
      players: {
        white: gameDetails.players.white
          ? {
              username: gameDetails.players.white.name,
              avatar: undefined,
            }
          : undefined,
        black: gameDetails.players.black
          ? {
              username: gameDetails.players.black.name,
              avatar: undefined,
            }
          : undefined,
      },
    };
  }

  toParticipantGameViewModel(
    gameDetails: GameDetailsV1,
    playerId: Maybe<string>
  ): ParticipantGameViewModel {
    // Perhaps move to backend.
    const playerSide =
      gameDetails.players.white?.id === playerId
        ? 'white'
        : gameDetails.players.black?.id === playerId
        ? 'black'
        : 'spectator';
    return {
      playerSide,
      ...this.toGameViewModel(gameDetails),
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

  async getLobbyGames(page: number) {
    const queryParams = new URLSearchParams({
      page: page.toString(),
    });
    const response = await this.restClient
      .get<LobbyPageResponseV1>(`games/lobby`, { searchParams: queryParams })
      .json();
    return response;
  }

  async joinGame(
    gameId: string,
    side?: 'white' | 'black' | 'spectator'
  ): Promise<ParticipantGameViewModel> {
    const authState = await this.auth.getSession();
    const response = await this.socketClient.emitWithAck('join-game', {
      gameId,
      side,
    });
    if (response.status === 'error') {
      throw new Error(response.error.message, { cause: response.error });
    } else {
      return this.toParticipantGameViewModel(
        response.data,
        authState?.session.userId
      );
    }
  }

  leaveGame(gameId: string): void {
    this.socketClient.emit('leave-game', {
      gameId,
    });
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

  async observeGameState(
    gameId: string
  ): Promise<Observable<ParticipantGameViewModel>> {
    const session = await this.auth.getSession();
    return {
      subscribe: (
        callback: (gameViewModel: ParticipantGameViewModel) => void
      ) => {
        const handleGameDetails = (gameDetails: GameDetailsV1) => {
          if (gameDetails.id === gameId) {
            callback(
              this.toParticipantGameViewModel(
                gameDetails,
                session?.session.userId
              )
            );
          }
        };

        this.socketClient.on('user-left', handleGameDetails);
        this.socketClient.on('user-joined', handleGameDetails);

        // Return unsubscribe function
        return () => {
          this.socketClient.off('user-left', handleGameDetails);
          this.socketClient.off('user-joined', handleGameDetails);
        };
      },
    };
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
