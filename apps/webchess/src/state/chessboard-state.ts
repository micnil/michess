import { BoardState } from '../common-types/BoardState';
import { SquareState } from '../common-types/SquareState';
import { boardStateFromFen } from '../fen/boardStateFromFen';
import { updateItem } from '../util/immutability';

type MovePayload = {
  fromIndex: number;
  toIndex: number;
};

type Action = {
  type: 'MOVE';
  payload: MovePayload;
};

const emptySquare = (): SquareState => {
  return {
    isEmpty: true,
  };
};

const movePiece = (board: BoardState, move: MovePayload): BoardState => {
  const squareState = board.squares[move.fromIndex];
  if (squareState.isEmpty) {
    console.warn('attempted to move an empty square');
    return board;
  }
  const squaresLiftedPiece = updateItem(board.squares, {
    index: move.fromIndex,
    item: emptySquare(),
  });
  const squaresWithMovedPiece = updateItem(squaresLiftedPiece, {
    index: move.toIndex,
    item: {
      isEmpty: false,
      color: squareState.color,
      piece: squareState.piece,
    },
  });
  return {
    squares: squaresWithMovedPiece,
  };
};

const createBoardState = (fen: string): BoardState => {
  return boardStateFromFen(fen);
};

export const ChessBoard = (board: BoardState) => {
  return {
    movePiece: (movePayload: MovePayload) =>
      ChessBoard(movePiece(board, movePayload)),
  };
};

const reducer = (board: BoardState, action: Action) => {
  switch (action.type) {
    case 'MOVE':
    default:
      return board;
  }
};
// TODO:
// Create chainable methods on boardstate
// board.move(from, to).move()
// or maybe not...
