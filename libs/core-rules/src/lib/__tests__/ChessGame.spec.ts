import { FenParser, FenStr } from '@michess/core-fen';
import { ChessGame } from '../ChessGame';
import { castlingTestCases } from './test-cases/castling';
import { checkmatesTestCases } from './test-cases/checkmates';
import { famousTestCases } from './test-cases/famous';
import { promotionsTestCases } from './test-cases/promotions';
import { stalematesTestCases } from './test-cases/stalemates';
import { standardTestCases } from './test-cases/standard';
import { pawnsTestCases } from './test-cases/pawns';
import { taxingTestCases } from './test-cases/taxing';
import {
  Color,
  Coordinate,
  createChessPositionMock,
} from '@michess/core-models';

const getAndApplyMoves = (chessGame: ChessGame): FenStr[] => {
  const moves = chessGame.getMoves();
  return moves.map((move) => {
    const newGameState = chessGame.makeMove(move);
    return FenParser.toFenStr(newGameState.getState());
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
        .makeMove({
          start: Coordinate.toIndex('e2'),
          target: Coordinate.toIndex('e4'),
          capture: false,
        })
        .makeMove({
          start: Coordinate.toIndex('e7'),
          target: Coordinate.toIndex('e5'),
          capture: false,
        })
        .makeMove({
          start: Coordinate.toIndex('e1'),
          target: Coordinate.toIndex('e2'),
          capture: false,
        })
        // 1st occurance below
        .makeMove({
          start: Coordinate.toIndex('e8'),
          target: Coordinate.toIndex('e7'),
          capture: false,
        })
        .makeMove({
          start: Coordinate.toIndex('e2'),
          target: Coordinate.toIndex('e1'),
          capture: false,
        })
        .makeMove({
          start: Coordinate.toIndex('e7'),
          target: Coordinate.toIndex('e8'),
          capture: false,
        })
        .makeMove({
          start: Coordinate.toIndex('e1'),
          target: Coordinate.toIndex('e2'),
          capture: false,
        })
        // 2nd occurance below
        .makeMove({
          start: Coordinate.toIndex('e8'),
          target: Coordinate.toIndex('e7'),
          capture: false,
        })
        .makeMove({
          start: Coordinate.toIndex('e2'),
          target: Coordinate.toIndex('e1'),
          capture: false,
        })
        .makeMove({
          start: Coordinate.toIndex('e7'),
          target: Coordinate.toIndex('e8'),
          capture: false,
        });

      expect(
        almostThreeFoldRepetition
          .getAdditionalActions()
          .filter((action) => action.type === 'CLAIM_DRAW')
      ).toHaveLength(0);

      const threeFoldRepetitionGame = almostThreeFoldRepetition
        .makeMove({
          start: Coordinate.toIndex('e1'),
          target: Coordinate.toIndex('e2'),
          capture: false,
        })
        // 3rd occurance below
        .makeMove({
          start: Coordinate.toIndex('e8'),
          target: Coordinate.toIndex('e7'),
          capture: false,
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
});
