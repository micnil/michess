import { Color, GameState } from '@michess/core-models';
import { Chessboard } from '@michess/core-state';
import { IChessGame } from './model/IChessGame';

export const ChessGame = (gameState: GameState): IChessGame => {
  const chessboard = Chessboard(gameState);

  return {
    ...chessboard,
    getState: () => gameState,
    setOrientation: (orientation: Color) =>
      ChessGame({
        ...gameState,
        ...chessboard.setOrientation(orientation).getState(),
      }),
  };
};
