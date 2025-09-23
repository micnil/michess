import { Move } from '@michess/core-board';

export type GameViewModel = {
  moves: Move[];
  blackPlayer?: {
    username: string;
    avatar?: string;
  };
  whitePlayer?: {
    username: string;
    avatar?: string;
  };
};
