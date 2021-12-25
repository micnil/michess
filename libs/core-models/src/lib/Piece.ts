import { Color } from './Color';
import { PieceType } from './PieceType';

export type Piece = {
  type: PieceType;
  color: Color;
};

export const createPiece = (type: PieceType, color: Color): Piece => {
  return {
    type,
    color,
  };
};
