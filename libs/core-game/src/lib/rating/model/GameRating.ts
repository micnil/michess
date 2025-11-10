import { Maybe } from '@michess/common-utils';
import { RatingSnapshot } from '@michess/core-rating';
import { GameVariantType } from '../../model/GameVariantType';
import { TimeControlClassification } from '../../model/TimeControlClassification';

export type GameRating = RatingSnapshot & {
  playerId: string;
  gameId: Maybe<string>;
  timeControlClassification: TimeControlClassification;
  variant: GameVariantType;
};
