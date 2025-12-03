import { Maybe } from '@michess/common-utils';
import { Color } from '@michess/core-board';
import {
  GameResult,
  RatingCalculator,
  RatingSnapshot,
} from '@michess/core-rating';
import { ChessGameResult } from './ChessGameResult';
import { PlayerInfo } from './PlayerInfo';

export type GamePlayers = {
  white: Maybe<PlayerInfo>;
  black: Maybe<PlayerInfo>;
};

const getGameResult = (
  result: ChessGameResult,
  color: Color,
  byColor: {
    white: RatingSnapshot;
    black: RatingSnapshot;
  },
): GameResult => {
  const opponent = byColor[Color.opposite(color)];
  const timestamp = new Date(result.timestamp);

  const score = (() => {
    switch (result.type) {
      case 'white_win':
        return color === Color.White ? 1 : 0;
      case 'black_win':
        return color === Color.Black ? 1 : 0;
      case 'draw':
        return 0.5;
    }
  })();

  return { opponent, value: score, timestamp };
};

const fromResult = (
  byColor: {
    white: { id: string; name: string; rating: RatingSnapshot; isBot: boolean };
    black: { id: string; name: string; rating: RatingSnapshot; isBot: boolean };
  },
  result: ChessGameResult,
): GamePlayers => {
  const ratingsByColor = {
    white: byColor.white.rating,
    black: byColor.black.rating,
  };

  const whiteGameResult = getGameResult(result, Color.White, ratingsByColor);
  const blackGameResult = getGameResult(result, Color.Black, ratingsByColor);

  return {
    white: {
      id: byColor.white.id,
      name: byColor.white.name,
      isBot: byColor.white.isBot,
      rating: byColor.white.rating,
      ratingDiff: RatingCalculator.compute(
        byColor.white.rating,
        whiteGameResult,
      ).diff,
    },
    black: {
      id: byColor.black.id,
      name: byColor.black.name,
      isBot: byColor.black.isBot,
      rating: byColor.black.rating,
      ratingDiff: RatingCalculator.compute(
        byColor.black.rating,
        blackGameResult,
      ).diff,
    },
  };
};

const from = (
  byColor: {
    white?: {
      id: string;
      name: string;
      rating?: RatingSnapshot;
      isBot?: boolean;
    };
    black?: {
      id: string;
      name: string;
      rating?: RatingSnapshot;
      isBot?: boolean;
    };
  },
  result?: ChessGameResult,
): GamePlayers => {
  const { white, black } = byColor;

  // If we have a game result and both players have ratings, calculate rating diffs
  if (result && white?.rating && black?.rating) {
    const whiteWithRating = {
      id: white.id,
      name: white.name,
      rating: white.rating,
      isBot: white.isBot ?? false,
    };
    const blackWithRating = {
      id: black.id,
      name: black.name,
      rating: black.rating,
      isBot: black.isBot ?? false,
    };

    return fromResult(
      { white: whiteWithRating, black: blackWithRating },
      result,
    );
  }

  return {
    white: white
      ? {
          id: white.id,
          name: white.name,
          isBot: white.isBot ?? false,
          rating: white.rating,
        }
      : undefined,
    black: black
      ? {
          id: black.id,
          name: black.name,
          isBot: black.isBot ?? false,
          rating: black.rating,
        }
      : undefined,
  };
};

export const GamePlayers = {
  from,
  fromResult,

  getColor: (players: GamePlayers, playerId: string): Maybe<Color> => {
    if (players.white?.id === playerId) {
      return Color.White;
    } else if (players.black?.id === playerId) {
      return Color.Black;
    } else {
      return undefined;
    }
  },
};
