import { Maybe, Position } from '@michess/common-utils';
import { Color, Coordinate, PieceType } from '@michess/core-board';
import { useDrop } from '@michess/react-dnd';
import React from 'react';
import styled from 'styled-components';
import { useChessboardContext } from './context/hooks/useChessboardContext';
import { useMoveOptions } from './context/hooks/useMoveOptions';
import { MovePayload } from './model/MovePayload';
import { canMoveTo } from './move/util/canMoveTo';

type RectProps = {
  color: Color;
};
const StyledRect = styled.rect<RectProps>`
  fill: ${({ color }) => (color === 'white' ? '#ecdab9' : '#c5a076')};
  pointer-events: all;
`;

type OverlayRectProps = {
  $highlight: boolean;
  $color: 'green' | 'yellow';
};
const StyledOverlayRect = styled.rect<OverlayRectProps>`
  fill: ${({ $highlight, $color }) =>
    $highlight
      ? $color === 'green'
        ? 'rgba(20,85,30,0.5)'
        : 'rgba(0,0,0,0.08)'
      : 'rgba(20,85,30,0.0)'};
  pointer-events: none;
`;

type PossibleMoveIndicatorProps = {
  $show: boolean;
  $hasPiece: boolean;
};
const StyledPossibleMoveIndicator = styled.circle<PossibleMoveIndicatorProps>`
  fill: ${({ $show }) => ($show ? 'rgba(50,50,50,0.3)' : 'transparent')};
  pointer-events: none;
`;

const StyledPossibleMoveBorder = styled.circle<PossibleMoveIndicatorProps>`
  fill: transparent;
  stroke-width: ${({ $show }) => ($show ? '6' : '0')};
  stroke: ${({ $show }) => ($show ? 'rgba(50,50,50,0.3)' : 'transparent')};
  pointer-events: none;
`;

type LatestMoveOverlayProps = {
  $highlight: boolean;
};
const StyledLatestMoveOverlay = styled.rect<LatestMoveOverlayProps>`
  fill: ${({ $highlight }) =>
    $highlight ? 'rgba(255,255,0,0.3)' : 'rgba(255,255,0,0.0)'};
  pointer-events: none;
`;

type Props = {
  coordinate: Coordinate;
  draggingFromCoord?: Maybe<Coordinate>;
  showPromotionDialog: (
    coordinate: Coordinate,
    color: Color
  ) => Promise<PieceType>;
  color: Color;
  position: Position;
  size: number;
  hasPiece: boolean;
};

export const SquareView: React.FC<Props> = ({
  coordinate,
  showPromotionDialog,
  draggingFromCoord,
  color,
  position,
  size,
  hasPiece,
}) => {
  const { movePiece, chessboard, latestMove } = useChessboardContext();
  const moveOptions = useMoveOptions(draggingFromCoord);
  const canMoveHere = canMoveTo(moveOptions, coordinate);
  const handleDrop = async (draggableId: string) => {
    const fromCoord = draggableId as Coordinate;
    const options = moveOptions?.filter((option) => option.to === coordinate);
    const color = chessboard.position.pieces.get(fromCoord)?.color;

    let move: Maybe<MovePayload>;
    if (options && options.length > 1 && color) {
      const pieceType = await showPromotionDialog(coordinate, color);
      move = options.find((option) => option.promotion === pieceType);
    } else {
      move = options?.[0];
    }
    if (move) {
      console.debug(`moving from ${fromCoord} to coordinate ${move.to}`);
      movePiece(move);
    }
  };

  const { register, isHovering } = useDrop({
    id: coordinate,
    onDrop: handleDrop,
  });

  const showPossibleMoveIndicator = !!moveOptions && canMoveHere && !isHovering;
  const showHoverHighlight = isHovering && canMoveHere;

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
        $highlight={!!isLatestMoveSquare}
      />
      <StyledOverlayRect
        {...position}
        width={size}
        height={size}
        $highlight={showHoverHighlight}
        $color="green"
      />
      {/* Show bigger circle for squares with pieces, smaller circle for empty squares */}
      {hasPiece ? (
        <StyledPossibleMoveBorder
          cx={position.x + size / 2}
          cy={position.y + size / 2}
          r={size * 0.4}
          $show={showPossibleMoveIndicator}
          $hasPiece={hasPiece}
        />
      ) : (
        <StyledPossibleMoveIndicator
          cx={position.x + size / 2}
          cy={position.y + size / 2}
          r={size * 0.15}
          $show={showPossibleMoveIndicator}
          $hasPiece={hasPiece}
        />
      )}
    </>
  );
};
