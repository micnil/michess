import { Color } from '@michess/core-board';
import { ChessGameActions } from '../ChessGameActions';
import { GameAction } from '../model/GameAction';

describe('ChessGameActions', () => {
  describe('useAction', () => {
    it('should handle offer_draw action correctly', () => {
      const initialActions = ChessGameActions.fromResult(undefined);

      const afterOfferDraw = initialActions.useAction(
        GameAction.offerDraw(),
        Color.White
      );

      expect(
        afterOfferDraw.isActionAvailable(
          GameAction.acceptDraw(Color.Black),
          Color.Black
        )
      ).toBe(true);
      expect(
        afterOfferDraw.isActionAvailable(
          GameAction.rejectDraw(Color.Black),
          Color.Black
        )
      ).toBe(true);
      expect(
        afterOfferDraw.isActionAvailable(GameAction.resign(), Color.Black)
      ).toBe(true);
      expect(
        afterOfferDraw.isActionAvailable(GameAction.offerDraw(), Color.Black)
      ).toBe(false);
    });

    it('should handle reject_draw action correctly', () => {
      const actions = ChessGameActions.fromActions([
        GameAction.acceptDraw(Color.Black),
        GameAction.rejectDraw(Color.Black),
        GameAction.resign(),
      ]);

      const afterRejectDraw = actions.useAction(
        GameAction.rejectDraw(Color.Black),
        Color.Black
      );

      expect(
        afterRejectDraw.isActionAvailable(GameAction.offerDraw(), Color.Black)
      ).toBe(true);
      expect(
        afterRejectDraw.isActionAvailable(GameAction.resign(), Color.Black)
      ).toBe(true);
      expect(
        afterRejectDraw.isActionAvailable(
          GameAction.acceptDraw(Color.Black),
          Color.Black
        )
      ).toBe(false);
      expect(
        afterRejectDraw.isActionAvailable(
          GameAction.rejectDraw(Color.Black),
          Color.Black
        )
      ).toBe(false);
    });

    it('should handle accept_draw action correctly', () => {
      const actions = ChessGameActions.fromActions([
        GameAction.acceptDraw(Color.Black),
        GameAction.rejectDraw(Color.Black),
        GameAction.resign(),
      ]);

      const afterAcceptDraw = actions.useAction(
        GameAction.acceptDraw(Color.Black),
        Color.Black
      );

      expect(
        afterAcceptDraw.isActionAvailable(GameAction.offerDraw(), Color.Black)
      ).toBe(false);
      expect(
        afterAcceptDraw.isActionAvailable(GameAction.resign(), Color.Black)
      ).toBe(false);
      expect(
        afterAcceptDraw.isActionAvailable(
          GameAction.acceptDraw(Color.Black),
          Color.Black
        )
      ).toBe(false);
    });
  });

  describe('addAction', () => {
    it('should handle addAction correctly', () => {
      const initialActions = ChessGameActions.fromResult(undefined);

      const withClaimDraw = initialActions.addAction(
        GameAction.acceptDrawThreeFold()
      );

      expect(
        withClaimDraw.isActionAvailable(
          GameAction.acceptDrawThreeFold(),
          Color.White
        )
      ).toBe(true);
      expect(
        withClaimDraw.isActionAvailable(GameAction.offerDraw(), Color.White)
      ).toBe(false);
      expect(
        withClaimDraw.isActionAvailable(GameAction.resign(), Color.White)
      ).toBe(true);
    });
  });
});
