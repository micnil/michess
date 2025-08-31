import React from 'react';
import styled from 'styled-components';
import { Maybe, Position } from '@michess/common-utils';
import { useDragDropContext, useDrop } from '@michess/react-dnd';
import { Color, Coordinate, PieceType } from '@michess/core-models';
import { useChessboardContext } from './context/hooks/useChessboardContext';
import { useMoveOptions } from './context/hooks/useMoveOptions';
import { canMoveTo } from './move/util/canMoveTo';
import { MovePayload } from './model/MovePayload';

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

type LatestMoveOverlayProps = {
  highlight: boolean;
};
const StyledLatestMoveOverlay = styled.rect<LatestMoveOverlayProps>`
  fill: ${({ highlight }) =>
    highlight ? 'rgba(255,255,0,0.3)' : 'rgba(255,255,0,0.0)'};
  pointer-events: none;
`;

type Props = {
  coordinate: Coordinate;
  showPromotionDialog: (
    coordinate: Coordinate,
    color: Color
  ) => Promise<PieceType>;
  color: Color;
  position: Position;
  size: number;
};

export const SquareView: React.FC<Props> = ({
  coordinate,
  showPromotionDialog,
  color,
  position,
  size,
}) => {
  const { movePiece, chessboard, latestMove } = useChessboardContext();
  const { state } = useDragDropContext();
  const moveOptions = useMoveOptions(state.draggingId as Coordinate);
  const canMoveHere = canMoveTo(moveOptions, coordinate);
  const handleDrop = async (draggableId: string) => {
    const fromCoord = draggableId as Coordinate;
    const options = moveOptions?.filter((option) => option.to === coordinate);
    const color = chessboard.getState().pieces.get(fromCoord)?.color;

    let move: Maybe<MovePayload>;
    if (options && options.length > 1 && color) {
      const pieceType = await showPromotionDialog(coordinate, color);
      move = options.find((option) => option.promotion === pieceType);
    } else {
      move = options?.[0];
    }
    if (move) {
      console.debug(`moving from ${draggableId} to coordinate ${move.to}`);
      movePiece(move);
    }
  };

  const { register, isHovering } = useDrop({
    id: coordinate,
    onDrop: handleDrop,
  });

  const higlightSquare =
    (!!moveOptions && canMoveHere) || (isHovering && canMoveHere);

  const isLatestMoveSquare =
    latestMove &&
    (latestMove.from === coordinate || latestMove.to === coordinate);

  return (
    <>
      <StyledRect
        {...position}
        color={color}
        width={size}
        height={size}
        ref={register}
      />
      <StyledLatestMoveOverlay
        {...position}
        width={size}
        height={size}
        highlight={!!isLatestMoveSquare}
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
