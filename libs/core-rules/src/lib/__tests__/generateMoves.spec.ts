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

    it('can capture en passant', () => {
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
          enPassant: true,
        },
      ]);
    });
  });

  describe('queen', () => {
    it('can move in all directions from center', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . Q . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . . . . .
      //    a b c d e f g h
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            d4: { type: 'q', color: Color.White },
          },
        })
      );
      const moves = generateMoves(context);

      expect(moves.length).toBe(27); // 7+7+7+6 (horizontal, vertical, diagonals)
      expect(moves).toEqual(
        expect.arrayContaining([
          { start: 35, target: 27, capture: false }, // up
          { start: 35, target: 43, capture: false }, // down
          { start: 35, target: 34, capture: false }, // left
          { start: 35, target: 36, capture: false }, // right
          { start: 35, target: 28, capture: false }, // up-right
          { start: 35, target: 42, capture: false }, // down-left
        ])
      );
    });

    it('cannot move through blocking pieces', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . p . . . .
      // 4  . . . Q . . . .
      // 3  . . . P . . . .
      // 2  . . . . . . . .
      // 1  . . . . . . . .
      //    a b c d e f g h
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            d4: { type: 'q', color: Color.White },
            d3: { type: 'p', color: Color.White },
            d5: { type: 'p', color: Color.Black },
          },
        })
      );

      const moves = generateMoves(context);

      // Can capture d5, but not move past it; cannot move to d3 (own piece)
      expect(moves).toEqual(
        expect.arrayContaining([
          { start: 35, target: 27, capture: true }, // capture black pawn at d5
        ])
      );
      expect(moves).not.toEqual(
        expect.arrayContaining([
          { start: 35, target: 19, capture: false }, // cannot move past d5
          { start: 35, target: 43, capture: false }, // cannot move to d3 (own piece)
        ])
      );
    });

    it('can capture diagonally', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . p . . .
      // 4  . . . Q . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . . . . .
      //    a b c d e f g h
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            d4: { type: 'q', color: Color.White },
            e5: { type: 'p', color: Color.Black },
          },
        })
      );
      const moves = generateMoves(context);
      expect(moves).toEqual(
        expect.arrayContaining([
          { start: 35, target: 28, capture: true }, // capture on e5
        ])
      );
    });
  });

  describe('knight', () => {
    it('can move in L-shape from center', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . N . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . . . . .
      //    a b c d e f g h
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            d4: { type: 'n', color: Color.White },
          },
        })
      );
      const moves = generateMoves(context);
      expect(moves).toEqual(
        expect.arrayContaining([
          { start: 35, target: 18, capture: false }, // b5
          { start: 35, target: 20, capture: false }, // b3
          { start: 35, target: 25, capture: false }, // c6
          { start: 35, target: 29, capture: false }, // e6
          { start: 35, target: 41, capture: false }, // c2
          { start: 35, target: 45, capture: false }, // e2
          { start: 35, target: 50, capture: false }, // f3
          { start: 35, target: 52, capture: false }, // f5
        ])
      );
    });

    it('can capture enemy pieces', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . p . . . p . .
      // 4  . . . N . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . . . . .
      //    a b c d e f g h
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            d4: { type: 'n', color: Color.White },
            b5: { type: 'p', color: Color.Black },
            f5: { type: 'p', color: Color.Black },
          },
        })
      );
      const moves = generateMoves(context);
      expect(moves).toEqual(
        expect.arrayContaining([
          { start: 35, target: 25, capture: true }, // capture on b5
          { start: 35, target: 29, capture: true }, // capture on f5
        ])
      );
    });

    it('cannot move to squares occupied by own pieces', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . P . . . Q . .
      // 4  . . . N . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . . . . .
      //    a b c d e f g h
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            d4: { type: 'n', color: Color.White },
            b5: { type: 'p', color: Color.White },
            f5: { type: 'q', color: Color.White },
          },
        })
      );
      const moves = generateMoves(context);
      // Should not include moves to b5 or f5
      expect(moves).not.toEqual(
        expect.arrayContaining([
          { start: 35, target: 25, capture: false }, // b5
          { start: 35, target: 29, capture: false }, // f5
        ])
      );
    });
  });

  describe('king', () => {
    it('can move one square in any direction from center', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . K . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . . . . .
      //    a b c d e f g h
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            d4: { type: 'k', color: Color.White },
          },
        })
      );
      const moves = generateMoves(context);
      expect(moves).toEqual(
        expect.arrayContaining<Move>([
          { start: 35, target: 27, capture: false }, // up
          { start: 35, target: 28, capture: false }, // up-right
          { start: 35, target: 36, capture: false }, // right
          { start: 35, target: 44, capture: false }, // down-right
          { start: 35, target: 43, capture: false }, // down
          { start: 35, target: 42, capture: false }, // down-left
          { start: 35, target: 34, capture: false }, // left
          { start: 35, target: 26, capture: false }, // up-left
        ])
      );
    });

    it('can capture enemy pieces', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . K p . . .
      // 3  . . p . . . . .
      // 2  . . . . . . . .
      // 1  . . . . . . . .
      //    a b c d e f g h
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            d4: { type: 'k', color: Color.White },
            e4: { type: 'p', color: Color.Black },
            c3: { type: 'p', color: Color.Black },
          },
        })
      );
      const moves = generateMoves(context);
      expect(moves).toEqual(
        expect.arrayContaining<Move>([
          { start: 35, target: 36, capture: true }, // capture on e4
          { start: 35, target: 42, capture: true }, // capture on c3
        ])
      );
    });

    it('cannot move to squares occupied by own pieces', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . K Q . . .
      // 3  . . . . P . . .
      // 2  . . . . . . . .
      // 1  . . . . . . . .
      //    a b c d e f g h
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            d4: { type: 'k', color: Color.White },
            e4: { type: 'q', color: Color.White },
            e3: { type: 'p', color: Color.White },
          },
        })
      );
      const moves = generateMoves(context);
      // Should not include moves to e4 or e3
      expect(moves).not.toEqual(
        expect.arrayContaining<Move>([
          { start: 35, target: 36, capture: false }, // e4
          { start: 35, target: 44, capture: false }, // e3
        ])
      );
    });
  });
});
