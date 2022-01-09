import { Color, GameState } from '@michess/core-models';
import { Chessboard } from '@michess/core-state';
import { IRules } from './model/IRules';

export const Rules = (gameState: GameState): IRules => {
  return {
    board: Chessboard(gameState),
    isTurn: (color: Color) => gameState.turn === color
  };
};
