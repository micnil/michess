import {
  CreateGameV1,
  GameDetailsV1,
  JoinGamePayloadV1,
  MakeMovePayloadV1,
} from '@michess/api-schema';
import { assertDefined } from '@michess/common-utils';
import { ChessPosition, FenParser } from '@michess/core-board';
import { ChessTable } from '@michess/core-game';
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
    const chessTable = ChessTable.fromGameDetails(gameDetails);
    if (data.side === 'spectator') {
      return GameDetailsMapper.toGameDetailsV1(gameDetails);
    } else {
      const updatedTable = chessTable.joinGame(
        // TODO
        { id: session.userId, name: 'Anonymous' },
        data.side
      );
      const updatedDetails = updatedTable.getGameDetails();
      await this.gameRepository.updateGame(
        gameDetails.id,
        GameDetailsMapper.toInsertGame(updatedDetails)
      );
      return GameDetailsMapper.toGameDetailsV1(updatedDetails);
    }
  }

  async makeMove(session: Session, data: MakeMovePayloadV1): Promise<void> {
    throw new Error('Not implemented yet');
  }
}
