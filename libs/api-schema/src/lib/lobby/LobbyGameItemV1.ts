import { GameVariantV1 } from '../game/GameVariantV1';
import { PlayerInfoV1 } from '../player/PlayerInfoV1';

export type LobbyGameItemV1 = {
  id: string;
  availableColor: 'white' | 'black' | 'spectator';
  opponent: PlayerInfoV1;
  variant: GameVariantV1;
  createdAt: string;
};
