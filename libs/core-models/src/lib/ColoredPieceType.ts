import { Piece } from './Piece';
import { PieceType } from './PieceType';

export type ColoredPieceType =
  | 'wk'
  | 'wq'
  | 'wb'
  | 'wn'
  | 'wr'
  | 'wp'
  | 'bk'
  | 'bq'
  | 'bb'
  | 'bn'
  | 'br'
  | 'bp';

const whitePieceFrom = (piece: PieceType): ColoredPieceType => {
  switch (piece) {
    case PieceType.King:
      return 'wk';
    case PieceType.Knight:
      return 'wn';
    case PieceType.Bishop:
      return 'wb';
    case PieceType.Rook:
      return 'wr';
    case PieceType.Queen:
      return 'wq';
    case PieceType.Pawn:
      return 'wp';
  }
};

const blackPieceFrom = (piece: PieceType): ColoredPieceType => {
  switch (piece) {
    case PieceType.King:
      return 'bk';
    case PieceType.Knight:
      return 'bn';
    case PieceType.Bishop:
      return 'bb';
    case PieceType.Rook:
      return 'br';
    case PieceType.Queen:
      return 'bq';
    case PieceType.Pawn:
      return 'bp';
  }
};

export const fromPiece = (piece: Piece): ColoredPieceType => {
  switch (piece.color) {
    case 'black':
      return blackPieceFrom(piece.type);
    case 'white':
      return whitePieceFrom(piece.type);
  }
};

export const ColoredPieceType = {
  fromPiece,
};
