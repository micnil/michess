import { BoardState } from './BoardState';
import { CastlingAbility } from './CastlingSide';
import { Color } from './Color';
import { Coordinate } from './Coordinate';

export type GameState = BoardState & {
  enPassant?: Coordinate;
  turn: Color;
  castlingAbility: Set<CastlingAbility>;
};
