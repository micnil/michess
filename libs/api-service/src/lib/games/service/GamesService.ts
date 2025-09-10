import {
  CreateGameV1,
  GameDetailsV1,
  JoinGamePayloadV1,
  MakeMovePayloadV1,
} from '@michess/api-schema';
import { assertDefined } from '@michess/common-utils';
import { ChessPosition, FenParser, Move } from '@michess/core-board';
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
    const initialPosition = ChessPosition.standardInitial();
    const createdGame = await this.gameRepository.createGame({
      variant: 'standard',
    });

    return {
      variant: createdGame.variant ?? 'standard',
      id: createdGame.gameId,
      isPrivate: data.isPrivate ?? false,
      initialPosition: FenParser.toFenStr(initialPosition),
      players: {
        black: undefined,
        white: undefined,
      },
      moves: [],
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
