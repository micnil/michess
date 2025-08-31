import {
  CastlingAbility,
  Coordinate,
  Move,
  Piece,
  PiecePlacements,
} from '@michess/core-models';
import { ZobristHash } from '@michess/core-state';

export type GameStateHistoryItem = {
  move: Move;
  positionHash: ZobristHash;
  pieces: PiecePlacements;
  ply: number;
  castlingAbility: Set<CastlingAbility>;
  enPassant?: Coordinate;
};
