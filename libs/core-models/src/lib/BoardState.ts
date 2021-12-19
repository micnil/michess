import { Coordinate } from '..';
import { BoardSquares } from './BoardSquares';
import { CastlingAbility } from './CastlingSide';
import { Color } from './Color';

export type BoardState = {
  squares: BoardSquares;
  orientation: Color;
  enPassant?: Coordinate;
  turn: Color;
  castlingAbility: Set<CastlingAbility>;
};
