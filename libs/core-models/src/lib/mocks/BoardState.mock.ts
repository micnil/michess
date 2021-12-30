import { BoardState } from '../BoardState';
import { CastlingAbility } from '../CastlingSide';
import { startingBoard } from './PiecePlacements.mock';

export const boardStateMock: BoardState = {
  squares: startingBoard,
  castlingAbility: new Set([
    CastlingAbility.BlackKing,
    CastlingAbility.BlackQueen,
    CastlingAbility.WhiteKing,
    CastlingAbility.WhiteQueen,
  ]),
  orientation: 'white',
  turn: 'white',
};

export const createBoardStateMock = (
  partialBoardState: Partial<BoardState>
): BoardState => ({
  ...boardStateMock,
  ...partialBoardState,
});
