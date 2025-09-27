import { Maybe } from '@michess/common-utils';
import { GameStatusType } from '@michess/core-game';
import { and, count, eq, gt, inArray } from 'drizzle-orm';
import { GameStatusEnum } from '../model/GameStatusEnum';
import { InsertGame } from '../model/InsertGame';
import { SelectGame } from '../model/SelectGame';
import { SelectGameWithRelations } from '../model/SelectGameWithRelations';
import { games } from '../schema';
import { BaseRepository } from './BaseRepository';

type QueryOptions = {
  page: {
    page: number;
    pageSize: number;
  };
  status?: GameStatusType[];
  private?: boolean;
};

type QueryGamesResult = {
  games: SelectGameWithRelations[];
  totalCount: number;
};
export class GameRepository extends BaseRepository {
  async findGameById(id: string): Promise<Maybe<SelectGame>> {
    return this.db.query.games.findFirst({
      where: eq(this.schema.games.gameId, id),
    });
  }

  async queryGames(options: QueryOptions): Promise<QueryGamesResult> {
    // Build the where condition for reuse
    const andConditions = [];
    if (options.status) {
      andConditions.push(
        inArray(
          games.status,
          options.status.map(GameStatusEnum.fromGameStatusType)
        )
      );
    }
    if (typeof options.private === 'boolean') {
      andConditions.push(eq(games.isPrivate, options.private));
    }
    const statusFilter =
      andConditions.length > 0 ? and(...andConditions) : undefined;

    // Execute both queries in parallel for efficiency
    const [gamesResult, countResult] = await Promise.all([
      // Get paginated games with relations
      this.db.query.games.findMany({
        orderBy: (games, { desc }) => [desc(games.createdAt)],
        with: { whitePlayer: true, blackPlayer: true, moves: true },
        offset: (options.page.page - 1) * options.page.pageSize,
        limit: options.page.pageSize,
        where: statusFilter,
      }),
      // Get total count with same filter
      this.db.select({ count: count() }).from(games).where(statusFilter),
    ]);

    return {
      games: gamesResult,
      totalCount: countResult[0].count,
    };
  }

  async findGameWithRelationsById(
    id: string
  ): Promise<Maybe<SelectGameWithRelations>> {
    return await this.db.query.games.findFirst({
      where: eq(this.schema.games.gameId, id),
      with: { moves: true, whitePlayer: true, blackPlayer: true },
    });
  }

  async countActiveGames(): Promise<{ count: number }> {
    return {
      count:
        (
          await this.db
            .select({ count: count() })
            .from(games)
            .where(eq(games.status, 'in-progress'))
            .execute()
        )[0]?.count ?? 0,
    };
  }

  async countTodaysCompletedGames(): Promise<{ count: number }> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    return {
      count:
        (
          await this.db
            .select({ count: count() })
            .from(games)
            .where(
              and(eq(games.status, 'end'), gt(games.endedAt, startOfToday))
            )
            .execute()
        )[0]?.count ?? 0,
    };
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
