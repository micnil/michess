import React from 'react';
import styled from 'styled-components';
import { Color } from './Color';
import { Piece } from './Piece';
import { PieceType } from './PieceType';

// const Square = () => {
//   return <rect width={80} height={80}></rect>;
// };

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

// prettier-ignore
export const SQUARE_COORDINATES = [
  "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1",
  "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
  "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
  "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
  "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
  "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
  "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
  "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"
]

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
          coordinates={{ x: 50, y: 50 }}
        />
      </Pieces>
    </svg>
  );
};

export default ChessboardView;
