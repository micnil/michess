import React from 'react';
import { Position } from '@michess/common-utils';
import { useDrag } from '@michess/react-dnd';
import { ColoredPieceType, Coordinate, Piece } from '@michess/core-models';
import pieceSprite from '../assets/chessboard-sprite-staunty.svg';

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
  const { register } = useDrag({
    id: coord,
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
