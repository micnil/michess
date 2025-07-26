import { FenStr, FenParser } from '@michess/core-fen';
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

export const ChessboardContextProvider = <TMoveMeta,>({
  children,
  orientation = 'white',
  startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  onMove,
  piecePlacements,
  moveOptions,
}: Props<TMoveMeta>) => {
  const [chessboard, setChessboard] = useState<IChessboard>(() =>
    Chessboard(FenParser.toGameState(startingFen))
  );
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;

  const contextChessboard = piecePlacements
    ? Chessboard({ pieces: piecePlacements, orientation }) // Consumer owned
    : chessboard; // Internally owned

  const movePiece = useCallback((payload: MovePayload<TMoveMeta>) => {
    onMoveRef.current?.(payload);
    setChessboard((prevChessboard) => {
      return prevChessboard.movePiece(payload);
    });
  }, []);

  return (
    <ChessboardContext.Provider
      value={{
        chessboard: contextChessboard,
        movePiece: movePiece as (payload: MovePayload<unknown>) => void,
        moveOptionsMap: moveOptions
          ? MoveOptionsMap.fromMoveOptions(moveOptions)
          : undefined,
      }}
    >
      {children}
    </ChessboardContext.Provider>
  );
};
