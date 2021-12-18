import { BoardSquares } from './BoardSquares';
import { Color } from './Color';

export type BoardState = {
  squares: BoardSquares;
  orientation: Color;
};
