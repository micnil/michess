import ChessboardView from './ChessboardView';
import { Color } from '../common-types/Color';

export function App() {
  return (
    <main>
      <h1>Welcome to webchess!</h1>
      <ChessboardView size={500} orientation={Color.White}/>
    </main>
  );
}

export default App;
