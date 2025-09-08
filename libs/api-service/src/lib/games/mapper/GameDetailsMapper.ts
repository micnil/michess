import { GameDetailsV1 } from '@michess/api-schema';
import { ChessPosition, Move } from '@michess/core-board';
import {
  ChessGameResultType,
  GameDetails,
  GameMeta,
  GamePlayers,
  GameStatusType,
} from '@michess/core-game';
import { SelectGameWithRelations } from '@michess/infra-db';

const RESULT_TYPE_MAPPING: Record<
  SelectGameWithRelations['result'],
  ChessGameResultType
> = {
  '1-0': 'white_win',
  '0-1': 'black_win',
  '1/2-1/2': 'draw',
  '0-0': 'draw',
};

const STATUS_TYPE_MAPPING: Record<
  SelectGameWithRelations['status'],
  GameStatusType
> = {
  empty: 'EMPTY',
  ready: 'READY',
  waiting: 'WAITING',
  'in-progress': 'IN_PROGRESS',
  end: 'ENDED',
};

const toGameMeta = (game: SelectGameWithRelations): GameMeta => ({
  id: game.gameId,
  variant: game.variant ?? 'standard',
  isPrivate: game.isPrivate,
  createdAt: game.createdAt,
  startedAt: game.startedAt ?? undefined,
  endedAt: game.endedAt ?? undefined,
  updatedAt: game.updatedAt,
  status: STATUS_TYPE_MAPPING[game.status],
});

const toGamePlayers = (game: SelectGameWithRelations): GamePlayers => ({
  players: {
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
  },
});

export const GameDetailsMapper = {
  fromSelectGameWithRelations(game: SelectGameWithRelations): GameDetails {
    return {
      ...toGameMeta(game),
      ...toGamePlayers(game),
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
      moveHistory: game.moves.map((move) => Move.fromUci(move.uci)),
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
      moves: game.moveHistory.map((move) => ({
        uci: Move.toUci(move),
      })),
      initialPosition: undefined,
      startedAt: game.startedAt ?? undefined,
    };
  },
};
