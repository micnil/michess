import { Coordinate } from './Coordinate';
import { Piece } from './Piece';

export type BoardSquares = Partial<Record<Coordinate, Piece>>;
