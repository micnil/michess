import { Color, GameState } from '@michess/core-models';
import { Chessboard } from './Chessboard';
import { IChessGame } from './model/IChessGame';

export const ChessGame = (board: GameState): IChessGame => {
  const chessboard = Chessboard(board);
  return {
    ...chessboard,
    getState: () => board,
    setOrientation: (orientation: Color) =>
      ChessGame({
        ...board,
        ...chessboard.setOrientation(orientation).getState(),
      }),
  };
};
