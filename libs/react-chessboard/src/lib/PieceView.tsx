import { Position } from '@michess/common-utils';
import {
  Color,
  ColoredPieceType,
  Coordinate,
  Piece,
  PieceType,
} from '@michess/core-board';
import { useDrag } from '@michess/react-dnd';
import { Skull, Trophy } from 'lucide-react';
import React from 'react';
import pieceSprite from '../assets/chessboard-sprite-staunty.svg';
import styles from './PieceView.module.css';

const DEFAULT_SPRITE_SIZE = 40;

const SkullIcon: React.FC<{ size: number; offset: number }> = ({
  size,
  offset,
}) => (
  <g className={styles.checkmateIcon}>
    <circle
      cx={offset + size / 2}
      cy={offset + size / 2}
      r={size / 2 + 4}
      fill="#dc2626"
    />
    <Skull x={offset} y={offset} width={size} height={size} color="white" />
  </g>
);

const TrophyIcon: React.FC<{ size: number; offset: number }> = ({
  size,
  offset,
}) => (
  <g className={styles.checkmateIcon}>
    <circle
      cx={offset + size / 2}
      cy={offset + size / 2}
      r={size / 2 + 4}
      fill="#16a34a"
    />
    <Trophy x={offset} y={offset} width={size} height={size} color="white" />
  </g>
);

// Checkmate indicators component
const CheckmateIndicators: React.FC<{
  isLosingKing: boolean | undefined;
  isWinningKing: boolean | undefined;
  iconSize: number;
  iconOffset: number;
}> = ({ isLosingKing, isWinningKing, iconSize, iconOffset }) => (
  <>
    {isLosingKing && <SkullIcon size={iconSize} offset={iconOffset} />}
    {isWinningKing && <TrophyIcon size={iconSize} offset={iconOffset} />}
  </>
);

type Props = {
  piece: Piece;
  squareSize: number;
  position: Position;
  checkmate?: Color;
  coord: Coordinate;
};

export const PieceView: React.FC<Props> = ({
  piece,
  position: initialPosition,
  squareSize,
  checkmate,
  coord,
}) => {
  const scaling = squareSize / DEFAULT_SPRITE_SIZE;
  const pieceAndColor = ColoredPieceType.fromPiece(piece);
  const { register, registerPreview, isDragging } = useDrag({
    id: coord,
  });

  // Determine if this piece should show checkmate indicators
  const isKing = piece.type === PieceType.King;
  const isLosingKing = isKing && checkmate && piece.color === checkmate;
  const isWinningKing = isKing && checkmate && piece.color !== checkmate;

  // Icon positioning - center over the piece
  const iconSize = squareSize * 0.4; // 40% of square size
  const iconOffset = (squareSize - iconSize) / 2;
  return (
    <>
      <g
        className={styles.pieceGroup}
        ref={register}
        transform={`translate(${initialPosition.x} ${initialPosition.y})`}
      >
        <use
          href={`${pieceSprite}#${pieceAndColor}`}
          transform={`scale(${scaling} ${scaling})`}
        />
        <CheckmateIndicators
          isLosingKing={isLosingKing}
          isWinningKing={isWinningKing}
          iconSize={iconSize}
          iconOffset={iconOffset}
        />
        <rect
          width={squareSize}
          height={squareSize}
          fill={isDragging ? '#ffffff60' : '#ffffff00'}
        />
      </g>
      {isDragging && (
        <g
          className={styles.pieceGroup}
          id={coord}
          ref={registerPreview}
          transform={`translate(${initialPosition.x} ${initialPosition.y})`}
        >
          <use
            href={`${pieceSprite}#${pieceAndColor}`}
            transform={`scale(${scaling} ${scaling})`}
          />
          <CheckmateIndicators
            isLosingKing={isLosingKing}
            isWinningKing={isWinningKing}
            iconSize={iconSize}
            iconOffset={iconOffset}
          />
          <rect width={squareSize} height={squareSize} fill="#ffffff00" />
        </g>
      )}
    </>
  );
};
