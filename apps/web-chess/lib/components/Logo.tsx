import Image from 'next/image';
import { FC } from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo: FC = () => {
  return (
    <LogoContainer>
      <Image src="/knightv2.svg" height={30} width={30} alt="logo" />
      <span className="text-xl">michess</span>
    </LogoContainer>
  );
};
