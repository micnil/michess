import { Maybe } from '@michess/common-utils';
import { eq } from 'drizzle-orm';
import { InsertGame } from '../model/InsertGame';
import { SelectGame } from '../model/SelectGame';
import { SelectGameWithRelations } from '../model/SelectGameWithRelations';
import { games } from '../schema';
import { BaseRepository } from './BaseRepository';

export class GameRepository extends BaseRepository {
  async findGameById(id: string): Promise<Maybe<SelectGame>> {
    return this.db.query.games.findFirst({
      where: eq(this.schema.games.gameId, id),
    });
  }

  async findGameWithRelationsById(
    id: string
  ): Promise<Maybe<SelectGameWithRelations>> {
    return await this.db.query.games.findFirst({
      where: eq(this.schema.games.gameId, id),
      with: { moves: true, whitePlayer: true, blackPlayer: true },
    });
  }

  async createGame(data: InsertGame): Promise<SelectGame> {
    const [game] = await this.db.insert(games).values(data).returning();
    return game;
  }

  async updateGame(id: string, data: InsertGame): Promise<Maybe<SelectGame>> {
    const [game] = await this.db
      .update(games)
      .set(data)
      .where(eq(this.schema.games.gameId, id))
      .returning();
    return game;
  }

  async deleteGame(id: string): Promise<void> {
    await this.db.delete(games).where(eq(this.schema.games.gameId, id));
  }
}
