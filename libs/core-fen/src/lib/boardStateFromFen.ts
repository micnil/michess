import {
  PiecePlacements,
  BoardState,
  Coordinate,
  createPiece,
  Piece,
  PieceType,
} from '@michess/core-models';
import { coordIterator } from './coordIterator';
import { parseFenParts } from './parseFenParts';
import { FenPiecePlacementPart, FenStr } from './types/Fen';
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

export const boardStateFromFen = (fen: FenStr): BoardState => {
  const fenParts = parseFenParts(fen);

  return {
    pieces: piecePlacementsFromFenPiecePlacement(fenParts.piecePlacement),
    orientation: 'white',
  };
};
