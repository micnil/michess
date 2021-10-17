import React from 'react';
import styled from 'styled-components';
import { Color } from '../common-types/Color';
import { Piece } from './Piece';
import { PieceType } from '../common-types/PieceType';
import { SQUARE_COORDINATES } from '../common-types/Coordinate';

type SquareProps = {
  side: Color;
};
const Square = styled.rect<SquareProps>`
  fill: ${(props) => (props.side === 'white' ? '#ecdab9' : '#c5a076')};
`;

const Board = styled.g``;
const Pieces = styled.g``;

type Props = {
  size: number;
  orientation: Color;
};

const ChessboardView: React.FC<Props> = ({ size = 500, orientation }) => {
  const squareSize = size / 8;
  const squarePositions = SQUARE_COORDINATES.map((coord, i) => ({
    x: (i % 8) * squareSize,
    y: Math.floor(i / 8) * squareSize,
  }));
  return (
    <svg width={size} height={size}>
      <Board>
        {squarePositions.map((pos, i) => {
          return (
            <Square
              key={i}
              x={pos.x}
              y={pos.y}
              width={squareSize}
              height={squareSize}
              side={((9 * i) & 8) === 0 ? Color.White : Color.Black}
            />
          );
        })}
      </Board>
      <Pieces>
        <Piece
          color={Color.White}
          piece={PieceType.King}
          position={{ x: 50, y: 50 }}
        />
      </Pieces>
    </svg>
  );
};

export default ChessboardView;
