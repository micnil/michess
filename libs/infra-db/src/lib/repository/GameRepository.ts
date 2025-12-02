import { Maybe } from '@michess/common-utils';
import {
  GameStatusType,
  GameVariantType,
  TimeControlClassification,
} from '@michess/core-game';
import { and, asc, count, eq, gt, inArray, lt, or, sql } from 'drizzle-orm';
import { GameStatusEnum } from '../model/GameStatusEnum';
import { InsertGame } from '../model/InsertGame';
import { SelectGame } from '../model/SelectGame';
import { SelectGameWithRelations } from '../model/SelectGameWithRelations';
import { games, moves } from '../schema';
import { BaseRepository } from './BaseRepository';

type QueryOptions = {
  page?: {
    page: number;
    pageSize: number;
  };
  status?: GameStatusType[];
  playerId?: string;
  variant?: GameVariantType;
  timeControlClassification?: TimeControlClassification;
  completedAfter?: Date;
  completedBefore?: Date;
  private?: boolean;
};
type QuerySortOptions = {
  sortBy: 'createdAt' | 'endedAt';
  sortOrder: 'asc' | 'desc';
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
  async queryGames(
    options: QueryOptions,
    sortOptions?: QuerySortOptions,
  ): Promise<QueryGamesResult> {
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
    if (options.playerId) {
      andConditions.push(
        or(
          eq(games.whitePlayerId, options.playerId),
          eq(games.blackPlayerId, options.playerId),
        ),
      );
    }
    if (options.variant) {
      andConditions.push(eq(games.variant, options.variant));
    }
    if (options.timeControlClassification) {
      andConditions.push(
        eq(games.timeControlClassification, options.timeControlClassification),
      );
    }
    if (options.completedAfter) {
      andConditions.push(gt(games.endedAt, options.completedAfter));
    }
    if (options.completedBefore) {
      andConditions.push(lt(games.endedAt, options.completedBefore));
    }
    const statusFilter =
      andConditions.length > 0 ? and(...andConditions) : undefined;

    const [gamesResult, countResult] = await Promise.all([
      // Get paginated games with relations
      this.db.query.games.findMany({
        orderBy: (games, { desc }) => [
          sortOptions?.sortOrder === 'asc'
            ? asc(games[sortOptions?.sortBy || 'createdAt'])
            : desc(games[sortOptions?.sortBy || 'createdAt']),
        ],
        with: {
          whitePlayer: true,
          blackPlayer: true,
          blackRating: true,
          whiteRating: true,
          moves: {
            orderBy: moves.moveId,
          },
          actions: true,
        },
        offset: options.page
          ? (options.page.page - 1) * options.page.pageSize
          : undefined,
        limit: options.page?.pageSize,
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
        moves: {
          orderBy: moves.moveId,
        },
        whitePlayer: true,
        blackPlayer: true,
        actions: true,
        whiteRating: true,
        blackRating: true,
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
