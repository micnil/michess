import {
  GameDetailsV1,
  GameVariantV1,
  LobbyGameItemV1,
  PlayerGameInfoV1,
  PlayerInfoV1,
} from '@michess/api-schema';
import { isDefined, Maybe } from '@michess/common-utils';
import { Color, Move } from '@michess/core-board';
import {
  ChessGame,
  ChessGameResult,
  ChessGameResultType,
  DrawReasonType,
  GameAction,
  GameMeta,
  GamePlayers,
  GameStatusType,
  PlayerInfo,
  TimeControlIn,
} from '@michess/core-game';
import {
  InsertGame,
  SelectGame,
  SelectGameWithRelations,
} from '@michess/infra-db';
import z from 'zod';

const TO_RESULT_TYPE_MAPPING: Record<
  SelectGameWithRelations['result'],
  ChessGameResultType
> = {
  '1-0': 'white_win',
  '0-1': 'black_win',
  '1/2-1/2': 'draw',
  '0-0': 'draw',
};

const FROM_RESULT_TYPE_MAPPING: Record<
  ChessGameResultType,
  SelectGameWithRelations['result']
> = {
  white_win: '1-0',
  black_win: '0-1',
  draw: '1/2-1/2',
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

const toGameMeta = (game: SelectGameWithRelations | SelectGame): GameMeta => ({
  id: game.gameId,
  variant: game.variant ?? 'standard',
  isPrivate: game.isPrivate,
  createdAt: game.createdAt,
  startedAt: game.startedAt ?? undefined,
  updatedAt: game.updatedAt,
});

const toPlayerInfo = (player: {
  id: string;
  name: string | null;
  rating: SelectGameWithRelations['whiteRating'];
}): PlayerInfo => ({
  id: player.id,
  name: player.name ?? 'Anonymous',
  rating: player.rating
    ? {
        deviation: player.rating.deviation,
        id: player.rating.id,
        value: player.rating.rating,
        timestamp: player.rating.timestamp,
        volatility: player.rating.volatility,
      }
    : undefined,
});

const toGamePlayers = (game: SelectGameWithRelations): GamePlayers => ({
  white: game.whitePlayer
    ? toPlayerInfo({ ...game.whitePlayer, rating: game.whiteRating })
    : undefined,
  black: game.blackPlayer
    ? toPlayerInfo({ ...game.blackPlayer, rating: game.blackRating })
    : undefined,
});

const toGameActions = (game: SelectGameWithRelations): GameAction[] => {
  return game.actions
    .map((action) => {
      const base = {
        color: action.color,
        moveNumber: action.moveNumber,
      };
      switch (action.type) {
        case 'resign':
        case 'offer_draw': {
          return { ...base, type: action.type };
        }
        case 'accept_draw':
          return {
            ...base,
            type: action.type,
            reason:
              (action.payload?.reason as DrawReasonType) ?? 'by_agreement',
          };
      }
    })
    .filter(isDefined);
};

const toPlayerInfoV1 = (player: PlayerInfo): PlayerInfoV1 => {
  return {
    id: player.id,
    name: player.name,
    rating: player.rating?.value,
    ratingDiff: player.ratingDiff,
  };
};

const toChessGameResult = ({
  result,
  endedAt,
}: SelectGame | SelectGameWithRelations): Maybe<ChessGameResult> => {
  return result !== '0-0'
    ? {
        timestamp: endedAt ? endedAt.getTime() : 0,
        type: TO_RESULT_TYPE_MAPPING[result],
      }
    : undefined;
};

const toTimeControlIn = (game: SelectGame): TimeControlIn => {
  return {
    classification: game.timeControlClassification,
    daysPerMove:
      z.object({ daysPerMove: z.number().min(0) }).safeParse(game.timeControl)
        .data?.daysPerMove ?? 0,
    incrementSec:
      z.object({ increment: z.number().min(0) }).safeParse(game.timeControl)
        .data?.increment ?? 0,
    initialSec:
      z.object({ initial: z.number().min(0) }).safeParse(game.timeControl).data
        ?.initial ?? 0,
  };
};

export const GameMapper = {
  fromSelectGame(game: SelectGame): ChessGame {
    return ChessGame.from({
      players: {
        white: undefined,
        black: undefined,
      },
      timeControl: toTimeControlIn(game),
      actionRecord: [],
      result: toChessGameResult(game),
      status: FROM_STATUS_TYPE_MAPPING[game.status],
      initialPosition: undefined,
      movesRecord: [],
      ...toGameMeta(game),
    });
  },

  fromSelectGameWithRelations(game: SelectGameWithRelations): ChessGame {
    const players = toGamePlayers(game);
    return ChessGame.from({
      ...toGameMeta(game),
      timeControl: toTimeControlIn(game),
      actionRecord: toGameActions(game),
      players,
      status: FROM_STATUS_TYPE_MAPPING[game.status],
      variant: game.variant ?? 'standard',
      isPrivate: game.isPrivate,
      initialPosition: undefined,
      result: toChessGameResult(game),
      movesRecord: game.moves.map((move) => ({
        ...Move.fromUci(move.uci),
        timestamp: move.movedAt.getTime(),
      })),
    });
  },

  toLobbyGameItemV1(game: ChessGame): LobbyGameItemV1 {
    const gameState = game.getState();
    return {
      id: gameState.id,
      opponent: gameState.players.white
        ? toPlayerInfoV1(gameState.players.white)
        : gameState.players.black
          ? toPlayerInfoV1(gameState.players.black)
          : {
              id: 'anon',
              name: 'Anonymous',
            },
      variant: gameState.variant as GameVariantV1,
      createdAt: gameState.createdAt.toISOString(),
      availableColor: !gameState.players.white
        ? 'white'
        : !gameState.players.black
          ? 'black'
          : 'spectator',
    };
  },
  toPlayerGameInfoV1(chessGame: ChessGame, playerId: string): PlayerGameInfoV1 {
    const game = chessGame.getState();
    const ownSide =
      game.players.white?.id === playerId
        ? 'white'
        : game.players.black?.id === playerId
          ? 'black'
          : 'white'; // Should not happen, but fail gracefully
    const opponent: PlayerInfo =
      ownSide === 'white'
        ? (game.players.black ?? { id: 'anon', name: 'Anonymous' })
        : (game.players.white ?? { id: 'anon', name: 'Anonymous' });
    const initialTurn = game.initialPosition.turn;
    return {
      id: game.id,
      opponent: {
        id: opponent.id,
        name: opponent.name,
      },
      ownSide,
      turn:
        game.movesRecord.length % 2 === 0
          ? initialTurn
          : Color.opposite(initialTurn),
      variant: game.variant as GameVariantV1,
      result: game.result
        ? {
            type: game.result.type,
          }
        : undefined,
    };
  },
  toGameDetailsV1(chessGame: ChessGame, isSpectator?: boolean): GameDetailsV1 {
    const game = chessGame.getState();
    const clock = chessGame.clock?.instant;
    const availableActions = isSpectator
      ? []
      : chessGame.getAdditionalActions();

    return {
      id: game.id,
      status: game.status,
      clock,
      timeControl: game.timeControl,
      players: {
        white: game.players.white
          ? {
              id: game.players.white.id,
              rating: game.players.white.rating?.value,
              ratingDiff: game.players.white.ratingDiff,
              name: game.players.white.name,
            }
          : undefined,
        black: game.players.black
          ? {
              id: game.players.black.id,
              rating: game.players.black.rating?.value,
              ratingDiff: game.players.black.ratingDiff,
              name: game.players.black.name,
            }
          : undefined,
      },
      result: game.result
        ? {
            type: game.result.type,
          }
        : undefined,
      variant: 'standard',
      isPrivate: game.isPrivate,
      actionOptions: availableActions ?? [],
      moves: game.movesRecord.map((move) => ({
        uci: Move.toUci(move),
      })),
      initialPosition: undefined,
      startedAt: game.startedAt ?? undefined,
    };
  },

  toInsertGame(chessGame: ChessGame): InsertGame {
    const game = chessGame.getState();
    return {
      isPrivate: game.isPrivate,
      whitePlayerId: game.players.white ? game.players.white.id : null,
      blackPlayerId: game.players.black ? game.players.black.id : null,
      status: TO_STATUS_TYPE_MAPPING[game.status],
      startedAt: game.startedAt ?? null,
      endedAt: game.result?.timestamp ? new Date(game.result.timestamp) : null,
      blackRatingId: game.players.black?.rating?.id ?? null,
      whiteRatingId: game.players.white?.rating?.id ?? null,
      result: game.result ? FROM_RESULT_TYPE_MAPPING[game.result.type] : '0-0',
    };
  },
};
