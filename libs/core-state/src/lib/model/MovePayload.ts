import { Coordinate, PieceType } from '@michess/core-models';

export type MovePayload<TMeta = unknown> = {
  from: Coordinate;
  to: Coordinate;
  promotion?: PieceType;
  meta?: TMeta;
};
