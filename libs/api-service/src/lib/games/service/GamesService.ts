import {
  CreateGameV1,
  GameDetailsV1,
  JoinGamePayloadV1,
  LeaveGamePayloadV1,
  LobbyPageResponseV1,
  MakeMovePayloadV1,
  PaginationQueryV1,
} from '@michess/api-schema';
import { assertDefined, Maybe } from '@michess/common-utils';
import { Move } from '@michess/core-board';
import { ChessGame } from '@michess/core-game';
import { GameRepository, MoveRepository } from '@michess/infra-db';
import { Session } from '../../auth/model/Session';
import { GameDetailsMapper } from '../mapper/GameDetailsMapper';

export class GamesService {
  constructor(
    private gameRepository: GameRepository,
    private moveRepository: MoveRepository
  ) {}

  async createGame(data: CreateGameV1): Promise<GameDetailsV1> {
    const createdGame = await this.gameRepository.createGame({
      variant: 'standard',
      isPrivate: data.isPrivate ?? false,
    });
    const gameDetails = GameDetailsMapper.fromSelectGame(createdGame);
    return GameDetailsMapper.toGameDetailsV1(gameDetails);
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
      GameDetailsMapper.fromSelectGameWithRelations
    );

    return {
      items: gameDetails.map((game) =>
        GameDetailsMapper.toLobbyGameItemV1(game)
      ),
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      pageSize: games.length,
    };
  }

  async joinGame(
    session: Session,
    data: JoinGamePayloadV1
  ): Promise<GameDetailsV1> {
    const dbGame = await this.gameRepository.findGameWithRelationsById(
      data.gameId
    );
    assertDefined(dbGame, `Game '${data.gameId}' not found`);
    const gameDetails = GameDetailsMapper.fromSelectGameWithRelations(dbGame);
    const chessGame = ChessGame.fromGameState(gameDetails);

    if (data.side === 'spectator') {
      return GameDetailsMapper.toGameDetailsV1(gameDetails);
    } else {
      const updatedGame = chessGame.joinGame(
        // TODO
        { id: session.userId, name: 'Anonymous' },
        data.side
      );
      const updatedGameState = updatedGame.getState();
      await this.gameRepository.updateGame(
        gameDetails.id,
        GameDetailsMapper.toInsertGame(updatedGameState)
      );
      return GameDetailsMapper.toGameDetailsV1(updatedGameState);
    }
  }

  async leaveGame(
    session: Session,
    data: LeaveGamePayloadV1
  ): Promise<Maybe<GameDetailsV1>> {
    const dbGame = await this.gameRepository.findGameWithRelationsById(
      data.gameId
    );
    assertDefined(dbGame, `Game '${data.gameId}' not found`);
    const gameDetails = GameDetailsMapper.fromSelectGameWithRelations(dbGame);
    const chessGame = ChessGame.fromGameState(gameDetails);
    if (chessGame.isPlayerInGame(session.userId)) {
      const updatedGame = chessGame.leaveGame(session.userId);
      const updatedGameState = updatedGame.getState();
      await this.gameRepository.updateGame(
        gameDetails.id,
        GameDetailsMapper.toInsertGame(updatedGameState)
      );
      return GameDetailsMapper.toGameDetailsV1(updatedGameState);
    }
  }

  async makeMove(session: Session, data: MakeMovePayloadV1): Promise<void> {
    const dbGame = await this.gameRepository.findGameWithRelationsById(
      data.gameId
    );
    assertDefined(dbGame, `Game '${data.gameId}' not found`);
    const moveToPlay = Move.fromUci(data.uci);
    const gameDetails = GameDetailsMapper.fromSelectGameWithRelations(dbGame);
    const chessGame = ChessGame.fromGameState(gameDetails);
    const updatedGame = chessGame.play(session.userId, moveToPlay);
    const updatedGameState = updatedGame.getState();
    await this.gameRepository.updateGame(
      gameDetails.id,
      GameDetailsMapper.toInsertGame(updatedGameState)
    );
    await this.moveRepository.createMove({
      gameId: gameDetails.id,
      uci: data.uci,
    });
  }
}
