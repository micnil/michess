import { CastlingRight } from './position/model/CastlingRight';
import { PieceType } from './common/PieceType';

export type Move = {
  start: number;
  target: number;
  capture: boolean;
  enPassant?: boolean;
  castling?: CastlingRight;
  promotion?: PieceType;
};
