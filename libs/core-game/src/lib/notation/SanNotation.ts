import { assertDefined } from '@michess/common-utils';
import {
  CastlingRight,
  Coordinate,
  MoveOption,
  PiecePlacements,
  PieceType,
} from '@michess/core-board';

export const SanNotation = {
  /**
   * Convert a MoveOption to SAN notation given the position and all legal moves
   */
  moveOptionToSan: (
    moveOption: MoveOption,
    pieces: PiecePlacements,
    allLegalMoves: MoveOption[]
  ): string => {
    const fromSquare = Coordinate.fromIndex(moveOption.start);
    const toSquare = Coordinate.fromIndex(moveOption.target);
    const piece = pieces.get(fromSquare);

    assertDefined(piece, `No piece at ${fromSquare}`);

    if (moveOption.castling) {
      return moveOption.castling === CastlingRight.KingSide ? 'O-O' : 'O-O-O';
    }

    let notation = '';

    if (piece.type !== PieceType.Pawn) {
      notation += piece.type.toUpperCase();
    }

    if (piece.type !== PieceType.Pawn) {
      const ambiguousMoves = allLegalMoves.filter((move) => {
        const isSameMove =
          move.start === moveOption.start &&
          move.target === moveOption.target &&
          move.promotion === moveOption.promotion;
        const isSameTarget = move.target === moveOption.target;
        const isSamePieceType =
          pieces.get(Coordinate.fromIndex(move.start))?.type === piece.type;

        return !isSameMove && isSameTarget && isSamePieceType;
      });

      if (ambiguousMoves.length > 0) {
        const fromFile = fromSquare[0];
        const fromRank = fromSquare[1];

        const sameFile = ambiguousMoves.some(
          (move) => Coordinate.fromIndex(move.start)[0] === fromFile
        );

        if (!sameFile) {
          notation += fromFile;
        } else {
          const sameRank = ambiguousMoves.some(
            (move) => Coordinate.fromIndex(move.start)[1] === fromRank
          );

          if (!sameRank) {
            notation += fromRank;
          } else {
            notation += fromSquare;
          }
        }
      }
    }

    if (piece.type === PieceType.Pawn && moveOption.capture) {
      notation += fromSquare[0];
    }

    if (moveOption.capture) {
      notation += 'x';
    }

    notation += toSquare;

    if (moveOption.promotion) {
      notation += `=${moveOption.promotion.toUpperCase()}`;
    }

    return notation;
  },

  /**
   * Add check/checkmate notation to a SAN string
   */
  addCheckNotation: (
    san: string,
    isCheck: boolean,
    isCheckmate: boolean
  ): string => {
    if (isCheckmate) {
      return san + '#';
    } else if (isCheck) {
      return san + '+';
    }
    return san;
  },
};
