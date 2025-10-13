import { GameActionOptionV1 } from '@michess/api-schema';
import { GameViewModel } from './GameViewModel';

export type PlayerGameViewModel = GameViewModel & {
  playerSide: 'white' | 'black' | 'spectator';
  isReadOnly: boolean;
  actionOptions: GameActionOptionV1[];
};
