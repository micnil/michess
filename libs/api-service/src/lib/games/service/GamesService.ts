import {
  CreateGameV1,
  GameDetailsV1,
  JoinGamePayloadV1,
} from '@michess/api-schema';
import { assertDefined, isDefined, randomElement } from '@michess/common-utils';
import { ChessPosition, FenParser } from '@michess/core-board';
import { ChessGame } from '@michess/core-game';
import { GameRepository } from '@michess/infra-db';
import { Session } from '../../auth/model/Session';
import { ChessGameMapper } from '../mapper/ChessGameMapper';

export class GamesService {
  constructor(private gameRepository: GameRepository) {}

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
    const game = await this.gameRepository.findGameWithRelationsById(
      data.gameId
    );
    assertDefined(game, `Game '${data.gameId}' not found`);

    const availableSides = [
      'spectator',
      game.whitePlayerId ? null : 'white',
      game.blackPlayerId ? null : 'black',
    ].filter(isDefined);
    const sideToJoin = data.side ?? randomElement(availableSides);

    if (sideToJoin === 'spectator') {
      // Spectators can join without restrictions
      return ChessGameMapper.toGameDetailsV1(game);
    } else if (sideToJoin === 'white' && game.whitePlayerId === null) {
      await this.gameRepository.updateGame(game.gameId, {
        whitePlayerId: session.userId,
        status: availableSides.includes('black') ? 'ready' : 'waiting',
      });
    } else if (sideToJoin === 'black' && game.blackPlayerId === null) {
      // Allow joining as black if the slot is empty
      await this.gameRepository.updateGame(game.gameId, {
        blackPlayerId: session.userId,
        status: availableSides.includes('white') ? 'ready' : 'waiting',
      });
    } else {
      throw new Error('Invalid side or side already taken');
    }
    const gameDetails = await this.gameRepository.findGameWithRelationsById(
      data.gameId
    );
    assertDefined(gameDetails);

    return ChessGameMapper.toGameDetailsV1(gameDetails);
  }
}
