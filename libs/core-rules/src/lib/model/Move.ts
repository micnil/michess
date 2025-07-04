import type { PieceType } from '@michess/core-models';

export type Move = {
  start: number;
  target: number;
  capture: boolean;
  promotion?: PieceType;
};
