import { RemoteGameContainer } from '../features/chess-game/RemoteGameContainer';

type Props = {
  gameId?: string;
  side?: 'white' | 'black';
};

export const GamePage = ({ gameId, side }: Props) => {
  if (!gameId) {
    return <RemoteGameContainer orientation={side} gameId={'gameId'} />;
  }

  return <RemoteGameContainer gameId={gameId} orientation={side} />;
};

export default GamePage;
