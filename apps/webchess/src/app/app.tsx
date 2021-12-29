import { Chessboard } from '@michess/react-chessboard';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { Logo } from './components/Logo';

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
  return (
    <>
      <GlobalStyle />
      <AppLayout>
        <Logo />
        <Main>
          <Chessboard orientation={'black'} size={500} />
        </Main>
      </AppLayout>
    </>
  );
}

export default App;
