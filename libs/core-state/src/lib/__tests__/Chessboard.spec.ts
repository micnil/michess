import { Color, Coordinate, createBoardStateMock } from '@michess/core-models';
import { Chessboard } from '../Chessboard';

describe('Chessboard', () => {
  describe('getIndex', () => {
    const testCases: Array<
      [expected: number, coord: Coordinate, orientation: Color]
    > = [
      [56, 'a1', 'white'],
      [0, 'a8', 'white'],
      [63, 'h1', 'white'],
      [7, 'a1', 'black'],
      [63, 'a8', 'black'],
      [0, 'h1', 'black'],
    ];
    it.each(testCases)(
      'returns index %s for coordinate %s in %s orientation in starting position',
      (expected, coord, orientation) => {
        const chessboard = Chessboard(createBoardStateMock({ orientation }));

        expect(chessboard.getIndex(coord)).toEqual(expected);
      }
    );
  });
});
