import { Link } from '@tanstack/react-router';
import { FC } from 'react';
import styled from 'styled-components';

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  padding: 0.25rem;
  gap: 0.25rem;
  text-decoration: none;
  color: inherit;
`;

export const Logo: FC = () => {
  return (
    <LogoContainer to="/">
      <img src="/knightv2.svg" height={32} width={32} alt="logo" />
      <span>michess</span>
    </LogoContainer>
  );
};
