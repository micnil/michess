import { PiecePlacementsMock } from '@michess/core-models';
import { boardStateFromFen } from '../boardStateFromFen';

describe('boardStateFromFen', () => {
  it('creates an empty board state', () => {
    const emptyBoardFen = '8/8/8/8/8/8/8/8 w KQkq - 0 1';
    const boardState = boardStateFromFen(emptyBoardFen);

    expect(boardState.pieces).toEqual(PiecePlacementsMock.emptyBoard);
  });
  it('creates the start board state', () => {
    const startingFen =
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

    const boardState = boardStateFromFen(startingFen);

    expect(boardState.pieces).toEqual(PiecePlacementsMock.startingBoard);
  });
});
