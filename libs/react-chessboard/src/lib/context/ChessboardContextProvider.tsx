import { boardStateFromFen, FenStr } from '@michess/core-fen';
import { Color, PiecePlacements } from '@michess/core-models';
import { Chessboard, IChessboard, MovePayload } from '@michess/core-state';
import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { MoveOptions } from '../move/model/MoveOptions';
import { MoveOptionsMap } from '../move/model/MoveOptionsMap';
import { ChessboardContext } from './ChessboardContext';

type Props<TMoveMeta = unknown> = {
  orientation?: Color;
  startingFen?: FenStr;
  piecePlacements?: PiecePlacements;
  moveOptions?: MoveOptions<TMoveMeta>;
  onMove?: (move: MovePayload<TMoveMeta>) => void;
  children: ReactNode;
};

export const ChessboardContextProvider: React.FC<Props> = ({
  children,
  orientation = 'white',
  startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  onMove,
  piecePlacements,
  moveOptions,
}) => {
  const [chessboard, setChessboard] = useState<IChessboard>(() =>
    Chessboard(boardStateFromFen(startingFen)).setOrientation(orientation)
  );
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;

  const contextChessboard = piecePlacements
    ? Chessboard({ pieces: piecePlacements, orientation }) // Consumer owned
    : chessboard; // Internally owned

  const movePiece = useCallback((payload: MovePayload) => {
    onMoveRef.current?.(payload);
    setChessboard((prevChessboard) => {
      return prevChessboard.movePiece(payload);
    });
  }, []);

  return (
    <ChessboardContext.Provider
      value={{
        chessboard: contextChessboard,
        movePiece,
        moveOptionsMap: moveOptions
          ? MoveOptionsMap.fromMoveOptions(moveOptions)
          : undefined,
      }}
    >
      {children}
    </ChessboardContext.Provider>
  );
};
