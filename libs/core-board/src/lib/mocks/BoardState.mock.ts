import { BoardState } from '../BoardState';
import { PiecePlacementsMock } from './PiecePlacements.mock';

export const boardStateMock: BoardState = {
  pieces: PiecePlacementsMock.startingBoard,
  orientation: 'white',
};

export const createBoardStateMock = (
  partialBoardState?: Partial<BoardState>,
): BoardState => ({
  ...boardStateMock,
  ...partialBoardState,
});
