import { GameResultV1, GameStatusTypeV1 } from '@michess/api-schema';
import { Move } from '@michess/core-board';
import { CountdownClock } from './CountdownClock';

export type GameViewModel = {
  moves: Move[];
  result?: GameResultV1;
  status: GameStatusTypeV1;
  players: {
    white?: {
      username: string;
      avatar?: string;
      rating?: string;
      ratingDiff?: string;
    };
    black?: {
      username: string;
      avatar?: string;
      rating?: string;
      ratingDiff?: string;
    };
  };
  startedAt?: Date;
  clock?: CountdownClock;
};
