import { Position } from '@michess/common-utils';
import { ColoredPieceType, Coordinate, Piece } from '@michess/core-board';
import { useDrag } from '@michess/react-dnd';
import React from 'react';
import pieceSprite from '../assets/chessboard-sprite-staunty.svg';
import styles from './PieceView.module.css';

const DEFAULT_SPRITE_SIZE = 40;

type Props = {
  piece: Piece;
  squareSize: number;
  position: Position;
  coord: Coordinate;
};

export const PieceView: React.FC<Props> = ({
  piece,
  position: initialPosition,
  squareSize,
  coord,
}) => {
  const scaling = squareSize / DEFAULT_SPRITE_SIZE;
  const pieceAndColor = ColoredPieceType.fromPiece(piece);
  const { register, registerPreview, isDragging } = useDrag({
    id: coord,
  });
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
          <rect width={squareSize} height={squareSize} fill="#ffffff00" />
        </g>
      )}
    </>
  );
};
