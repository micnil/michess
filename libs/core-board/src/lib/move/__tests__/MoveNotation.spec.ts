/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Color } from '../../common/Color';
import { PieceType } from '../../common/PieceType';
import { FenParser } from '../../fen/util/FenParser';
import { ChessPosition } from '../../position/model/ChessPosition';
import { MoveNotation } from '../MoveNotation';

describe('MoveNotation', () => {
  describe('from', () => {
    it('should convert basic pawn move to SAN', () => {
      const position = ChessPosition.standardInitial();

      const notation = MoveNotation.from(position, {
        from: 'e2',
        to: 'e4',
      });
      expect(notation.displayStr).toBe('e4');
    });

    it('should convert knight move to SAN', () => {
      const position = ChessPosition.standardInitial();

      const notation = MoveNotation.from(position, {
        from: 'g1',
        to: 'f3',
      });
      expect(notation.displayStr).toEqual('Nf3');
    });

    it('should convert castling move to SAN', () => {
      const fenString =
        'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4';
      const position = FenParser.toChessPosition(fenString);

      const notation = MoveNotation.from(position, {
        from: 'e1',
        to: 'g1',
      });
      expect(notation.displayStr).toBe('O-O');
    });

    it('should convert queenside castling move to SAN', () => {
      const fenString =
        'r1bqk2r/ppp2ppp/2np1n2/4p1B1/QbP5/2NP4/PP2PPPP/R3KBNR w KQkq - 2 6';
      const position = FenParser.toChessPosition(fenString);

      const notation = MoveNotation.from(position, {
        from: 'e1',
        to: 'c1',
      });
      expect(notation.displayStr).toBe('O-O-O');
    });

    it('should handle disambiguation when needed', () => {
      const fen =
        'rnbqk2r/ppp2ppp/4pn2/2bp4/4PN2/2N5/PPPP1PPP/R1BQKB1R w KQkq - 2 5';
      const position = FenParser.toChessPosition(fen);

      const notation1 = MoveNotation.from(position, {
        from: 'c3',
        to: 'd5',
      });
      const notation2 = MoveNotation.from(position, {
        from: 'f4',
        to: 'd5',
      });
      expect(notation1.displayStr).toBe('Ncxd5');
      expect(notation2.displayStr).toBe('Nfxd5');
      expect(notation1.moveNumber).toBe(5);
      expect(notation1.turn).toBe(Color.White);
    });

    it('should handle promotion notation', () => {
      // Use a position where white pawn can promote
      const fenString = '8/P7/8/8/8/8/8/8 w - - 0 1';
      const position = FenParser.toChessPosition(fenString);

      const notation = MoveNotation.from(position, {
        from: 'a7',
        to: 'a8',
        promotion: PieceType.Queen,
      });
      expect(notation.displayStr).toMatch(/=Q$/); // Should end with =Q
    });
  });
});
