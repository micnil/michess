import { Color, createChessPositionMock, FenParser } from '@michess/core-board';
import { ChessGame } from '../ChessGame';

describe('ChessGame', () => {
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
});
