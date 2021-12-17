import React, { useEffect } from 'react';
import pieceSprite from '../assets/chessboard-sprite-staunty.svg';
import { useDrag } from './drag-drop/hooks/useDrag';
import { Piece } from '../chess-types/Piece';
import { ColoredPieceType } from '../chess-types/ColoredPieceType';
import { Position } from '@michess/common-utils';

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
  const { register } = useDrag({
    id: piece.id,
  });

  return (
    <g
      ref={register}
      transform={`translate(${initialPosition.x} ${initialPosition.y})`}
      
    >
      <use
        href={`${pieceSprite}#${pieceAndColor}`}
        transform={`scale(${scaling} ${scaling})`}
      />
      <rect width={squareSize} height={squareSize} fill="#ffffff00" />
    </g>
  );
};
