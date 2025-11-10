import { Maybe } from '@michess/common-utils';
import {
  GameRating,
  GameVariantType,
  TimeControlClassification,
} from '@michess/core-game';
import { and, eq, lt, sql } from 'drizzle-orm';
import { InsertRating } from '../model/InsertRating';
import { SelectRating } from '../model/SelectRating';
import { ratings } from '../schema';
import { BaseRepository } from './BaseRepository';

export type StaleRating = {
  playerId: string;
  variant: GameVariantType;
  timeControlClassification: TimeControlClassification;
  lastRatingTimestamp: Date;
};

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

  async getStaleRatings(cutoffDate: Date): Promise<StaleRating[]> {
    // Get the most recent rating for each player/variant/timeControl combination
    // where the timestamp is older than the cutoff date
    const result = await this.db
      .select({
        playerId: ratings.playerId,
        variant: ratings.variant,
        timeControlClassification: ratings.timeControlClassification,
        lastRatingTimestamp: sql<Date>`MAX(${ratings.timestamp})`.as(
          'last_rating_timestamp',
        ),
      })
      .from(ratings)
      .where(lt(ratings.timestamp, cutoffDate))
      .groupBy(
        ratings.playerId,
        ratings.variant,
        ratings.timeControlClassification,
      )
      .having(sql`MAX(${ratings.timestamp}) < ${cutoffDate}`);

    return result.map((row) => ({
      playerId: row.playerId,
      variant: row.variant as GameVariantType,
      timeControlClassification:
        row.timeControlClassification as TimeControlClassification,
      lastRatingTimestamp: row.lastRatingTimestamp,
    }));
  }
}
