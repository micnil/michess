import { Color } from './Color';
import { PieceType } from './PieceType';

export type SquareState =
  | {
      isEmpty: true;
    }
  | {
      isEmpty: false;
      piece: PieceType;
      color: Color;
    };
