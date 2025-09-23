import { GameViewModel } from './GameViewModel';

export type ParticipantGameViewModel = GameViewModel & {
  playerSide: 'white' | 'black' | 'spectator';
};

// export const ParticipantGameViewModel = {
//   from: (game: GameViewModel, playerId: string): ParticipantGameViewModel => {
//     return {
//       ...game,
//       playerSide: game.whitePlayer?.username === playerId ? 'white' : 'black',
//     };
//   },
// };
