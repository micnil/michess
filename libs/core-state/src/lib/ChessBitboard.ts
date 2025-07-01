import { Maybe } from '@michess/common-utils';
import {
  Color,
  Coordinate,
  Piece,
  PiecePlacements,
  PieceType,
} from '@michess/core-models';
import { Bitboard } from './Bitboard';

export type ChessBitboard = {
  white: {
    [piece in PieceType]: Bitboard;
  };
  black: {
    [piece in PieceType]: Bitboard;
  };
  whiteOccupied: Bitboard;
  blackOccupied: Bitboard;
  occupied: Bitboard;
  empty: Bitboard;
  getPieceAt: (coord: Coordinate) => Maybe<Piece>;
};

export function ChessBitboard(placements?: PiecePlacements): ChessBitboard {
  const colors: Color[] = ['white', 'black'];
  const pieces: PieceType[] = ['p', 'n', 'b', 'r', 'q', 'k'];

  const bitboards = {
    white: {
      p: Bitboard(),
      n: Bitboard(),
      b: Bitboard(),
      r: Bitboard(),
      q: Bitboard(),
      k: Bitboard(),
    },
    black: {
      p: Bitboard(),
      n: Bitboard(),
      b: Bitboard(),
      r: Bitboard(),
      q: Bitboard(),
      k: Bitboard(),
    },
  };

  // If placements are provided, set the bits accordingly
  if (placements) {
    for (const [coord, piece] of Object.entries(placements)) {
      const { color, type } = piece;
      bitboards[color][type] = bitboards[color][type].setCoord(
        coord as Coordinate
      );
    }
  }

  const whiteOccupied = Object.values(bitboards.white).reduce(
    (acc, bb) => acc.union(bb),
    Bitboard()
  );
  const blackOccupied = Object.values(bitboards.black).reduce(
    (acc, bb) => acc.union(bb),
    Bitboard()
  );
  const occupiedBoard = whiteOccupied.union(blackOccupied);
  const empty = occupiedBoard.invert();

  return {
    ...bitboards,
    occupied: occupiedBoard,
    whiteOccupied,
    blackOccupied,
    empty,
    getPieceAt: (coord: Coordinate): Maybe<Piece> => {
      for (const color of colors) {
        for (const pieceType of pieces) {
          if (bitboards[color][pieceType].isCoordSet(coord)) {
            return { color, type: pieceType };
          }
        }
      }
      return undefined;
    },
  };
}
