import React from 'react';
import styled from 'styled-components';
import { Color, Coordinate } from '@michess/core-models';
import { useDragDropContext } from '@michess/react-dnd';
import { PieceView } from './PieceView';
import { useChessboardContext } from './context/useChessboardContext';
import { SquareView } from './SquareView';

const Board = styled.svg`
  overflow: visible;
`;
const Squares = styled.g``;
const Pieces = styled.g``;

type Props = {
  size: number;
};

const ChessboardView: React.FC<Props> = ({ size = 500 }) => {
  const { boardState } = useChessboardContext();
  const { state } = useDragDropContext();
  const squareSize = size / 8;
  const squareCoordinates = Coordinate.getCoordinates(boardState.orientation);
  const squarePositions = squareCoordinates.map(
    (coord, i) => ({
      x: (i % 8) * squareSize,
      y: Math.floor(i / 8) * squareSize,
    })
  );
  const draggedPieceIndex = boardState.squares.findIndex((squareState) =>
    squareState.isEmpty ? false : state.draggingId === squareState.piece.id
  );
  const draggedFromSquare =
    draggedPieceIndex !== -1
      ? boardState.squares[draggedPieceIndex]
      : undefined;
  return (
    <Board width={size} height={size}>
      <Squares>
        {boardState.squares.map((_, i) => {
          return (
            <SquareView
              coordinate={squareCoordinates[i]}
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
          } else if (state.draggingId === squareState.piece.id) {
            return undefined;
          } else {
            return (
              <PieceView
                key={squareState.piece.id}
                piece={squareState.piece}
                position={squarePositions[i]}
                squareSize={squareSize}
              />
            );
          }
        })}
        {draggedFromSquare && !draggedFromSquare.isEmpty && (
          <PieceView
            piece={draggedFromSquare.piece}
            position={squarePositions[draggedPieceIndex]}
            squareSize={squareSize}
          />
        )}
      </Pieces>
    </Board>
  );
};

export default ChessboardView;
