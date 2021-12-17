import { Color, createPiece, PieceType, SquareState } from "@michess/core-models";

export const empty: SquareState = { isEmpty: true };
export const K: SquareState = {
  isEmpty: false,
  piece: createPiece(PieceType.King, Color.White)
};
export const Q: SquareState = {
  isEmpty: false,
  piece: createPiece(PieceType.Queen, Color.White)
};
export const R: SquareState = {
  isEmpty: false,
  piece: createPiece(PieceType.Rook, Color.White)
};
export const B: SquareState = {
  isEmpty: false,
  piece: createPiece(PieceType.Bishop, Color.White)
};
export const N: SquareState = {
  isEmpty: false,
  piece: createPiece(PieceType.Knight, Color.White)
};
export const P: SquareState = {
  isEmpty: false,
  piece: createPiece(PieceType.Pawn, Color.White)
};

export const k: SquareState = {
  isEmpty: false,
  piece: createPiece(PieceType.King, Color.Black)
};
export const q: SquareState = {
  isEmpty: false,
  piece: createPiece(PieceType.Queen, Color.Black)
};
export const r: SquareState = {
  isEmpty: false,
  piece: createPiece(PieceType.Rook, Color.Black)
};
export const b: SquareState = {
  isEmpty: false,
  piece: createPiece(PieceType.Bishop, Color.Black)
};
export const n: SquareState = {
  isEmpty: false,
  piece: createPiece(PieceType.Knight, Color.Black)
};
export const p: SquareState = {
  isEmpty: false,
  piece: createPiece(PieceType.Pawn, Color.Black)
};
