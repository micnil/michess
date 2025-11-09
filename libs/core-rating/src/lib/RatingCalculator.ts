import { GlickoTwo } from './GlickoTwo';
import { GameResult } from './model/GameResult';
import { RatingSnapshot } from './model/RatingSnapshot';

const compute = (
  ratingSnapshot: RatingSnapshot,
  result: GameResult,
): { newRating: RatingSnapshot; diff: number } => {
  const elapsedPeriodsSinceLastUpdate =
    (Date.now() - ratingSnapshot.timestamp.getTime()) /
    (1000 * 60 * 60 * 24 * 5); // 1 period = 5 days
  const updatedRating = GlickoTwo.algorithm(
    {
      value: ratingSnapshot.value,
      deviation: ratingSnapshot.deviation,
      volatility: ratingSnapshot.volatility,
    },
    [result],
    elapsedPeriodsSinceLastUpdate,
  );
  return {
    newRating: {
      id: 0,
      timestamp: result.timestamp,
      value: updatedRating.value,
      deviation: updatedRating.deviation,
      volatility: updatedRating.volatility,
    },
    diff: Math.round(updatedRating.value - ratingSnapshot.value),
  };
};

const decay = (
  ratingSnapshot: RatingSnapshot,
  currentDate: Date,
): RatingSnapshot => {
  const elapsedPeriodsSinceLastUpdate =
    (Date.now() - ratingSnapshot.timestamp.getTime()) /
    (1000 * 60 * 60 * 24 * 5); // 1 period = 5 days
  const updatedRating = GlickoTwo.algorithm(
    {
      value: ratingSnapshot.value,
      deviation: ratingSnapshot.deviation,
      volatility: ratingSnapshot.volatility,
    },
    [],
    elapsedPeriodsSinceLastUpdate,
  );
  return {
    id: ratingSnapshot.id,
    timestamp: currentDate,
    value: updatedRating.value,
    deviation: updatedRating.deviation,
    volatility: updatedRating.volatility,
  };
};

export const RatingCalculator = {
  compute,
  decay,
};
