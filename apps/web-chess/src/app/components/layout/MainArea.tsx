import styled from 'styled-components';

export const MainArea = styled.main`
  grid-area: main;

  /* Mobile: center content with minimal spacing */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 0; /* Allow flexbox to control height */
`;
