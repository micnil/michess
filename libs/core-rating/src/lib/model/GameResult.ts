import { RatingProfile } from './RatingProfile';

export type GameResult = {
  opponent: RatingProfile;
  score: number; // 1 = win, 0.5 = draw, 0 = loss
};
