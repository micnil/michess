import ChessboardView from './ChessboardView';
import { Color } from '../common-types/Color';
import { ChessboardContextProvider } from './context/ChessboardContextProvider';

export function App() {
  return (
    <main>
      <h1>Welcome to webchess!</h1>
      <ChessboardContextProvider>
        <ChessboardView size={500} orientation={Color.White} />
      </ChessboardContextProvider>
    </main>
  );
}

export default App;
