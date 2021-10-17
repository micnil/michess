import { BoardState } from '../common-types/BoardState';
import { boardStateFromFen } from '../fen/boardStateFromFen';

type MovePayload = {
  fromIndex: number;
  toIndex: number;
};

type Action = {
  type: 'MOVE';
  payload: MovePayload;
};

// const getPiece = (board: BoardState):  => {}

// const movePiece = (board: BoardState, move: MovePayload): BoardState => {

// }

const createBoardState = (fen: string): BoardState => {
  return boardStateFromFen(fen);
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
