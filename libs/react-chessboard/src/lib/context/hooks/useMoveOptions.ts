import { Maybe } from '@michess/common-utils';
import { Coordinate } from '@michess/core-board';
import { useChessboardContext } from './useChessboardContext';
import { MoveOptions } from '../../move/model/MoveOptions';

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
