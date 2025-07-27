import { FenParser } from '@michess/core-fen';
import { ChessGame } from '../ChessGame';
import { castlingTestCases } from './test-cases/castling';

describe('ChessGame', () => {
  describe('castling', () => {
    it.each(castlingTestCases.testCases)(
      'should handle castling correctly for $start.fen',
      ({ start, expected }) => {
        const gameState = ChessGame(FenParser.toGameState(start.fen));
        const moves = gameState.getMoves();
        const actualFens = moves.map((move) => {
          const newGameState = gameState.makeMove(move);
          return FenParser.toFenStr(newGameState.getState());
        });
        const expectedFens = expected.map((e) => e.fen);
        expect(actualFens.sort()).toEqual(expectedFens.sort());
      }
    );
  });
});
