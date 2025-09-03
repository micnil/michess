import { InsertMove } from '../model/InsertMove';
import { SelectMove } from '../model/SelectMove';
import { BaseRepository } from './BaseRepository';

export class MoveRepository extends BaseRepository {
  async createMove(data: InsertMove): Promise<SelectMove> {
    const [move] = await this.insert('moves').values(data).returning();
    return move;
  }
}
