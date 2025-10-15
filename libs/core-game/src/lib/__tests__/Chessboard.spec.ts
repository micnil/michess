import {
  createChessPositionMock,
  FenParser,
  FenStr,
  Move,
  MoveOption,
} from '@michess/core-board';
import { Chessboard } from '../Chessboard';
import { castlingTestCases } from './test-cases/castling';
import { checkmatesTestCases } from './test-cases/checkmates';
import { famousTestCases } from './test-cases/famous';
import { pawnsTestCases } from './test-cases/pawns';
import { promotionsTestCases } from './test-cases/promotions';
import { stalematesTestCases } from './test-cases/stalemates';
import { standardTestCases } from './test-cases/standard';
import { taxingTestCases } from './test-cases/taxing';

const getAndApplyMoves = (
  chessboard: Chessboard,
): { fen: FenStr[]; san: string[] } => {
  const moves = chessboard.moveOptions;
  const positions = moves
    .map((move) => {
      const newGameState = chessboard.playMove(MoveOption.toMove(move));
      return {
        fen: FenParser.toFenStr(newGameState.position) as FenStr,
        san: newGameState.moveNotations.at(-1)?.displayStr || '',
      };
    })
    .toSorted((a, b) => a.fen.localeCompare(b.fen));
  return {
    fen: positions.map((p) => p.fen),
    san: positions.map((p) => p.san),
  };
};

const toExpects = (
  cases: Array<{ move: string; fen: FenStr }>,
): {
  fen: FenStr[];
  san: string[];
} => {
  const casesSorted = cases.toSorted((a, b) => a.fen.localeCompare(b.fen));
  const expectedSans = casesSorted.map((e) => e.move);
  const expectedFens = casesSorted.map((e) => e.fen);
  return { fen: expectedFens, san: expectedSans };
};
describe('Chessboard', () => {
  describe('castling', () => {
    it.each(castlingTestCases.testCases)(
      'should handle castling correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = Chessboard.fromPosition(
          FenParser.toChessPosition(start.fen),
        );
        const actual = getAndApplyMoves(gameState);
        const expects = toExpects(expected);

        expect(actual.fen).toEqual(expects.fen);
        expect(actual.san).toEqual(expects.san);
      },
    );
  });

  describe('checkmates', () => {
    it.each(checkmatesTestCases.testCases)(
      'should handle checkmates correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = Chessboard.fromPosition(
          FenParser.toChessPosition(start.fen),
        );
        const actual = getAndApplyMoves(gameState);
        const expects = toExpects(expected);

        expect(actual.fen).toEqual(expects.fen);
        expect(actual.san).toEqual(expects.san);
      },
    );
  });

  describe('famous positions', () => {
    it.each(famousTestCases.testCases)(
      'should handle famous positions correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = Chessboard.fromPosition(
          FenParser.toChessPosition(start.fen),
        );
        const actual = getAndApplyMoves(gameState);
        const expects = toExpects(expected);

        expect(actual.fen).toEqual(expects.fen);
        expect(actual.san).toEqual(expects.san);
      },
    );
  });

  describe('pawns', () => {
    it.each(pawnsTestCases.testCases)(
      'should handle pawns correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = Chessboard.fromPosition(
          FenParser.toChessPosition(start.fen),
        );
        const actual = getAndApplyMoves(gameState);
        const expects = toExpects(expected);

        expect(actual.fen).toEqual(expects.fen);
        expect(actual.san).toEqual(expects.san);
      },
    );
  });

  describe('promotions', () => {
    it.each(promotionsTestCases.testCases)(
      'should handle promotions correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = Chessboard.fromPosition(
          FenParser.toChessPosition(start.fen),
        );
        const actual = getAndApplyMoves(gameState);
        const expects = toExpects(expected);

        expect(actual.fen).toEqual(expects.fen);
        expect(actual.san).toEqual(expects.san);
      },
    );
  });

  describe('stalemates', () => {
    it.each(stalematesTestCases.testCases)(
      'should handle stalemates correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = Chessboard.fromPosition(
          FenParser.toChessPosition(start.fen),
        );
        const actual = getAndApplyMoves(gameState);
        const expects = toExpects(expected);

        expect(actual.fen).toEqual(expects.fen);
        expect(actual.san).toEqual(expects.san);
      },
    );
  });

  describe('isInsufficientMaterial', () => {
    it('should detect king vs king as insufficient material', () => {
      const kingVsKingPosition = FenParser.toChessPosition(
        '8/8/8/8/8/8/4k3/4K3 w - - 0 1',
      );
      const chessboard = Chessboard.fromPosition(kingVsKingPosition);

      expect(chessboard.isInsufficientMaterial).toBe(true);
    });

    it('should detect king and bishop vs king as insufficient material', () => {
      const kingBishopVsKingPosition = FenParser.toChessPosition(
        '8/8/8/8/8/8/4k3/4KB2 w - - 0 1',
      );
      const chessboard = Chessboard.fromPosition(kingBishopVsKingPosition);

      expect(chessboard.isInsufficientMaterial).toBe(true);
    });

    it('should detect king and knight vs king as insufficient material', () => {
      const kingKnightVsKingPosition = FenParser.toChessPosition(
        '8/8/8/8/8/8/4k3/4KN2 w - - 0 1',
      );
      const chessboard = Chessboard.fromPosition(kingKnightVsKingPosition);

      expect(chessboard.isInsufficientMaterial).toBe(true);
    });

    // TODO
    it.skip('should detect king and bishop vs king and bishop (same color) as insufficient material', () => {
      const bishopsSameColorPosition = FenParser.toChessPosition(
        '8/8/8/8/8/8/3bk3/4KB2 w - - 0 1',
      );
      const chessboard = Chessboard.fromPosition(bishopsSameColorPosition);

      expect(chessboard.isInsufficientMaterial).toBe(true);
    });

    it('should not detect king and bishop vs king and bishop (different colors) as insufficient material', () => {
      const bishopsDifferentColorPosition = FenParser.toChessPosition(
        '8/8/8/8/8/8/2b1k3/4KB2 w - - 0 1',
      );
      const chessboard = Chessboard.fromPosition(bishopsDifferentColorPosition);

      expect(chessboard.isInsufficientMaterial).toBe(false);
    });

    it('should not detect king and queen vs king as insufficient material', () => {
      const kingQueenVsKingPosition = FenParser.toChessPosition(
        '8/8/8/8/8/8/4k3/4KQ2 w - - 0 1',
      );
      const chessboard = Chessboard.fromPosition(kingQueenVsKingPosition);

      expect(chessboard.isInsufficientMaterial).toBe(false);
    });

    it('should not detect king and rook vs king as insufficient material', () => {
      const kingRookVsKingPosition = FenParser.toChessPosition(
        '8/8/8/8/8/8/4k3/4KR2 w - - 0 1',
      );
      const chessboard = Chessboard.fromPosition(kingRookVsKingPosition);

      expect(chessboard.isInsufficientMaterial).toBe(false);
    });

    it('should not detect king and pawn vs king as insufficient material', () => {
      const kingPawnVsKingPosition = FenParser.toChessPosition(
        '8/8/8/8/8/8/4kP2/4K3 w - - 0 1',
      );
      const chessboard = Chessboard.fromPosition(kingPawnVsKingPosition);

      expect(chessboard.isInsufficientMaterial).toBe(false);
    });

    it('should not detect multiple pieces as insufficient material', () => {
      const multiplePiecesPosition = FenParser.toChessPosition(
        '8/8/8/8/8/8/3nk3/4KN2 w - - 0 1',
      );
      const chessboard = Chessboard.fromPosition(multiplePiecesPosition);

      expect(chessboard.isInsufficientMaterial).toBe(false);
    });
  });

  describe('isThreeFoldRepetition', () => {
    it('should detect threefold repetition when same position occurs three times', () => {
      const initialPosition = FenParser.toChessPosition(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      );

      const moves: Move[] = [
        { from: 'g1', to: 'f3' },
        { from: 'g8', to: 'f6' },
        { from: 'f3', to: 'g1' },
        { from: 'f6', to: 'g8' },
        { from: 'g1', to: 'f3' },
        { from: 'g8', to: 'f6' },
        { from: 'f3', to: 'g1' },
        { from: 'f6', to: 'g8' },
      ];

      const chessboard = Chessboard.fromPosition(initialPosition, moves);

      expect(chessboard.isThreeFoldRepetition).toBe(true);
    });
  });

  describe('standard', () => {
    it.each(standardTestCases.testCases)(
      'should handle standard positions correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = Chessboard.fromPosition(
          FenParser.toChessPosition(start.fen),
        );
        const actual = getAndApplyMoves(gameState);
        const expects = toExpects(expected);

        expect(actual.fen).toEqual(expects.fen);
        expect(actual.san).toEqual(expects.san);
      },
    );
  });

  describe('taxing positions', () => {
    it.each(taxingTestCases.testCases)(
      'should handle taxing positions correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = Chessboard.fromPosition(
          FenParser.toChessPosition(start.fen),
        );
        const actual = getAndApplyMoves(gameState);
        const expects = toExpects(expected);

        expect(actual.fen).toEqual(expects.fen);
        expect(actual.san).toEqual(expects.san);
      },
    );
  });

  describe('perft', () => {
    it('should return correct node counts for initial position depths 1-5', () => {
      const initialPosition = FenParser.toChessPosition(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
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
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      );
      const chessGame = Chessboard.fromPosition(initialPosition);

      expect(chessGame.perft(0).nodes).toBe(1);
    });

    it('should work with Kiwipete position (Position 2)', () => {
      const kiwipetePosition = FenParser.toChessPosition(
        'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1',
      );
      const chessGame = Chessboard.fromPosition(kiwipetePosition);

      expect(chessGame.perft(1).nodes).toBe(48);
      expect(chessGame.perft(2).nodes).toBe(2039);
      expect(chessGame.perft(3).nodes).toBe(97862);
    });

    it('should work with Kiwipete position (Position 4)', () => {
      const kiwipetePosition = FenParser.toChessPosition(
        'r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1',
      );
      const chessGame = Chessboard.fromPosition(kiwipetePosition);

      expect(chessGame.perft(1).nodes).toBe(6);
      expect(chessGame.perft(2).nodes).toBe(264);
      expect(chessGame.perft(3).nodes).toBe(9467);
    });
  });

  describe('unmakeMove', () => {
    it('should restore the position after unmaking a simple move', () => {
      const initialPosition = createChessPositionMock({
        pieces: {
          e2: { color: 'white', type: 'p' },
          e7: { color: 'black', type: 'p' },
          e1: { color: 'white', type: 'k' },
          e8: { color: 'black', type: 'k' },
        },
        turn: 'white',
      });

      let board = Chessboard.fromPosition(initialPosition);
      const originalFen = FenParser.toFenStr(board.position);

      board = board.playMove({
        from: 'e2',
        to: 'e4',
      });
      const afterMoveFen = FenParser.toFenStr(board.position);

      expect(afterMoveFen).not.toEqual(originalFen);
      expect(board.position.turn).toBe('black');

      board = board.unmakeMove();
      const afterUnmakeFen = FenParser.toFenStr(board.position);

      expect(afterUnmakeFen).toEqual(originalFen);
      expect(board.position.turn).toBe('white');
    });

    it('should handle unmaking multiple moves correctly', () => {
      const initialPosition = createChessPositionMock({
        pieces: {
          e2: { color: 'white', type: 'p' },
          e7: { color: 'black', type: 'p' },
          d2: { color: 'white', type: 'p' },
          d7: { color: 'black', type: 'p' },
          e1: { color: 'white', type: 'k' },
          e8: { color: 'black', type: 'k' },
        },
        turn: 'white',
      });

      let board = Chessboard.fromPosition(initialPosition);
      const originalFen = FenParser.toFenStr(board.position);

      // Make first move (e2-e4)
      board = board.playMove({
        from: 'e2',
        to: 'e4',
      });

      // Make second move (e7-e5)
      board = board.playMove({
        from: 'e7',
        to: 'e5',
      });

      // Make third move (d2-d4)
      board = board.playMove({
        from: 'd2',
        to: 'd4',
      });

      // Unmake all three moves
      board = board.unmakeMove(); // unmake d2-d4
      board = board.unmakeMove(); // unmake e7-e5
      board = board.unmakeMove(); // unmake e2-e4

      const finalFen = FenParser.toFenStr(board.position);
      expect(finalFen).toEqual(originalFen);
      expect(board.position.turn).toBe('white');
    });

    it('should handle unmakeMove on initial position gracefully', () => {
      const initialPosition = createChessPositionMock({
        pieces: {
          e1: { color: 'white', type: 'k' },
          e8: { color: 'black', type: 'k' },
        },
        turn: 'white',
      });

      const board = Chessboard.fromPosition(initialPosition);
      const originalFen = FenParser.toFenStr(board.position);

      const afterUnmake = board.unmakeMove();
      const afterUnmakeFen = FenParser.toFenStr(afterUnmake.position);

      expect(afterUnmakeFen).toEqual(originalFen);
      expect(afterUnmake.position.turn).toBe('white');
    });
  });

  describe('updateMoves', () => {
    it('should handle empty moves array by returning to initial position', () => {
      const initialPosition = createChessPositionMock({
        pieces: {
          e1: { color: 'white', type: 'k' },
          e8: { color: 'black', type: 'k' },
          e2: { color: 'white', type: 'p' },
          e7: { color: 'black', type: 'p' },
        },
        turn: 'white',
      });

      // Start with some moves played
      const board = Chessboard.fromPosition(initialPosition, [
        { from: 'e2', to: 'e4' },
        { from: 'e7', to: 'e5' },
      ]);

      // Update with empty moves array should return to initial position
      const updatedBoard = board.updateMoves([]);
      const initialFen = FenParser.toFenStr(initialPosition);
      const updatedFen = FenParser.toFenStr(updatedBoard.position);

      expect(updatedFen).toEqual(initialFen);
      expect(updatedBoard.movesRecord).toHaveLength(0);
    });

    it('should handle identical moves by returning the same board state', () => {
      const initialPosition = createChessPositionMock({
        pieces: {
          e1: { color: 'white', type: 'k' },
          e8: { color: 'black', type: 'k' },
          e2: { color: 'white', type: 'p' },
          e7: { color: 'black', type: 'p' },
        },
        turn: 'white',
      });

      // Start with some moves played
      const moves: Move[] = [
        { from: 'e2', to: 'e4' },
        { from: 'e7', to: 'e5' },
      ];
      const board = Chessboard.fromPosition(initialPosition, moves);

      const originalFen = FenParser.toFenStr(board.position);

      // Update with same moves should return identical board
      const updatedBoard = board.updateMoves(moves);
      const updatedFen = FenParser.toFenStr(updatedBoard.position);

      expect(updatedFen).toEqual(originalFen);
      expect(updatedBoard.movesRecord).toEqual(moves);
    });

    it('should handle adding new moves to existing sequence', () => {
      const initialPosition = createChessPositionMock({
        pieces: {
          e1: { color: 'white', type: 'k' },
          e8: { color: 'black', type: 'k' },
          e2: { color: 'white', type: 'p' },
          e7: { color: 'black', type: 'p' },
          d2: { color: 'white', type: 'p' },
          d7: { color: 'black', type: 'p' },
        },
        turn: 'white',
      });

      // Start with some moves played
      const board = Chessboard.fromPosition(initialPosition, [
        { from: 'e2', to: 'e4' },
        { from: 'e7', to: 'e5' },
      ]);

      // Update with additional moves
      const newMoves: Move[] = [
        { from: 'e2', to: 'e4' },
        { from: 'e7', to: 'e5' },
        { from: 'd2', to: 'd4' },
        { from: 'd7', to: 'd6' },
      ];

      const updatedBoard = board.updateMoves(newMoves);

      expect(updatedBoard.movesRecord).toEqual(newMoves);
      expect(updatedBoard.movesRecord).toHaveLength(4);
    });

    it('should handle replacing moves from divergence point', () => {
      const initialPosition = createChessPositionMock({
        pieces: {
          e1: { color: 'white', type: 'k' },
          e8: { color: 'black', type: 'k' },
          e2: { color: 'white', type: 'p' },
          e7: { color: 'black', type: 'p' },
          d2: { color: 'white', type: 'p' },
          d7: { color: 'black', type: 'p' },
          f2: { color: 'white', type: 'p' },
          f7: { color: 'black', type: 'p' },
        },
        turn: 'white',
      });

      // Start with some moves played
      const board = Chessboard.fromPosition(initialPosition, [
        { from: 'e2', to: 'e4' },
        { from: 'e7', to: 'e5' },
        { from: 'd2', to: 'd4' },
      ]);

      // Update with moves that diverge at second move
      const newMoves: Move[] = [
        { from: 'e2', to: 'e4' },
        { from: 'd7', to: 'd6' }, // Different from e7-e5
        { from: 'f2', to: 'f4' }, // Different continuation
      ];

      const updatedBoard = board.updateMoves(newMoves);

      expect(updatedBoard.movesRecord).toEqual(newMoves);
      expect(updatedBoard.movesRecord).toHaveLength(3);

      // Verify the position reflects the new move sequence
      const expectedBoard = Chessboard.fromPosition(initialPosition)
        .playMove({ from: 'e2', to: 'e4' })
        .playMove({ from: 'd7', to: 'd6' })
        .playMove({ from: 'f2', to: 'f4' });

      const expectedFen = FenParser.toFenStr(expectedBoard.position);
      const actualFen = FenParser.toFenStr(updatedBoard.position);
      expect(actualFen).toEqual(expectedFen);
    });

    it('should handle removing moves (shorter sequence)', () => {
      const initialPosition = createChessPositionMock({
        pieces: {
          e1: { color: 'white', type: 'k' },
          e8: { color: 'black', type: 'k' },
          e2: { color: 'white', type: 'p' },
          e7: { color: 'black', type: 'p' },
          d2: { color: 'white', type: 'p' },
          d7: { color: 'black', type: 'p' },
        },
        turn: 'white',
      });

      // Start with several moves played
      const board = Chessboard.fromPosition(initialPosition, [
        { from: 'e2', to: 'e4' },
        { from: 'e7', to: 'e5' },
        { from: 'd2', to: 'd4' },
        { from: 'd7', to: 'd6' },
      ]);

      // Update with fewer moves
      const shorterMoves: Move[] = [
        { from: 'e2', to: 'e4' },
        { from: 'e7', to: 'e5' },
      ];

      const updatedBoard = board.updateMoves(shorterMoves);

      expect(updatedBoard.movesRecord).toEqual(shorterMoves);
      expect(updatedBoard.movesRecord).toHaveLength(2);

      // Verify the position reflects the shorter sequence
      const expectedBoard = Chessboard.fromPosition(initialPosition)
        .playMove({ from: 'e2', to: 'e4' })
        .playMove({ from: 'e7', to: 'e5' });

      const expectedFen = FenParser.toFenStr(expectedBoard.position);
      const actualFen = FenParser.toFenStr(updatedBoard.position);
      expect(actualFen).toEqual(expectedFen);
    });

    it('should preserve board properties after update', () => {
      const initialPosition = createChessPositionMock({
        pieces: {
          e1: { color: 'white', type: 'k' },
          e8: { color: 'black', type: 'k' },
          e2: { color: 'white', type: 'p' },
          e7: { color: 'black', type: 'p' },
        },
        turn: 'white',
      });

      const board = Chessboard.fromPosition(initialPosition);
      const moves: Move[] = [{ from: 'e2', to: 'e4' }];
      const updatedBoard = board.updateMoves(moves);

      // Verify that board properties are properly calculated
      expect(updatedBoard.position.turn).toBe('black');
      expect(updatedBoard.isCheck).toBeDefined();
      expect(updatedBoard.isCheckmate).toBeDefined();
      expect(updatedBoard.isStalemate).toBeDefined();
      expect(updatedBoard.moveOptions).toBeDefined();
      expect(updatedBoard.moveOptions.length).toBeGreaterThan(0);
    });
  });
});
