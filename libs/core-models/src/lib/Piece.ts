import { Color } from './Color';
import { PieceType } from './PieceType';

export type Piece = {
  type: PieceType;
  color: Color;
};

const from = (type: PieceType, color: Color): Piece => {
  return {
    type,
    color,
  };
};

export const Piece = {
  from,
};
