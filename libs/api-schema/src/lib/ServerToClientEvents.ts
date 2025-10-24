import { GameDetailsV1 } from './game/GameDetailsV1';
import { MoveMadeV1 } from './game/MoveMadeV1';

export type ServerToClientEvents = {
  'move-made': (move: MoveMadeV1) => void;
  'game-updated': (gameDetails: GameDetailsV1) => void;
};
