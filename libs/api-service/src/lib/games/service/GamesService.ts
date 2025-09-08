import {
  CreateGameV1,
  GameDetailsV1,
  JoinGamePayloadV1,
  MakeMovePayloadV1,
} from '@michess/api-schema';
import { assertDefined, isDefined, randomElement } from '@michess/common-utils';
import { ChessPosition, FenParser } from '@michess/core-board';
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
    const game = ChessGame.fromChessPosition(initialPosition);
    const state = game.getState();
    const createdGame = await this.gameRepository.createGame({
      variant: 'standard',
    });

    return {
      variant: createdGame.variant ?? 'standard',
      id: createdGame.gameId,
      isPrivate: data.isPrivate ?? false,
      initialPosition: FenParser.toFenStr(state.initialPosition),
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

    const availableSides = [
      'spectator',
      gameDetails.players.white ? null : 'white',
      gameDetails.players.black ? null : 'black',
    ].filter(isDefined);
    const sideToJoin = data.side ?? randomElement(availableSides);

    if (sideToJoin === 'spectator') {
      // Spectators can join without restrictions
      return GameDetailsMapper.toGameDetailsV1(gameDetails);
    } else if (sideToJoin === 'white' && dbGame.whitePlayerId === null) {
      await this.gameRepository.updateGame(gameDetails.id, {
        whitePlayerId: session.userId,
        status: availableSides.includes('black') ? 'ready' : 'waiting',
      });
    } else if (sideToJoin === 'black' && gameDetails.players.black === null) {
      // Allow joining as black if the slot is empty
      await this.gameRepository.updateGame(gameDetails.id, {
        blackPlayerId: session.userId,
        status: availableSides.includes('white') ? 'ready' : 'waiting',
      });
    } else {
      throw new Error('Invalid side or side already taken');
    }
    const updatedGame = await this.gameRepository.findGameWithRelationsById(
      gameDetails.id
    );
    assertDefined(updatedGame);
    const updatedGameDetails =
      GameDetailsMapper.fromSelectGameWithRelations(updatedGame);

    return GameDetailsMapper.toGameDetailsV1(updatedGameDetails);
  }

  async makeMove(session: Session, data: MakeMovePayloadV1): Promise<void> {
    throw new Error('Not implemented yet');
  }
}
