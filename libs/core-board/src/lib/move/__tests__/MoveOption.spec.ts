import { MoveOption } from '../MoveOption';

describe('Move', () => {
  describe('toUci', () => {
    it('should convert basic move to UCI format', () => {
      const move: MoveOption = {
        start: 52, // e2
        target: 36, // e4
        capture: false,
      };

      const uci = MoveOption.toUci(move);

      expect(uci).toBe('e2e4');
    });

    it('should convert move with promotion to UCI format', () => {
      const move: MoveOption = {
        start: 8, // a7
        target: 0, // a8
        capture: false,
        promotion: 'q',
      };

      const uci = MoveOption.toUci(move);

      expect(uci).toBe('a7a8q');
    });

    it('should convert knight promotion to UCI format', () => {
      const move: MoveOption = {
        start: 48, // a2
        target: 56, // a1
        capture: false,
        promotion: 'n',
      };

      const uci = MoveOption.toUci(move);

      expect(uci).toBe('a2a1n');
    });

    it('should convert rook promotion to UCI format', () => {
      const move: MoveOption = {
        start: 15, // h7
        target: 7, // h8
        capture: false,
        promotion: 'r',
      };

      const uci = MoveOption.toUci(move);

      expect(uci).toBe('h7h8r');
    });

    it('should handle capture moves', () => {
      const move: MoveOption = {
        start: 44, // e3
        target: 35, // d4
        capture: true,
      };

      const uci = MoveOption.toUci(move);

      expect(uci).toBe('e3d4');
    });

    it('should handle en passant moves', () => {
      const move: MoveOption = {
        start: 27, // d5
        target: 19, // d6
        capture: true,
        enPassant: true,
      };

      const uci = MoveOption.toUci(move);

      expect(uci).toBe('d5d6');
    });
  });
});
