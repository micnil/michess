import { boardStateFromFen } from '@michess/core-fen';
import { BoardState, Coordinate } from '@michess/core-models';
import React, { useCallback, useState } from 'react';
import { Chessboard } from '../../state/Chessboard';
import { ChessboardContext } from './ChessboardContext';

export const ChessboardContextProvider: React.FC = ({ children }) => {
  const [boardState, setBoardState] = useState<BoardState>(() =>
    boardStateFromFen(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    )
  );

  const movePiece = useCallback((pieceId: string, coordinate: Coordinate) => {
    setBoardState((boardState) => {
      return Chessboard(boardState)
        .movePiece({
          pieceId,
          coordinate,
        })
        .getState();
    });
  }, []);

  return (
    <ChessboardContext.Provider value={{ boardState, movePiece }}>
      {children}
    </ChessboardContext.Provider>
  );
};
