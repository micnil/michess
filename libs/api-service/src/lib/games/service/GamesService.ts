import { CreateGameV1, GameDetailsV1 } from '@michess/api-schema';
import { ChessPosition, FenParser } from '@michess/core-board';
import { ChessGame } from '@michess/core-game';

export class GamesService {
  createGame(data: CreateGameV1): GameDetailsV1 {
    const initialPosition = ChessPosition.standardInitial();
    const game = ChessGame.fromChessPosition(initialPosition);
    const state = game.getState();

    return {
      variant: 'standard',
      id: '',
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
