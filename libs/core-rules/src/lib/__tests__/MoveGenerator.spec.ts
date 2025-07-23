import {
  Color,
  createGameStateMock,
  p,
  P,
  Coordinate,
  CastlingAbility,
  CastlingRight,
  PieceType,
} from '@michess/core-models';
import { Move } from '../model/Move';
import { MoveGenerator } from '../MoveGenerator';

describe('MoveGenerator', () => {
  describe('bishop', () => {
    it('can move diagonally from center', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . B . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . . . . .
      //    a b c d e f g h
      const moveGenerator = MoveGenerator(
        createGameStateMock({
          pieces: {
            d4: { type: 'b', color: Color.White },
          },
        })
      );

      const { moves } = moveGenerator.generateMoves();

      // 7 up-right, 3 up-left, 3 down-right, 3 down-left (total 13)
      expect(moves.length).toBe(13);
      expect(moves).toEqual(
        expect.arrayContaining([
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('e5'),
            capture: false,
          },
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('c5'),
            capture: false,
          },
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('e3'),
            capture: false,
          },
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('c3'),
            capture: false,
          },
        ])
      );
    });
  });
  describe('rook', () => {
    it('can move horizontally and vertically from center', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . R . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . . . . .
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d4: { type: 'r', color: Color.White },
          },
        })
      );

      const { moves } = context.generateMoves();

      // 7 squares up, 7 down, 3 left, 4 right (total 21)
      expect(moves.length).toBe(14);
      expect(moves).toEqual(
        expect.arrayContaining([
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('d5'),
            capture: false,
          },
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('d3'),
            capture: false,
          },
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('c4'),
            capture: false,
          },
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('e4'),
            capture: false,
          },
        ])
      );
    });
  });
  describe('pawn', () => {
    it('can move 1 square forward as white', () => {
      const moveGenerator = MoveGenerator(
        createGameStateMock({
          pieces: {
            c3: P,
          },
        })
      );

      const { moves } = moveGenerator.generateMoves();

      expect(moves).toEqual<Move[]>([
        {
          capture: false,
          start: Coordinate.toIndex('c3'),
          target: Coordinate.toIndex('c4'),
        },
      ]);
    });

    it('can move 1 square forward as black', () => {
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            c3: p,
          },
          turn: Color.Black,
        })
      );

      const { moves } = context.generateMoves();

      expect(moves).toEqual<Move[]>([
        {
          capture: false,
          start: Coordinate.toIndex('c3'),
          target: Coordinate.toIndex('c2'),
        },
      ]);
    });

    it('can move 2 squares forward from starting position as white', () => {
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            c2: P,
          },
        })
      );

      const { moves } = context.generateMoves();

      expect(moves).toEqual<Move[]>([
        {
          capture: false,
          start: Coordinate.toIndex('c2'),
          target: Coordinate.toIndex('c3'),
        },
        {
          capture: false,
          start: Coordinate.toIndex('c2'),
          target: Coordinate.toIndex('c4'),
        },
      ]);
    });

    it('can capture right as white', () => {
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            c5: P,
            d6: p,
          },
        })
      );

      const { moves } = context.generateMoves();

      expect(moves).toEqual(
        expect.arrayContaining<Move>([
          {
            capture: false,
            start: Coordinate.toIndex('c5'),
            target: Coordinate.toIndex('c6'),
          },
          {
            capture: true,
            start: Coordinate.toIndex('c5'),
            target: Coordinate.toIndex('d6'),
          },
        ])
      );
    });

    it('can capture en passant', () => {
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            c5: P,
            d5: p,
          },
          enPassant: 'd6',
          turn: Color.White,
        })
      );

      const { moves } = context.generateMoves();

      expect(moves).toEqual<Move[]>([
        {
          capture: false,
          start: Coordinate.toIndex('c5'),
          target: Coordinate.toIndex('c6'),
        },
        {
          // en-passant capture
          capture: true,
          start: Coordinate.toIndex('c5'),
          target: Coordinate.toIndex('d6'),
        },
      ]);
    });

    it('promotes when moving 1 step forward to 8th rank as white', () => {
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            e7: P,
          },
          turn: Color.White,
        })
      );

      const { moves } = context.generateMoves();

      expect(moves).toEqual(
        expect.arrayContaining([
          {
            capture: false,
            start: Coordinate.toIndex('e7'),
            target: Coordinate.toIndex('e8'),
            promotion: 'q',
          },
          {
            capture: false,
            start: Coordinate.toIndex('e7'),
            target: Coordinate.toIndex('e8'),
            promotion: 'r',
          },
          {
            capture: false,
            start: Coordinate.toIndex('e7'),
            target: Coordinate.toIndex('e8'),
            promotion: 'b',
          },
          {
            capture: false,
            start: Coordinate.toIndex('e7'),
            target: Coordinate.toIndex('e8'),
            promotion: 'n',
          },
        ])
      );
    });

    it('promotes when moving 1 step forward to 1st rank as black', () => {
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d2: p,
          },
          turn: Color.Black,
        })
      );

      const { moves } = context.generateMoves();

      expect(moves).toEqual(
        expect.arrayContaining([
          {
            capture: false,
            start: Coordinate.toIndex('d2'),
            target: Coordinate.toIndex('d1'),
            promotion: 'q',
          },
          {
            capture: false,
            start: Coordinate.toIndex('d2'),
            target: Coordinate.toIndex('d1'),
            promotion: 'r',
          },
          {
            capture: false,
            start: Coordinate.toIndex('d2'),
            target: Coordinate.toIndex('d1'),
            promotion: 'b',
          },
          {
            capture: false,
            start: Coordinate.toIndex('d2'),
            target: Coordinate.toIndex('d1'),
            promotion: 'n',
          },
        ])
      );
    });

    it('promotes with capture on 8th rank as white', () => {
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            g7: P,
            h8: p,
          },
          turn: Color.White,
        })
      );

      const { moves } = context.generateMoves();

      expect(moves).toEqual(
        expect.arrayContaining([
          {
            capture: true,
            start: Coordinate.toIndex('g7'),
            target: Coordinate.toIndex('h8'),
            promotion: 'q',
          },
          {
            capture: true,
            start: Coordinate.toIndex('g7'),
            target: Coordinate.toIndex('h8'),
            promotion: 'r',
          },
          {
            capture: true,
            start: Coordinate.toIndex('g7'),
            target: Coordinate.toIndex('h8'),
            promotion: 'b',
          },
          {
            capture: true,
            start: Coordinate.toIndex('g7'),
            target: Coordinate.toIndex('h8'),
            promotion: 'n',
          },
        ])
      );
    });

    it('cannot move if pinned vertically', () => {
      // Board:
      // 8  . . . . r . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . p . . . .
      // 4  . . . . P . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . K . . .
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            e1: { type: PieceType.King, color: Color.White },
            e4: { type: PieceType.Pawn, color: Color.White },
            d5: { type: PieceType.Pawn, color: Color.Black },
            e8: { type: PieceType.Rook, color: Color.Black },
          },
          turn: Color.White,
        })
      );
      const { moves } = context.generateMoves();
      expect(moves).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('d5'),
          }),
        ])
      );
    });

    it('cannot move if pinned diagonally', () => {
      // Board:
      // 8  Q . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . . p . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . . . . k
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            h1: { type: PieceType.King, color: Color.Black },
            e4: { type: PieceType.Pawn, color: Color.Black },
            a8: { type: PieceType.Queen, color: Color.White },
          },
          turn: Color.Black,
        })
      );

      const { moves } = context.generateMoves();

      expect(moves).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('e3'),
          }),
        ])
      );
    });

    it('cannot capture en-passant if pinned', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . b
      // 6  . . . . . . . .
      // 5  . . . . p P . .
      // 4  . . . . K . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . . . . .
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            e4: { type: PieceType.King, color: Color.White },
            f5: { type: PieceType.Pawn, color: Color.White },
            e5: { type: PieceType.Pawn, color: Color.Black },
            h7: { type: PieceType.Bishop, color: Color.Black },
          },
          enPassant: 'e6',
          turn: Color.White,
        })
      );
      const { moves } = context.generateMoves();
      // Should not be able to capture en-passant
      expect(moves).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            start: Coordinate.toIndex('f5'),
            target: Coordinate.toIndex('e6'),
          }),
        ])
      );
    });

    it('cannot capture en-passant if it exposes own king to discovered check', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . k . . . . .
      // 4  . . . P p . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . K . . .
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            c5: { type: PieceType.King, color: Color.Black },
            d4: { type: PieceType.Pawn, color: Color.White },
            e4: { type: PieceType.Pawn, color: Color.Black },
            e1: { type: PieceType.King, color: Color.White },
          },
          enPassant: 'd3',
          turn: Color.Black,
        })
      );
      const { moves } = context.generateMoves();
      const pawnMoves = moves.filter(
        (m) => m.start === Coordinate.toIndex('e4')
      );

      // Cannot push dues to check. But can do ep-capture of checker.
      expect(pawnMoves).toEqual([
        expect.objectContaining({
          start: Coordinate.toIndex('e4'),
          target: Coordinate.toIndex('d3'),
          capture: true,
        }),
      ]);
    });

    it('allows en-passant if it blocks a check', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . k . . . . . .
      // 4  . . . P p . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . K Q . .
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            b5: { type: PieceType.King, color: Color.Black },
            d4: { type: PieceType.Pawn, color: Color.White },
            e4: { type: PieceType.Pawn, color: Color.Black },
            e1: { type: PieceType.King, color: Color.White },
            f1: { type: PieceType.Queen, color: Color.White },
          },
          enPassant: 'd3',
          turn: Color.Black,
        })
      );

      const { moves } = context.generateMoves();

      const pawnMoves = moves.filter(
        (m) => m.start === Coordinate.toIndex('e4')
      );
      expect(pawnMoves).toEqual([
        expect.objectContaining({
          start: Coordinate.toIndex('e4'),
          target: Coordinate.toIndex('d3'),
          capture: true,
        }),
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
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d4: { type: 'q', color: Color.White },
          },
        })
      );
      const { moves } = context.generateMoves();

      expect(moves.length).toBe(27); // 7+7+7+6 (horizontal, vertical, diagonals)
      expect(moves).toEqual(
        expect.arrayContaining([
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('d5'),
            capture: false,
          }, // up
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('d3'),
            capture: false,
          }, // down
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('c4'),
            capture: false,
          }, // left
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('e4'),
            capture: false,
          }, // right
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('e5'),
            capture: false,
          }, // up-right
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('c3'),
            capture: false,
          }, // down-left
        ])
      );
    });

    it('can only evade check by capturing the checker', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . . . Q . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . K r . .
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            f4: { type: PieceType.Queen, color: Color.White },
            f1: { type: PieceType.Rook, color: Color.Black },
            e1: { type: PieceType.King, color: Color.White },
          },
          turn: Color.White,
        })
      );
      const { moves } = context.generateMoves();

      const queenMoves = moves.filter(
        (m) => m.start === Coordinate.toIndex('f4')
      );
      expect(queenMoves).toEqual([
        expect.objectContaining({
          start: Coordinate.toIndex('f4'),
          target: Coordinate.toIndex('f1'),
          capture: true,
        }),
      ]);
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
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d4: { type: 'q', color: Color.White },
            d3: { type: 'p', color: Color.White },
            d5: { type: 'p', color: Color.Black },
          },
        })
      );

      const { moves } = context.generateMoves();

      // Can capture d5, but not move past it; cannot move to d3 (own piece)
      expect(moves).toEqual(
        expect.arrayContaining([
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('d5'),
            capture: true,
          },
        ])
      );
      expect(moves).not.toEqual(
        expect.arrayContaining([
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('d6'),
            capture: false,
          }, // cannot move past d5
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('d3'),
            capture: false,
          }, // cannot move to d3 (own piece)
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
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d4: { type: 'q', color: Color.White },
            e5: { type: 'p', color: Color.Black },
          },
        })
      );

      const { moves } = context.generateMoves();

      expect(moves).toEqual(
        expect.arrayContaining([
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('e5'),
            capture: true,
          },
        ])
      );
    });

    it('cannot move if pinned vertically', () => {
      // Board:
      // 8  . . . . r . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . . Q . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . K . . .
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            e1: { type: PieceType.King, color: Color.White },
            e4: { type: PieceType.Queen, color: Color.White },
            e8: { type: PieceType.Rook, color: Color.Black },
          },
          turn: Color.White,
        })
      );

      const { moves } = context.generateMoves();

      // Only moves allowed are along the e-file (vertical)
      expect(moves).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('e5'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('e6'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('e7'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('e8'),
            capture: true,
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('e3'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('e2'),
          }),
        ])
      );
      // Should not allow horizontal or diagonal moves
      expect(moves).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('d4'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('f4'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('d5'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('f5'),
          }),
        ])
      );
    });

    it('cannot move if pinned diagonally', () => {
      // Board:
      // 8  Q . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . . q . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . . . . k
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            h1: { type: PieceType.King, color: Color.Black },
            e4: { type: PieceType.Queen, color: Color.Black },
            a8: { type: PieceType.Queen, color: Color.White },
          },
          turn: Color.Black,
        })
      );
      const { moves } = context.generateMoves();
      // Only moves allowed are along the a7-h1 diagonal
      expect(moves).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('g2'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('f3'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('d5'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('c6'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('b7'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('a8'),
          }),
        ])
      );
      // Should not allow vertical or horizontal moves
      expect(moves).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('f5'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('e3'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('e5'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('d3'),
          }),
        ])
      );
    });

    it('cannot move if pinned horizontally', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . K . . Q r . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . . . . .
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            b4: { type: PieceType.King, color: Color.White },
            e4: { type: PieceType.Queen, color: Color.White },
            f4: { type: PieceType.Rook, color: Color.Black },
          },
          turn: Color.White,
        })
      );
      const { moves } = context.generateMoves();

      expect(moves).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('f4'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('d4'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('c4'),
          }),
        ])
      );
      // Should not allow vertical or diagonal moves
      expect(moves).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('e5'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('e3'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('d5'),
          }),
          expect.objectContaining({
            start: Coordinate.toIndex('e4'),
            target: Coordinate.toIndex('f5'),
          }),
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
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d4: { type: 'n', color: Color.White },
          },
        })
      );
      const { moves } = context.generateMoves();

      expect(moves).toEqual(
        expect.arrayContaining([
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('b5'),
            capture: false,
          }, // b5
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('b3'),
            capture: false,
          }, // b3
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('c6'),
            capture: false,
          }, // c6
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('e6'),
            capture: false,
          }, // e6
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('c2'),
            capture: false,
          }, // c2
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('e2'),
            capture: false,
          }, // e2
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('f3'),
            capture: false,
          }, // f3
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('f5'),
            capture: false,
          }, // f5
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
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d4: { type: 'n', color: Color.White },
            b5: { type: 'p', color: Color.Black },
            f5: { type: 'p', color: Color.Black },
          },
        })
      );

      const { moves } = context.generateMoves();

      expect(moves).toEqual(
        expect.arrayContaining([
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('b5'),
            capture: true,
          },
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('f5'),
            capture: true,
          },
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
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d4: { type: 'n', color: Color.White },
            b5: { type: 'p', color: Color.White },
            f5: { type: 'q', color: Color.White },
          },
        })
      );

      const { moves } = context.generateMoves();

      // Should not include moves to b5 or f5
      expect(moves).not.toEqual(
        expect.arrayContaining([
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('b5'),
            capture: false,
          },
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('f5'),
            capture: false,
          },
        ])
      );
    });

    it('cannot move if pinned to the king', () => {
      // Board:
      // 8  . . . r . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . n . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . k . . . .
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d1: { type: 'k', color: Color.Black },
            d4: { type: 'n', color: Color.Black },
            d8: { type: 'r', color: Color.White },
          },
          turn: Color.Black,
        })
      );
      const { moves } = context.generateMoves();

      expect(moves).not.toEqual(
        expect.arrayContaining<Move>([
          expect.objectContaining<Partial<Move>>({
            start: Coordinate.toIndex('d4'),
          }),
        ])
      );
    });

    it('can only block or capture when evading a rook check', () => {
      // Board:
      // 8  . . . . k . . .
      // 7  . . . . . . . .
      // 6  . . . . . . n .
      // 5  . . . . R . . .
      // 4  . . . . . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . K . . .
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            e8: { type: PieceType.King, color: Color.Black },
            e5: { type: PieceType.Rook, color: Color.White },
            g6: { type: PieceType.Knight, color: Color.Black },
            e1: { type: PieceType.King, color: Color.White },
          },
          turn: Color.Black,
        })
      );
      const { moves } = context.generateMoves();

      const knightMoves = moves.filter(
        (m) => m.start === Coordinate.toIndex('g6')
      );

      expect(knightMoves).toEqual([
        expect.objectContaining<Move>({
          start: Coordinate.toIndex('g6'),
          target: Coordinate.toIndex('e7'),
          capture: false,
        }),
        expect.objectContaining<Move>({
          start: Coordinate.toIndex('g6'),
          target: Coordinate.toIndex('e5'),
          capture: true,
        }),
      ]);
    });
  });

  describe('king', () => {
    it('can castle kingside as black', () => {
      // Board:
      // 8  . . . . k . . r
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . . . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . K . . .
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            e8: { type: PieceType.King, color: Color.Black },
            h8: { type: PieceType.Rook, color: Color.Black },
            e1: { type: PieceType.King, color: Color.White },
          },
          castlingAbility: new Set([CastlingAbility.BlackKing]),
          turn: Color.Black,
        })
      );
      const { moves } = context.generateMoves();
      expect(moves).toEqual(
        expect.arrayContaining<Move>([
          {
            start: Coordinate.toIndex('e8'),
            target: Coordinate.toIndex('g8'),
            capture: false,
            castling: CastlingRight.KingSide,
          },
        ])
      );
    });
    it('only allows king moves when in double check', () => {
      // Board:
      // 8  . . . . k . . .
      // 7  . . . . . . K .
      // 6  . . . . . b . .
      // 5  . . . . R . . .
      // 4  . . . . . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . K . . .
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            e1: { type: PieceType.King, color: Color.White },
            e8: { type: PieceType.King, color: Color.Black },
            e5: { type: PieceType.Rook, color: Color.White },
            f6: { type: PieceType.Bishop, color: Color.Black },
            g7: { type: PieceType.Knight, color: Color.White },
          },
          turn: Color.Black,
        })
      );
      const { moves } = context.generateMoves();

      // Only king moves should be allowed
      expect(moves.every((m) => m.start === Coordinate.toIndex('e8'))).toBe(
        true
      );
      expect(moves.length).toBe(4);
    });

    it('cannot move into check', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . . . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . K . r .
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            e1: { type: PieceType.King, color: Color.White },
            g1: { type: PieceType.Rook, color: Color.Black },
          },
          turn: Color.White,
        })
      );

      const { moves } = context.generateMoves();

      expect(moves).not.toContainEqual(
        expect.objectContaining({
          start: Coordinate.toIndex('e1'),
          target: Coordinate.toIndex('f1'),
        })
      );
      expect(moves).not.toContainEqual(
        expect.objectContaining({
          start: Coordinate.toIndex('e1'),
          target: Coordinate.toIndex('d1'),
        })
      );
    });

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
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d4: { type: 'k', color: Color.White },
          },
        })
      );

      const { moves } = context.generateMoves();

      expect(moves).toEqual(
        expect.arrayContaining<Move>([
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('c5'),
            capture: false,
          }, // up
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('e5'),
            capture: false,
          }, // up-right
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('e4'),
            capture: false,
          }, // right
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('d5'),
            capture: false,
          }, // down-right
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('d3'),
            capture: false,
          }, // down
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('c3'),
            capture: false,
          }, // down-left
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('c4'),
            capture: false,
          }, // left
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('c5'),
            capture: false,
          }, // up-left
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
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d4: { type: 'k', color: Color.White },
            e4: { type: 'p', color: Color.Black },
            c3: { type: 'p', color: Color.Black },
          },
        })
      );

      const { moves } = context.generateMoves();

      expect(moves).toEqual(
        expect.arrayContaining<Move>([
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('e4'),
            capture: true,
          },
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('c3'),
            capture: true,
          },
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
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d4: { type: 'k', color: Color.White },
            e4: { type: 'q', color: Color.White },
            e3: { type: 'p', color: Color.White },
          },
        })
      );
      const { moves } = context.generateMoves();

      // Should not include moves to e4 or e3
      expect(moves).not.toEqual(
        expect.arrayContaining<Move>([
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('e4'),
            capture: false,
          }, // e4
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('e3'),
            capture: false,
          }, // e3
        ])
      );
    });

    it('can castle kingside as white', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . . . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . K . . R
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d8: { type: PieceType.King, color: Color.Black },
            e1: { type: PieceType.King, color: Color.White },
            h1: { type: PieceType.Rook, color: Color.White },
          },
          castlingAbility: new Set([CastlingAbility.WhiteKing]),
          turn: Color.White,
        })
      );

      const { moves } = context.generateMoves();

      expect(moves).toEqual(
        expect.arrayContaining<Move>([
          {
            start: Coordinate.toIndex('e1'),
            target: Coordinate.toIndex('g1'),
            capture: false,
            castling: CastlingRight.KingSide,
          },
        ])
      );
    });

    it('can castle queenside as white', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . . . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  R . . . K . . .
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d8: { type: PieceType.King, color: Color.Black },
            e1: { type: PieceType.King, color: Color.White },
            a1: { type: PieceType.Rook, color: Color.White },
          },
          castlingAbility: new Set([CastlingAbility.WhiteQueen]),
          turn: Color.White,
        })
      );
      const { moves } = context.generateMoves();

      expect(moves).toEqual(
        expect.arrayContaining<Move>([
          {
            start: Coordinate.toIndex('e1'),
            target: Coordinate.toIndex('c1'),
            capture: false,
            castling: CastlingRight.QueenSide,
          },
        ])
      );
    });

    it('cannot castle kingside as white if path is blocked', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . . . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . K . R R
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d8: { type: PieceType.King, color: Color.Black },
            e1: { type: PieceType.King, color: Color.White },
            f1: { type: PieceType.Rook, color: Color.White }, // blocks path
            h1: { type: PieceType.Rook, color: Color.White },
          },
          castlingAbility: new Set([CastlingAbility.WhiteKing]),
          turn: Color.White,
        })
      );
      const { moves } = context.generateMoves();

      expect(moves).not.toEqual(
        expect.arrayContaining<Move>([
          {
            start: Coordinate.toIndex('e1'),
            target: Coordinate.toIndex('g1'),
            capture: false,
            castling: CastlingRight.KingSide,
          },
        ])
      );
    });

    it('cannot castle queenside as white if path is blocked', () => {
      // Board:
      // 8  . . . . . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . . . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  R N . . K . . .
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d8: { type: PieceType.King, color: Color.Black },
            a1: { type: PieceType.Rook, color: Color.White },
            b1: { type: PieceType.Knight, color: Color.White }, // blocks path
            e1: { type: PieceType.King, color: Color.White },
          },
          castlingAbility: new Set([CastlingAbility.WhiteQueen]),
          turn: Color.White,
        })
      );
      const { moves } = context.generateMoves();

      // Should NOT include castling move to c1
      expect(moves).not.toEqual(
        expect.arrayContaining<Move>([
          {
            start: Coordinate.toIndex('e1'),
            target: Coordinate.toIndex('c1'),
            capture: false,
            castling: CastlingRight.QueenSide,
          },
        ])
      );
    });

    it('cannot castle kingside as white if king is in check', () => {
      // Board:
      // 8  . . . k r . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . . . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . K . . R
      //    a b c d e f g h

      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d8: { type: PieceType.King, color: Color.Black },
            e8: { type: PieceType.Rook, color: Color.Black },
            e1: { type: PieceType.King, color: Color.White },
            h1: { type: PieceType.Rook, color: Color.White },
          },
          castlingAbility: new Set([CastlingAbility.WhiteKing]),
          turn: Color.White,
        })
      );

      const { moves } = context.generateMoves();

      expect(moves).not.toEqual(
        expect.arrayContaining<Move>([
          {
            start: Coordinate.toIndex('e1'),
            target: Coordinate.toIndex('g1'),
            capture: false,
            castling: CastlingRight.KingSide,
          },
        ])
      );
    });

    it('cannot castle kingside as white if king path is attacked', () => {
      // Board:
      // 8  . . . k . . . .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . b . . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . K . . R
      //    a b c d e f g h
      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            d8: { type: PieceType.King, color: Color.Black },
            e1: { type: PieceType.King, color: Color.White },
            h1: { type: PieceType.Rook, color: Color.White },
            c4: { type: PieceType.Bishop, color: Color.Black },
          },
          castlingAbility: new Set([CastlingAbility.WhiteKing]),
          turn: Color.White,
        })
      );

      const { moves } = context.generateMoves();

      expect(moves).not.toEqual(
        expect.arrayContaining<Move>([
          {
            start: Coordinate.toIndex('e1'),
            target: Coordinate.toIndex('g1'),
            capture: false,
            castling: CastlingRight.KingSide,
          },
        ])
      );
    });

    it('cannot castle kingside as white if king would be in check after castling', () => {
      // Board:
      // 8  . . . . . . r .
      // 7  . . . . . . . .
      // 6  . . . . . . . .
      // 5  . . . . . . . .
      // 4  . . . . . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . K . . R
      //    a b c d e f g h

      const context = MoveGenerator(
        createGameStateMock({
          pieces: {
            e1: { type: PieceType.King, color: Color.White },
            h1: { type: PieceType.Rook, color: Color.White },
            g8: { type: PieceType.Rook, color: Color.Black },
          },
          castlingAbility: new Set([CastlingAbility.WhiteKing]),
          turn: Color.White,
        })
      );

      const { moves } = context.generateMoves();

      expect(moves).not.toEqual(
        expect.arrayContaining<Move>([
          {
            start: Coordinate.toIndex('e1'),
            target: Coordinate.toIndex('g1'),
            capture: false,
            castling: CastlingRight.KingSide,
          },
        ])
      );
    });
  });
});
