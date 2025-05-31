import { PiecePlacements } from '@michess/core-models';
import { ChessBitboard } from '../ChessBitboard';

describe('ChessBitboard', () => {
  describe('getPieceAt', () => {
    it('returns the correct piece for a given coordinate', () => {
      const placements: PiecePlacements = {
        a1: { color: 'white', type: 'r' },
        e4: { color: 'black', type: 'q' },
        h8: { color: 'white', type: 'k' },
      };
      const bitboard = ChessBitboard(placements);
      expect(bitboard.getPieceAt('a1')).toEqual({ color: 'white', type: 'r' });
      expect(bitboard.getPieceAt('e4')).toEqual({ color: 'black', type: 'q' });
      expect(bitboard.getPieceAt('h8')).toEqual({ color: 'white', type: 'k' });
    });

    it('returns undefined for an empty square', () => {
      const placements: PiecePlacements = {
        d5: { color: 'black', type: 'n' },
      };
      const bitboard = ChessBitboard(placements);
      expect(bitboard.getPieceAt('a1')).toBeUndefined();
      expect(bitboard.getPieceAt('d5')).toEqual({ color: 'black', type: 'n' });
    });
  });
});
