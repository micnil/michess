import { Coordinate } from './Coordinate';
import { Piece } from './Piece';

export type PiecePlacements = Partial<Record<Coordinate, Piece>>;
