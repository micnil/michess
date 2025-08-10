import React from 'react';
import styled from 'styled-components';
import { Coordinate } from '@michess/core-models';
import { PieceView } from './PieceView';
import { useChessboardContext } from './context/hooks/useChessboardContext';
import { SquareView } from './SquareView';
import { useDragDropContext } from '@michess/react-dnd';

const Board = styled.svg`
  overflow: visible;
`;
const Squares = styled.g``;
const Pieces = styled.g``;

type Props = {
  size: number;
};

export const ChessboardView: React.FC<Props> = ({ size = 500 }) => {
  const { chessboard, squares } = useChessboardContext();
  const { state } = useDragDropContext();
  const squareSize = size / 8;
  const squareCoordinates = chessboard.getCoordinates();
  const squarePositions = squareCoordinates.map((_, i) => ({
    x: (i % 8) * squareSize,
    y: Math.floor(i / 8) * squareSize,
  }));

  const boardState = chessboard.getState();
  return (
    <Board width={size} height={size}>
      <Squares>
        {squares.map((square) => {
          return (
            <SquareView
              coordinate={square.coordinate}
              key={square.coordinate}
              position={square.position}
              size={square.size}
              color={square.color}
            />
          );
        })}
      </Squares>
      <Pieces>
        {Object.entries(boardState.pieces).map(([coord, piece]) => {
          const square = squares[chessboard.getIndex(coord as Coordinate)];
          return (
            <PieceView
              key={coord}
              coord={coord as Coordinate}
              piece={piece}
              position={square.position}
              squareSize={square.size}
            />
          );
        })}
      </Pieces>
      {state.draggingId && <use href={`#${state.draggingId}`} />}
    </Board>
  );
};
