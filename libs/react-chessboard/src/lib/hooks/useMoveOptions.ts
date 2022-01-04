import { Maybe } from '@michess/common-utils';
import { Coordinate } from '@michess/core-models';
import { useChessboardContext } from '../context/useChessboardContext';
import { MoveOptions } from '../move/model/MoveOptions';

export const useMoveOptions = (
  coord: Maybe<Coordinate>
): Maybe<MoveOptions> => {
  const { moveOptionsMap } = useChessboardContext();

  return moveOptionsMap
    ? coord
      ? moveOptionsMap?.[coord] ?? []
      : []
    : undefined;
};
