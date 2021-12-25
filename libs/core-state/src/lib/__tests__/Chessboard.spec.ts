import { Color, Coordinate, createBoardStateMock } from '@michess/core-models';
import { Chessboard } from '../Chessboard';

describe('Chessboard', () => {
  describe('getIndex', () => {
    const testCases: Array<
      [expected: number, coord: Coordinate, orientation: Color]
    > = [
      [56, 'a1', Color.White],
      [0, 'a8', Color.White],
      [63, 'h1', Color.White],
      [7, 'a1', Color.Black],
      [63, 'a8', Color.Black],
      [0, 'h1', Color.Black],
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
