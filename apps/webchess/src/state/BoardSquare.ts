import { colorFromColoredPiece } from '../chess-types/Color';
import { ColoredPieceType } from '../chess-types/ColoredPieceType';
import { Maybe } from '../util/types/Maybe';
import { createPiece } from '../chess-types/Piece';
import { pieceTypeFromColoredPiece } from '../chess-types/PieceType';
import { SquareState } from '../chess-types/SquareState';

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
    piece: createPiece(
      pieceTypeFromColoredPiece(coloredPiece),
      colorFromColoredPiece(coloredPiece)
    ),
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
