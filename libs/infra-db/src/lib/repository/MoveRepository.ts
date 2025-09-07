import { InsertMove } from '../model/InsertMove';
import { SelectMove } from '../model/SelectMove';
import { moves } from '../schema';
import { BaseRepository } from './BaseRepository';

export class MoveRepository extends BaseRepository {
  async createMove(data: InsertMove): Promise<SelectMove> {
    const [move] = await this.db.insert(moves).values(data).returning();
    return move;
  }
}
