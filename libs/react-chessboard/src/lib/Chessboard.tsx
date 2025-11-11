import { Chessboard as ChessboardModel, Color } from '@michess/core-board';
import { ChessboardView } from './ChessboardView';
import { ChessboardContextProvider } from './context/ChessboardContextProvider';
import { useResponsiveBoardSize } from './hooks/useResponsiveBoardSize';
import { GameResultType } from './model/GameResultType';
import { MoveOptions } from './move/model/MoveOptions';
import { MovePayload } from './move/model/MovePayload';

type Props<TMoveMeta = unknown> = {
  orientation?: Color;
  isLoading?: boolean;
  maxSize?: number;
  moveOptions?: MoveOptions<TMoveMeta>;
  gameResult?: GameResultType;
  chessboard?: ChessboardModel;
  playableTurn?: Color;
  default?: {
    positionFen: string;
    moveHistory?: MovePayload<TMoveMeta>[];
  };
  readonly?: boolean;
  onMove?: (move: MovePayload<TMoveMeta>) => void;
};
export const Chessboard = <TMoveMeta,>({
  orientation = 'white',
  maxSize = 600,
  gameResult,
  readonly,
  playableTurn,
  default: defaultState,
  isLoading,
  chessboard,
  onMove,
}: Props<TMoveMeta>) => {
  const boardSize = useResponsiveBoardSize({ maxSize });

  return (
    <ChessboardContextProvider
      size={boardSize}
      orientation={orientation}
      default={defaultState}
      chessboard={chessboard}
      gameResult={gameResult}
      readonly={readonly}
      playableTurn={playableTurn}
      onMove={onMove}
    >
      <ChessboardView size={boardSize} isLoading={isLoading} />
    </ChessboardContextProvider>
  );
};
