import { createGameStateMock, P } from '@michess/core-models';
import { ChessGame } from '../ChessGame';
import { Move } from '../model/Move';
import { Rules } from '../Rules';

describe('Rules', () => {
  describe('pawn', () => {
    it('can move 1 square forward', () => {
      const rules = Rules(
        ChessGame(
          createGameStateMock({
            pieces: {
              c3: P,
            },
          })
        )
      );

      const moves = rules.getMoves();

      expect(moves).toEqual([
        {
          start: 42,
          target: 34,
        } as Move,
      ]);
    });
  });
});
