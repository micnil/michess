import { Coordinate, createBoardStateMock } from '@michess/core-models';
import { Chessboard } from '../Chessboard';

describe('Chessboard', () => {
  describe('getIndex', () => {
    const testCases: Array<[expected: number, coord: Coordinate]> = [
      [56, 'a1'],
      [0, 'a8'],
      [63, 'h1'],
    ];
    it.each(testCases)(
      'returns index %s for coordinate %s',
      (expected, coord) => {
        const chessboard = Chessboard(createBoardStateMock());

        expect(chessboard.getIndex(coord)).toEqual(expected);
      }
    );
  });
});
