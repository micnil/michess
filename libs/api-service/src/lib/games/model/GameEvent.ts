import { GameDetailsV1 } from '@michess/api-schema';

export type GameEventType = 'move_made' | 'flag_timeout' | 'game_joined';

export type GameEvent = {
  type: GameEventType;
  data: GameDetailsV1;
};
