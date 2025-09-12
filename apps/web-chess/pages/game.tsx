import { Container } from '../lib/components/Container';
import { ChessGameContainer } from '../lib/features/chess-game/ChessGameContainer';

export function GamePage() {
  return (
    <Container>
      <ChessGameContainer />
    </Container>
  );
}

export default GamePage;
