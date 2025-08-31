import { Position } from '@michess/common-utils';
import { ColoredPieceType, Coordinate, Piece } from '@michess/core-board';
import { useDrag } from '@michess/react-dnd';
import React from 'react';
import styled from 'styled-components';
import pieceSprite from '../assets/chessboard-sprite-staunty.svg';

const DEFAULT_SPRITE_SIZE = 40;

type Props = {
  piece: Piece;
  squareSize: number;
  position: Position;
  coord: Coordinate;
};

const StyledGroup = styled.g`
  cursor: pointer;
`;

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
          href={`${pieceSprite.src}#${pieceAndColor}`}
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
            href={`${pieceSprite.src}#${pieceAndColor}`}
            transform={`scale(${scaling} ${scaling})`}
          />
          <rect width={squareSize} height={squareSize} fill="#ffffff00" />
        </StyledGroup>
      )}
    </>
  );
};
