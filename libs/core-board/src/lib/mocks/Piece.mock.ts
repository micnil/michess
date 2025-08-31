import { Piece } from '../common/Piece';
import { PieceType } from '../common/PieceType';

export const K = Piece.from(PieceType.King, 'white');
export const Q = Piece.from(PieceType.Queen, 'white');
export const R = Piece.from(PieceType.Rook, 'white');
export const B = Piece.from(PieceType.Bishop, 'white');
export const N = Piece.from(PieceType.Knight, 'white');
export const P = Piece.from(PieceType.Pawn, 'white');

export const k = Piece.from(PieceType.King, 'black');
export const q = Piece.from(PieceType.Queen, 'black');
export const r = Piece.from(PieceType.Rook, 'black');
export const b = Piece.from(PieceType.Bishop, 'black');
export const n = Piece.from(PieceType.Knight, 'black');
export const p = Piece.from(PieceType.Pawn, 'black');
