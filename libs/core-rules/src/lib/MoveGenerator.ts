import { GameState } from '@michess/core-models';
import { ChessBitboard, Chessboard } from '@michess/core-state';
import { generateMoves } from './generateMoves';
import { Move } from './model/Move';

export type MoveGenerator = {
  generateMoves: () => { moves: Move[] };
};

export const MoveGenerator = (gameState: GameState): MoveGenerator => {
  const chessbitboards = ChessBitboard(gameState.pieces);
  const board = Chessboard(gameState);
  return {
    generateMoves: () => ({
      moves: generateMoves({
        bitboards: chessbitboards,
        board,
        isTurn: (color) => gameState.turn === color,
      }),
    }),
  };
};
