import { Rating } from './Rating';

export type RatingSnapshot = Rating & {
  id: number;
  timestamp: Date;
};
