import { CastlingRight } from './CastlingRight';
import { PieceType } from './PieceType';

export type Move = {
  start: number;
  target: number;
  capture: boolean;
  // enPassant?: boolean;
  castling?: CastlingRight;
  promotion?: PieceType;
};
