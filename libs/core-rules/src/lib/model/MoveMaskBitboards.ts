import { Bitboard } from '@michess/core-state';

export type MoveMaskBitboards = {
  attacks: Bitboard;
  /**
   * If king is in check by a sliding piece it can not move
   * in the sliding direction. This is like the attacks bitboard
   * but with the king removed to avoid walking in the sliding direction.
   */
  kingXRayAttacks: Bitboard;
  pinnedPieces: Bitboard;
  kingAttackers: Bitboard;
  checkBlockPaths: Bitboard;
  captureMask: Bitboard;
};
