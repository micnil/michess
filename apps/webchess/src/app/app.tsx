import { Chessboard } from './Chessboard';

export function App() {
  return (
    <main>
      <h1>Welcome to webchess!</h1>
      <Chessboard orientation={'white'} size={500} />
    </main>
  );
}

export default App;
