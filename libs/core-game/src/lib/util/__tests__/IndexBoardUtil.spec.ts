import { DirectionOffset } from '../../model/DirectionOffset';
import { IndexBoardUtil } from '../IndexBoardUtil';

describe('IndexBoardUtil', () => {
  describe('withinBoard', () => {
    it('returns true for valid indices 0 and 63', () => {
      expect(IndexBoardUtil.withinBoard(0)).toBe(true);
      expect(IndexBoardUtil.withinBoard(63)).toBe(true);
    });
    it('returns false for negative and out-of-range indices', () => {
      expect(IndexBoardUtil.withinBoard(-1)).toBe(false);
      expect(IndexBoardUtil.withinBoard(64)).toBe(false);
      expect(IndexBoardUtil.withinBoard(100)).toBe(false);
    });
  });

  describe('chebyshevDistance', () => {
    it('returns 0 for the same index', () => {
      expect(IndexBoardUtil.chebyshevDistance(10, 10)).toBe(0);
    });
    it('returns correct distance for same rank', () => {
      expect(IndexBoardUtil.chebyshevDistance(0, 7)).toBe(7);
    });
    it('returns correct distance for same file', () => {
      expect(IndexBoardUtil.chebyshevDistance(0, 56)).toBe(7);
    });
    it('returns correct distance for diagonal', () => {
      expect(IndexBoardUtil.chebyshevDistance(0, 9)).toBe(1);
      expect(IndexBoardUtil.chebyshevDistance(0, 18)).toBe(2);
    });
  });

  describe('isNeighbors', () => {
    it('returns true for adjacent squares', () => {
      expect(IndexBoardUtil.isNeighbors(0, 1)).toBe(true);
      expect(IndexBoardUtil.isNeighbors(0, 8)).toBe(true);
      expect(IndexBoardUtil.isNeighbors(9, 0)).toBe(true);
    });
    it('returns false for non-adjacent squares', () => {
      expect(IndexBoardUtil.isNeighbors(0, 2)).toBe(false);
      expect(IndexBoardUtil.isNeighbors(0, 16)).toBe(false);
    });
  });

  describe('unfoldDirection', () => {
    it('returns all indices in a direction until the edge of the board', () => {
      expect(IndexBoardUtil.unfoldDirection(0, DirectionOffset.E)).toEqual([
        1, 2, 3, 4, 5, 6, 7,
      ]);

      expect(IndexBoardUtil.unfoldDirection(0, DirectionOffset.N)).toEqual([]);

      expect(IndexBoardUtil.unfoldDirection(27, DirectionOffset.N)).toEqual([
        19, 11, 3,
      ]);
      expect(IndexBoardUtil.unfoldDirection(27, DirectionOffset.S)).toEqual([
        35, 43, 51, 59,
      ]);
    });
    it('returns empty array if next index is off the board', () => {
      expect(IndexBoardUtil.unfoldDirection(63, DirectionOffset.E)).toEqual([]);
      expect(IndexBoardUtil.unfoldDirection(0, DirectionOffset.W)).toEqual([]);
    });
  });
});
