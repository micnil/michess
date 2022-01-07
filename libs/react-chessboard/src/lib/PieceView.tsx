import React from 'react';
import { Position } from '@michess/common-utils';
import { useDrag } from '@michess/react-dnd';
import { ColoredPieceType, Coordinate, Piece } from '@michess/core-models';
import pieceSprite from '../assets/chessboard-sprite-staunty.svg';
import styled from 'styled-components';

const DEFAULT_SPRITE_SIZE = 40;

type Props = {
  piece: Piece;
  squareSize: number;
  position: Position;
  coord: Coordinate;
};

const StyledGroup = styled.g`
  cursor: pointer;
`

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
      <StyledGroup
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
      </StyledGroup>
      {isDragging && (
        <StyledGroup
          id={coord}
          ref={registerPreview}
          transform={`translate(${initialPosition.x} ${initialPosition.y})`}
        >
          <use
            href={`${pieceSprite}#${pieceAndColor}`}
            transform={`scale(${scaling} ${scaling})`}
          />
          <rect width={squareSize} height={squareSize} fill="#ffffff00" />
        </StyledGroup>
      )}
    </>
  );
};
