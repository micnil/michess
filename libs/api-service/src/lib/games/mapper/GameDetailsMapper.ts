import { GameDetailsV1 } from '@michess/api-schema';
import { ChessPosition, Move } from '@michess/core-board';
import {
  ChessGameResultType,
  GameDetails,
  GameMeta,
  GamePlayers,
  GameStatusType,
} from '@michess/core-game';
import { InsertGame, SelectGameWithRelations } from '@michess/infra-db';

const RESULT_TYPE_MAPPING: Record<
  SelectGameWithRelations['result'],
  ChessGameResultType
> = {
  '1-0': 'white_win',
  '0-1': 'black_win',
  '1/2-1/2': 'draw',
  '0-0': 'draw',
};

const FROM_STATUS_TYPE_MAPPING: Record<
  SelectGameWithRelations['status'],
  GameStatusType
> = {
  empty: 'EMPTY',
  ready: 'READY',
  waiting: 'WAITING',
  'in-progress': 'IN_PROGRESS',
  end: 'ENDED',
};

const TO_STATUS_TYPE_MAPPING: Record<GameStatusType, InsertGame['status']> = {
  EMPTY: 'empty',
  READY: 'ready',
  WAITING: 'waiting',
  IN_PROGRESS: 'in-progress',
  ENDED: 'end',
};

const toGameMeta = (game: SelectGameWithRelations): GameMeta => ({
  id: game.gameId,
  variant: game.variant ?? 'standard',
  isPrivate: game.isPrivate,
  createdAt: game.createdAt,
  startedAt: game.startedAt ?? undefined,
  endedAt: game.endedAt ?? undefined,
  updatedAt: game.updatedAt,
});

const toGamePlayers = (game: SelectGameWithRelations): GamePlayers => ({
  white: game.whitePlayer
    ? {
        id: game.whitePlayer.id,
        name: game.whitePlayer?.name ?? 'Anonymous',
      }
    : undefined,
  black: game.blackPlayer
    ? {
        id: game.blackPlayer.id,
        name: game.blackPlayer?.name ?? 'Anonymous',
      }
    : undefined,
});

export const GameDetailsMapper = {
  fromSelectGameWithRelations(game: SelectGameWithRelations): GameDetails {
    return {
      ...toGameMeta(game),

      players: toGamePlayers(game),

      status: FROM_STATUS_TYPE_MAPPING[game.status],
      variant: game.variant ?? 'standard',
      isPrivate: game.isPrivate,
      initialPosition: ChessPosition.standardInitial(),
      result:
        game.result !== '0-0'
          ? {
              type: RESULT_TYPE_MAPPING[game.result],
            }
          : undefined,
      resultStr: game.result,
      movesRecord: game.moves.map((move) => Move.fromUci(move.uci)),
    };
  },
  toGameDetailsV1(game: GameDetails): GameDetailsV1 {
    return {
      id: game.id,
      players: {
        white: game.players.white
          ? {
              name: game.players.white.name,
            }
          : undefined,
        black: game.players.black
          ? {
              name: game.players.black.name,
            }
          : undefined,
      },
      variant: 'standard',
      isPrivate: game.isPrivate,
      moves: game.movesRecord.map((move) => ({
        uci: Move.toUci(move),
      })),
      initialPosition: undefined,
      startedAt: game.startedAt ?? undefined,
    };
  },

  toInsertGame(game: GameDetails): InsertGame {
    return {
      isPrivate: game.isPrivate,
      whitePlayerId: game.players.white ? game.players.white.id : null,
      blackPlayerId: game.players.black ? game.players.black.id : null,
      status: TO_STATUS_TYPE_MAPPING[game.status],
      startedAt: game.startedAt ?? null,
      endedAt: game.endedAt ?? null,
    };
  },
};
