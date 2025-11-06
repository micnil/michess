import { GameVariantType, TimeControlClassification } from '@michess/core-game';
import { Rating } from '@michess/core-rating';
import { RatingRepository } from '@michess/infra-db';

export class RatingsService {
  constructor(private readonly repositories: RatingRepository) {}

  getRatingByPlayerId(
    playerId: string,
    variant: GameVariantType,
    timeControl: TimeControlClassification,
  ) {
    const rating = this.repositories.getRatingByPlayerId(
      playerId,
      variant,
      timeControl,
    );
    if (rating) {
      return rating;
    } else {
      const defaultRating = Rating.default();
      return this.repositories.createRating({
        playerId,
        variant,
        timeControlClassification: timeControl,
        rating: defaultRating.value,
        deviation: defaultRating.deviation,
        volatility: defaultRating.volatility,
        timestamp: new Date(),
      });
    }
  }
}
