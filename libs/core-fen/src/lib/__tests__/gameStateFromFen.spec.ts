import {
  CastlingAbility,
  emptyBoard,
  startingBoard,
} from '@michess/core-models';
import { gameStateFromFen } from '../gameStateFromFen';

describe('gameStateFromFen', () => {
  it('creates an empty board state', () => {
    const emptyBoardFen = '8/8/8/8/8/8/8/8 w KQkq - 0 1';
    const boardState = gameStateFromFen(emptyBoardFen);

    expect(boardState.pieces).toEqual(emptyBoard);
    expect(boardState.castlingAbility).toEqual(
      new Set([
        CastlingAbility.WhiteKing,
        CastlingAbility.WhiteQueen,
        CastlingAbility.BlackKing,
        CastlingAbility.BlackQueen,
      ])
    );
    expect(boardState.enPassant).toBeUndefined();
    expect(boardState.turn).toEqual('white');
  });
  it('creates the start board state', () => {
    const startingFen =
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

    const boardState = gameStateFromFen(startingFen);

    expect(boardState.pieces).toEqual(startingBoard);
    expect(boardState.castlingAbility).toEqual(
      new Set([
        CastlingAbility.WhiteKing,
        CastlingAbility.WhiteQueen,
        CastlingAbility.BlackKing,
        CastlingAbility.BlackQueen,
      ])
    );
    expect(boardState.enPassant).toBeUndefined();
    expect(boardState.turn).toEqual('white');
  });
});
