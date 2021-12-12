import ChessboardView from './ChessboardView';
import { Color } from '../chess-types/Color';
import { ChessboardContextProvider } from './context/ChessboardContextProvider';
import { DragDropContextProvider } from './drag-drop/DragDropContextProvider';

export function App() {
  return (
    <main>
      <h1>Welcome to webchess!</h1>
      <ChessboardContextProvider>
        <DragDropContextProvider>
          <ChessboardView size={500} orientation={Color.White} />
        </DragDropContextProvider>
      </ChessboardContextProvider>
    </main>
  );
}

export default App;
