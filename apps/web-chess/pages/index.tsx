import { ChessGameContainer } from '../features/chess-game/ChessGameContainer';
import { Header } from '../features/header/Header';

export function Home() {
  return (
    <>
      <Header />
      <main className="flex justify-center items-center flex-auto">
        <ChessGameContainer />
      </main>
    </>
  );
}

export default Home;
