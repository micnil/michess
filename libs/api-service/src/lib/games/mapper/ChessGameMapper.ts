import { GameDetailsV1 } from '@michess/api-schema';
import { SelectGameWithRelations } from '@michess/infra-db';

export const ChessGameMapper = {
  toGameDetailsV1(game: SelectGameWithRelations): GameDetailsV1 {
    return {
      id: game.gameId,
      players: {
        white: game.whitePlayer
          ? {
              name: game.whitePlayer?.name ?? 'Anonymous',
            }
          : undefined,
        black: game.blackPlayer
          ? {
              name: game.blackPlayer?.name ?? 'Anonymous',
            }
          : undefined,
      },
      variant: game.variant ?? 'standard',
      isPrivate: game.isPrivate,
      moves: game.moves.map((move) => ({
        uci: move.uci,
      })),
      initialPosition: undefined,
      startedAt: game.startedAt ?? undefined,
    };
  },
};
