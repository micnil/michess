import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ReactChessboardProps {}

const StyledReactChessboard = styled.div`
  color: pink;
`;

export function ReactChessboard(props: ReactChessboardProps) {
  return (
    <StyledReactChessboard>
      <h1>Welcome to ReactChessboard!</h1>
    </StyledReactChessboard>
  );
}

export default ReactChessboard;
