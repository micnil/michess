import { Maybe } from '@michess/common-utils';
import { Coordinate } from '@michess/core-models';
import { MoveOptions } from './model/MoveOptions';

export const canMoveTo = (
  moveOptions: Maybe<MoveOptions>,
  toCoord: Coordinate
) => {
  return moveOptions
    ? moveOptions.some((moveOption) => moveOption.to === toCoord)
    : true;
};
