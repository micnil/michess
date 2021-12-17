import { updateItem } from '@michess/common-utils';
import { BoardState } from '../chess-types/BoardState';
import { Coordinate, SQUARE_COORDINATES } from '../chess-types/Coordinate';
import { BoardSquare } from './BoardSquare';

type MovePayload = {
  pieceId: string;
  coordinate: Coordinate;
};

const movePiece = (board: BoardState, move: MovePayload): BoardState => {
  const toIndex = SQUARE_COORDINATES.indexOf(move.coordinate);
  const fromSquareIndex = board.squares.findIndex((square) =>
    square.isEmpty ? false : square.piece.id === move.pieceId
  );
  console.debug({move, fromSquareIndex, toIndex})
  const fromSquare = BoardSquare(board.squares[fromSquareIndex]);
  const toSquare = BoardSquare(board.squares[toIndex]);
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
    index: toIndex,
    item: toSquare
      .setPiece(movedPiece.piece)
      .value(),
  });
  console.debug({ squaresWithMovedPiece });
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
