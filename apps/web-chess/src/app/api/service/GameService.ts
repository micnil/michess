import {
  CreateGameV1,
  GameActionOptionV1,
  GameDetailsV1,
  LobbyPageResponseV1,
  MoveMadeV1,
  PlayerGameInfoPageResponseV1,
} from '@michess/api-schema';
import { Maybe, Observable } from '@michess/common-utils';
import { Move } from '@michess/core-board';
import { RestClient } from '../infra/RestClient';
import { SocketClient } from '../infra/SocketClient';
import { CreateGameInput } from '../model/CreateGameInput';
import { GameViewModel } from '../model/GameViewModel';
import { PlayerGameViewModel } from '../model/PlayerGameViewModel';
import { AuthService } from './AuthService';

export class GameService {
  constructor(
    private restClient: RestClient,
    private socketClient: SocketClient,
    private auth: AuthService,
  ) {}

  toGameViewModel(gameDetails: GameDetailsV1): GameViewModel {
    return {
      status: gameDetails.status,
      moves: gameDetails.moves.map((m) => Move.fromUci(m.uci)),
      result: gameDetails.result,
      startedAt: gameDetails.startedAt,
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
    playerId: Maybe<string>,
  ): PlayerGameViewModel {
    const playerSide =
      gameDetails.players.white?.id === playerId
        ? 'white'
        : gameDetails.players.black?.id === playerId
          ? 'black'
          : 'spectator';
    const gameViewModel = this.toGameViewModel(gameDetails);
    const isGameActive =
      gameDetails.status === 'IN_PROGRESS' || gameDetails.status === 'READY';
    return {
      playerSide,
      isReadOnly: !isGameActive || playerSide === 'spectator',
      actionOptions: gameDetails.actionOptions.filter(
        (option) => !option.availableTo || option.availableTo === playerSide,
      ),
      ...gameViewModel,
    };
  }

  async createGame(createGameIn: CreateGameInput): Promise<GameDetailsV1> {
    const createGameV1: CreateGameV1 = {
      variant: 'standard',
      isPrivate: !createGameIn.public,
      timeControl: !!createGameIn.realtime
        ? {
            type: 'realtime',
            initialSec: createGameIn.realtime.initialSec,
            incrementSec: createGameIn.realtime.incrementSec,
          }
        : createGameIn.correspondence
          ? {
              type: 'correspondence',
              daysPerMove: createGameIn.correspondence.daysPerMove,
            }
          : undefined,
    };

    const response = await this.restClient
      .post<GameDetailsV1>('games', {
        json: createGameV1,
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

  async getMyGames(args: { page: number; status: 'ENDED' | 'IN_PROGRESS' }) {
    const queryParams = new URLSearchParams({
      page: args.page.toString(),
      status: args.status,
    });
    const response = await this.restClient
      .get<PlayerGameInfoPageResponseV1>(`games/my`, {
        searchParams: queryParams,
      })
      .json();
    return response;
  }

  async joinGame(
    gameId: string,
    side?: 'white' | 'black' | 'spectator',
  ): Promise<PlayerGameViewModel> {
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
        authState?.session.userId,
      );
    }
  }

  leaveGame(gameId: string): void {
    this.socketClient
      .emitWithAck('leave-game', {
        gameId,
      })
      .catch((error) => {
        console.error('Failed to leave game', error);
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

  async makeAction(gameId: string, actionOption: GameActionOptionV1) {
    const authState = await this.auth.getSession();
    const response = await this.socketClient.emitWithAck('make-action', {
      gameId,
      action: { type: actionOption.type },
    });
    if (response.status === 'error') {
      throw new Error(response.error.message, { cause: response.error });
    } else {
      return this.toParticipantGameViewModel(
        response.data,
        authState?.session.userId,
      );
    }
  }

  observeGameState(
    gameId: string,
    playerId?: Maybe<string>,
  ): Observable<PlayerGameViewModel> {
    return {
      subscribe: (callback: (gameViewModel: PlayerGameViewModel) => void) => {
        const handleGameDetails = (gameDetails: GameDetailsV1) => {
          if (gameDetails.id === gameId) {
            callback(this.toParticipantGameViewModel(gameDetails, playerId));
          }
        };

        this.socketClient.on('game-updated', handleGameDetails);
        return () => {
          this.socketClient.off('game-updated', handleGameDetails);
        };
      },
    };
  }

  observeMovesForGame(gameId: string): Observable<Move> {
    return {
      subscribe: (callback: (move: Move) => void) => {
        const handleMove = (movePayload: MoveMadeV1) => {
          if (movePayload.gameId === gameId) {
            try {
              const move = Move.fromUci(movePayload.uci);
              callback(move);
            } catch (error) {
              console.error(
                'Failed to parse move from UCI:',
                error,
                movePayload,
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
