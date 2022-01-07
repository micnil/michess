import { Color, createGameStateMock, p, P } from '@michess/core-models';
import { Move } from '../model/Move';
import { Rules } from '../Rules';

describe('Rules', () => {
  describe('pawn', () => {
    it('can move 1 square forward as white', () => {
      const rules = Rules(
        createGameStateMock({
          pieces: {
            c3: P,
          },
        })
      );

      const moves = rules.getMoves();

      expect(moves).toEqual([
        {
          capture: false,
          start: 42,
          target: 34,
        } as Move,
      ]);
    });

    it('can move 1 square forward as black', () => {
      const rules = Rules(
        createGameStateMock({
          pieces: {
            c3: p,
          },
        })
      );

      const moves = rules.getMoves();

      expect(moves).toEqual([
        {
          capture: false,
          start: 42,
          target: 50,
        } as Move,
      ]);
    });

    it('can move 2 squares forward from starting position as white', () => {
      const rules = Rules(
        createGameStateMock({
          pieces: {
            c2: P,
          },
        })
      );

      const moves = rules.getMoves();

      expect(moves).toEqual([
        {
          capture: false,
          start: 50,
          target: 42,
        } as Move,
        {
          capture: false,
          start: 50,
          target: 34,
        } as Move,
      ]);
    });

    it('can capture en passant', () => {
      const rules = Rules(
        createGameStateMock({
          pieces: {
            c5: P,
            d5: p
          },
          enPassant: 'd6',
          turn: Color.White
        }),
      );

      const moves = rules.getMoves();

      expect(moves).toEqual([
        {
          capture: false,
          start: 26,
          target: 18,
        } as Move,
        {
          capture: false,
          start: 26,
          target: 19,
        } as Move,
      ]);
    })
  });
});
