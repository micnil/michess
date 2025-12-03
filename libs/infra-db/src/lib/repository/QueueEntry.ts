import { TimeControlClassification } from '@michess/core-game';

export type QueueEntry = {
  playerId: string;
  playerName: string;
  rating: number;
  variant: 'standard';
  timeControlClassification: TimeControlClassification;
  timeControl?: {
    initialSec: number;
    incrementSec: number;
  };
  joinedAt: number;
};
