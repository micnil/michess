import { FC } from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  padding: 0.5rem;
  gap: 0.5rem;
`;

export const Logo: FC = () => {
  return (
    <LogoContainer>
      <img src="/knightv2.svg" height={40} width={40} alt="logo" />
      <span>michess</span>
    </LogoContainer>
  );
};
