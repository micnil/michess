import { Bitboard } from '../Bitboard';

describe('Bitboard', () => {
  it('create an empty board by default', () => {
    const emptyBitboard = Bitboard();
    expect(emptyBitboard.getBitboardState()).toBe(0n);
  });
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

  it('can clear a bit by index', () => {
    const bit31SetBoard = Bitboard(2147483648n);

    const emptyBitboard = bit31SetBoard.clearIndex(31);

    expect(emptyBitboard.getBitboardState()).toBe(0n);
    expect(emptyBitboard.isEmpty()).toBeTruthy();
  });

  it('can clear bit by coordinate', () => {
    const bit31SetBoard = Bitboard(2147483648n);

    const emptyBitboard = bit31SetBoard.clearCoord('h5');

    expect(emptyBitboard.getBitboardState()).toBe(0n);
    expect(emptyBitboard.isEmpty()).toBeTruthy();
  });

  it('can set bits outside of chess board range', () => {
    const emptyBitboard = Bitboard();

    const testBoard = emptyBitboard.setIndex(100);

    expect(testBoard.isIndexSet(100)).toBe(true);
  });

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

  it('can scan forward to find the least significant bit index', () => {
    const bit31SetBoard = Bitboard(2147483648n);

    expect(bit31SetBoard.scanForward()).toBe(31);
  });

  it('can scan forward to find the least significant bit index', () => {
    const bit_31_45_50_board = Bitboard(1161086426415104n);

    expect(bit_31_45_50_board.scanForward()).toBe(31);
  });

  it('can count the amount of bits', () => {
    const bit_31_45_50_board = Bitboard(1161086426415104n);

    expect(bit_31_45_50_board.countBits()).toBe(3);
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
});
