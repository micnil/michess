import { colorFromColoredPiece } from '../common-types/Color';
import { ColoredPieceType } from '../common-types/ColoredPieceType';
import { Maybe } from '../common-types/Maybe';
import { pieceFromColoredPiece } from '../common-types/PieceType';
import { SquareState } from '../common-types/SquareState';

type BoardSquare = {
  value(): SquareState;
  clear(): BoardSquare;
  setPiece(coloredPiece: ColoredPieceType): BoardSquare;
  getColoredPieceType(): Maybe<ColoredPieceType>;
};

const emptySquare = (): SquareState => {
  return {
    isEmpty: true,
  };
};

const clear = (): BoardSquare => BoardSquare(emptySquare());

const setPiece = (coloredPiece: ColoredPieceType): BoardSquare =>
  BoardSquare({
    isEmpty: false,
    color: colorFromColoredPiece(coloredPiece),
    piece: pieceFromColoredPiece(coloredPiece),
  });

export const BoardSquare = (squareState: SquareState): BoardSquare => {
  return {
    value: () => squareState,
    getColoredPieceType: () =>
      squareState.isEmpty
        ? undefined
        : ColoredPieceType.from(squareState.color, squareState.piece),
    clear,
    setPiece,
  };
};
