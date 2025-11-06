import { InsertRating } from '../model/InsertRating';
import { SelectRating } from '../model/SelectRating';
import { ratings } from '../schema';
import { BaseRepository } from './BaseRepository';

export class RatingRepository extends BaseRepository {
  async createRating(data: InsertRating): Promise<SelectRating> {
    const [rating] = await this.db.insert(ratings).values(data).returning();
    return rating;
  }
}
