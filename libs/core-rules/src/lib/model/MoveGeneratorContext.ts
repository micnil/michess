import { Color, Coordinate, GameState } from '@michess/core-models';
import { ChessBitboard, Chessboard, IChessboard } from '@michess/core-state';

export type MoveGeneratorContext = {
  board: IChessboard;
  bitboards: ChessBitboard;
  isTurn(color: Color): boolean;
  enPassantCoord?: Coordinate;
};

const from = (gameState: GameState): MoveGeneratorContext => {
  const chessbitboards = ChessBitboard(gameState.pieces);
  const board = Chessboard(gameState);
  return {
    board,
    bitboards: chessbitboards,
    enPassantCoord: gameState.enPassant,
    isTurn: (color) => gameState.turn === color,
  };
};
export const MoveGeneratorContext = {
  from,
};
