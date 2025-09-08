import {
  CastlingAbility,
  Coordinate,
  MoveOption,
  PiecePlacements,
} from '@michess/core-board';
import { ZobristHash } from '../ZobristHash';

export type GameStateHistoryItem = {
  move: MoveOption;
  positionHash: ZobristHash;
  pieces: PiecePlacements;
  ply: number;
  castlingAbility: Set<CastlingAbility>;
  enPassant?: Coordinate;
};
