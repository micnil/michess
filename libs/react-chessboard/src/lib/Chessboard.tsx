import { Observable } from '@michess/common-utils';
import { Color } from '@michess/core-board';
import React from 'react';
import styles from './Chessboard.module.css';
import { ChessboardView } from './ChessboardView';
import { ChessboardContextProvider } from './context/ChessboardContextProvider';
import { useResponsiveBoardSize } from './hooks/useResponsiveBoardSize';
import { GameStatusType } from './model/GameStatusType';
import { MovePayload } from './model/MovePayload';
import { MoveOptions } from './move/model/MoveOptions';

type Props<TMoveMeta = unknown> = {
  orientation?: Color;
  maxSize?: number;
  fromPositionFen?: string;
  moveOptions?: MoveOptions<TMoveMeta>;
  gameStatus?: GameStatusType;
  winner?: Color;
  playableTurn?: Color;
  readonly?: boolean;
  moveHistory?: MovePayload<TMoveMeta>[];
  moveObservable?: Observable<MovePayload<TMoveMeta>>;
  onMove?: (move: MovePayload<TMoveMeta>) => Promise<boolean>;
  children?: React.ReactNode; // Allow custom content around the board
};
export const Chessboard = <TMoveMeta,>({
  orientation = 'white',
  maxSize = 600,
  fromPositionFen,
  gameStatus = 'active',
  winner: _winner,
  readonly,
  playableTurn,
  moveHistory,
  moveObservable,
  onMove,
  children,
}: Props<TMoveMeta>) => {
  // Use the responsive board size hook
  const boardSize = useResponsiveBoardSize({ maxSize });

  return (
    <div className={styles['chessboardContainer']}>
      <ChessboardContextProvider
        size={boardSize}
        orientation={orientation}
        fromPositionFen={fromPositionFen}
        gameStatus={gameStatus}
        readonly={readonly}
        moveHistory={moveHistory}
        playableTurn={playableTurn}
        moveObservable={moveObservable}
        onMove={onMove}
      >
        {children}
        <div className={styles['boardWrapper']}>
          <ChessboardView size={boardSize} />
        </div>
      </ChessboardContextProvider>
    </div>
  );
};
