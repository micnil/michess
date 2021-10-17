import { boardStateFromFen } from '../boardStateFromFen';
import { emptyBoard, startingBoard } from '../__mocks__/BoardSquares.mock';

describe('boardStateFromFen', () => {
  it('creates an empty board state', () => {
    const emptyBoardFen = '8/8/8/8/8/8/8/8 w KQkq - 0 1';
    const boardState = boardStateFromFen(emptyBoardFen);

    expect(boardState.squares).toEqual(emptyBoard);
  });
  it('creates the start board state', () => {
    const startingFen =
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

    const boardState = boardStateFromFen(startingFen);

    expect(boardState.squares).toEqual(startingBoard);
  });
});
