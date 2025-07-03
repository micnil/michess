import { Bitboard } from '../Bitboard';

describe('Bitboard', () => {
  describe('constructor', () => {
    it('create an empty board by default', () => {
      const emptyBitboard = Bitboard();
      expect(emptyBitboard.getBitboardState()).toBe(0n);
    });
  });

  describe('setIndex', () => {
    it('can set first bit by index', () => {
      const emptyBitboard = Bitboard();

      const testBoard = emptyBitboard.setIndex(0);

      expect(testBoard.isIndexSet(0)).toBe(true);
    });

    it('can set last bit by index', () => {
      const emptyBitboard = Bitboard();

      const testBoard = emptyBitboard.setIndex(63);

      expect(testBoard.isIndexSet(63)).toBe(true);
    });

    it('can set bits outside of chess board range', () => {
      const emptyBitboard = Bitboard();

      const testBoard = emptyBitboard.setIndex(100);

      expect(testBoard.isIndexSet(100)).toBe(true);
    });
  });

  describe('setCoord', () => {
    it('can set 8 bits by coordinate', () => {
      const emptyBitboard = Bitboard();

      const testBoard = emptyBitboard
        .setCoord('a1')
        .setCoord('b2')
        .setCoord('c3')
        .setCoord('d4')
        .setCoord('e5')
        .setCoord('f6')
        .setCoord('g7')
        .setCoord('h8');

      expect(testBoard.isCoordSet('a1')).toBeTruthy();
      expect(testBoard.isCoordSet('b2')).toBeTruthy();
      expect(testBoard.isCoordSet('c3')).toBeTruthy();
      expect(testBoard.isCoordSet('d4')).toBeTruthy();
      expect(testBoard.isCoordSet('e5')).toBeTruthy();
      expect(testBoard.isCoordSet('f6')).toBeTruthy();
      expect(testBoard.isCoordSet('g7')).toBeTruthy();
      expect(testBoard.isCoordSet('h8')).toBeTruthy();

      // Sample testing some empty bits just in case
      expect(testBoard.isCoordSet('a2')).toBeFalsy();
      expect(testBoard.isCoordSet('d5')).toBeFalsy();
    });
  });

  describe('clearIndex', () => {
    it('can clear a bit by index', () => {
      const bit31SetBoard = Bitboard(2147483648n);

      const emptyBitboard = bit31SetBoard.clearIndex(31);

      expect(emptyBitboard.getBitboardState()).toBe(0n);
      expect(emptyBitboard.isEmpty()).toBeTruthy();
    });
  });

  describe('clearCoord', () => {
    it('can clear bit by coordinate', () => {
      const bit31SetBoard = Bitboard(2147483648n);

      const emptyBitboard = bit31SetBoard.clearCoord('h5');

      expect(emptyBitboard.getBitboardState()).toBe(0n);
      expect(emptyBitboard.isEmpty()).toBeTruthy();
    });
  });

  describe('scanForward', () => {
    it('can scan forward to find the least significant bit index', () => {
      const bit31SetBoard = Bitboard(2147483648n);

      expect(bit31SetBoard.scanForward()).toBe(31);
    });

    it('can scan forward to find the least significant bit index', () => {
      const bit_31_45_50_board = Bitboard(1161086426415104n);

      expect(bit_31_45_50_board.scanForward()).toBe(31);
    });
  });

  describe('scanBackward', () => {
    it('returns -1 for an empty board', () => {
      expect(Bitboard(0n).scanBackward()).toBe(-1);
    });

    it('returns the index of the only set bit', () => {
      expect(Bitboard(1n << 42n).scanBackward()).toBe(42);
    });

    it('returns the index of the most significant set bit when multiple bits are set', () => {
      // bits 3, 6, 9 set (0b1001001000)
      expect(Bitboard(584n).scanBackward()).toBe(9);
    });

    it('returns 63 for the highest bit set', () => {
      expect(Bitboard(1n << 63n).scanBackward()).toBe(63);
    });

    it('returns the correct index for a large number', () => {
      // bits 31, 45, 50 set
      expect(Bitboard(1161086426415104n).scanBackward()).toBe(50);
    });
  });

  describe('countBits', () => {
    it('can count the amount of bits', () => {
      const bit_31_45_50_board = Bitboard(1161086426415104n);

      expect(bit_31_45_50_board.countBits()).toBe(3);
    });
  });

  describe('getLowestSetBit', () => {
    it('returns the lowest set bit when multiple bits are set', () => {
      const board = Bitboard(72n);
      expect(board.getLowestSetBit()).toBe(8n); // 0b1000 (bit 3)
    });

    it('returns the bit itself when only one bit is set', () => {
      expect(Bitboard(1024n).getLowestSetBit()).toBe(1024n);
    });

    it('returns 0n when no bits are set', () => {
      expect(Bitboard(0n).getLowestSetBit()).toBe(0n);
    });
  });

  describe('getHighestSetBit', () => {
    it('returns the highest set bit when multiple bits are set', () => {
      // 0b1001000... (bits 3 and 6 set)
      const board = Bitboard(72n);
      expect(board.getHighestSetBit()).toBe(64n); // 0b1000000 (bit 6)
    });

    it('returns the bit itself when only one bit is set', () => {
      expect(Bitboard(1024n).getHighestSetBit()).toBe(1024n);
    });

    it('returns 0n when no bits are set', () => {
      expect(Bitboard(0n).getHighestSetBit()).toBe(0n);
    });

    it('returns the highest bit for a large number', () => {
      // 0b100...0 (bit 63 set)
      expect(Bitboard(1n << 63n).getHighestSetBit()).toBe(1n << 63n);
    });
  });

  describe('toString', () => {
    it('prints an empty board', () => {
      const bb = Bitboard();
      expect(bb.toString()).toBe(
        '8  . . . . . . . .\n' +
          '7  . . . . . . . .\n' +
          '6  . . . . . . . .\n' +
          '5  . . . . . . . .\n' +
          '4  . . . . . . . .\n' +
          '3  . . . . . . . .\n' +
          '2  . . . . . . . .\n' +
          '1  . . . . . . . .\n' +
          '   a b c d e f g h'
      );
    });
    it('prints a board with a single bit set', () => {
      const bb = Bitboard().setCoord('e4');
      expect(bb.toString()).toBe(
        '8  . . . . . . . .\n' +
          '7  . . . . . . . .\n' +
          '6  . . . . . . . .\n' +
          '5  . . . . . . . .\n' +
          '4  . . . . 1 . . .\n' +
          '3  . . . . . . . .\n' +
          '2  . . . . . . . .\n' +
          '1  . . . . . . . .\n' +
          '   a b c d e f g h'
      );
    });
  });

  describe('getIndices', () => {
    it('returns all set bit indices in order from LSB to MSB', () => {
      // 0b1001001000 (bits 3, 6, 9 set)
      const board = Bitboard(584n);
      expect(board.getIndices()).toEqual([3, 6, 9]);
    });

    it('returns an empty array for an empty board', () => {
      expect(Bitboard(0n).getIndices()).toEqual([]);
    });

    it('returns a single index for a single set bit', () => {
      expect(Bitboard(1n << 42n).getIndices()).toEqual([42]);
    });
  });

  describe('intersection', () => {
    it('returns a bitboard with only the bits set in both boards', () => {
      // 0b10110
      const boardA = Bitboard().setIndex(1).setIndex(2).setIndex(4);
      // 0b11010
      const boardB = Bitboard().setIndex(1).setIndex(3).setIndex(4);

      const intersection = boardA.intersection(boardB);
      expect(intersection.getIndices()).toEqual([1, 4]);
    });
    it('returns an empty bitboard if no bits overlap', () => {
      const boardA = Bitboard().setIndex(0).setIndex(2);
      const boardB = Bitboard().setIndex(1).setIndex(3);
      const intersection = boardA.intersection(boardB);
      expect(intersection.isEmpty()).toBe(true);
    });
    it('returns the same board if intersected with itself', () => {
      const board = Bitboard().setIndex(5).setIndex(10);
      const intersection = board.intersection(board);
      expect(intersection.getIndices()).toEqual([5, 10]);
    });
  });
});
