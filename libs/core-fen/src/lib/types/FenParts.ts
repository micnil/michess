import {
  FenCastlingAbilityPart,
  FenEnPassantTargetSquarePart,
  FenFullMoveCounterPart,
  FenHalfMoveClockPart,
  FenPiecePlacementPart,
  FenSideToMovePart,
  FenStr,
} from './Fen';

export type FenParts = {
  fullFenStr: FenStr;
  piecePlacement: FenPiecePlacementPart;
  sideToMove: FenSideToMovePart;
  castlingAbility: FenCastlingAbilityPart;
  enPassantTargetSquare: FenEnPassantTargetSquarePart;
  halfMoveClock: FenHalfMoveClockPart;
  fullMoveCounter: FenFullMoveCounterPart;
};
