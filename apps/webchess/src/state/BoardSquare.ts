import { Maybe } from '@michess/common-utils';
import { ColoredPieceType } from '../chess-types/ColoredPieceType';
import { Piece } from '../chess-types/Piece';
import { SquareState } from '../chess-types/SquareState';

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
      squareState.isEmpty
        ? undefined
        : ColoredPieceType.fromPiece(squareState.piece),
    clear,
    setPiece,
  };
};
