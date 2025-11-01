import { Maybe } from '@michess/common-utils';
import { GameResult } from './model/GameResult';
import { Player } from './model/Player';

const TAO = 0.5;
const GLICKO_SCALE_DENOMINATOR = 173.7178;
const DEFAULT_PLAYER: Player = {
  rating: 1500,
  deviation: 350,
  volatility: 0.06,
};

const convertRatingToGlickoScale = (rating: number) => {
  return (rating - 1500) / GLICKO_SCALE_DENOMINATOR;
};
const convertDeviationToGlickoScale = (deviation: number) => {
  return deviation / GLICKO_SCALE_DENOMINATOR;
};
const convertToGlickoScale = (player: Player): { phi: number; mu: number } => {
  return {
    mu: convertRatingToGlickoScale(player.rating),
    phi: convertDeviationToGlickoScale(player.deviation),
  };
};

const convertRatingFromGlickoScale = (glickoRating: number) => {
  return glickoRating * GLICKO_SCALE_DENOMINATOR + 1500;
};
const convertDeviationFromGlickoScale = (glickoDeviation: number) => {
  return glickoDeviation * GLICKO_SCALE_DENOMINATOR;
};
const convertFromGlickoScale = (
  glickoRating: number,
  glickoDeviation: number,
): { rating: number; deviation: number } => {
  return {
    rating: convertRatingFromGlickoScale(glickoRating),
    deviation: convertDeviationFromGlickoScale(glickoDeviation),
  };
};

const g = (glickoDeviation: number) => {
  return (
    1 / Math.sqrt(1 + (3 * Math.pow(glickoDeviation, 2)) / Math.pow(Math.PI, 2))
  );
};

const E = (
  playerGlickoRating: number,
  opponentGlickoRating: number,
  opponentGlickoDeviation: number,
) => {
  return (
    1 /
    (1 +
      Math.exp(
        -g(opponentGlickoDeviation) *
          (playerGlickoRating - opponentGlickoRating),
      ))
  );
};

const f = (
  delta: number,
  phi: number,
  upsilon: number,
  sigma: number,
): ((x: number) => number) => {
  const a = Math.log(Math.pow(sigma, 2));
  return (x: number) => {
    const ex = Math.exp(x);
    const numerator =
      ex * (Math.pow(delta, 2) - Math.pow(phi, 2) - upsilon - ex);
    const denominator = 2 * Math.pow(Math.pow(phi, 2) + upsilon + ex, 2);
    return numerator / denominator - (x - a) / Math.pow(TAO, 2);
  };
};

const algorithm = (player: Maybe<Player>, gameResults: GameResult[]) => {
  const actualPlayer = player || DEFAULT_PLAYER;

  const { rating, deviation, volatility } = actualPlayer;

  // Step 2: Convert to Glicko-2 scale
  const { phi, mu } = convertToGlickoScale(actualPlayer);
  const siigma = volatility;

  // Step 3: Compute the estimated variance
  const upsilon =
    1 /
    gameResults.reduce((sum, gameResult) => {
      const opponentPlayer = convertToGlickoScale(gameResult.opponent);
      const EValue = E(mu, opponentPlayer.mu, opponentPlayer.phi);
      return sum + Math.pow(g(opponentPlayer.phi), 2) * EValue * (1 - EValue);
    }, 0);

  // Step 4: Compute the estimated rating improvement
  const delta =
    upsilon *
    gameResults.reduce((sum, gameResult) => {
      const opponentPlayer = convertToGlickoScale(gameResult.opponent);
      const EValue = E(mu, opponentPlayer.mu, opponentPlayer.phi);
      return sum + g(opponentPlayer.phi) * (gameResult.score - EValue);
    }, 0);

  // Step 5: Determine new volatility
  const fFunction = f(delta, phi, upsilon, siigma);
  const deltaSquared = Math.pow(delta, 2);
  const phiSquared = Math.pow(phi, 2);
  let alpha = Math.log(Math.pow(siigma, 2));

  const iterateKappa = (kappa: number): number => {
    if (fFunction(alpha - kappa * TAO) < 0) {
      return iterateKappa(kappa + 1);
    } else {
      return kappa;
    }
  };

  let beta =
    deltaSquared > phiSquared + upsilon
      ? Math.log(deltaSquared - phiSquared - upsilon)
      : alpha - iterateKappa(1) * TAO;
  let fAlpha = fFunction(alpha);
  let fBeta = fFunction(beta);

  const EPSILON = 0.000001;

  while (Math.abs(beta - alpha) > EPSILON) {
    const c = alpha + ((alpha - beta) * fAlpha) / (fBeta - fAlpha);
    const fC = fFunction(c);
    if (fC * fBeta < 0) {
      alpha = beta;
      fAlpha = fBeta;
    } else {
      fAlpha = fAlpha / 2;
    }
    beta = c;
    fBeta = fC;
  }
  const newSigma = Math.exp(alpha / 2);

  // Step 6: Update deviation to new pre-rating deviation
  const phiStar = Math.sqrt(Math.pow(phi, 2) + Math.pow(newSigma, 2));

  // Step 7: Update ratomg and deviation
  const newPhi = 1 / Math.sqrt(1 / Math.pow(phiStar, 2) + 1 / upsilon);
  const newMu =
    mu +
    Math.pow(newPhi, 2) *
      gameResults.reduce((sum, gameResult) => {
        const opponentPlayer = convertToGlickoScale(gameResult.opponent);
        const EValue = E(mu, opponentPlayer.mu, opponentPlayer.phi);
        return sum + g(opponentPlayer.phi) * (gameResult.score - EValue);
      }, 0);

  const { rating: newRating, deviation: newDeviation } = convertFromGlickoScale(
    newMu,
    newPhi,
  );

  return {
    rating: newRating,
    deviation: newDeviation,
    volatility: newSigma,
  };
};

export const GlickoTwo = {
  algorithm,
};
