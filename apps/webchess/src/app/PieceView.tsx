import React from 'react';
import { Position } from './types/Position';
import pieceSprite from '../assets/chessboard-sprite-staunty.svg';
import { useDrag } from './drag-drop/hooks/useDrag';
import { Piece } from '../common-types/Piece';
import { ColoredPieceType } from '../common-types/ColoredPieceType';

type Props = {
  piece: Piece;
  position: Position;
  scaling: number;
};

export const PieceView: React.FC<Props> = ({
  piece,
  position: initialPosition,
  scaling,
}) => {
  const pieceAndColor = ColoredPieceType.fromPiece(piece);
  const { register, position, isDragging } = useDrag({
    initialPosition,
    id: piece.id,
  });

  return (
    <use
      ref={register}
      href={`${pieceSprite}#${pieceAndColor}`}
      style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
      transform={`translate(${position.x} ${position.y}) scale(${scaling} ${scaling})`}
    />
  );
};
