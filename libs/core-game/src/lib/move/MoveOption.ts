import {
  CastlingRight,
  Coordinate,
  MoveRecord,
  PieceType,
} from '@michess/core-board';

export type MoveOption = {
  start: number;
  target: number;
  capture: boolean;
  enPassant?: boolean;
  castling?: CastlingRight;
  promotion?: PieceType;
};

export const MoveOption = {
  toMove: (move: MoveOption): MoveRecord => ({
    from: Coordinate.fromIndex(move.start),
    to: Coordinate.fromIndex(move.target),
    promotion: move.promotion,
  }),
  toUci(move: MoveOption): string {
    const fromSquare = Coordinate.fromIndex(move.start);
    const toSquare = Coordinate.fromIndex(move.target);

    return move.promotion
      ? `${fromSquare}${toSquare}${move.promotion[0]}`
      : `${fromSquare}${toSquare}`;
  },
};
