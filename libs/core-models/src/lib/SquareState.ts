import { Coordinate } from './Coordinate';
import { Piece } from './Piece';

export type SquareState = {
  coord: Coordinate;
  piece?: Piece;
};
