import { PlayerInfo } from '../PlayerInfo';

const fromId = (id: string): PlayerInfo => ({
  id,
  name: `u${id}`,
  isBot: false,
});
const fromPartial = (partial: Partial<PlayerInfo>): PlayerInfo => ({
  id: 'u1',
  isBot: false,
  name: 'Player One',
  ...partial,
});
export const PlayerInfoMock = { fromId, fromPartial };
