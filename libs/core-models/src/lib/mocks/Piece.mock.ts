import { Color } from '../Color';
import { createPiece } from '../Piece';
import { PieceType } from '../PieceType';

export const K = createPiece(PieceType.King, 'white');
export const Q = createPiece(PieceType.Queen, 'white');
export const R = createPiece(PieceType.Rook, 'white');
export const B = createPiece(PieceType.Bishop, 'white');
export const N = createPiece(PieceType.Knight, 'white');
export const P = createPiece(PieceType.Pawn, 'white');

export const k = createPiece(PieceType.King, 'black');
export const q = createPiece(PieceType.Queen, 'black');
export const r = createPiece(PieceType.Rook, 'black');
export const b = createPiece(PieceType.Bishop, 'black');
export const n = createPiece(PieceType.Knight, 'black');
export const p = createPiece(PieceType.Pawn, 'black');
