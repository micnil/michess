import { Move } from '@michess/core-board';

export type ParticipantGameDetails = {
  playerSide: 'white' | 'black' | 'spectator';
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
