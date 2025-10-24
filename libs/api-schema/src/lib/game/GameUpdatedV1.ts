import { Maybe } from '@michess/common-utils';
import { ClockV1 } from './ClockV1';
import { GameDetailsV1 } from './GameDetailsV1';

export type GameUpdatedV1 = {
  gameDetails: GameDetailsV1;
  clock: Maybe<ClockV1>;
};
