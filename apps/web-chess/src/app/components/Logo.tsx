import { FC } from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  padding: 0.25rem;
  gap: 0.25rem;
`;

export const Logo: FC = () => {
  return (
    <LogoContainer>
      <img src="/knightv2.svg" height={32} width={32} alt="logo" />
      <span>michess</span>
    </LogoContainer>
  );
};
