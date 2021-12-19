import { FC } from 'react';
import styled from 'styled-components';
import { ReactComponent as Icon } from '../../assets/knightv1.svg';

const Container = styled.div`
  padding: 1rem;
  margin: auto 0.5rem;
  font-size: 32px;
  display: flex;
  align-items: center;
`;

export const Logo: FC = () => {
  return (
    <Container>
      <Icon width={48} height={48} style={{ marginRight: '0.3em' }} />
      michess
    </Container>
  );
};
