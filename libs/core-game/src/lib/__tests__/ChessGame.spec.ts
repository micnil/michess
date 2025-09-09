import {
  Color,
  createChessPositionMock,
  FenParser,
  FenStr,
} from '@michess/core-board';
import { ChessGame } from '../ChessGame';
import { MoveOption } from '../move/MoveOption';
import { castlingTestCases } from './test-cases/castling';
import { checkmatesTestCases } from './test-cases/checkmates';
import { famousTestCases } from './test-cases/famous';
import { pawnsTestCases } from './test-cases/pawns';
import { promotionsTestCases } from './test-cases/promotions';
import { stalematesTestCases } from './test-cases/stalemates';
import { standardTestCases } from './test-cases/standard';
import { taxingTestCases } from './test-cases/taxing';

const getAndApplyMoves = (chessGame: ChessGame): FenStr[] => {
  const moves = chessGame.getMoves();
  return moves.map((move) => {
    const newGameState = chessGame.play(MoveOption.toMove(move));
    return FenParser.toFenStr(newGameState.getPosition());
  });
};

describe('ChessGame', () => {
  describe('castling', () => {
    it.each(castlingTestCases.testCases)(
      'should handle castling correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = ChessGame.fromChessPosition(
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
        const gameState = ChessGame.fromChessPosition(
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
        const gameState = ChessGame.fromChessPosition(
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
        const gameState = ChessGame.fromChessPosition(
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
        const gameState = ChessGame.fromChessPosition(
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
        const gameState = ChessGame.fromChessPosition(
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
        const gameState = ChessGame.fromChessPosition(
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
        const gameState = ChessGame.fromChessPosition(
          FenParser.toChessPosition(start.fen)
        );
        const actualFens = getAndApplyMoves(gameState);
        const expectedFens = expected.map((e) => e.fen);
        expect(actualFens.sort()).toEqual(expectedFens.sort());
      }
    );
  });

  describe('getAdditionalActions', () => {
    it('should return three-fold repetition action when applicable', () => {
      const position = createChessPositionMock();
      const chessGame = ChessGame.fromChessPosition(position);

      expect(
        chessGame
          .getAdditionalActions()
          .filter((action) => action.type === 'CLAIM_DRAW')
      ).toHaveLength(0);

      // Bongcloud draw (magnus - hikaru game).
      const almostThreeFoldRepetition = chessGame
        .play({
          from: 'e2',
          to: 'e4',
        })
        .play({
          from: 'e7',
          to: 'e5',
        })
        .play({
          from: 'e1',
          to: 'e2',
        })
        // 1st occurance below
        .play({
          from: 'e8',
          to: 'e7',
        })
        .play({
          from: 'e2',
          to: 'e1',
        })
        .play({
          from: 'e7',
          to: 'e8',
        })
        .play({
          from: 'e1',
          to: 'e2',
        })
        // 2nd occurance below
        .play({
          from: 'e8',
          to: 'e7',
        })
        .play({
          from: 'e2',
          to: 'e1',
        })
        .play({
          from: 'e7',
          to: 'e8',
        });

      expect(
        almostThreeFoldRepetition
          .getAdditionalActions()
          .filter((action) => action.type === 'CLAIM_DRAW')
      ).toHaveLength(0);

      const threeFoldRepetitionGame = almostThreeFoldRepetition
        .play({
          from: 'e1',
          to: 'e2',
        })
        // 3rd occurance below
        .play({
          from: 'e8',
          to: 'e7',
        });

      const claimDrawAction = threeFoldRepetitionGame
        .getAdditionalActions()
        .filter((action) => action.type === 'CLAIM_DRAW')[0];

      expect(claimDrawAction).toBeDefined();

      expect(threeFoldRepetitionGame.getState().result).toBeUndefined();
      const drawnGame = threeFoldRepetitionGame.makeAction(
        claimDrawAction,
        Color.White
      );
      expect(drawnGame.getState().result?.type).toEqual('draw');
    });

    it('should return standard actions when no special conditions are met', () => {
      const position = createChessPositionMock({
        pieces: {
          e1: { color: 'white', type: 'k' },
          e8: { color: 'black', type: 'k' },
        },
        turn: 'white',
      });

      const chessGame = ChessGame.fromChessPosition(position);
      const actions = chessGame.getAdditionalActions();

      // Should always include offer draw and resign options
      expect(actions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'OFFER_DRAW' }),
          expect.objectContaining({ type: 'RESIGN' }),
        ])
      );
    });

    it('should return empty array when game is finished', () => {
      const position = createChessPositionMock({
        pieces: {
          e1: { color: 'white', type: 'k' },
          e8: { color: 'black', type: 'k' },
        },
        turn: 'white',
      });

      const chessGame = ChessGame.fromChessPosition(position).setResult({
        type: 'white_win',
      });

      const actions = chessGame.getAdditionalActions();
      expect(actions).toEqual([]);
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

      let chessGame = ChessGame.fromChessPosition(initialPosition);
      const originalFen = FenParser.toFenStr(chessGame.getPosition());

      chessGame = chessGame.play({
        from: 'e2',
        to: 'e4',
      });
      const afterMoveFen = FenParser.toFenStr(chessGame.getPosition());

      expect(afterMoveFen).not.toEqual(originalFen);
      expect(chessGame.getPosition().turn).toBe('black');

      chessGame = chessGame.unmakeMove();
      const afterUnmakeFen = FenParser.toFenStr(chessGame.getPosition());

      expect(afterUnmakeFen).toEqual(originalFen);
      expect(chessGame.getPosition().turn).toBe('white');
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

      let chessGame = ChessGame.fromChessPosition(initialPosition);
      const originalFen = FenParser.toFenStr(chessGame.getPosition());

      // Make first move (e2-e4)
      chessGame = chessGame.play({
        from: 'e2',
        to: 'e4',
      });

      // Make second move (e7-e5)
      chessGame = chessGame.play({
        from: 'e7',
        to: 'e5',
      });

      // Make third move (d2-d4)
      chessGame = chessGame.play({
        from: 'd2',
        to: 'd4',
      });

      // Unmake all three moves
      chessGame = chessGame.unmakeMove(); // unmake d2-d4
      chessGame = chessGame.unmakeMove(); // unmake e7-e5
      chessGame = chessGame.unmakeMove(); // unmake e2-e4

      const finalFen = FenParser.toFenStr(chessGame.getPosition());
      expect(finalFen).toEqual(originalFen);
      expect(chessGame.getPosition().turn).toBe('white');
    });

    it('should handle unmakeMove on initial position gracefully', () => {
      const initialPosition = createChessPositionMock({
        pieces: {
          e1: { color: 'white', type: 'k' },
          e8: { color: 'black', type: 'k' },
        },
        turn: 'white',
      });

      const chessGame = ChessGame.fromChessPosition(initialPosition);
      const originalFen = FenParser.toFenStr(chessGame.getPosition());

      const afterUnmake = chessGame.unmakeMove();
      const afterUnmakeFen = FenParser.toFenStr(afterUnmake.getPosition());

      expect(afterUnmakeFen).toEqual(originalFen);
      expect(afterUnmake.getPosition().turn).toBe('white');
    });
  });

  describe('perft', () => {
    it('should return correct node counts for initial position depths 1-5', () => {
      const initialPosition = FenParser.toChessPosition(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
      );
      const chessGame = ChessGame.fromChessPosition(initialPosition);

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
      const chessGame = ChessGame.fromChessPosition(initialPosition);

      expect(chessGame.perft(0).nodes).toBe(1);
    });

    it('should work with Kiwipete position (Position 2)', () => {
      const kiwipetePosition = FenParser.toChessPosition(
        'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1'
      );
      const chessGame = ChessGame.fromChessPosition(kiwipetePosition);

      expect(chessGame.perft(1).nodes).toBe(48);
      expect(chessGame.perft(2).nodes).toBe(2039);
      expect(chessGame.perft(3).nodes).toBe(97862);
    });

    it('should work with Kiwipete position (Position 4)', () => {
      const kiwipetePosition = FenParser.toChessPosition(
        'r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1'
      );
      const chessGame = ChessGame.fromChessPosition(kiwipetePosition);

      expect(chessGame.perft(1).nodes).toBe(6);
      expect(chessGame.perft(2).nodes).toBe(264);
      expect(chessGame.perft(3).nodes).toBe(9467);
    });
  });
});
