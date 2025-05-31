import { Maybe } from '@michess/common-utils';
import {
  Color,
  Coordinate,
  Piece,
  PiecePlacements,
  PieceType,
} from '@michess/core-models';
import { Bitboard } from './Bitboard';

/**
 * ChessBitboard represents the board state using bitboards for each piece type and color.
 * For example, white pawns, black knights, etc.
 */
export type ChessBitboard = {
  bitboards: {
    [color in Color]: {
      [piece in PieceType]: Bitboard;
    };
  };
  occupied: Bitboard;
  empty: Bitboard;
  getPieceAt: (coord: Coordinate) => Maybe<Piece>;
};

export function ChessBitboard(placements?: PiecePlacements): ChessBitboard {
  const colors: Color[] = ['white', 'black'];
  const pieces: PieceType[] = ['p', 'n', 'b', 'r', 'q', 'k'];
  // Initialize empty bitboards
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
    for (const coord in placements) {
      const piece = placements[coord as keyof PiecePlacements];
      if (piece) {
        const { color, type } = piece;
        bitboards[color][type] = bitboards[color][type].setCoord(
          coord as Coordinate
        );
      }
    }
  }

  // Calculate occupied and empty bitboards
  let occupiedBoard = Bitboard();
  for (const color of colors) {
    for (const pieceType of pieces) {
      occupiedBoard = occupiedBoard.union(bitboards[color][pieceType]);
    }
  }
  const occupied = occupiedBoard;
  const empty = occupied.invert();

  return {
    bitboards,
    occupied,
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
