type FenPartType =
  | 'FenPiecePlacementPart'
  | 'FenSideToMovePart'
  | 'FenCastlingAbilityPart'
  | 'FenEnPassantTargetSquarePart'
  | 'FenHalfMoveClockPart'
  | 'FenFullMoveCounter';

type FenValidationErrorType =
  | FenPartType
  | 'FenPartsMissing'
  | 'SquaresMissing';

export class FenValidationError extends Error {
  type: FenValidationErrorType;
  details?: string;
  constructor(type: FenValidationErrorType, details?: string) {
    super(`Validation error: ${type} (${details ?? ''})`);
    this.type = type;
    this.name = 'FenValidationError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
