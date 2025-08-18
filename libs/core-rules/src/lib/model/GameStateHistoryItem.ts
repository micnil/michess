import { CastlingAbility, Coordinate, Move, Piece } from '@michess/core-models';
import { ZobristHash } from '@michess/core-state';

export type GameStateHistoryItem = {
  move: Move;
  positionHash: ZobristHash;
  ply: number;
  castlingAbility: Set<CastlingAbility>;
  enPassant?: Coordinate;
  capture?: Piece;
};
