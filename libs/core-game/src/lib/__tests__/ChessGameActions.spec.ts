import { ChessGameActions } from '../ChessGameActions';
import { ChessGameAction, Color } from '@michess/core-board';

describe('ChessGameActions', () => {
  describe('useAction', () => {
    it('should handle OFFER_DRAW action correctly', () => {
      const initialActions = ChessGameActions.fromResult(undefined);

      const afterOfferDraw = initialActions.useAction(
        ChessGameAction.offerDraw(),
        Color.White
      );

      expect(
        afterOfferDraw.isActionAvailable(
          ChessGameAction.acceptDraw(Color.Black),
          Color.Black
        )
      ).toBe(true);
      expect(
        afterOfferDraw.isActionAvailable(
          ChessGameAction.rejectDraw(Color.Black),
          Color.Black
        )
      ).toBe(true);
      expect(
        afterOfferDraw.isActionAvailable(ChessGameAction.resign(), Color.Black)
      ).toBe(true);
      expect(
        afterOfferDraw.isActionAvailable(
          ChessGameAction.offerDraw(),
          Color.Black
        )
      ).toBe(false);
    });

    it('should handle REJECT_DRAW action correctly', () => {
      const actions = ChessGameActions.fromActions([
        ChessGameAction.acceptDraw(Color.Black),
        ChessGameAction.rejectDraw(Color.Black),
        ChessGameAction.resign(),
      ]);

      const afterRejectDraw = actions.useAction(
        ChessGameAction.rejectDraw(Color.Black),
        Color.Black
      );

      expect(
        afterRejectDraw.isActionAvailable(
          ChessGameAction.offerDraw(),
          Color.Black
        )
      ).toBe(true);
      expect(
        afterRejectDraw.isActionAvailable(ChessGameAction.resign(), Color.Black)
      ).toBe(true);
      expect(
        afterRejectDraw.isActionAvailable(
          ChessGameAction.acceptDraw(Color.Black),
          Color.Black
        )
      ).toBe(false);
      expect(
        afterRejectDraw.isActionAvailable(
          ChessGameAction.rejectDraw(Color.Black),
          Color.Black
        )
      ).toBe(false);
    });

    it('should handle ACCEPT_DRAW action correctly', () => {
      const actions = ChessGameActions.fromActions([
        ChessGameAction.acceptDraw(Color.Black),
        ChessGameAction.rejectDraw(Color.Black),
        ChessGameAction.resign(),
      ]);

      const afterAcceptDraw = actions.useAction(
        ChessGameAction.acceptDraw(Color.Black),
        Color.Black
      );

      expect(
        afterAcceptDraw.isActionAvailable(
          ChessGameAction.offerDraw(),
          Color.Black
        )
      ).toBe(false);
      expect(
        afterAcceptDraw.isActionAvailable(ChessGameAction.resign(), Color.Black)
      ).toBe(false);
      expect(
        afterAcceptDraw.isActionAvailable(
          ChessGameAction.acceptDraw(Color.Black),
          Color.Black
        )
      ).toBe(false);
    });
  });

  describe('addAction', () => {
    it('should handle addAction correctly', () => {
      const initialActions = ChessGameActions.fromResult(undefined);

      const withClaimDraw = initialActions.addAction(
        ChessGameAction.claimDrawThreeFold()
      );

      expect(
        withClaimDraw.isActionAvailable(
          ChessGameAction.claimDrawThreeFold(),
          Color.White
        )
      ).toBe(true);
      expect(
        withClaimDraw.isActionAvailable(
          ChessGameAction.offerDraw(),
          Color.White
        )
      ).toBe(false);
      expect(
        withClaimDraw.isActionAvailable(ChessGameAction.resign(), Color.White)
      ).toBe(true);
    });
  });
});
