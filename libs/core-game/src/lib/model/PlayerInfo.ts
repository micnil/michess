import { RatingSnapshot } from '@michess/core-rating';

export type PlayerInfo = {
  id: string;
  rating?: RatingSnapshot;
  ratingDiff?: number;
  name: string;
  isBot: boolean;
};
