import styled from 'styled-components';

export const PageLayout = styled.div`
  display: grid;
  min-height: 100vh;

  /* Mobile-first: simple single column layout */
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'main'
    'footer';
  gap: 0;

  /* Desktop: 3-column layout with side panels */
  @media (min-width: 768px) {
    max-width: 1440px;
    margin: auto;
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: 60px 1fr 60px;
    grid-template-areas:
      'header header header'
      'info-panel main control-panel'
      'footer footer footer';
    gap: 1rem;
  }
`;
