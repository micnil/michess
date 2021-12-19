import { Maybe } from '@michess/common-utils';
import {
  BoardSquares,
  BoardState,
  CastlingAbility,
  Color,
  Coordinate,
  createPiece,
  PieceType,
  SquareState,
} from '@michess/core-models';
import { parseFenParts } from './parseFenParts';
import {
  FenCastlingAbilityPart,
  FenEnPassantTargetSquarePart,
  FenPiecePlacementPart,
  FenSideToMovePart,
  FenStr,
} from './types/Fen';
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

const sideToMoveToColor = (sideToMove: FenSideToMovePart): Color => {
  return sideToMove === 'w' ? Color.White : Color.Black;
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
  const list: CastlingAbility[] = [...fenCastlingAbility].map(
    charToCastlingAbility
  );
  return new Set(list);
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
    squares: boardSquaresFromFenPiecePlacement(fenParts.piecePlacement),
    orientation: Color.White,
    enPassant: enPassantCoordinateFromFenStr(fenParts.enPassantTargetSquare),
    turn: sideToMoveToColor(fenParts.sideToMove),
    castlingAbility: castlingAbilityFromFen(fenParts.castlingAbility),
  };
};
