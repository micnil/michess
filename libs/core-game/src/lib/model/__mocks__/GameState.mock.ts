import { ChessPosition } from '@michess/core-board';
import { GameState } from '../GameState';

const gameStateMock: GameState = {
  id: 'game-id',
  timeControl: {
    classification: 'no_clock',
  },
  players: {
    white: { id: 'player1', name: 'Alice', isBot: false },
    black: { id: 'player2', name: 'Bob', isBot: false },
  },
  initialPosition: ChessPosition.standardInitial(),
  movesRecord: [],
  result: undefined,
  resultStr: '0-0',
  isPrivate: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  startedAt: undefined,
  variant: 'standard',
  status: 'IN_PROGRESS',
  actionRecord: [],
};

const fromPartial = (partial?: Partial<GameState>): GameState => ({
  ...gameStateMock,
  ...partial,
});

export const GameStateMock = {
  fromPartial,
};
