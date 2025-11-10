export type Rating = {
  value: number;
  deviation: number;
  volatility: number;
};

const DEFAULT_RATING: Rating = {
  value: 1500,
  deviation: 350,
  volatility: 0.06,
};
export const Rating = {
  default: (): Rating => DEFAULT_RATING,
};
