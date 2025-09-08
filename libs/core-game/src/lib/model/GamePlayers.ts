import { Maybe } from '@michess/common-utils';
import { PlayerInfo } from './PlayerInfo';

export type GamePlayers = {
  players: {
    white: Maybe<PlayerInfo>;
    black: Maybe<PlayerInfo>;
  };
};
