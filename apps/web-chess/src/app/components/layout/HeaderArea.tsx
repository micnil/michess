import styled from 'styled-components';

export const HeaderArea = styled.header`
  grid-area: header;

  /* Mobile: very compact header */
  padding: 0.25rem 0.5rem;

  /* Desktop: slightly more spacious */
  @media (min-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;
