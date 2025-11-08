import { Score } from './Score';

export type GameResult = Score & {
  timestamp: Date;
};
