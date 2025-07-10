import { CastlingRight, type PieceType } from '@michess/core-models';

export type Move = {
  start: number;
  target: number;
  capture: boolean;
  // enPassant?: boolean;
  castling?: CastlingRight;
  promotion?: PieceType;
};
