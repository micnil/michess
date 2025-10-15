import {
  CreateGameV1,
  GameDetailsV1,
  JoinGamePayloadV1,
  LeaveGamePayloadV1,
  LobbyPageResponseV1,
  MakeActionPayloadV1,
  MakeMovePayloadV1,
  PaginationQueryV1,
  PlayerGameInfoPageResponseV1,
  PlayerGameInfoQueryV1,
} from '@michess/api-schema';
import { assertDefined, Maybe } from '@michess/common-utils';
import { Move } from '@michess/core-board';
import { ChessGame, GameActionIn } from '@michess/core-game';
import {
  ActionRepository,
  GameRepository,
  MoveRepository,
} from '@michess/infra-db';
import { Session } from '../../auth/model/Session';
import { PageResponseMapper } from '../../mapper/PageResponseMapper';
import { GameDetailsMapper } from '../mapper/GameDetailsMapper';

export class GamesService {
  constructor(
    private gameRepository: GameRepository,
    private moveRepository: MoveRepository,
    private actionRepository: ActionRepository,
  ) {}

  async createGame(data: CreateGameV1): Promise<GameDetailsV1> {
    const createdGame = await this.gameRepository.createGame({
      variant: 'standard',
      isPrivate: data.isPrivate ?? false,
    });
    const gameDetails = GameDetailsMapper.fromSelectGame(createdGame);
    return GameDetailsMapper.toGameDetailsV1({ game: gameDetails });
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
    const gameDetails = games.map(
      GameDetailsMapper.fromSelectGameWithRelations,
    );

    return PageResponseMapper.toPageResponse({
      data: gameDetails.map((game) =>
        GameDetailsMapper.toLobbyGameItemV1(game),
      ),
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
    const gameDetails = games.map(
      GameDetailsMapper.fromSelectGameWithRelations,
    );

    return PageResponseMapper.toPageResponse({
      data: gameDetails.map((game) =>
        GameDetailsMapper.toPlayerGameInfoV1(game, userId),
      ),
      limit,
      totalItems: totalCount,
      page,
    });
  }

  async joinGame(
    session: Session,
    data: JoinGamePayloadV1,
  ): Promise<GameDetailsV1> {
    const dbGame = await this.gameRepository.findGameWithRelationsById(
      data.gameId,
    );
    assertDefined(dbGame, `Game '${data.gameId}' not found`);
    const gameDetails = GameDetailsMapper.fromSelectGameWithRelations(dbGame);
    const chessGame = ChessGame.fromGameState(gameDetails);

    if (data.side === 'spectator') {
      return GameDetailsMapper.toGameDetailsV1({ game: gameDetails });
    } else {
      const updatedGame = chessGame.joinGame(
        // TODO
        { id: session.userId, name: 'Anonymous' },
        data.side,
      );
      const updatedGameState = updatedGame.getState();
      await this.gameRepository.updateGame(
        gameDetails.id,
        GameDetailsMapper.toInsertGame(updatedGameState),
      );
      return GameDetailsMapper.toGameDetailsV1({
        game: updatedGameState,
        availableActions: updatedGame.getAdditionalActions(),
      });
    }
  }

  async leaveGame(
    session: Session,
    data: LeaveGamePayloadV1,
  ): Promise<Maybe<GameDetailsV1>> {
    const dbGame = await this.gameRepository.findGameWithRelationsById(
      data.gameId,
    );
    assertDefined(dbGame, `Game '${data.gameId}' not found`);
    const gameDetails = GameDetailsMapper.fromSelectGameWithRelations(dbGame);
    const chessGame = ChessGame.fromGameState(gameDetails);
    if (chessGame.isPlayerInGame(session.userId)) {
      const updatedGame = chessGame.leaveGame(session.userId);
      const updatedGameState = updatedGame.getState();

      await this.gameRepository.updateGame(
        gameDetails.id,
        GameDetailsMapper.toInsertGame(updatedGameState),
      );
      return GameDetailsMapper.toGameDetailsV1({
        game: updatedGameState,
        availableActions: updatedGame.getAdditionalActions(),
      });
    }
  }

  async makeMove(
    session: Session,
    data: MakeMovePayloadV1,
  ): Promise<Maybe<GameDetailsV1>> {
    const dbGame = await this.gameRepository.findGameWithRelationsById(
      data.gameId,
    );
    assertDefined(dbGame, `Game '${data.gameId}' not found`);
    const moveToPlay = Move.fromUci(data.uci);
    const gameDetails = GameDetailsMapper.fromSelectGameWithRelations(dbGame);
    const chessGame = ChessGame.fromGameState(gameDetails);
    const updatedGame = chessGame.play(session.userId, moveToPlay);
    const updatedGameState = updatedGame.getState();

    await this.moveRepository.createMove({
      gameId: gameDetails.id,
      uci: data.uci,
    });

    if (
      chessGame.hasNewStatus(updatedGame) ||
      chessGame.hasNewActionOptions(updatedGame)
    ) {
      await this.gameRepository.updateGame(
        gameDetails.id,
        GameDetailsMapper.toInsertGame(updatedGameState),
      );
      return GameDetailsMapper.toGameDetailsV1({
        game: updatedGameState,
        availableActions: updatedGame.getAdditionalActions(),
      });
    } else {
      return undefined;
    }
  }

  async makeAction(
    session: Session,
    data: MakeActionPayloadV1,
  ): Promise<GameDetailsV1> {
    const dbGame = await this.gameRepository.findGameWithRelationsById(
      data.gameId,
    );
    const gameActionIn: GameActionIn = {
      type: data.action.type,
    };
    assertDefined(dbGame, `Game '${data.gameId}' not found`);
    const gameDetails = GameDetailsMapper.fromSelectGameWithRelations(dbGame);
    const chessGame = ChessGame.fromGameState(gameDetails);
    const updatedGame = chessGame.makeAction(session.userId, gameActionIn);
    const updatedGameState = updatedGame.getState();
    await this.gameRepository.updateGame(
      gameDetails.id,
      GameDetailsMapper.toInsertGame(updatedGameState),
    );
    const action = updatedGameState.actionRecord.at(-1);
    action &&
      (await this.actionRepository.createAction(gameDetails.id, action));
    return GameDetailsMapper.toGameDetailsV1({
      game: updatedGameState,
      availableActions: updatedGame.getAdditionalActions(),
    });
  }
}
