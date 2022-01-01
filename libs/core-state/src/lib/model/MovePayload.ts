import { Coordinate } from '@michess/core-models';

export type MovePayload<TMeta = unknown> = {
  from: Coordinate;
  to: Coordinate;
  meta?: TMeta;
};
