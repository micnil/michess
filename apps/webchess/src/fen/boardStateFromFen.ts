import { BoardSquares, BoardState, Color, createPiece, PieceType, SquareState } from '@michess/core-models';
import { parseFenParts } from './parseFenParts';
import { FenPiecePlacementPart } from './types/Fen';
import { FenValidationError } from './types/FenValidationError';

const charToPieceType = (char: string): PieceType => {
  return char.toLowerCase() as PieceType;
};

const emptySquaresFromNumber = (number: number): SquareState[] => {
  return [...Array(number)].map(() => ({
    isEmpty: true,
  }));
};

const pieceSquareFromLetter = (char: string): SquareState => {
  const pieceType = charToPieceType(char);
  const color = char === char.toLowerCase() ? Color.Black : Color.White;
  return {
    isEmpty: false,
    piece: createPiece(pieceType, color),
  };
};

const fenCharToBoardSquares = (fenChar: string): SquareState[] => {
  if (Number.isInteger(parseInt(fenChar))) {
    return emptySquaresFromNumber(parseInt(fenChar));
  } else {
    return [pieceSquareFromLetter(fenChar)];
  }
};

const boardSquaresFromFenPiecePlacement = (
  piecePlacementPart: FenPiecePlacementPart
): BoardSquares => {
  const squares = piecePlacementPart
    .replace(/\//g, '') // remove forward slashed
    .split('') // to array
    .flatMap(fenCharToBoardSquares);

  if (squares.length === 64) {
    return squares;
  } else {
    throw new FenValidationError('SquaresMissing');
  }
};

export const boardStateFromFen = (fen: string): BoardState => {
  const fenParts = parseFenParts(fen);

  return {
    squares: boardSquaresFromFenPiecePlacement(fenParts.piecePlacement),
  };
};
