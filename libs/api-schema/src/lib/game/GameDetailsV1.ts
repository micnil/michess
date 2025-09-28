import { Maybe } from '@michess/common-utils';
import { PlayerInfoV1 } from '../player/PlayerInfoV1';
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
  moves: MoveV1[];
  result?: Maybe<{
    type: 'white_win' | 'black_win' | 'draw';
  }>;
  initialPosition?: Maybe<string>;
  startedAt?: Maybe<Date>;
};
