import { Observable } from '@michess/common-utils';
import { Color } from '@michess/core-board';
import styled from 'styled-components';
import { ChessboardView } from './ChessboardView';
import { ChessboardContextProvider } from './context/ChessboardContextProvider';
import { useResponsiveBoardSize } from './hooks/useResponsiveBoardSize';
import { GameStatusType } from './model/GameStatusType';
import { MovePayload } from './model/MovePayload';
import { MoveOptions } from './move/model/MoveOptions';
import { PlayerInfo } from './PlayerInfo';

const ChessboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100vw;
`;

const BoardWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
`;

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
  whitePlayer?: {
    username: string;
    avatar?: string;
  };
  blackPlayer?: {
    username: string;
    avatar?: string;
  };
};
export const Chessboard = <TMoveMeta,>({
  orientation = 'white',
  maxSize = 600,
  fromPositionFen,
  gameStatus = 'active',
  winner,
  readonly,
  playableTurn,
  moveHistory,
  moveObservable,
  onMove,
  whitePlayer,
  blackPlayer,
}: Props<TMoveMeta>) => {
  // Use the responsive board size hook
  const boardSize = useResponsiveBoardSize({ maxSize });

  // Determine which player should be shown on top based on orientation
  const topPlayer = orientation === 'white' ? blackPlayer : whitePlayer;
  const bottomPlayer = orientation === 'white' ? whitePlayer : blackPlayer;
  const topPlayerColor: Color = orientation === 'white' ? 'black' : 'white';
  const bottomPlayerColor: Color = orientation === 'white' ? 'white' : 'black';

  return (
    <ChessboardContainer>
      <PlayerInfo
        username={topPlayer?.username}
        color={topPlayerColor}
        avatar={topPlayer?.avatar}
        size={boardSize}
      />

      <BoardWrapper>
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
          <ChessboardView size={boardSize} />
        </ChessboardContextProvider>
      </BoardWrapper>

      <PlayerInfo
        username={bottomPlayer?.username}
        color={bottomPlayerColor}
        avatar={bottomPlayer?.avatar}
        size={boardSize}
      />
    </ChessboardContainer>
  );
};
