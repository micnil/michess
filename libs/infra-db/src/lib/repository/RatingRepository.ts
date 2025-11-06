import { Maybe } from '@michess/common-utils';
import {
  GameRating,
  GameVariantType,
  TimeControlClassification,
} from '@michess/core-game';
import { and, eq } from 'drizzle-orm';
import { InsertRating } from '../model/InsertRating';
import { SelectRating } from '../model/SelectRating';
import { ratings } from '../schema';
import { BaseRepository } from './BaseRepository';

export class RatingRepository extends BaseRepository {
  toGameRating(rating: SelectRating): GameRating {
    return {
      id: rating.id,
      playerId: rating.playerId,
      gameId: rating.gameId ?? undefined,
      value: rating.rating,
      deviation: rating.deviation,
      volatility: rating.volatility,
      timestamp: rating.timestamp,
      timeControlClassification:
        rating.timeControlClassification as TimeControlClassification,
      variant: rating.variant as GameVariantType,
    };
  }

  async createRating(data: InsertRating): Promise<GameRating> {
    const [rating] = await this.db.insert(ratings).values(data).returning();
    return this.toGameRating(rating);
  }

  async getRatingByPlayerId(
    playerId: string,
    variant: GameVariantType,
    timeControl: TimeControlClassification,
  ): Promise<Maybe<GameRating>> {
    const rating = await this.db.query.ratings.findFirst({
      where: and(
        eq(ratings.playerId, playerId),
        eq(ratings.variant, variant),
        eq(ratings.timeControlClassification, timeControl),
      ),
    });
    if (rating) {
      return this.toGameRating(rating);
    } else {
      return undefined;
    }
  }
}
