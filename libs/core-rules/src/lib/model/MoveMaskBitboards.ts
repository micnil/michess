import { Bitboard } from '@michess/core-state';

export type MoveMaskBitboards = {
  attacks: Bitboard;
  kingDanger: Bitboard;
  doubleAttacks: Bitboard;
  pinnedPieces: Bitboard;
};
