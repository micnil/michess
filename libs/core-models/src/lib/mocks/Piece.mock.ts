import { Color, createPiece, PieceType } from '@michess/core-models';

export const K = createPiece(PieceType.King, Color.White);
export const Q = createPiece(PieceType.Queen, Color.White);
export const R = createPiece(PieceType.Rook, Color.White);
export const B = createPiece(PieceType.Bishop, Color.White);
export const N = createPiece(PieceType.Knight, Color.White);
export const P = createPiece(PieceType.Pawn, Color.White);

export const k = createPiece(PieceType.King, Color.Black);
export const q = createPiece(PieceType.Queen, Color.Black);
export const r = createPiece(PieceType.Rook, Color.Black);
export const b = createPiece(PieceType.Bishop, Color.Black);
export const n = createPiece(PieceType.Knight, Color.Black);
export const p = createPiece(PieceType.Pawn, Color.Black);
