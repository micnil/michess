import React from 'react';
import styled from 'styled-components';
import { Color } from '../common-types/Color';
import { Position } from './Position';

type Props = {
  color: Color;
  position: Position;
  size: number;
};

type RectProps = {
  color: Color;
};
const StyledRect = styled.rect<RectProps>`
  fill: ${({ color }) => (color === 'white' ? '#ecdab9' : '#c5a076')};
`;

export const Square: React.FC<Props> = ({ color, position, size }) => {
  return <StyledRect {...position} color={color} width={size} height={size} />;
};
