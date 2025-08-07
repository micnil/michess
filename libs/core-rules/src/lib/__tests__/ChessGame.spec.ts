import { FenParser, FenStr } from '@michess/core-fen';
import { ChessGame } from '../ChessGame';
import { castlingTestCases } from './test-cases/castling';
import { famousTestCases } from './test-cases/famous';
import { checkmatesTestCases } from './test-cases/checkmates';
import { taxingTestCases } from './test-cases/taxing';
import { IChessGame } from '../model/IChessGame';

const getAndApplyMoves = (chessGame: IChessGame): FenStr[] => {
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
        const gameState = ChessGame(FenParser.toGameState(start.fen));
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
        const gameState = ChessGame(FenParser.toGameState(start.fen));
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
        const gameState = ChessGame(FenParser.toGameState(start.fen));
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
        const gameState = ChessGame(FenParser.toGameState(start.fen));
        const actualFens = getAndApplyMoves(gameState);
        const expectedFens = expected.map((e) => e.fen);
        expect(actualFens.sort()).toEqual(expectedFens.sort());
      }
    );
  });
});
