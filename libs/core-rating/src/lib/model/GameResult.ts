import { Player } from './Player';

export type GameResult = {
  opponent: Player;
  score: number; // 1 = win, 0.5 = draw, 0 = loss
};
