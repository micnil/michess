import { createChessPositionMock, CastlingAbility } from '@michess/core-models';
import { ZobristHash } from '../ZobristHash';

describe('ZobristHash', () => {
  describe('initialization', () => {
    it('should create a hash from a chess position', () => {
      const position = createChessPositionMock({
        pieces: {
          e1: { color: 'white', type: 'k' },
          e8: { color: 'black', type: 'k' },
        },
        turn: 'white',
        castlingAbility: new Set([
          CastlingAbility.WhiteKing,
          CastlingAbility.WhiteQueen,
        ]),
        enPassant: undefined,
      });

      const hash = ZobristHash(position);

      expect(hash.getValue()).not.toBe(0n);
      expect(hash.toString()).toMatch(/^0x[0-9a-f]{16}$/);
    });

    it('should create different hashes for different positions', () => {
      const position1 = createChessPositionMock({
        pieces: { e1: { color: 'white', type: 'k' } },
        turn: 'white',
      });

      const position2 = createChessPositionMock({
        pieces: { e1: { color: 'black', type: 'k' } },
        turn: 'white',
      });

      const hash1 = ZobristHash(position1);
      const hash2 = ZobristHash(position2);

      expect(hash1.getValue()).not.toBe(hash2.getValue());
    });

    it('should create different hashes for different turns', () => {
      const position1 = createChessPositionMock({
        pieces: { e1: { color: 'white', type: 'k' } },
        turn: 'white',
      });

      const position2 = createChessPositionMock({
        pieces: { e1: { color: 'white', type: 'k' } },
        turn: 'black',
      });

      const hash1 = ZobristHash(position1);
      const hash2 = ZobristHash(position2);

      expect(hash1.getValue()).not.toBe(hash2.getValue());
    });
  });

  describe('updates', () => {
    it('should update hash when moving a piece', () => {
      const position = createChessPositionMock({
        pieces: { e1: { color: 'white', type: 'k' } },
        turn: 'white',
      });

      const originalHash = ZobristHash(position);
      const updatedHash = originalHash.movePiece(
        { color: 'white', type: 'k' },
        4, // e1 index
        12 // e2 index
      );

      expect(originalHash.getValue()).not.toBe(updatedHash.getValue());
    });

    it('should update hash when capturing a piece', () => {
      const originalHash = ZobristHash();
      const updatedHash = originalHash.capturePiece(
        { color: 'black', type: 'q' },
        27 // d4 index
      );

      expect(originalHash.getValue()).not.toBe(updatedHash.getValue());
    });

    it('should update hash when toggling side to move', () => {
      const originalHash = ZobristHash();
      const updatedHash = originalHash.toggleSideToMove();

      expect(originalHash.getValue()).not.toBe(updatedHash.getValue());

      // Toggling twice should return to original
      const doubleToggled = updatedHash.toggleSideToMove();
      expect(originalHash.getValue()).toBe(doubleToggled.getValue());
    });

    it('should update hash when changing castling rights', () => {
      const originalRights = new Set([
        CastlingAbility.WhiteKing,
        CastlingAbility.WhiteQueen,
      ]);
      const newRights = new Set([CastlingAbility.WhiteKing]);

      const originalHash = ZobristHash();
      const updatedHash = originalHash.updateCastlingRights(
        originalRights,
        newRights
      );

      expect(originalHash.getValue()).not.toBe(updatedHash.getValue());
    });

    it('should update hash when changing en passant', () => {
      const originalHash = ZobristHash();
      const updatedHash = originalHash.updateEnPassant(undefined, 'e3');

      expect(originalHash.getValue()).not.toBe(updatedHash.getValue());

      // Removing en passant should change hash again
      const removedEnPassant = updatedHash.updateEnPassant('e3', undefined);
      expect(updatedHash.getValue()).not.toBe(removedEnPassant.getValue());
      expect(originalHash.getValue()).toBe(removedEnPassant.getValue());
    });
  });

  describe('utility methods', () => {
    it('should compare hashes correctly', () => {
      const position = createChessPositionMock({
        pieces: { e1: { color: 'white', type: 'k' } },
      });

      const hash1 = ZobristHash(position);
      const hash2 = ZobristHash(position);
      const hash3 = hash1.copy();

      expect(hash1.equals(hash2)).toBe(true);
      expect(hash1.equals(hash3)).toBe(true);

      const differentHash = hash1.toggleSideToMove();
      expect(hash1.equals(differentHash)).toBe(false);
    });

    it('should copy hash correctly', () => {
      const originalHash = ZobristHash();
      const copiedHash = originalHash.copy();

      expect(originalHash.getValue()).toBe(copiedHash.getValue());
      expect(originalHash.equals(copiedHash)).toBe(true);

      // Modifying copy should not affect original
      const modifiedCopy = copiedHash.toggleSideToMove();
      expect(originalHash.equals(modifiedCopy)).toBe(false);
    });

    it('should convert to string correctly', () => {
      const hash = ZobristHash();
      const hashString = hash.toString();

      expect(hashString).toMatch(/^0x[0-9a-f]{16}$/);
      expect(hashString).toBe(
        `0x${hash.getValue().toString(16).padStart(16, '0')}`
      );
    });
  });
});
