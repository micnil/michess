import { Maybe, Position } from '@michess/common-utils';
import { Color, Coordinate, PieceType } from '@michess/core-board';
import { useDrop } from '@michess/react-dnd';
import React from 'react';
import styles from './SquareView.module.css';
import { useChessboardContext } from './context/hooks/useChessboardContext';
import { useMoveOptions } from './context/hooks/useMoveOptions';
import { MovePayload } from './model/MovePayload';
import { canMoveTo } from './move/util/canMoveTo';

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
  const showHoverHighlight =
    (isHovering && canMoveHere) || draggingFromCoord === coordinate;

  const isLatestMoveSquare =
    latestMove &&
    (latestMove.from === coordinate || latestMove.to === coordinate);

  // Helper function to get corner cuts path
  const getCornerCutsPath = (
    show: boolean,
    x: number,
    y: number,
    size: number
  ) => {
    if (!show) return '';
    return `M ${x} ${y}
       L ${x + size * 0.2} ${y}
       L ${x} ${y + size * 0.2} Z

       M ${x + size} ${y}
       L ${x + size * 0.8} ${y}
       L ${x + size} ${y + size * 0.2} Z

       M ${x} ${y + size}
       L ${x + size * 0.2} ${y + size}
       L ${x} ${y + size * 0.8} Z

       M ${x + size} ${y + size}
       L ${x + size * 0.8} ${y + size}
       L ${x + size} ${y + size * 0.8} Z`;
  };

  return (
    <>
      <rect
        {...position}
        className={`${styles.square} ${styles[color]}`}
        width={size}
        height={size}
        ref={register}
      />
      <rect
        {...position}
        className={`${styles.latestMoveOverlay} ${
          isLatestMoveSquare ? styles.highlight : styles.noHighlight
        }`}
        width={size}
        height={size}
      />
      <rect
        {...position}
        className={`${styles.overlayRect} ${
          showHoverHighlight
            ? `${styles.highlight} ${styles.green}`
            : styles.noHighlight
        }`}
        width={size}
        height={size}
      />
      {/* Show corner cuts for squares with pieces, circle for empty squares */}
      {hasPiece ? (
        <path
          className={`${styles.cornerCuts} ${
            showPossibleMoveIndicator ? styles.show : styles.hide
          }`}
          d={getCornerCutsPath(
            showPossibleMoveIndicator,
            position.x,
            position.y,
            size
          )}
        />
      ) : (
        <circle
          className={`${styles.possibleMoveIndicator} ${
            showPossibleMoveIndicator ? styles.show : styles.hide
          }`}
          cx={position.x + size / 2}
          cy={position.y + size / 2}
          r={size * 0.15}
        />
      )}
    </>
  );
};
