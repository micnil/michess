import React from 'react';
import styled from 'styled-components';
import { Color } from '../common-types/Color';
import { Piece } from './Piece';
import { SQUARE_COORDINATES } from '../common-types/Coordinate';
import { useChessboardContext } from './context/useChessboardContext';

type SquareProps = {
  side: Color;
};
const Square = styled.rect<SquareProps>`
  fill: ${(props) => (props.side === 'white' ? '#ecdab9' : '#c5a076')};
`;

const Board = styled.svg`
  overflow: visible;
`
const Squares = styled.g``;
const Pieces = styled.g``;

type Props = {
  size: number;
  orientation: Color;
};

const DEFAULT_SPRITE_SIZE = 40;

const ChessboardView: React.FC<Props> = ({ size = 500, orientation }) => {
  const squareSize = size / 8;
  const pieceScaling = squareSize / DEFAULT_SPRITE_SIZE;
  const squarePositions = SQUARE_COORDINATES.map((coord, i) => ({
    x: (i % 8) * squareSize,
    y: Math.floor(i / 8) * squareSize,
  }));
  const boardState = useChessboardContext();
  return (
    <Board width={size} height={size}>
      <Squares>
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
      </Squares>
      <Pieces>
        {boardState.squares.map((squareState, i) => {
          if (squareState.isEmpty) {
            return undefined;
          } else {
            return (
              <Piece
                key={i}
                color={squareState.color}
                piece={squareState.piece}
                position={squarePositions[i]}
                scaling={pieceScaling}
              />
            );
          }
        })}
      </Pieces>
    </Board>
  );
};

export default ChessboardView;
