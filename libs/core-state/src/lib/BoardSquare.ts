import { Maybe } from '@michess/common-utils';
import { ColoredPieceType, Piece, SquareState } from '@michess/core-models';

type BoardSquare = {
  value(): SquareState;
  clear(): BoardSquare;
  setPiece(piece: Piece): BoardSquare;
  getColoredPieceType(): Maybe<ColoredPieceType>;
};

const emptySquare = (): SquareState => {
  return {
    isEmpty: true,
  };
};

const clear = (): BoardSquare => BoardSquare(emptySquare());

const setPiece = (piece: Piece): BoardSquare =>
  BoardSquare({
    isEmpty: false,
    piece: piece,
  });

export const BoardSquare = (squareState: SquareState): BoardSquare => {
  return {
    value: () => squareState,
    getColoredPieceType: () =>
      squareState.isEmpty === true
        ? undefined
        : ColoredPieceType.fromPiece(squareState.piece),
    clear,
    setPiece,
  };
};
