import { ColorV1, GameDetailsV1, MoveMadeV1 } from '@michess/api-schema';

export type GameEvent =
  | {
      type: 'move_made';
      data: {
        moveMade: MoveMadeV1;
        gameDetails: GameDetailsV1;
        statusChanged: boolean;
        moveColor: ColorV1;
      };
    }
  | {
      type: 'flag_timeout';
      data: GameDetailsV1;
    }
  | {
      type: 'game_joined';
      data: GameDetailsV1;
    };
