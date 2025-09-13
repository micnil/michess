import { GameDetailsResponseV1 } from './game/GameDetailsResponseV1';
import { MakeMovePayloadV1 } from './game/MakeMovePayloadV1';
import { MakeMoveResponseV1 } from './game/MakeMoveResponseV1';

export type ClientToServerEvents = {
  'make-move': (
    move: MakeMovePayloadV1,
    callback: (response: MakeMoveResponseV1) => void
  ) => void;
  'join-game': (
    gameDetails: GameDetailsResponseV1,
    callback: (response: GameDetailsResponseV1) => void
  ) => void;
};
