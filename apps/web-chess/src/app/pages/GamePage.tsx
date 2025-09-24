import { ChessGameContainer } from '../features/chess-game/ChessGameContainer';

type Props = {
  gameId?: string;
  side?: 'white' | 'black';
};

export const GamePage = ({ gameId, side }: Props) => {
  if (!gameId) {
    return <ChessGameContainer orientation={side} gameId={'gameId'} />;
  }

  return <ChessGameContainer gameId={gameId} orientation={side} />;
};

export default GamePage;
