
import { randomString } from '@michess/common-utils';
import { Color } from './Color';
import { PieceType } from './PieceType';

export type Piece = {
  id: string;
  type: PieceType;
  color: Color;
};

export const createPiece = (type: PieceType, color: Color): Piece => {
  return {
    id: type + '-' + color + '-' + randomString(5),
    type,
    color,
  };
};
