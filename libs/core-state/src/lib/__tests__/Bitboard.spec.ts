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

  it('can unset a bit by index', () => {
    const bit31SetBoard = Bitboard(2147483648n);

    const emptyBitboard = bit31SetBoard.clearIndex(31);

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
});
