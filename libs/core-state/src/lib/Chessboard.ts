import { updateItem } from '@michess/common-utils';
import { BoardState, Color, Coordinate } from '@michess/core-models';
import { BoardSquare } from './BoardSquare';

type MovePayload = {
  pieceId: string;
  coordinate: Coordinate;
};

const movePiece = (board: BoardState, move: MovePayload): BoardState => {
  const toIndex = Coordinate.getCoordinates(board.orientation).indexOf(
    move.coordinate
  );
  const fromSquareIndex = board.squares.findIndex((square) =>
    square.isEmpty === true ? false : square.piece.id === move.pieceId
  );
  console.debug({ move, fromSquareIndex, toIndex });
  const fromSquare = BoardSquare(board.squares[fromSquareIndex]);
  const toSquare = BoardSquare(board.squares[toIndex]);
  const fromSquareValue = fromSquare.value();
  if (fromSquareValue.isEmpty === true) {
    console.warn('attempted to move an empty square');
    return board;
  }

  const movedPiece = fromSquareValue;
  const squaresWithLiftedPiece = updateItem(board.squares, {
    index: fromSquareIndex,
    item: fromSquare.clear().value(),
  });
  const squaresWithMovedPiece = updateItem(squaresWithLiftedPiece, {
    index: toIndex,
    item: toSquare.setPiece(movedPiece.piece).value(),
  });
  console.debug({ squaresWithMovedPiece });
  return {
    squares: squaresWithMovedPiece,
    orientation: board.orientation,
  };
};

const setOrientation = (board: BoardState, orientation: Color): BoardState => {
  return {
    squares: [...board.squares].reverse(),
    orientation,
  };
};

interface IChessboard {
  movePiece(movePayload: MovePayload): IChessboard;
  setOrientation(orientation: Color): IChessboard;
  getState(): BoardState;
}

export const Chessboard = (board: BoardState): IChessboard => {
  return {
    movePiece: (movePayload: MovePayload) =>
      Chessboard(movePiece(board, movePayload)),
    setOrientation: (orientation: Color) =>
      Chessboard(setOrientation(board, orientation)),
    getState: () => board,
  };
};
