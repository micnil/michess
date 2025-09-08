import { GameMeta } from './GameMeta';
import { GamePlayers } from './GamePlayers';
import { GameState } from './GameState';

export type GameDetails = GameMeta & GamePlayers & GameState;
