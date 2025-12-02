import { GameDetailsV1 } from './game/GameDetailsV1';
import { MoveMadeV1 } from './game/MoveMadeV1';
import { MatchFoundV1 } from './matchmaking/MatchFoundV1';

export type ServerToClientEvents = {
  'move-made': (move: MoveMadeV1) => void;
  'game-updated': (gameDetails: GameDetailsV1) => void;
  'match-found': (match: MatchFoundV1) => void;
};
