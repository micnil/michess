import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ReactDndProps {}

const StyledReactDnd = styled.div`
  color: pink;
`;

export function ReactDnd(props: ReactDndProps) {
  return (
    <StyledReactDnd>
      <h1>Welcome to ReactDnd!</h1>
    </StyledReactDnd>
  );
}

export default ReactDnd;
