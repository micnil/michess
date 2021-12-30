import { Maybe } from '@michess/common-utils';
import {
  PiecePlacements,
  BoardState,
  CastlingAbility,
  Color,
  Coordinate,
  createPiece,
  Piece,
  PieceType,
} from '@michess/core-models';
import { coordIterator } from './coordIterator';
import { parseFenParts } from './parseFenParts';
import {
  FenCastlingAbilityPart,
  FenEnPassantTargetSquarePart,
  FenPiecePlacementPart,
  FenSideToMovePart,
  FenStr,
} from './types/Fen';
import { FenValidationError } from './types/FenValidationError';

type PiecePlacement = {
  coord: Coordinate;
  piece: Piece;
};
const charToPieceType = (char: string): PieceType => {
  return char.toLowerCase() as PieceType;
};

const pieceSquareFromLetter = (
  char: string,
  coord: Coordinate
): PiecePlacement => {
  const pieceType = charToPieceType(char);
  const color = char === char.toLowerCase() ? 'black' : 'white';
  return {
    piece: createPiece(pieceType, color),
    coord,
  };
};

const piecePlacementsFromFenPiecePlacement = (
  piecePlacementPart: FenPiecePlacementPart
): PiecePlacements => {
  const coordIter = coordIterator();
  const piecePlacements = piecePlacementPart
    .replace(/\//g, '') // remove forward slashed
    .split('')
    .flatMap((fenChar): PiecePlacement[] => {
      const fenInteger = parseInt(fenChar);
      if (Number.isInteger(fenInteger)) {
        coordIter.next(fenInteger);
        return [];
      } else {
        const piecePlacement = [
          pieceSquareFromLetter(fenChar, coordIter.get()),
        ];
        coordIter.next(1);
        return piecePlacement;
      }
    });

  if (coordIter.isFinished()) {
    return piecePlacements.reduce(
      (acc, curr) => ({ ...acc, [curr.coord]: curr.piece }),
      {} as PiecePlacements
    );
  } else {
    throw new FenValidationError('SquaresMissing');
  }
};

const sideToMoveToColor = (sideToMove: FenSideToMovePart): Color => {
  return sideToMove === 'w' ? 'white' : 'black';
};

const charToCastlingAbility = (char: string): CastlingAbility => {
  switch (char) {
    case 'k':
      return CastlingAbility.BlackKing;
    case 'q':
      return CastlingAbility.BlackQueen;
    case 'Q':
      return CastlingAbility.WhiteQueen;
    case 'K':
      return CastlingAbility.WhiteKing;
    default:
      throw new FenValidationError('FenCastlingAbilityPart');
  }
};

const castlingAbilityFromFen = (
  fenCastlingAbility: FenCastlingAbilityPart
): Set<CastlingAbility> => {
  if (fenCastlingAbility === '-') {
    return new Set();
  } else {
    const list: CastlingAbility[] = [...fenCastlingAbility].map(
      charToCastlingAbility
    );
    return new Set(list);
  }
};

const enPassantCoordinateFromFenStr = (
  fenEnPassantTargetSquare: FenEnPassantTargetSquarePart
): Maybe<Coordinate> => {
  if (fenEnPassantTargetSquare === '-') {
    return undefined;
  } else {
    return fenEnPassantTargetSquare as Coordinate;
  }
};

export const boardStateFromFen = (fen: FenStr): BoardState => {
  const fenParts = parseFenParts(fen);

  return {
    squares: piecePlacementsFromFenPiecePlacement(fenParts.piecePlacement),
    orientation: 'white',
    enPassant: enPassantCoordinateFromFenStr(fenParts.enPassantTargetSquare),
    turn: sideToMoveToColor(fenParts.sideToMove),
    castlingAbility: castlingAbilityFromFen(fenParts.castlingAbility),
  };
};
