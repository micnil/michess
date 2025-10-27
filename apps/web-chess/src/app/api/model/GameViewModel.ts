import { ClockV1, GameResultV1, GameStatusTypeV1 } from '@michess/api-schema';
import { Move } from '@michess/core-board';

export type GameViewModel = {
  moves: Move[];
  result?: GameResultV1;
  status: GameStatusTypeV1;
  players: {
    white?: { username: string; avatar?: string };
    black?: { username: string; avatar?: string };
  };
  startedAt?: Date;
  clock?: ClockV1;
};
