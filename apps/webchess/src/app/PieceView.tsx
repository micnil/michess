import React from 'react';
import { Position } from './types/Position';
import pieceSprite from '../assets/chessboard-sprite-staunty.svg';
import { useDrag } from './drag-drop/hooks/useDrag';
import { Piece } from '../common-types/Piece';
import { ColoredPieceType } from '../common-types/ColoredPieceType';

const DEFAULT_SPRITE_SIZE = 40;

type Props = {
  piece: Piece;
  squareSize: number;
  position: Position;
};

export const PieceView: React.FC<Props> = ({
  piece,
  position: initialPosition,
  squareSize,
}) => {
  const scaling = squareSize / DEFAULT_SPRITE_SIZE;
  const pieceAndColor = ColoredPieceType.fromPiece(piece);
  const { register, isDragging } = useDrag({
    id: piece.id,
  });

  return (
    <g
      ref={register}
      transform={`translate(${initialPosition.x} ${initialPosition.y})`}
    >
      <use
        href={`${pieceSprite}#${pieceAndColor}`}
        style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
        transform={`scale(${scaling} ${scaling})`}
      />
      <rect width={squareSize} height={squareSize} fill="#ffffff00" />
    </g>
  );
};
