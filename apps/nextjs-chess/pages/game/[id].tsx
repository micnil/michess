import { useRouter } from 'next/router';
import { Container } from '../../lib/components/Container';
import { ChessGameContainer } from '../../lib/features/chess-game/ChessGameContainer';

export function GamePage() {
  const router = useRouter();
  const { id } = router.query;

  // Show loading state while router is not ready
  if (!router.isReady || !id) {
    return (
      <Container>
        <div>Loading game...</div>
      </Container>
    );
  }

  return (
    <Container>
      <ChessGameContainer gameId={id as string} />
    </Container>
  );
}

export default GamePage;
