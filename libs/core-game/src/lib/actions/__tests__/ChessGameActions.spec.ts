import { ChessboardMock, Color } from '@michess/core-board';
import { ChessGameActions } from '../ChessGameActions';
import { GameActionOption } from '../model/GameActionOption';

describe('ChessGameActions', () => {
  const defaultOptions = [
    GameActionOption.offerDraw(),
    GameActionOption.resign(),
  ];
  describe('useAction', () => {
    it('should handle offer_draw action correctly', () => {
      const initialActions = new ChessGameActions({
        options: defaultOptions,
        usedActions: [],
        board: ChessboardMock.standardInitial(),
      });

      const afterOfferDraw = initialActions.useAction(Color.White, {
        type: 'offer_draw',
      });

      expect(
        afterOfferDraw.isActionAvailable(
          Color.Black,
          GameActionOption.acceptDraw(Color.Black),
        ),
      ).toBe(true);
      expect(
        afterOfferDraw.isActionAvailable(
          Color.Black,
          GameActionOption.resign(),
        ),
      ).toBe(true);
      expect(
        afterOfferDraw.isActionAvailable(
          Color.Black,
          GameActionOption.offerDraw(),
        ),
      ).toBe(false);
    });

    it('should handle accept_draw action correctly', () => {
      const actions = ChessGameActions.from(
        [
          {
            color: Color.White,
            type: 'offer_draw',
            moveNumber: 0,
          },
        ],
        ChessboardMock.standardInitial(),
        'IN_PROGRESS',
      );

      expect(
        actions.isActionAvailable(Color.Black, { type: 'accept_draw' }),
      ).toBe(true);

      const afterAcceptDraw = actions.useAction(Color.Black, {
        type: 'accept_draw',
      });

      expect(
        afterAcceptDraw.isActionAvailable(
          Color.Black,
          GameActionOption.offerDraw(),
        ),
      ).toBe(false);
      expect(
        afterAcceptDraw.isActionAvailable(
          Color.Black,
          GameActionOption.resign(),
        ),
      ).toBe(false);
      expect(
        afterAcceptDraw.isActionAvailable(
          Color.Black,
          GameActionOption.acceptDraw(Color.Black),
        ),
      ).toBe(false);
    });
  });

  describe('addAction', () => {
    it('should handle addAction correctly', () => {
      const initialActions = new ChessGameActions({
        options: defaultOptions,
        usedActions: [],
        board: ChessboardMock.standardInitial(),
      });

      const withClaimDraw = initialActions.addOption(
        GameActionOption.acceptDrawThreeFold(),
      );

      expect(
        withClaimDraw.isActionAvailable(
          Color.White,
          GameActionOption.acceptDrawThreeFold(),
        ),
      ).toBe(true);
      expect(
        withClaimDraw.isActionAvailable(
          Color.White,
          GameActionOption.offerDraw(),
        ),
      ).toBe(false);
      expect(
        withClaimDraw.isActionAvailable(Color.White, GameActionOption.resign()),
      ).toBe(true);
    });
  });
});
