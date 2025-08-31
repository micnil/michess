import { Color } from './Color';
import { PieceType } from './PieceType';

export type Piece = {
  type: PieceType;
  color: Color;
};

const from = (type: PieceType, color: Color): Piece => {
  return {
    type,
    color,
  };
};

const isEqual = (a: Piece | undefined, b?: Piece): boolean => {
  return a?.type === b?.type && a?.color === b?.color;
};

export const Piece = {
  from,
  isEqual,
  Pawn: (color: Color) => from(PieceType.Pawn, color),
  Knight: (color: Color) => from(PieceType.Knight, color),
  Bishop: (color: Color) => from(PieceType.Bishop, color),
  Rook: (color: Color) => from(PieceType.Rook, color),
  Queen: (color: Color) => from(PieceType.Queen, color),
  King: (color: Color) => from(PieceType.King, color),

  PawnBlack: () => from(PieceType.Pawn, Color.Black),
  KnightBlack: () => from(PieceType.Knight, Color.Black),
  BishopBlack: () => from(PieceType.Bishop, Color.Black),
  RookBlack: () => from(PieceType.Rook, Color.Black),
  QueenBlack: () => from(PieceType.Queen, Color.Black),
  KingBlack: () => from(PieceType.King, Color.Black),
  PawnWhite: () => from(PieceType.Pawn, Color.White),
  KnightWhite: () => from(PieceType.Knight, Color.White),
  BishopWhite: () => from(PieceType.Bishop, Color.White),
  RookWhite: () => from(PieceType.Rook, Color.White),
  QueenWhite: () => from(PieceType.Queen, Color.White),
  KingWhite: () => from(PieceType.King, Color.White),
};
