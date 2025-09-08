import {
  CastlingAbility,
  Coordinate,
  Move,
  PiecePlacements,
} from '@michess/core-board';
import { ZobristHash } from '../ZobristHash';

export type GameStateHistoryItem = {
  move: Move;
  positionHash: ZobristHash;
  pieces: PiecePlacements;
  ply: number;
  castlingAbility: Set<CastlingAbility>;
  enPassant?: Coordinate;
};
