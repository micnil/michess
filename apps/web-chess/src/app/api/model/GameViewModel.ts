import { Move } from '@michess/core-board';

export type GameViewModel = {
  moves: Move[];
  players: {
    white?: { username: string; avatar?: string };
    black?: { username: string; avatar?: string };
  };
};
