import {
  FenCastlingAbilityPart,
  FenCastlingAbilityPartRegex,
  FenEnPassantTargetSquarePart,
  FenEnPassantTargetSquarePartRegex,
  FenFullMoveCounterPart,
  FenFullMoveCounterPartRegex,
  FenHalfMoveClockPart,
  FenHalfMoveClockPartRegex,
  FenPiecePlacementPart,
  FenPiecePlacementPartRegex,
  FenSideToMovePart,
  FenSideToMovePartRegex,
  FenStr,
} from './types/Fen';
import { FenParts } from './types/FenParts';
import { FenValidationError } from './types/FenValidationError';

function assertPiecePlacementPart(
  piecePlacementPart: string
): asserts piecePlacementPart is FenPiecePlacementPart {
  const match = piecePlacementPart.match(FenPiecePlacementPartRegex);
  if (!match?.groups?.piecePlacement) {
    throw new FenValidationError('FenPiecePlacementPart');
  }
}

function assertSideToMovePart(
  sideToMovePart: string
): asserts sideToMovePart is FenSideToMovePart {
  const match = sideToMovePart.match(FenSideToMovePartRegex);
  if (!match?.groups?.sideToMove) {
    throw new FenValidationError('FenSideToMovePart');
  }
}

function assertCastlingAbilityPart(
  castlingAbilityPart: string
): asserts castlingAbilityPart is FenCastlingAbilityPart {
  const match = castlingAbilityPart.match(FenCastlingAbilityPartRegex);
  if (!match?.groups?.castlingAbility) {
    throw new FenValidationError('FenCastlingAbilityPart');
  }
}

function assertEnPassantTargetSquarePart(
  enPassantTargetSquarePart: string
): asserts enPassantTargetSquarePart is FenEnPassantTargetSquarePart {
  const match = enPassantTargetSquarePart.match(
    FenEnPassantTargetSquarePartRegex
  );
  if (!match?.groups?.enPassant) {
    throw new FenValidationError('FenEnPassantTargetSquarePart');
  }
}

function assertHalfMoveClockPart(
  halfMoveClockPart: string
): asserts halfMoveClockPart is FenHalfMoveClockPart {
  const match = halfMoveClockPart.match(FenHalfMoveClockPartRegex);
  if (!match?.groups?.halfMoveClock) {
    throw new FenValidationError('FenHalfMoveClockPart');
  }
}

function assertFullMoveCounterPart(
  fullMoveCounterPart: string
): asserts fullMoveCounterPart is FenFullMoveCounterPart {
  const match = fullMoveCounterPart.match(FenFullMoveCounterPartRegex);
  if (!match?.groups?.fullMoveCounter) {
    throw new FenValidationError('FenFullMoveCounter');
  }
}

export const parseFenParts = (fenStr: string): FenParts => {
  const parts = fenStr.trimStart().trimEnd().split(' ');
  if (parts.length !== 6) {
    throw new FenValidationError('FenPartsMissing');
  }
  assertPiecePlacementPart(parts[0]);
  assertSideToMovePart(parts[1]);
  assertCastlingAbilityPart(parts[2]);
  assertEnPassantTargetSquarePart(parts[3]);
  assertHalfMoveClockPart(parts[4]);
  assertFullMoveCounterPart(parts[5]);

  return {
    fullFenStr: fenStr as FenStr,
    piecePlacement: parts[0],
    sideToMove: parts[1],
    castlingAbility: parts[2],
    enPassantTargetSquare: parts[3],
    halfMoveClock: parts[4],
    fullMoveCounter: parts[5],
  };
};