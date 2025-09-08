import {
  CastlingAbility,
  Coordinate,
  PiecePlacements,
} from '@michess/core-board';
import { ZobristHash } from '../ZobristHash';
import { MoveOption } from '../move/MoveOption';

export type GameStateHistoryItem = {
  move: MoveOption;
  positionHash: ZobristHash;
  pieces: PiecePlacements;
  ply: number;
  castlingAbility: Set<CastlingAbility>;
  enPassant?: Coordinate;
};
