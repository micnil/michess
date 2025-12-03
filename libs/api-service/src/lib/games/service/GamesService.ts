import {
  CreateChallengeV1,
  CreateGameV1,
  GameDetailsV1,
  LobbyPageResponseV1,
  PaginationQueryV1,
  PlayerGameInfoPageResponseV1,
  PlayerGameInfoQueryV1,
} from '@michess/api-schema';
import { TimeControlClassification } from '@michess/core-game';
import {
  GameRepository,
  InsertGame,
  TimeControlJsonB,
  UserRepository,
} from '@michess/infra-db';
import { PageResponseMapper } from '../../mapper/PageResponseMapper';
import { GameMapper } from '../mapper/GameMapper';
import { PlayerInfoIn } from '../model/PlayerInfoIn';
import { GameplayService } from './GameplayService';

export class GamesService {
  constructor(
    private gameRepository: GameRepository,
    private userRepository: UserRepository,
    private gameplayService: GameplayService,
  ) {}

  async createGame(data: CreateGameV1): Promise<GameDetailsV1> {
    const {
      timeControlClassification,
      timeControl,
    }: {
      timeControlClassification: InsertGame['timeControlClassification'];
      timeControl: TimeControlJsonB | null;
    } =
      data.timeControl?.type === 'realtime'
        ? {
            timeControlClassification: TimeControlClassification.fromRealtime(
              data.timeControl.initialSec,
              data.timeControl.incrementSec,
            ),
            timeControl: {
              initial: data.timeControl.initialSec,
              increment: data.timeControl.incrementSec,
            },
          }
        : data.timeControl?.type === 'correspondence'
          ? {
              timeControlClassification: 'correspondence',
              timeControl: {
                daysPerMove: data.timeControl.daysPerMove,
              },
            }
          : {
              timeControlClassification: 'no_clock',
              timeControl: null,
            };
    const createdGame = await this.gameRepository.createGame({
      variant: data.variant,
      isPrivate: data.isPrivate ?? false,
      timeControlClassification,
      timeControl,
    });

    const chessGame = GameMapper.fromSelectGame(createdGame);
    return GameMapper.toGameDetailsV1(chessGame);
  }

  async queryLobby(query: PaginationQueryV1): Promise<LobbyPageResponseV1> {
    const { page, limit } = query;
    const { games, totalCount } = await this.gameRepository.queryGames({
      page: {
        page,
        pageSize: limit,
      },
      status: ['WAITING'],
      private: false,
    });
    const chessGames = games.map(GameMapper.fromSelectGameWithRelations);

    return PageResponseMapper.toPageResponse({
      data: chessGames.map((game) => GameMapper.toLobbyGameItemV1(game)),
      limit,
      totalItems: totalCount,
      page,
    });
  }

  async queryPlayerGames(
    userId: string,
    query: PlayerGameInfoQueryV1,
  ): Promise<PlayerGameInfoPageResponseV1> {
    const { page, limit } = query;
    const { games, totalCount } = await this.gameRepository.queryGames({
      page: {
        page,
        pageSize: limit,
      },
      playerId: userId,
      status: query.status ? [query.status] : ['ENDED', 'IN_PROGRESS'],
    });
    const gameDetails = games.map(GameMapper.fromSelectGameWithRelations);

    return PageResponseMapper.toPageResponse({
      data: gameDetails.map((game) =>
        GameMapper.toPlayerGameInfoV1(game, userId),
      ),
      limit,
      totalItems: totalCount,
      page,
    });
  }

  async createChallenge(
    playerInfoIn: PlayerInfoIn,
    request: CreateChallengeV1,
  ): Promise<GameDetailsV1> {
    const opponent = await this.userRepository.findUserById(request.opponentId);
    if (!opponent) {
      throw new Error('Opponent not found');
    }
    if (opponent.role !== 'bot') {
      throw new Error('Can only challenge bots at this time');
    }

    const gameDetails = await this.createGame({
      variant: request.variant ?? 'standard',
      isPrivate: true,
      timeControl: request.timeControl,
    });

    await this.gameplayService.joinGame(playerInfoIn, {
      gameId: gameDetails.id,
      side: request.playerColor,
    });
    const updatedGameDetails = await this.gameplayService.joinGame(
      {
        id: opponent.id,
        name: opponent.name,
        role: opponent.role,
      },
      {
        gameId: gameDetails.id,
      },
    );

    return updatedGameDetails;
  }
}
