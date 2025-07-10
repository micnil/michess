import { Maybe } from '@michess/common-utils';
import {
  CastlingAbility,
  CastlingRight,
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
  castlingPaths: {
    [color in Color]: {
      [right in CastlingRight]: Bitboard;
    };
  };
  castlingKingPaths: {
    [color in Color]: {
      [right in CastlingRight]: Bitboard;
    };
  };
  whiteOccupied: Bitboard;
  blackOccupied: Bitboard;
  occupied: Bitboard;
  empty: Bitboard;
  getPieceAt: (coord: Coordinate) => Maybe<Piece>;
  getOwnOccupancy: (color: Color) => Bitboard;
  getOpponentOccupancy: (color: Color) => Bitboard;
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

  const castlingKingPaths: { [ability in CastlingAbility]: Bitboard } = {
    [CastlingAbility.WhiteKing]: Bitboard().between('e1', 'g1'),
    [CastlingAbility.WhiteQueen]: Bitboard().between('e1', 'c1'),
    [CastlingAbility.BlackKing]: Bitboard().between('e8', 'g8'),
    [CastlingAbility.BlackQueen]: Bitboard().between('e8', 'c8'),
  };
  const castlingRookPaths: { [ability in CastlingAbility]: Bitboard } = {
    [CastlingAbility.WhiteKing]: Bitboard().between('h1', 'f1'),
    [CastlingAbility.WhiteQueen]: Bitboard().between('a1', 'd1'),
    [CastlingAbility.BlackKing]: Bitboard().between('h8', 'f8'),
    [CastlingAbility.BlackQueen]: Bitboard().between('a8', 'd8'),
  };

  return {
    ...bitboards,
    occupied: occupiedBoard,
    whiteOccupied,
    blackOccupied,
    empty,
    // Castling path for the king can not be in check for castling to be legal
    castlingKingPaths: {
      [Color.White]: {
        [CastlingRight.KingSide]: castlingKingPaths[CastlingAbility.WhiteKing],
        [CastlingRight.QueenSide]:
          castlingKingPaths[CastlingAbility.WhiteQueen],
      },
      [Color.Black]: {
        [CastlingRight.KingSide]: castlingKingPaths[CastlingAbility.BlackKing],
        [CastlingRight.QueenSide]:
          castlingKingPaths[CastlingAbility.BlackQueen],
      },
    },
    // For castling path needs to be unoccipied for castling to be legal
    castlingPaths: {
      [Color.White]: {
        [CastlingRight.KingSide]: castlingRookPaths[
          CastlingAbility.WhiteKing
        ].union(castlingKingPaths[CastlingAbility.WhiteKing]),
        [CastlingRight.QueenSide]: castlingRookPaths[
          CastlingAbility.WhiteQueen
        ].union(castlingKingPaths[CastlingAbility.WhiteQueen]),
      },
      [Color.Black]: {
        [CastlingRight.KingSide]: castlingRookPaths[
          CastlingAbility.BlackKing
        ].union(castlingKingPaths[CastlingAbility.BlackKing]),
        [CastlingRight.QueenSide]: castlingRookPaths[
          CastlingAbility.BlackQueen
        ].union(castlingKingPaths[CastlingAbility.BlackQueen]),
      },
    },
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
    getOwnOccupancy: (color: Color) =>
      color === 'white' ? whiteOccupied : blackOccupied,
    getOpponentOccupancy: (color: Color) =>
      color === 'white' ? blackOccupied : whiteOccupied,
  };
}
