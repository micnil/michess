import React, { useState } from 'react';
import { BoardState } from '../../chess-types/BoardState';
import { boardStateFromFen } from '../../fen/boardStateFromFen';
import { ChessboardContext } from './ChessboardContext';

export const ChessboardContextProvider: React.FC = ({ children }) => {
  const [boardState, setBoardState] = useState<BoardState>(() =>
    boardStateFromFen(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    )
  );

  return (
    <ChessboardContext.Provider value={boardState}>
      {children}
    </ChessboardContext.Provider>
  );
};
