import React from 'react';
import styled from 'styled-components';
import { Coordinate } from '@michess/core-models';
import { PieceView } from './PieceView';
import { useChessboardContext } from './context/hooks/useChessboardContext';
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
        {squareCoordinates.map((coord, i) => {
          return (
            <SquareView
              coordinate={coord}
              key={coord}
              position={squarePositions[i]}
              size={squareSize}
              color={((9 * i) & 8) === 0 ? 'white' : 'black'} // Todo: Expose in model
            />
          );
        })}
      </Squares>
      <Pieces>
        {Object.entries(boardState.pieces).map(([coord, piece]) => {
          const pieceId = coord;
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
        })}
      </Pieces>
    </Board>
  );
};

export default ChessboardView;
