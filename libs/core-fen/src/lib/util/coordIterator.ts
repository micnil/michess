import { counter } from '@michess/common-utils';
import { BoardCoordinates, Coordinate } from '@michess/core-models';
import { FenValidationError } from '../types/FenValidationError';

const whiteCoordinates = BoardCoordinates.fromOrientation('white');

type CoordIterator = {
  get(): Coordinate;
  next(skip: number): Coordinate;
  isFinished(): boolean;
};

export const coordIterator = (): CoordIterator => {
  let coord: Coordinate = 'a8';
  const [getBoardIndex, add] = counter(0);
  return {
    get: () => coord,
    next: (skip: number): Coordinate => {
      add(skip);
      if (getBoardIndex() > 64) {
        throw new FenValidationError('FenPiecePlacementPart');
      } else {
        coord = whiteCoordinates[getBoardIndex()];
        return coord;
      }
    },
    isFinished: () => getBoardIndex() === 64,
  };
};
