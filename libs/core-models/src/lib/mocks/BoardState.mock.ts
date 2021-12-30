import { BoardState } from '../BoardState';
import { startingBoard } from './PiecePlacements.mock';

export const boardStateMock: BoardState = {
  pieces: startingBoard,
  orientation: 'white',
};

export const createBoardStateMock = (
  partialBoardState: Partial<BoardState>
): BoardState => ({
  ...boardStateMock,
  ...partialBoardState,
});
