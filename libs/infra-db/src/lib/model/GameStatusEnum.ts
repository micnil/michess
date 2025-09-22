import { GameStatusType } from '@michess/core-game';
import { InferEnum } from 'drizzle-orm';
import { gameStatusEnum } from '../schema/shared/gameStatusEnum';

export type GameStatusEnum = InferEnum<typeof gameStatusEnum>;

export const GameStatusEnum = {
  fromGameStatusType(status: GameStatusType): GameStatusEnum {
    switch (status) {
      case 'EMPTY':
        return 'empty';
      case 'IN_PROGRESS':
        return 'in-progress';
      case 'ENDED':
        return 'end';
      case 'READY':
        return 'ready';
      case 'WAITING':
        return 'waiting';
      default:
        throw new Error(`Unknown GameStatusType: ${status}`);
    }
  },
};
