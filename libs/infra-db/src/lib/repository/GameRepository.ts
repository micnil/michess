import { eq } from 'drizzle-orm';
import { Maybe } from '@michess/common-utils';
import { BaseRepository } from './BaseRepository';
import { InsertGame } from '../model/InsertGame';
import { games } from '../schema';
import { SelectGame } from '../model/SelectGame';

export class GameRepository extends BaseRepository {
  async findGameById(id: string): Promise<Maybe<SelectGame>> {
    return this.db.query.games.findFirst({
      where: eq(this.schema.games.gameId, id),
    });
  }

  async createGame(data: InsertGame): Promise<SelectGame> {
    const [game] = await this.insert('games').values(data).returning();
    return game;
  }

  async updateGame(id: string, data: InsertGame): Promise<Maybe<SelectGame>> {
    const [game] = await this.update('games')
      .set(data)
      .where(eq(this.schema.games.gameId, id))
      .returning();
    return game;
  }

  async deleteGame(id: string): Promise<void> {
    await this.db.delete(games).where(eq(this.schema.games.gameId, id));
  }
}
