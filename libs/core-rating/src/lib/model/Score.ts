import { Rating } from './Rating';

export type Score = {
  opponent: Rating;
  value: number; // 1 = win, 0.5 = draw, 0 = loss
};
