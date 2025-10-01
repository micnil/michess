/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Color } from '../../common/Color';
import { Coordinate } from '../../common/Coordinate';
import { PieceType } from '../../common/PieceType';
import { FenParser } from '../../fen/util/FenParser';
import { CastlingRight } from '../../position/model/CastlingRight';
import { ChessPosition } from '../../position/model/ChessPosition';
import { MoveNotation } from '../MoveNotation';

describe('MoveNotation', () => {
  describe('from', () => {
    it('should convert basic pawn move to SAN', () => {
      const position = ChessPosition.standardInitial();

      const notation = MoveNotation.from(position, {
        start: 52,
        target: 36,
        capture: false,
      });
      expect(notation.displayStr).toBe('e4');
    });

    it('should convert knight move to SAN', () => {
      const position = ChessPosition.standardInitial();

      const notation = MoveNotation.from(position, {
        start: Coordinate.toIndex('g1'),
        target: Coordinate.toIndex('f3'),
        capture: false,
      });
      expect(notation.displayStr).toEqual('Nf3');
    });

    it('should convert castling move to SAN', () => {
      const fenString =
        'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4';
      const position = FenParser.toChessPosition(fenString);

      const notation = MoveNotation.from(position, {
        start: Coordinate.toIndex('e1'),
        target: Coordinate.toIndex('g1'),
        castling: CastlingRight.KingSide,
        capture: false,
      });
      expect(notation.displayStr).toBe('O-O');
    });

    it('should convert queenside castling move to SAN', () => {
      const fenString =
        'r1bqk2r/ppp2ppp/2np1n2/4p1B1/QbP5/2NP4/PP2PPPP/R3KBNR w KQkq - 2 6';
      const position = FenParser.toChessPosition(fenString);

      const notation = MoveNotation.from(position, {
        start: Coordinate.toIndex('e1'),
        target: Coordinate.toIndex('c1'),
        castling: CastlingRight.QueenSide,
        capture: false,
      });
      expect(notation.displayStr).toBe('O-O-O');
    });

    it('should handle disambiguation when needed', () => {
      const fen =
        'rnbqk2r/ppp2ppp/4pn2/2bp4/4PN2/2N5/PPPP1PPP/R1BQKB1R w KQkq - 2 5';
      const position = FenParser.toChessPosition(fen);

      const notation1 = MoveNotation.from(position, {
        start: Coordinate.toIndex('c3'),
        target: Coordinate.toIndex('d5'),
        capture: true,
      });
      const notation2 = MoveNotation.from(position, {
        start: Coordinate.toIndex('f4'),
        target: Coordinate.toIndex('d5'),
        capture: true,
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
        start: Coordinate.toIndex('a7'),
        target: Coordinate.toIndex('a8'),
        capture: false,
        promotion: PieceType.Queen,
      });
      expect(notation.displayStr).toMatch(/=Q$/); // Should end with =Q
    });
  });
});
