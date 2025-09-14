import styled from 'styled-components';

export const PageLayout = styled.div`
  display: grid;
  height: 100%;
  max-width: 1440px;
  margin: auto;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 50px auto 50px;
  grid-template-areas:
    'header header header'
    'info-panel main control-panel'
    'footer footer footer';
  gap: 1rem;
`;
