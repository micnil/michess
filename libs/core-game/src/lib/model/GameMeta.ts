import { Maybe } from '@michess/common-utils';
import { GameStatusType } from './GameStatusType';

export type GameMeta = {
  id: string;
  isPrivate: boolean;
  status: GameStatusType;
  variant: string;
  startedAt: Maybe<Date>;
  endedAt: Maybe<Date>;
  createdAt: Date;
  updatedAt: Date;
};
