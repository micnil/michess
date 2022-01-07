import { Chessboard as ChessboardView } from '@michess/react-chessboard';
import { gameStateFromFen } from '@michess/core-fen';
import { useState } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { Logo } from './components/Logo';
import { ChessGame, IChessGame, Move, Rules } from '@michess/core-rules';
import { MovePayload } from '@michess/core-state';

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

const uiMoveToCoreMove = (
  chess: IChessGame,
  movePayload: MovePayload
): Move => {
  return {
    start: chess.getIndex(movePayload.from),
    target: chess.getIndex(movePayload.to),
    capture: false,
  };
};

export function App() {
  const [chessGame, setChessGame] = useState(() =>
    ChessGame(
      gameStateFromFen(
        'rnbqkbnr/ppp5/r1N1Q1R1/8/8/8/PPP5/RNBQKBNR w KQkq - 0 1'
      )
    ).setOrientation('white')
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
            onMove={(move) => {
              setChessGame(
                chessGame.makeMove(uiMoveToCoreMove(chessGame, move))
              );
            }}
            moveOptions={chessGame.getMoves().map((move) => ({
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
