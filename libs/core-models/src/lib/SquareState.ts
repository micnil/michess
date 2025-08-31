import { Coordinate } from './Coordinate';
import { Piece } from './common/Piece';

export type SquareState = {
  coord: Coordinate;
  piece?: Piece;
};
