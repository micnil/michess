import { Coordinate, PieceType } from '@michess/core-board';

export type MovePayload<TMeta = unknown> = {
  from: Coordinate;
  to: Coordinate;
  promotion?: PieceType;
  meta?: TMeta;
};
