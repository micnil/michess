import { Container } from '../components/Container';
import { ChessGameContainer } from '../features/chess-game/ChessGameContainer';

type Props = {
  gameId?: string;
  side?: 'white' | 'black';
};

export const GamePage = ({ gameId, side }: Props) => {
  if (!gameId) {
    return (
      <Container>
        {/** TODO Display local game container*/}
        <ChessGameContainer orientation={side} gameId={'gameId'} />
      </Container>
    );
  }

  return (
    <Container>
      <ChessGameContainer gameId={gameId} orientation={side} />
    </Container>
  );
};

export default GamePage;
