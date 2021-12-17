type FenPartType =
  | 'FenPiecePlacementPart'
  | 'FenSideToMovePart'
  | 'FenCastlingAbilityPart'
  | 'FenEnPassantTargetSquarePart'
  | 'FenHalfMoveClockPart'
  | 'FenFullMoveCounter';

type FenValidationErrorType = FenPartType | 'FenPartsMissing' | 'SquaresMissing'

export class FenValidationError extends Error {
  type: FenValidationErrorType
  constructor(type: FenValidationErrorType) {
    super(`Validation error: ${type}`);
    this.type = type;
    this.name = 'FenValidationError';
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
