import { Color } from './Color';
import { Coordinate } from './Coordinate';
import { Piece } from './Piece';

export type PiecePlacements = Partial<Record<Coordinate, Piece>>;

export const PiecePlacements = {
  startingBoard: {
    a1: Piece.Rook(Color.White),
    b1: Piece.Knight(Color.White),
    c1: Piece.Bishop(Color.White),
    d1: Piece.Queen(Color.White),
    e1: Piece.King(Color.White),
    f1: Piece.Bishop(Color.White),
    g1: Piece.Knight(Color.White),
    h1: Piece.Rook(Color.White),
    a2: Piece.Pawn(Color.White),
    b2: Piece.Pawn(Color.White),
    c2: Piece.Pawn(Color.White),
    d2: Piece.Pawn(Color.White),
    e2: Piece.Pawn(Color.White),
    f2: Piece.Pawn(Color.White),
    g2: Piece.Pawn(Color.White),
    h2: Piece.Pawn(Color.White),

    a8: Piece.Rook(Color.Black),
    b8: Piece.Knight(Color.Black),
    c8: Piece.Bishop(Color.Black),
    d8: Piece.Queen(Color.Black),
    e8: Piece.King(Color.Black),
    f8: Piece.Bishop(Color.Black),
    g8: Piece.Knight(Color.Black),
    h8: Piece.Rook(Color.Black),
    a7: Piece.Pawn(Color.Black),
    b7: Piece.Pawn(Color.Black),
    c7: Piece.Pawn(Color.Black),
    d7: Piece.Pawn(Color.Black),
    e7: Piece.Pawn(Color.Black),
    f7: Piece.Pawn(Color.Black),
    g7: Piece.Pawn(Color.Black),
    h7: Piece.Pawn(Color.Black),
  } satisfies PiecePlacements,
};
