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
});
