import { Coordinate } from './common/Coordinate';
import { Piece } from './common/Piece';

export type SquareState = {
  coord: Coordinate;
  piece?: Piece;
};
