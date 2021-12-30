import { Maybe } from '@michess/common-utils';
import { CastlingAbility, Color, Coordinate, GameState } from '@michess/core-models';
import { boardStateFromFen } from './boardStateFromFen';
import { parseFenParts } from './parseFenParts';
import {
  FenCastlingAbilityPart,
  FenEnPassantTargetSquarePart,
  FenSideToMovePart,
  FenStr,
} from './types/Fen';
import { FenValidationError } from './types/FenValidationError';

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

export const gameStateFromFen = (fen: FenStr): GameState => {
  const fenParts = parseFenParts(fen);

  return {
    ...boardStateFromFen(fen),
    enPassant: enPassantCoordinateFromFenStr(fenParts.enPassantTargetSquare),
    turn: sideToMoveToColor(fenParts.sideToMove),
    castlingAbility: castlingAbilityFromFen(fenParts.castlingAbility),
  };
};
