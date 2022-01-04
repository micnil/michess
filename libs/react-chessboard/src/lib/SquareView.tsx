import React from 'react';
import styled from 'styled-components';
import { Maybe, Position } from '@michess/common-utils';
import { useDragDropContext, useDrop } from '@michess/react-dnd';
import { Color, Coordinate } from '@michess/core-models';
import { useChessboardContext } from './context/useChessboardContext';
import { MoveOptions } from './model/MoveOptions';
import { useMoveOptions } from './hooks/useMoveOptions';

type RectProps = {
  color: Color;
};
const StyledRect = styled.rect<RectProps>`
  fill: ${({ color }) => (color === 'white' ? '#ecdab9' : '#c5a076')};
  pointer-events: all;
`;

type OverlayRectProps = {
  highlight: boolean;
  color: 'green' | 'yellow';
};
const StyledOverlayRect = styled.rect<OverlayRectProps>`
  fill: ${({ highlight, color }) =>
    highlight
      ? color === 'green'
        ? 'rgba(20,85,30,0.5)'
        : 'rgba(254,254,51,0.2)'
      : 'rgba(20,85,30,0.0)'};
  pointer-events: all;
`;

type Props = {
  coordinate: Coordinate;
  color: Color;
  position: Position;
  size: number;
};

const canMoveTo = (moveOptions: Maybe<MoveOptions>, toCoord: Coordinate) => {
  return moveOptions
    ? moveOptions.some((moveOption) => moveOption.to === toCoord)
    : true;
};

export const SquareView: React.FC<Props> = ({
  coordinate,
  color,
  position,
  size,
}) => {
  const { movePiece } = useChessboardContext();
  const handleDrop = (draggableId: string) => {
    if (canMoveHere) {
      console.debug(`moving from ${draggableId} to coordinate ${coordinate}`);
      movePiece({ from: draggableId as Coordinate, to: coordinate });
    }
  };

  const { state } = useDragDropContext();
  const { register, isHovering } = useDrop({
    id: coordinate,
    onDrop: handleDrop,
  });

  const moveOptions = useMoveOptions(state.draggingId as Coordinate);

  const canMoveHere = canMoveTo(moveOptions, coordinate);
  const higlightSquare =
    (!!moveOptions && canMoveHere) || (isHovering && canMoveHere);

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
        highlight={higlightSquare}
        color={isHovering ? 'green' : 'yellow'}
      />
    </>
  );
};
