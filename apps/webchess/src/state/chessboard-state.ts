import { BoardState } from '../common-types/BoardState';
import { ColoredPieceType } from '../common-types/ColoredPieceType';
import { updateItem } from '../util/immutability';
import { BoardSquare } from './BoardSquare';

type MovePayload = {
  fromIndex: number;
  toIndex: number;
};

const movePiece = (board: BoardState, move: MovePayload): BoardState => {
  const fromSquare = BoardSquare(board.squares[move.fromIndex]);
  const toSquare = BoardSquare(board.squares[move.fromIndex]);
  const fromSquareValue = fromSquare.value();
  if (fromSquareValue.isEmpty) {
    console.warn('attempted to move an empty square');
    return board;
  }
  const movedPiece = fromSquareValue;
  const squaresWithLiftedPiece = updateItem(board.squares, {
    index: move.fromIndex,
    item: fromSquare.clear().value(),
  });
  const squaresWithMovedPiece = updateItem(squaresWithLiftedPiece, {
    index: move.toIndex,
    item: toSquare
      .setPiece(ColoredPieceType.from(movedPiece.color, movedPiece.piece))
      .value(),
  });
  return {
    squares: squaresWithMovedPiece,
  };
};

type Chessboard = {
  movePiece(movePayload: MovePayload): Chessboard;
};

export const ChessBoard = (board: BoardState): Chessboard => {
  return {
    movePiece: (movePayload: MovePayload) =>
      ChessBoard(movePiece(board, movePayload)),
  };
};
