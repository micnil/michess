import { Bitboard } from '@michess/core-state';

export type MoveMaskBitboards = {
  attacks: Bitboard;
  doubleAttacks: Bitboard;
  pinnedPieces: Bitboard;
};
