import { BoardState } from '../chess-types/BoardState';
import { ColoredPieceType } from '../chess-types/ColoredPieceType';
import { updateItem } from '../util/immutability';
import { BoardSquare } from './BoardSquare';

type MovePayload = {
  pieceId: string;
  toIndex: number;
};

const movePiece = (board: BoardState, move: MovePayload): BoardState => {
  const fromSquareIndex = board.squares.findIndex((square) =>
    square.isEmpty ? false : square.piece.id === move.pieceId
  );
  const fromSquare = BoardSquare(board.squares[fromSquareIndex]);
  const toSquare = BoardSquare(board.squares[move.toIndex]);
  const fromSquareValue = fromSquare.value();
  if (fromSquareValue.isEmpty) {
    console.warn('attempted to move an empty square');
    return board;
  }
  const movedPiece = fromSquareValue;
  const squaresWithLiftedPiece = updateItem(board.squares, {
    index: fromSquareIndex,
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
  getState(): BoardState;
}

export const Chessboard = (board: BoardState): IChessboard => {
  return {
    movePiece: (movePayload: MovePayload) =>
      Chessboard(movePiece(board, movePayload)),
    getState: () => board,
  };
};
