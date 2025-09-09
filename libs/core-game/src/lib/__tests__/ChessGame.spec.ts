import { Color, createChessPositionMock } from '@michess/core-board';
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
});
