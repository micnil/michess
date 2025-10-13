import { Maybe } from '@michess/common-utils';
import z from 'zod';
import { PlayerInfoV1 } from '../player/PlayerInfoV1';
import { GameActionOptionV1 } from './GameActionOptionV1';
import { GameResultV1Schema } from './GameResultV1Schema';
import { GameStatusTypeV1 } from './GameStatusTypeV1';
import { MoveV1 } from './MoveV1';

export type GameDetailsV1 = {
  id: string;
  isPrivate: boolean;
  variant: 'standard';
  status: GameStatusTypeV1;
  players: {
    white?: Maybe<PlayerInfoV1>;
    black?: Maybe<PlayerInfoV1>;
  };
  actionOptions: GameActionOptionV1[];
  moves: MoveV1[];
  result?: Maybe<z.infer<typeof GameResultV1Schema>>;
  initialPosition?: Maybe<string>;
  startedAt?: Maybe<Date>;
};
