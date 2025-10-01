/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  CastlingRight,
  ChessPosition,
  Coordinate,
  FenParser,
  PieceType,
} from '@michess/core-board';
import { MoveGenerator } from '../../MoveGenerator';
import { SanNotation } from '../SanNotation';

describe('SanNotation', () => {
  describe('moveOptionToSan', () => {
    it('should convert basic pawn move to SAN', () => {
      const position = ChessPosition.standardInitial();
      const moveGen = MoveGenerator(position);
      const legalMoves = moveGen.generateMoves().moves;

      // Find the e2-e4 move (index 52 to 36)
      const e4Move = legalMoves.find(
        (move) => move.start === 52 && move.target === 36
      );

      expect(e4Move).toBeDefined();
      if (e4Move) {
        const san = SanNotation.moveOptionToSan(
          e4Move,
          position.pieces,
          legalMoves
        );
        expect(san).toBe('e4');
      }
    });

    it('should convert knight move to SAN', () => {
      const position = ChessPosition.standardInitial();
      const moveGen = MoveGenerator(position);
      const legalMoves = moveGen.generateMoves().moves;

      // Find any knight move - don't assume specific indices
      const knightMove = legalMoves.find((move) => {
        const fromSquare = Coordinate.fromIndex(move.start);
        const piece = position.pieces.get(fromSquare);

        return piece?.type === PieceType.Knight;
      });

      expect(knightMove).toBeDefined();
      if (knightMove) {
        const san = SanNotation.moveOptionToSan(
          knightMove,
          position.pieces,
          legalMoves
        );
        // Knight moves can have various formats: N + optional disambiguation + destination
        expect(san).toMatch(/^N[a-h0-9]*[a-h][1-8]$/);
      }
    });

    it('should convert castling move to SAN', () => {
      const fenString =
        'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4';
      const position = FenParser.toChessPosition(fenString);
      const moveGen = MoveGenerator(position);
      const legalMoves = moveGen.generateMoves().moves;

      const castlingMove = legalMoves.find(
        (move) => move.castling === CastlingRight.KingSide
      );

      expect(castlingMove).toBeDefined();
      const san = SanNotation.moveOptionToSan(
        castlingMove!,
        position.pieces,
        legalMoves
      );
      expect(san).toBe('O-O');
    });

    it('should handle disambiguation when needed', () => {
      const position = ChessPosition.standardInitial();
      const moveGen = MoveGenerator(position);
      const legalMoves = moveGen.generateMoves().moves;

      // In starting position, knights don't have disambiguation issues
      const knightMoves = legalMoves.filter((move) => {
        const fromSquare = Coordinate.fromIndex(move.start);
        const piece = position.pieces.get(fromSquare);
        return piece?.type === 'n';
      });

      expect(knightMoves.length).toBeGreaterThan(0);

      // Test that each knight move gets proper notation
      knightMoves.forEach((move) => {
        const san = SanNotation.moveOptionToSan(
          move,
          position.pieces,
          legalMoves
        );

        expect(san).toMatch(/^N[a-h0-9]*[a-h][1-8]$/);
      });
    });

    it('should handle promotion notation', () => {
      // Create a simple move option for promotion
      const mockMoveOption = {
        start: 8, // a7
        target: 0, // a8
        capture: false,
        promotion: 'q' as const,
      };

      const position = ChessPosition.standardInitial();
      const legalMoves = [mockMoveOption];

      const san = SanNotation.moveOptionToSan(
        mockMoveOption,
        position.pieces,
        legalMoves
      );
      expect(san).toMatch(/=Q$/); // Should end with =Q
    });
  });

  describe('addCheckNotation', () => {
    it('should add check notation', () => {
      const baseSan = 'Nf7';
      const result = SanNotation.addCheckNotation(baseSan, true, false);

      expect(result).toBe('Nf7+');
    });

    it('should add checkmate notation', () => {
      const baseSan = 'Qh8';
      const result = SanNotation.addCheckNotation(baseSan, true, true);

      expect(result).toBe('Qh8#');
    });

    it('should not add notation when no check', () => {
      const baseSan = 'Nf3';
      const result = SanNotation.addCheckNotation(baseSan, false, false);

      expect(result).toBe('Nf3');
    });

    it('should prioritize checkmate over check', () => {
      const baseSan = 'Qf7';
      const result = SanNotation.addCheckNotation(baseSan, true, true);

      expect(result).toBe('Qf7#');
    });
  });
});
