import { FenStr, FenParser } from '@michess/core-fen';
import { Color, PiecePlacements } from '@michess/core-models';
import { Chessboard, IChessboard, MovePayload } from '@michess/core-state';
import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { MoveOptions } from '../move/model/MoveOptions';
import { MoveOptionsMap } from '../move/model/MoveOptionsMap';
import { ChessboardContext } from './ChessboardContext';
import { GameStatusType } from '../model/GameStatusType';
import { Square } from '../model/Square';

type Props<TMoveMeta = unknown> = {
  size: number;
  orientation?: Color;
  startingFen?: FenStr;
  piecePlacements?: PiecePlacements;
  moveOptions?: MoveOptions<TMoveMeta>;
  gameStatus: GameStatusType;
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
  size,
}: Props<TMoveMeta>) => {
  const [chessboard, setChessboard] = useState<IChessboard>(() =>
    Chessboard(FenParser.toGameState(startingFen))
  );
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;

  const contextChessboard = piecePlacements
    ? Chessboard({ pieces: piecePlacements, orientation }) // Consumer owned
    : chessboard; // Internally owned

  const squareSize = size / 8;
  const squareCoordinates = chessboard.getCoordinates();
  const squares: Square[] = squareCoordinates.map((coordinate, i) => ({
    size: squareSize,
    color: ((9 * i) & 8) === 0 ? 'white' : 'black',
    coordinate,
    position: {
      x: (i % 8) * squareSize,
      y: Math.floor(i / 8) * squareSize,
    },
  }));

  const movePiece = useCallback((payload: MovePayload<TMoveMeta>) => {
    onMoveRef.current?.(payload);
    setChessboard((prevChessboard) => {
      return prevChessboard.movePiece(payload);
    });
  }, []);

  return (
    <ChessboardContext.Provider
      value={{
        squares,
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
