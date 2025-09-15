import { PiecePlacementsMock } from '../../../mocks/PiecePlacements.mock';
import { piecePlacementsFromFen } from '../piecePlacementsFromFen';

describe('boardStateFromFen', () => {
  it('creates an empty board state', () => {
    const emptyBoardFen = '8/8/8/8/8/8/8/8 w KQkq - 0 1';
    const pieces = piecePlacementsFromFen(emptyBoardFen);

    expect(pieces).toEqual(PiecePlacementsMock.emptyBoard);
  });
  it('creates the start board state', () => {
    const startingFen =
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

    const pieces = piecePlacementsFromFen(startingFen);

    expect(pieces).toEqual(PiecePlacementsMock.startingBoard);
  });
});
