import { isDefined } from '@michess/common-utils';
import { Color } from '@michess/core-board';
import { GameDetails } from './model/GameDetails';
import { PlayerInfo } from './model/PlayerInfo';

export type ChessTable = {
  joinGame(playerInfo: PlayerInfo, side?: Color): ChessTable;
  getGameDetails(): GameDetails;
};

const joinGame = (
  gameDetails: GameDetails,
  playerInfo: PlayerInfo,
  color?: Color
): GameDetails => {
  const availableSides: Color[] = [
    gameDetails.players.white ? null : ('white' as const),
    gameDetails.players.black ? null : ('black' as const),
  ].filter(isDefined);

  const sideToJoin =
    color ?? availableSides[Math.floor(Math.random() * availableSides.length)];
  if (sideToJoin === 'white' && gameDetails.players.white === undefined) {
    return {
      ...gameDetails,
      players: {
        ...gameDetails.players,
        white: { id: 'some-player-id', name: 'Player' },
      },
      status: availableSides.includes('black') ? 'READY' : 'WAITING',
    };
  } else if (sideToJoin === 'black' && gameDetails.players.black === null) {
    // Allow joining as black if the slot is empty
    return {
      ...gameDetails,
      players: {
        ...gameDetails.players,
        black: { id: playerInfo.id, name: playerInfo.name },
      },
      status: availableSides.includes('white') ? 'READY' : 'WAITING',
    };
  } else {
    throw new Error('Invalid side or side already taken');
  }
};

export const ChessTable = {
  fromGameDetails: (gameDetails: GameDetails): ChessTable => {
    return {
      getGameDetails: () => gameDetails,
      joinGame: (playerInfo: PlayerInfo, color?: Color) => {
        return ChessTable.fromGameDetails(
          joinGame(gameDetails, playerInfo, color)
        );
      },
    };
  },
};
