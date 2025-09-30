import { LocalGameContainer } from '../features/game/LocalGameContainer';
import { RemoteGameContainer } from '../features/game/RemoteGameContainer';

type Props = {
  gameId?: string;
  side?: 'white' | 'black';
};

export const GamePage = ({ gameId, side }: Props) => {
  if (!gameId) {
    return <LocalGameContainer orientation={side} />;
  }

  return <RemoteGameContainer gameId={gameId} orientation={side} />;
};

export default GamePage;
