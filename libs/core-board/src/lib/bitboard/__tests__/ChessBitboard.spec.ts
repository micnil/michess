import { PiecePlacements, PiecePlacementsMock } from '@michess/core-board';
import { ChessBitboard } from '../ChessBitboard';

describe('ChessBitboard', () => {
  describe('getPieceAt', () => {
    it('returns the correct piece for a given coordinate', () => {
      const placements: PiecePlacements = new Map([
        ['a1', { color: 'white', type: 'r' }],
        ['e4', { color: 'black', type: 'q' }],
        ['h8', { color: 'white', type: 'k' }],
      ]);
      const bitboard = ChessBitboard(placements);
      expect(bitboard.getPieceAt('a1')).toEqual({ color: 'white', type: 'r' });
      expect(bitboard.getPieceAt('e4')).toEqual({ color: 'black', type: 'q' });
      expect(bitboard.getPieceAt('h8')).toEqual({ color: 'white', type: 'k' });
    });

    it('returns undefined for an empty square', () => {
      const placements: PiecePlacements = new Map([
        ['d5', { color: 'black', type: 'n' }],
      ]);
      const bitboard = ChessBitboard(placements);
      expect(bitboard.getPieceAt('a1')).toBeUndefined();
      expect(bitboard.getPieceAt('d5')).toEqual({ color: 'black', type: 'n' });
    });
  });

  describe('occupancy', () => {
    it('calculates occupied bitboards for starting position', () => {
      const bitboard = ChessBitboard(PiecePlacementsMock.startingBoard);
      expect(bitboard.occupied.toString()).toBe(
        '' +
          '8  1 1 1 1 1 1 1 1\n' +
          '7  1 1 1 1 1 1 1 1\n' +
          '6  . . . . . . . .\n' +
          '5  . . . . . . . .\n' +
          '4  . . . . . . . .\n' +
          '3  . . . . . . . .\n' +
          '2  1 1 1 1 1 1 1 1\n' +
          '1  1 1 1 1 1 1 1 1\n' +
          '   a b c d e f g h',
      );
    });

    it('calculates white occupied bitboard for starting position', () => {
      const bitboard = ChessBitboard(PiecePlacementsMock.startingBoard);
      expect(bitboard.whiteOccupied.toString()).toBe(
        '' +
          '8  . . . . . . . .\n' +
          '7  . . . . . . . .\n' +
          '6  . . . . . . . .\n' +
          '5  . . . . . . . .\n' +
          '4  . . . . . . . .\n' +
          '3  . . . . . . . .\n' +
          '2  1 1 1 1 1 1 1 1\n' +
          '1  1 1 1 1 1 1 1 1\n' +
          '   a b c d e f g h',
      );
    });

    it('calculates black occupied bitboard for starting position', () => {
      const bitboard = ChessBitboard(PiecePlacementsMock.startingBoard);
      expect(bitboard.blackOccupied.toString()).toBe(
        '' +
          '8  1 1 1 1 1 1 1 1\n' +
          '7  1 1 1 1 1 1 1 1\n' +
          '6  . . . . . . . .\n' +
          '5  . . . . . . . .\n' +
          '4  . . . . . . . .\n' +
          '3  . . . . . . . .\n' +
          '2  . . . . . . . .\n' +
          '1  . . . . . . . .\n' +
          '   a b c d e f g h',
      );
    });

    it('handles empty board correctly', () => {
      const bitboard = ChessBitboard();
      expect(bitboard.whiteOccupied.isEmpty()).toBe(true);
      expect(bitboard.blackOccupied.isEmpty()).toBe(true);
      expect(bitboard.occupied.isEmpty()).toBe(true);
      expect(bitboard.occupied.toString()).toBe(
        '' +
          '8  . . . . . . . .\n' +
          '7  . . . . . . . .\n' +
          '6  . . . . . . . .\n' +
          '5  . . . . . . . .\n' +
          '4  . . . . . . . .\n' +
          '3  . . . . . . . .\n' +
          '2  . . . . . . . .\n' +
          '1  . . . . . . . .\n' +
          '   a b c d e f g h',
      );
    });
  });
});
