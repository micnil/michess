import { boardStateFromFen, FenStr } from '@michess/core-fen';
import { Color } from '@michess/core-models';
import { Chessboard, IChessboard, MovePayload } from '@michess/core-state';
import React, { useCallback, useState } from 'react';
import { ChessboardContext } from './ChessboardContext';

type Props = {
  orientation?: Color;
  startingFen?: FenStr;
};

export const ChessboardContextProvider: React.FC<Props> = ({
  children,
  orientation = 'white',
  startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
}) => {
  const [chessboard, setChessboard] = useState<IChessboard>(() =>
    Chessboard(boardStateFromFen(startingFen)).setOrientation(orientation)
  );

  const movePiece = useCallback((payload: MovePayload) => {
    setChessboard((prevChessboard) => {
      return prevChessboard.movePiece(payload);
    });
  }, []);

  return (
    <ChessboardContext.Provider value={{ chessboard, movePiece }}>
      {children}
    </ChessboardContext.Provider>
  );
};
