import { Rating } from './Rating';

export type GameResult = {
  opponent: Rating;
  score: number; // 1 = win, 0.5 = draw, 0 = loss
};
