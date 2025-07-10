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
import { generateMoves } from '../generateMoves';
import { MoveGeneratorContext } from '../model/MoveGeneratorContext';

describe('generateMoves', () => {
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
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            d4: { type: 'b', color: Color.White },
          },
        })
      );

      const moves = generateMoves(context);

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
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            d4: { type: 'r', color: Color.White },
          },
        })
      );

      const moves = generateMoves(context);

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
          start: Coordinate.toIndex('c3'),
          target: Coordinate.toIndex('c4'),
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
          start: Coordinate.toIndex('c3'),
          target: Coordinate.toIndex('c2'),
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
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            c5: P,
            d6: p,
          },
        })
      );

      const moves = generateMoves(context);

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
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            e7: P,
          },
          turn: Color.White,
        })
      );

      const moves = generateMoves(context);

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
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            d2: p,
          },
          turn: Color.Black,
        })
      );

      const moves = generateMoves(context);

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
      const context = MoveGeneratorContext.from(
        createGameStateMock({
          pieces: {
            g7: P,
            h8: p,
          },
          turn: Color.White,
        })
      );

      const moves = generateMoves(context);

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
          {
            start: Coordinate.toIndex('d4'),
            target: Coordinate.toIndex('e5'),
            capture: true,
          },
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
      const context = MoveGeneratorContext.from(
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
      const moves = generateMoves(context);
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
      const context = MoveGeneratorContext.from(
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

      const moves = generateMoves(context);

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
      const context = MoveGeneratorContext.from(
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
      const moves = generateMoves(context);

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
      const context = MoveGeneratorContext.from(
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
      const moves = generateMoves(context);

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
      const context = MoveGeneratorContext.from(
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
      const moves = generateMoves(context);

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

      const context = MoveGeneratorContext.from(
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

      const moves = generateMoves(context);

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
      // 4  . . . . . . . .
      // 3  . . . . . . . .
      // 2  . . . . . . . .
      // 1  . . . . K . . R
      //    a b c d e f g h
      const context = MoveGeneratorContext.from(
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

      const moves = generateMoves(context);

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
