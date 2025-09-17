import { Observable } from '@michess/common-utils';
import {
  BoardCoordinates,
  Color,
  Coordinate,
  FenParser,
  PiecePlacements,
} from '@michess/core-board';
import { Chessboard, MoveOption } from '@michess/core-game';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { GameStatusType } from '../model/GameStatusType';
import { MovePayload } from '../model/MovePayload';
import { Square } from '../model/Square';
import { MoveOptionsMap } from '../move/model/MoveOptionsMap';
import { ChessboardContext } from './ChessboardContext';

type Props<TMoveMeta = unknown> = {
  size: number;
  orientation?: Color;
  fromPositionFen?: string;
  piecePlacements?: PiecePlacements;
  gameStatus: GameStatusType;
  moveHistory?: MovePayload<TMoveMeta>[];
  moveObservable?: Observable<MovePayload<TMoveMeta>>;
  playableTurn?: Color;
  readonly?: boolean;
  onMove?: (move: MovePayload<TMoveMeta>) => Promise<boolean>;
  children: ReactNode;
};

export const ChessboardContextProvider = <TMoveMeta,>({
  children,
  orientation = 'white',
  playableTurn,
  gameStatus,
  moveObservable,
  readonly,
  fromPositionFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  onMove,
  moveHistory,
  size,
}: Props<TMoveMeta>) => {
  const [chessboard, setChessboard] = useState<Chessboard>(() => {
    return Chessboard.fromPosition(
      {
        ...FenParser.toChessPosition(fromPositionFen),
      },
      moveHistory
    );
  });
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;

  const squareSize = size / 8;
  const squareCoordinates = BoardCoordinates.fromOrientation(orientation);

  const squares = useMemo(() => {
    const squares: Record<Coordinate, Square> = {} as Record<
      Coordinate,
      Square
    >;
    squareCoordinates.forEach((coordinate, i) => {
      squares[coordinate] = {
        size: squareSize,
        color: ((9 * i) & 8) === 0 ? 'white' : 'black',
        coordinate,
        position: {
          x: (i % 8) * squareSize,
          y: Math.floor(i / 8) * squareSize,
        },
      };
    });
    return squares;
  }, [squareCoordinates, squareSize]);

  useEffect(() => {
    if (moveHistory) {
      setChessboard((prevChessboard) =>
        prevChessboard.updateMoves(moveHistory || [])
      );
    }
  }, [moveHistory]);

  useEffect(() => {
    if (moveObservable) {
      return moveObservable.subscribe((move) => {
        setChessboard((currentBoard) => currentBoard.playMove(move));
      });
    }
    return;
  }, [moveObservable]);

  const movePiece = useCallback(async (payload: MovePayload<TMoveMeta>) => {
    setChessboard((prevChessboard) => {
      return prevChessboard.playMove(payload);
    });
    if (onMoveRef.current) {
      const result = await onMoveRef.current(payload);
      if (!result) {
        // Revert the move if not accepted
        setChessboard((prevChessboard) => {
          return prevChessboard.unmakeMove();
        });
      }
    }
  }, []);

  const latestMove = chessboard.movesRecord.at(-1);

  // Only show move options if not readonly and it's the player's turn
  const shouldShowMoveOptions =
    !readonly && (!playableTurn || chessboard.position.turn === playableTurn);

  const moveOptionsMap = shouldShowMoveOptions
    ? MoveOptionsMap.fromMoveOptions(
        chessboard.moveOptions.map((option) => MoveOption.toMove(option))
      )
    : {};

  return (
    <ChessboardContext.Provider
      value={{
        squares,
        chessboard,
        movePiece: movePiece as (payload: MovePayload<unknown>) => void,
        moveOptionsMap,
        latestMove,
      }}
    >
      {children}
    </ChessboardContext.Provider>
  );
};
