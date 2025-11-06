import { Maybe } from '@michess/common-utils';
import { GameVariantType } from './GameVariantType';

export type GameMeta = {
  id: string;
  variant: GameVariantType;
  isPrivate: boolean;
  startedAt: Maybe<Date>;
  endedAt: Maybe<Date>;
  createdAt: Date;
  updatedAt: Date;
};
