import { Container } from '../components/Container';
import { ChessGameContainer } from '../features/chess-game/ChessGameContainer';

type Props = {
  gameId?: string;
};

export const GamePage = ({ gameId }: Props) => {
  if (!gameId) {
    return (
      <Container>
        <ChessGameContainer />
      </Container>
    );
  }

  return (
    <Container>
      <ChessGameContainer gameId={gameId} />
    </Container>
  );
};

export default GamePage;
