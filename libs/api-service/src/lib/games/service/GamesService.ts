import { CreateGameV1, GameDetailsV1 } from '@michess/api-schema';
import { ChessPosition, FenParser } from '@michess/core-board';
import { ChessGame } from '@michess/core-game';
import { GameRepository } from '@michess/infra-db';

export class GamesService {
  constructor(private gameRepository: GameRepository) {}

  async createGame(data: CreateGameV1): Promise<GameDetailsV1> {
    const initialPosition = ChessPosition.standardInitial();
    const game = ChessGame.fromChessPosition(initialPosition);
    const state = game.getState();
    const createdGame = await this.gameRepository.createGame({
      variant: 'standard',
    });

    return {
      variant: createdGame.variant ?? 'standard',
      id: createdGame.gameId,
      isPrivate: data.isPrivate ?? false,
      initialPosition: FenParser.toFenStr(state.initialPosition),
      players: {
        black: undefined,
        white: undefined,
      },
      moves: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
