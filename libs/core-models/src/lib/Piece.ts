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

const isEqual = (a: Piece | undefined, b?: Piece): boolean => {
  return a?.type === b?.type && a?.color === b?.color;
};

export const Piece = {
  from,
  isEqual,
};
