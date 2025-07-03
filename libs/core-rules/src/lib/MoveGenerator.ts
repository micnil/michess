import { GameState } from '@michess/core-models';
import { generateMoves } from './generateMoves';
import { Move } from './model/Move';
import { MoveGeneratorContext } from './model/MoveGeneratorContext';

export type MoveGenerator = {
  generateMoves: () => { moves: Move[] };
};

export const MoveGenerator = (gameState: GameState): MoveGenerator => {
  return {
    generateMoves: () => ({
      moves: generateMoves(MoveGeneratorContext.from(gameState)),
    }),
  };
};
