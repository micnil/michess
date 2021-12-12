import { BoardState } from '../chess-types/BoardState';
import { ColoredPieceType } from '../chess-types/ColoredPieceType';
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
      .setPiece(ColoredPieceType.fromPiece(movedPiece.piece))
      .value(),
  });
  return {
    squares: squaresWithMovedPiece,
  };
};

interface IChessboard {
  movePiece(movePayload: MovePayload): IChessboard;
}

export const Chessboard = (board: BoardState): IChessboard => {
  return {
    movePiece: (movePayload: MovePayload) =>
      Chessboard(movePiece(board, movePayload)),
  };
};
