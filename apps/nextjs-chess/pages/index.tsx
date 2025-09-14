import { Container } from '../lib/components/Container';
import { HomePage } from '../lib/features/home/HomePage';

export function Home() {
  const handleQuickPlay = (timeControl: {
    id: string;
    type: string;
    time: string;
  }) => {
    // TODO: Implement quick play logic
    console.log('Quick play with time control:', timeControl);
  };

  const handleCreateGame = () => {
    // TODO: Implement game creation logic
    console.log('Creating new game');
  };

  const handleJoinGame = (gameId: string) => {
    // TODO: Implement join game logic
    console.log('Joining game:', gameId);
  };

  return (
    <Container>
      <HomePage
        onQuickPlay={handleQuickPlay}
        onCreateGame={handleCreateGame}
        onJoinGame={handleJoinGame}
      />
    </Container>
  );
}

export default Home;
