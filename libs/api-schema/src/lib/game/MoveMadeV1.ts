import { Maybe } from '@michess/common-utils';
import { ClockV1 } from './ClockV1';
import { MoveV1 } from './MoveV1';

export type MoveMadeV1 = MoveV1 & {
  gameId: string;
  clock: Maybe<ClockV1>;
};
