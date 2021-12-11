import { Piece } from './Piece';

export type SquareState =
  | {
      isEmpty: true;
    }
  | {
      isEmpty: false;
      piece: Piece;
    };
