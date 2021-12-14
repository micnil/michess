import React from 'react';
import styled from 'styled-components';
import { Color } from '../chess-types/Color';
import { Coordinate } from '../chess-types/Coordinate';
import { useDrop } from './drag-drop/hooks/useDrop';
import { Position } from '../util/types/Position';
import { useChessboardContext } from './context/useChessboardContext';

type RectProps = {
  color: Color;
};
const StyledRect = styled.rect<RectProps>`
  fill: ${({ color }) => (color === 'white' ? '#ecdab9' : '#c5a076')};
  pointer-events: all;
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
  size
}) => {
  const { movePiece } = useChessboardContext();

  const handleDrop = (pieceId: string) => {
    console.log(`moving ${pieceId} to coordinate ${coordinate}`)
    movePiece(pieceId, coordinate);
  };

  const { register } = useDrop({ id: coordinate, onDrop: handleDrop });
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
