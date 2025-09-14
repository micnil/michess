import { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children?: ReactNode;
};

const NavbarContainer = styled.nav`
  display: flex;
`;

export const Navbar: FC<Props> = ({ children }) => {
  return <NavbarContainer>{children}</NavbarContainer>;
};
