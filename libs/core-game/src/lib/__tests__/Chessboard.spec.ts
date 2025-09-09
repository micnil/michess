import { FenParser, FenStr } from '@michess/core-board';
import { Chessboard } from '../Chessboard';
import { MoveOption } from '../move/MoveOption';
import { castlingTestCases } from './test-cases/castling';
import { checkmatesTestCases } from './test-cases/checkmates';
import { famousTestCases } from './test-cases/famous';
import { pawnsTestCases } from './test-cases/pawns';
import { promotionsTestCases } from './test-cases/promotions';
import { stalematesTestCases } from './test-cases/stalemates';
import { standardTestCases } from './test-cases/standard';
import { taxingTestCases } from './test-cases/taxing';

const getAndApplyMoves = (chessboard: Chessboard): FenStr[] => {
  const moves = chessboard.moveOptions;
  return moves.map((move) => {
    const newGameState = chessboard.playMove(MoveOption.toMove(move));
    return FenParser.toFenStr(newGameState.position);
  });
};

describe('Chessboard', () => {
  describe('castling', () => {
    it.each(castlingTestCases.testCases)(
      'should handle castling correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = Chessboard.fromPosition(
          FenParser.toChessPosition(start.fen)
        );
        const actualFens = getAndApplyMoves(gameState);
        const expectedFens = expected.map((e) => e.fen);
        expect(actualFens.sort()).toEqual(expectedFens.sort());
      }
    );
  });

  describe('checkmates', () => {
    it.each(checkmatesTestCases.testCases)(
      'should handle checkmates correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = Chessboard.fromPosition(
          FenParser.toChessPosition(start.fen)
        );
        const actualFens = getAndApplyMoves(gameState);
        const expectedFens = expected.map((e) => e.fen);
        expect(actualFens.sort()).toEqual(expectedFens.sort());
      }
    );
  });

  describe('famous positions', () => {
    it.each(famousTestCases.testCases)(
      'should handle famous positions correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = Chessboard.fromPosition(
          FenParser.toChessPosition(start.fen)
        );
        const actualFens = getAndApplyMoves(gameState);
        const expectedFens = expected.map((e) => e.fen);
        expect(actualFens.sort()).toEqual(expectedFens.sort());
      }
    );
  });

  describe('pawns', () => {
    it.each(pawnsTestCases.testCases)(
      'should handle pawns correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = Chessboard.fromPosition(
          FenParser.toChessPosition(start.fen)
        );
        const actualFens = getAndApplyMoves(gameState);
        const expectedFens = expected.map((e) => e.fen);
        expect(actualFens.sort()).toEqual(expectedFens.sort());
      }
    );
  });

  describe('promotions', () => {
    it.each(promotionsTestCases.testCases)(
      'should handle promotions correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = Chessboard.fromPosition(
          FenParser.toChessPosition(start.fen)
        );
        const actualFens = getAndApplyMoves(gameState);
        const expectedFens = expected.map((e) => e.fen);
        expect(actualFens.sort()).toEqual(expectedFens.sort());
      }
    );
  });

  describe('stalemates', () => {
    it.each(stalematesTestCases.testCases)(
      'should handle stalemates correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = Chessboard.fromPosition(
          FenParser.toChessPosition(start.fen)
        );
        const actualFens = getAndApplyMoves(gameState);
        const expectedFens = expected.map((e) => e.fen);
        expect(actualFens.sort()).toEqual(expectedFens.sort());
      }
    );
  });

  describe('standard', () => {
    it.each(standardTestCases.testCases)(
      'should handle standard positions correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = Chessboard.fromPosition(
          FenParser.toChessPosition(start.fen)
        );
        const actualFens = getAndApplyMoves(gameState);
        const expectedFens = expected.map((e) => e.fen);
        expect(actualFens.sort()).toEqual(expectedFens.sort());
      }
    );
  });

  describe('taxing positions', () => {
    it.each(taxingTestCases.testCases)(
      'should handle taxing positions correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = Chessboard.fromPosition(
          FenParser.toChessPosition(start.fen)
        );
        const actualFens = getAndApplyMoves(gameState);
        const expectedFens = expected.map((e) => e.fen);
        expect(actualFens.sort()).toEqual(expectedFens.sort());
      }
    );
  });

  describe('perft', () => {
    it('should return correct node counts for initial position depths 1-5', () => {
      const initialPosition = FenParser.toChessPosition(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
      );
      const chessGame = Chessboard.fromPosition(initialPosition);

      // Known correct perft results for initial position
      expect(chessGame.perft(1).nodes).toBe(20);
      expect(chessGame.perft(2).nodes).toBe(400);
      expect(chessGame.perft(3).nodes).toBe(8902);
      expect(chessGame.perft(4).nodes).toBe(197281);
    });

    it('should handle perft depth 0', () => {
      const initialPosition = FenParser.toChessPosition(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
      );
      const chessGame = Chessboard.fromPosition(initialPosition);

      expect(chessGame.perft(0).nodes).toBe(1);
    });

    it('should work with Kiwipete position (Position 2)', () => {
      const kiwipetePosition = FenParser.toChessPosition(
        'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1'
      );
      const chessGame = Chessboard.fromPosition(kiwipetePosition);

      expect(chessGame.perft(1).nodes).toBe(48);
      expect(chessGame.perft(2).nodes).toBe(2039);
      expect(chessGame.perft(3).nodes).toBe(97862);
    });

    it('should work with Kiwipete position (Position 4)', () => {
      const kiwipetePosition = FenParser.toChessPosition(
        'r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1'
      );
      const chessGame = Chessboard.fromPosition(kiwipetePosition);

      expect(chessGame.perft(1).nodes).toBe(6);
      expect(chessGame.perft(2).nodes).toBe(264);
      expect(chessGame.perft(3).nodes).toBe(9467);
    });
  });
});
