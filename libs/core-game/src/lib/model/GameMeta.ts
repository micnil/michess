import { Maybe } from '@michess/common-utils';

export type GameMeta = {
  id: string;
  variant: string;
  isPrivate: boolean;
  startedAt: Maybe<Date>;
  endedAt: Maybe<Date>;
  createdAt: Date;
  updatedAt: Date;
};
