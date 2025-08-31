import { counter } from '@michess/common-utils';
import { FenValidationError } from '../model/FenValidationError';
import { BoardCoordinates } from '../../BoardCoordinates';
import { Coordinate } from '../../common/Coordinate';

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
