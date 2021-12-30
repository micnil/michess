import { Coordinate } from '..';
import { PiecePlacements } from './PiecePlacements';
import { CastlingAbility } from './CastlingSide';
import { Color } from './Color';

export type BoardState = {
  squares: PiecePlacements;
  orientation: Color;
  enPassant?: Coordinate;
  turn: Color;
  castlingAbility: Set<CastlingAbility>;
};
