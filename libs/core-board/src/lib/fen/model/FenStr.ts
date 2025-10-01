export const FenPiecePlacementPartRegex =
  /(?<piecePlacement>((?<rankItem>[pnbrqkPNBRQK1-8]{1,8})\/?){8})/;
export type FenPiecePlacementPart = string;

export const FenSideToMovePartRegex = /(?<sideToMove>b|w)/;
export type FenSideToMovePart = 'w' | 'b';

export const FenCastlingAbilityPartRegex = /(?<castlingAbility>-|K?Q?k?q?)/;
export type FenCastlingAbilityPart = string;

export const FenEnPassantTargetSquarePartRegex = /(?<enPassant>-|[a-h][3-6])/;
export type FenEnPassantTargetSquarePart = string;

export const FenHalfMoveClockPartRegex = /(?<halfMoveClock>\d+)/;
export type FenHalfMoveClockPart = string;

export const FenFullMoveCounterPartRegex = /(?<fullMoveCounter>\d+)/;
export type FenFullMoveCounterPart = string;

export type FenStr =
  `${FenPiecePlacementPart} ${FenSideToMovePart} ${FenCastlingAbilityPart} ${FenEnPassantTargetSquarePart} ${FenHalfMoveClockPart} ${FenFullMoveCounterPart}`;

export const FenStr = {
  standardInitial: (): FenStr =>
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
};
