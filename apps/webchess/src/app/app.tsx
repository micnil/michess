import { Chessboard as ChessboardView } from '@michess/react-chessboard';
import { Chessboard, ChessGame } from '@michess/core-state';
import { gameStateFromFen } from '@michess/core-fen';
import { useState } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { Logo } from './components/Logo';
import { Rules } from '@michess/core-rules';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    height: 100vh;
    width: 100vw;
  }

  #root {
    height: 100%;
  }
`;

const AppLayout = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
  height: 100%;
  background: linear-gradient(
    142deg,
    rgba(255, 255, 255, 1) 15%,
    rgba(215, 215, 215, 1) 100%
  );
`;

const Main = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function App() {
  const [chessGame, setChessGame] = useState(() =>
    ChessGame(
      gameStateFromFen('rnbqkbnr/8/r1N1Q1R1/8/8/8/8/RNBQKBNR w KQkq - 0 1')
    )
  );

  return (
    <>
      <GlobalStyle />
      <AppLayout>
        <Logo />
        <Main>
          <ChessboardView
            orientation={chessGame.getState().orientation}
            size={500}
            piecePlacements={chessGame.getState().pieces}
            moveOptions={Rules(chessGame)
              .getMoves()
              .map((move) => ({
                from: chessGame.getCoordinates()[move.start],
                to: chessGame.getCoordinates()[move.target],
              }))}
          />
        </Main>
      </AppLayout>
    </>
  );
}

export default App;
