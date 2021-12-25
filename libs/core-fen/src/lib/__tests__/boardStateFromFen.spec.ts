import { CastlingAbility, Color, emptyBoard, startingBoard } from '@michess/core-models';
import { boardStateFromFen } from '../boardStateFromFen';

describe('boardStateFromFen', () => {
  it('creates an empty board state', () => {
    const emptyBoardFen = '8/8/8/8/8/8/8/8 w KQkq - 0 1';
    const boardState = boardStateFromFen(emptyBoardFen);

    expect(boardState.squares).toEqual(emptyBoard);
    expect(boardState.castlingAbility).toEqual(
      new Set([
        CastlingAbility.WhiteKing,
        CastlingAbility.WhiteQueen,
        CastlingAbility.BlackKing,
        CastlingAbility.BlackQueen,
      ])
    );
    expect(boardState.enPassant).toBeUndefined();
    expect(boardState.turn).toEqual(Color.White);
  });
  it('creates the start board state', () => {
    const startingFen =
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

    const boardState = boardStateFromFen(startingFen);

    expect(boardState.squares).toEqual(startingBoard);
    expect(boardState.castlingAbility).toEqual(
      new Set([
        CastlingAbility.WhiteKing,
        CastlingAbility.WhiteQueen,
        CastlingAbility.BlackKing,
        CastlingAbility.BlackQueen,
      ])
    );
    expect(boardState.enPassant).toBeUndefined();
    expect(boardState.turn).toEqual(Color.White);
  });
});
