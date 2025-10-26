import { Maybe } from '@michess/common-utils';
import { Color } from '@michess/core-board';
import { PlayerInfo } from './PlayerInfo';

export type GamePlayers = {
  white: Maybe<PlayerInfo>;
  black: Maybe<PlayerInfo>;
};

export const GamePlayers = {
  getColor: (players: GamePlayers, playerId: string): Maybe<Color> => {
    if (players.white?.id === playerId) {
      return Color.White;
    } else if (players.black?.id === playerId) {
      return Color.Black;
    } else {
      return undefined;
    }
  },
};
