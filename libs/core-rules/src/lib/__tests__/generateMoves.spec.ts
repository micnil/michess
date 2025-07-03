import { Color, createGameStateMock, p, P } from '@michess/core-models';
import { Move } from '../model/Move';
import { generateMoves } from '../generateMoves';
import { MoveGeneratorContext } from '../model/MoveGeneratorContext';

describe('generateMoves', () => {
  describe('pawn', () => {
    it('can move 1 square forward as white', () => {
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            c3: P,
          },
        })
      );

      const moves = generateMoves(context);

      expect(moves).toEqual<Move[]>([
        {
          capture: false,
          start: 42,
          target: 34,
        },
      ]);
    });

    it('can move 1 square forward as black', () => {
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            c3: p,
          },
          turn: Color.Black,
        })
      );

      const moves = generateMoves(context);

      expect(moves).toEqual<Move[]>([
        {
          capture: false,
          start: 42,
          target: 50,
        },
      ]);
    });

    it('can move 2 squares forward from starting position as white', () => {
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            c2: P,
          },
        })
      );

      const moves = generateMoves(context);

      expect(moves).toEqual<Move[]>([
        {
          capture: false,
          start: 50,
          target: 42,
        },
        {
          capture: false,
          start: 50,
          target: 34,
        },
      ]);
    });

    it('can capture right as white', () => {
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            c5: P,
            d6: p,
          },
        })
      );

      const moves = generateMoves(context);

      expect(moves).toEqual<Move[]>([
        {
          capture: false,
          start: 26,
          target: 18,
        },
        {
          capture: true,
          start: 26,
          target: 19,
        },
      ]);
    });

    // TODO
    it.skip('can capture en passant', () => {
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            c5: P,
            d5: p,
          },
          enPassant: 'd6',
          turn: Color.White,
        })
      );

      const moves = generateMoves(context);

      expect(moves).toEqual<Move[]>([
        {
          capture: false,
          start: 26,
          target: 18,
        },
        {
          capture: true,
          start: 26,
          target: 19,
        },
      ]);
    });
  });
});
