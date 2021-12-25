import { BoardState } from '../BoardState';
import { CastlingAbility } from '../CastlingSide';
import { Color } from '../Color';
import { startingBoard } from './BoardSquares.mock';

export const boardStateMock: BoardState = {
  squares: startingBoard,
  castlingAbility: new Set([
    CastlingAbility.BlackKing,
    CastlingAbility.BlackQueen,
    CastlingAbility.WhiteKing,
    CastlingAbility.WhiteQueen,
  ]),
  orientation: Color.White,
  turn: Color.White,
};

export const createBoardStateMock = (
  partialBoardState: Partial<BoardState>
): BoardState => ({
  ...boardStateMock,
  ...partialBoardState,
});
