import { GlickoTwo } from '../GlickoTwo';
import { Player } from '../model/Player';
describe('GlickoTwo', () => {
  it('should handle the example calculation from the report', () => {
    const player: Player = {
      rating: 1500,
      deviation: 200,
      volatility: 0.06,
    };
    const result = GlickoTwo.algorithm(player, [
      { opponent: { rating: 1400, deviation: 30, volatility: 0.06 }, score: 1 },
      {
        opponent: { rating: 1550, deviation: 100, volatility: 0.06 },
        score: 0,
      },
      {
        opponent: { rating: 1700, deviation: 300, volatility: 0.06 },
        score: 0,
      },
    ]);

    // Paper results are 1464.06, but it is not correct due to
    // rounding in the intermediate steps:
    // https://github.com/andriykuba/scala-glicko2?tab=readme-ov-file#precision
    expect(result.rating.toFixed(2)).toBe('1464.05');
    expect(result.deviation.toFixed(2)).toBe('151.52');
    expect(result.volatility).toBeCloseTo(0.05999, 4);
  });

  it('should handle a player with no games played', () => {
    const player: Player = {
      rating: 1500,
      deviation: 60,
      volatility: 0.06,
    };
    const result = GlickoTwo.algorithm(player, [], 50);

    expect(result.rating).toBe(1500);
    expect(result.deviation).toBeCloseTo(95, 1);
    expect(result.volatility).toBe(0.06);
  });
});
