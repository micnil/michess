import { Coordinate } from '../common/Coordinate';
import { PieceType } from '../common/PieceType';
import { CastlingRight } from '../position/model/CastlingRight';

export type MoveOption = {
  start: number;
  target: number;
  capture: boolean;
  enPassant?: boolean;
  castling?: CastlingRight;
  promotion?: PieceType;
};

export const MoveOption = {
  toUci(move: MoveOption): string {
    const fromSquare = Coordinate.fromIndex(move.start);
    const toSquare = Coordinate.fromIndex(move.target);

    return move.promotion
      ? `${fromSquare}${toSquare}${move.promotion[0]}`
      : `${fromSquare}${toSquare}`;
  },
};
