import { Color, GameState } from '@michess/core-models';
import { ChessBitboard, Chessboard, IChessboard } from '@michess/core-state';

export type MoveGeneratorContext = {
  board: IChessboard;
  bitboards: ChessBitboard;
  isTurn(color: Color): boolean;
};

const from = (gameState: GameState): MoveGeneratorContext => {
  const chessbitboards = ChessBitboard(gameState.pieces);
  const board = Chessboard(gameState);
  return {
    board,
    bitboards: chessbitboards,
    isTurn: (color) => gameState.turn === color,
  };
};
export const MoveGeneratorContext = {
  from,
};
