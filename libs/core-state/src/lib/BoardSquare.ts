import { Maybe } from '@michess/common-utils';
import { ColoredPieceType, Piece, SquareState } from '@michess/core-models';

type BoardSquare = {
  value(): SquareState;
  setPiece(piece: Piece): BoardSquare;
  getColoredPieceType(): Maybe<ColoredPieceType>;
};

const setPiece = (squareState: SquareState, piece: Piece): BoardSquare =>
  BoardSquare({
    ...squareState,
    piece: piece,
  });

export const BoardSquare = (squareState: SquareState): BoardSquare => {
  return {
    value: () => squareState,
    getColoredPieceType: () =>
      squareState.piece === undefined
        ? undefined
        : ColoredPieceType.fromPiece(squareState.piece),
    setPiece: (piece: Piece) => setPiece(squareState, piece),
  };
};
