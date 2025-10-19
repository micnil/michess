import { Maybe } from '@michess/common-utils';
import { GameStatusType } from '@michess/core-game';
import { and, count, eq, inArray, lt, sql } from 'drizzle-orm';
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
  playerId?: string;
  private?: boolean;
};

type DeleteGamesOptions = {
  olderThan: Date;
  status: GameStatusType;
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
          options.status.map(GameStatusEnum.fromGameStatusType),
        ),
      );
    }
    if (typeof options.private === 'boolean') {
      andConditions.push(eq(games.isPrivate, options.private));
    }
    const statusFilter =
      andConditions.length > 0 ? and(...andConditions) : undefined;

    const [gamesResult, countResult] = await Promise.all([
      // Get paginated games with relations
      this.db.query.games.findMany({
        orderBy: (games, { desc }) => [desc(games.createdAt)],
        with: {
          whitePlayer: true,
          blackPlayer: true,
          moves: true,
          actions: true,
        },
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
    id: string,
  ): Promise<Maybe<SelectGameWithRelations>> {
    return await this.db.query.games.findFirst({
      where: eq(this.schema.games.gameId, id),
      with: {
        moves: true,
        whitePlayer: true,
        blackPlayer: true,
        actions: true,
      },
    });
  }

  async countGameStats(): Promise<{
    activeCount: number;
    todayCompletedCount: number;
    totalCount: number;
  }> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [result] = await this.db
      .select({
        activeCount: sql<number>`COUNT(CASE WHEN ${
          games.status
        } = ${GameStatusEnum.fromGameStatusType('IN_PROGRESS')} THEN 1 END)`,
        todayCompletedCount: sql<number>`COUNT(CASE WHEN ${
          games.status
        } = ${GameStatusEnum.fromGameStatusType('ENDED')} AND ${
          games.endedAt
        } > ${startOfToday.toISOString()} THEN 1 END)`,
        totalCount: count(),
      })
      .from(games)
      .execute();

    return {
      activeCount: result.activeCount,
      todayCompletedCount: result.todayCompletedCount,
      totalCount: result.totalCount,
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

  async deleteGames(options: DeleteGamesOptions): Promise<void> {
    const result = await this.db
      .delete(games)
      .where(
        and(
          eq(
            this.schema.games.status,
            GameStatusEnum.fromGameStatusType(options.status),
          ),
          lt(this.schema.games.createdAt, options.olderThan),
        ),
      );
  }
}
