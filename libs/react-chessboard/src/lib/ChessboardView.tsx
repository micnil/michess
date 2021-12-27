import React from 'react';
import styled from 'styled-components';
import { Color, ColoredPieceType, Coordinate } from '@michess/core-models';
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
  const { chessboard } = useChessboardContext();
  const { state } = useDragDropContext();
  const squareSize = size / 8;
  const squareCoordinates = chessboard.getCoordinates();
  const squarePositions = squareCoordinates.map((coord, i) => ({
    x: (i % 8) * squareSize,
    y: Math.floor(i / 8) * squareSize,
  }));

  const draggedFromSquare = state.draggingId
    ? chessboard.getSquare(state.draggingId as Coordinate)
    : undefined;

  const boardState = chessboard.getState();
  return (
    <Board width={size} height={size}>
      <Squares>
        {squareCoordinates.map((coord, i) => {
          return (
            <SquareView
              coordinate={coord}
              key={coord}
              position={squarePositions[i]}
              size={squareSize}
              color={((9 * i) & 8) === 0 ? Color.White : Color.Black} // Todo: Expose in model
            />
          );
        })}
      </Squares>
      <Pieces>
        {Object.entries(boardState.squares).map(([coord, piece]) => {
          const pieceId = piece.type + coord;
          if (state.draggingId === pieceId) {
            return undefined;
          } else {
            return (
              <PieceView
                key={pieceId}
                coord={coord as Coordinate}
                piece={piece}
                position={
                  squarePositions[chessboard.getIndex(coord as Coordinate)]
                }
                squareSize={squareSize}
              />
            );
          }
        })}
        {draggedFromSquare && draggedFromSquare.piece && state.draggingId && (
          <PieceView
            piece={draggedFromSquare.piece}
            coord={draggedFromSquare.coord}
            position={
              squarePositions[
                chessboard.getIndex(state.draggingId as Coordinate)
              ]
            }
            squareSize={squareSize}
          />
        )}
      </Pieces>
    </Board>
  );
};

export default ChessboardView;
