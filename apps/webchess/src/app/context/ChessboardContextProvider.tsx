import { boardStateFromFen, FenStr } from '@michess/core-fen';
import { BoardState, Color, Coordinate } from '@michess/core-models';
import React, { useCallback, useState } from 'react';
import { Chessboard } from '../../state/Chessboard';
import { ChessboardContext } from './ChessboardContext';

type Props = {
  orientation?: Color;
  startingFen?: FenStr;
};

export const ChessboardContextProvider: React.FC<Props> = ({
  children,
  orientation = Color.White,
  startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
}) => {
  const [boardState, setBoardState] = useState<BoardState>(() =>
    Chessboard(boardStateFromFen(startingFen))
      .setOrientation(orientation)
      .getState()
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
