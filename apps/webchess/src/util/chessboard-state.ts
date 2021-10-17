import { Color } from '../app/Color';
import { PieceType } from '../app/PieceType';
import { updateItem } from './immutability';

// prettier-ignore
export const SQUARE_COORDINATES = [
  "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1",
  "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
  "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
  "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
  "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
  "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
  "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
  "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"
] as const
type Coordinate = typeof SQUARE_COORDINATES[number];

export type SquareState =
  | {
      isEmpty: true;
    }
  | {
      isEmpty: false;
      piece: PieceType;
      color: Color;
    };

// prettier-ignore
export type BoardSquares = [
  SquareState, SquareState, SquareState, SquareState, SquareState, SquareState, SquareState, SquareState,
  SquareState, SquareState, SquareState, SquareState, SquareState, SquareState, SquareState, SquareState,
  SquareState, SquareState, SquareState, SquareState, SquareState, SquareState, SquareState, SquareState,
  SquareState, SquareState, SquareState, SquareState, SquareState, SquareState, SquareState, SquareState,
  SquareState, SquareState, SquareState, SquareState, SquareState, SquareState, SquareState, SquareState,
  SquareState, SquareState, SquareState, SquareState, SquareState, SquareState, SquareState, SquareState,
  SquareState, SquareState, SquareState, SquareState, SquareState, SquareState, SquareState, SquareState,
  SquareState, SquareState, SquareState, SquareState, SquareState, SquareState, SquareState, SquareState,
]

export type BoardState = {
  squares: BoardSquares;
};

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

// const createBoard = () => {
//   const board =
// }

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
