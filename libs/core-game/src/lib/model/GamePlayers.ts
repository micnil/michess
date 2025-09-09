import { Maybe } from '@michess/common-utils';
import { PlayerInfo } from './PlayerInfo';

export type GamePlayers = {
  white: Maybe<PlayerInfo>;
  black: Maybe<PlayerInfo>;
};
