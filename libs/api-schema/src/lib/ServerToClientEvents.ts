import { GameDetailsV1 } from './game/GameDetailsV1';
import { MakeMovePayloadV1 } from './game/MakeMovePayloadV1';

export type ServerToClientEvents = {
  'move-made': (move: MakeMovePayloadV1) => void;
  'user-joined': (gameDetails: GameDetailsV1) => void;
  'user-left': (gameDetails: GameDetailsV1) => void;
};
