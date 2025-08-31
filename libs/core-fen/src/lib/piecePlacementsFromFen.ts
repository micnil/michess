import {
  PiecePlacements,
  Coordinate,
  Piece,
  PieceType,
} from '@michess/core-models';
import { coordIterator } from './util/coordIterator';
import { parseFenParts } from './parseFenParts';
import { FenPiecePlacementPart, FenStr } from './types/FenStr';
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
    piece: Piece.from(pieceType, color),
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
    return new Map(piecePlacements.map((p) => [p.coord, p.piece]));
  } else {
    throw new FenValidationError('SquaresMissing');
  }
};

export const piecePlacementsFromFen = (fen: FenStr): PiecePlacements => {
  const fenParts = parseFenParts(fen);

  return piecePlacementsFromFenPiecePlacement(fenParts.piecePlacement);
};
