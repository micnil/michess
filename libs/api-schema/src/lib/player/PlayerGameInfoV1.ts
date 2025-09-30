import { ColorV1 } from '../game/ColorV1';
import { GameResultV1 } from '../game/GameResultV1';
import { GameVariantV1 } from '../game/GameVariantV1';
import { PlayerInfoV1 } from './PlayerInfoV1';

export type PlayerGameInfoV1 = {
  id: string;
  opponent: PlayerInfoV1;
  ownSide: ColorV1;
  turn: ColorV1;
  variant: GameVariantV1;
  result?: GameResultV1;
};
