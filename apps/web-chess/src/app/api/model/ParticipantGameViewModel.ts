import { GameViewModel } from './GameViewModel';

export type ParticipantGameViewModel = GameViewModel & {
  playerSide: 'white' | 'black' | 'spectator';
};
