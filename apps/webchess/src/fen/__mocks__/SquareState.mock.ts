import { Color } from '../../app/Color';
import { PieceType } from '../../app/PieceType';
import { SquareState } from '../../util/chessboard-state';

export const empty: SquareState = { isEmpty: true };
export const K: SquareState = {
  isEmpty: false,
  piece: PieceType.King,
  color: Color.White,
};
export const Q: SquareState = {
  isEmpty: false,
  piece: PieceType.Queen,
  color: Color.White,
};
export const R: SquareState = {
  isEmpty: false,
  piece: PieceType.Rook,
  color: Color.White,
};
export const B: SquareState = {
  isEmpty: false,
  piece: PieceType.Bishop,
  color: Color.White,
};
export const N: SquareState = {
  isEmpty: false,
  piece: PieceType.Knight,
  color: Color.White,
};
export const P: SquareState = {
  isEmpty: false,
  piece: PieceType.Pawn,
  color: Color.White,
};

export const k: SquareState = {
  isEmpty: false,
  piece: PieceType.King,
  color: Color.Black,
};
export const q: SquareState = {
  isEmpty: false,
  piece: PieceType.Queen,
  color: Color.Black,
};
export const r: SquareState = {
  isEmpty: false,
  piece: PieceType.Rook,
  color: Color.Black,
};
export const b: SquareState = {
  isEmpty: false,
  piece: PieceType.Bishop,
  color: Color.Black,
};
export const n: SquareState = {
  isEmpty: false,
  piece: PieceType.Knight,
  color: Color.Black,
};
export const p: SquareState = {
  isEmpty: false,
  piece: PieceType.Pawn,
  color: Color.Black,
};
