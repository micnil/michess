import React from 'react';
import styled from 'styled-components';
import { Color } from '../chess-types/Color';
import { PieceView } from './PieceView';
import { SQUARE_COORDINATES } from '../chess-types/Coordinate';
import { useChessboardContext } from './context/useChessboardContext';
import { SquareView } from './SquareView';

const Board = styled.svg`
  overflow: visible;
`;
const Squares = styled.g``;
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
  const boardState = useChessboardContext();
  return (
    <Board width={size} height={size}>
      <Squares>
        {boardState.squares.map((_, i) => {
          return (
            <SquareView
              coordinate={SQUARE_COORDINATES[i]}
              key={i}
              position={squarePositions[i]}
              size={squareSize}
              color={((9 * i) & 8) === 0 ? Color.White : Color.Black}
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
              <PieceView
                key={i}
                piece={squareState.piece}
                position={squarePositions[i]}
                squareSize={squareSize}
              />
            );
          }
        })}
      </Pieces>
    </Board>
  );
};

export default ChessboardView;
