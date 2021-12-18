import React from 'react';
import styled from 'styled-components';
import { Position } from '@michess/common-utils';
import { useDrop } from '@michess/react-dnd';
import { Color, Coordinate } from '@michess/core-models';
import { useChessboardContext } from './context/useChessboardContext';

type RectProps = {
  color: Color;
};
const StyledRect = styled.rect<RectProps>`
  fill: ${({ color }) => (color === 'white' ? '#ecdab9' : '#c5a076')};
  pointer-events: all;
`;

type OverlayRectProps = {
  highlight: boolean;
};
const StyledOverlayRect = styled.rect<OverlayRectProps>`
  fill: ${({ highlight }) =>
    highlight ? 'rgba(20,85,30,0.5)' : 'rgba(20,85,30,0.0)'};
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
  size,
}) => {
  const { movePiece } = useChessboardContext();

  const handleDrop = (pieceId: string) => {
    console.debug(`moving ${pieceId} to coordinate ${coordinate}`);
    movePiece(pieceId, coordinate);
  };

  const { register, isHovering } = useDrop({
    id: coordinate,
    onDrop: handleDrop,
  });
  return (
    <>
      <StyledRect
        {...position}
        color={color}
        width={size}
        height={size}
        ref={register}
      />
      <StyledOverlayRect
        {...position}
        width={size}
        height={size}
        highlight={isHovering}
      />
    </>
  );
};
