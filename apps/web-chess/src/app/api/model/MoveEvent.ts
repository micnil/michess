import { ClockV1 } from '@michess/api-schema';
import { Maybe } from '@michess/common-utils';
import { Move } from '@michess/core-board';

export type MoveEvent = { move: Move; clock: Maybe<ClockV1> };
