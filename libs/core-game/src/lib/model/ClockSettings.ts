import { GameState } from './GameState';

export type ClockSettings =
  | {
      type: 'standard';
      initialSec: number;
      incrementSec: number;
    }
  | {
      type: 'correspondence';
      daysPerMove: number;
    };

export const ClockSettings = {
  standard: (initialSec?: number, incrementSec?: number) =>
    ({
      type: 'standard',
      initialSec: initialSec ?? 10 * 60,
      incrementSec: incrementSec ?? 0,
    }) as const,
  correspondence: (daysPerMove: number): ClockSettings => ({
    type: 'correspondence',
    daysPerMove,
  }),
  fromGameState: (gameState: GameState): ClockSettings => {
    if (
      gameState.timeControl.classification === 'bullet' ||
      gameState.timeControl.classification === 'blitz' ||
      gameState.timeControl.classification === 'rapid'
    ) {
      return ClockSettings.standard(
        gameState.timeControl.initialSec,
        gameState.timeControl.incrementSec,
      );
    } else if (gameState.timeControl.classification === 'correspondence') {
      return ClockSettings.correspondence(gameState.timeControl.daysPerMove);
    }
    throw new Error('Invalid time control classification');
  },
};
