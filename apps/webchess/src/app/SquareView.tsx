import React from 'react';
import styled from 'styled-components';
import { Color } from '../common-types/Color';
import { Coordinate } from '../common-types/Coordinate';
import { useDrop } from './drag-drop/hooks/useDrop';
import { Position } from './types/Position';

type RectProps = {
  color: Color;
};
const StyledRect = styled.rect<RectProps>`
  fill: ${({ color }) => (color === 'white' ? '#ecdab9' : '#c5a076')};
`;

type Props = {
  coordinate: Coordinate;
  color: Color;
  position: Position;
  size: number;
};

export const SquareView: React.FC<Props> = ({
  coordinate,
  color,
  position,
  size,
}) => {
  const { register } = useDrop({ id: coordinate });
  return (
    <StyledRect
      {...position}
      color={color}
      width={size}
      height={size}
      ref={register}
    />
  );
};
