import {
  BoardCoordinates,
  Color,
  Coordinate,
  FenParser,
  MoveOption,
} from '@michess/core-board';
import { Chessboard } from '@michess/core-game';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { GameResultType } from '../model/GameResultType';
import { Square } from '../model/Square';
import { MoveOptionsMap } from '../move/model/MoveOptionsMap';
import { MovePayload } from '../move/model/MovePayload';
import { ChessboardContext } from './ChessboardContext';

type Props<TMoveMeta = unknown> = {
  size: number;
  orientation?: Color;
  default?: {
    positionFen: string;
    moveHistory?: MovePayload<TMoveMeta>[];
  };
  chessboard?: Chessboard;
  gameResult?: GameResultType;
  playableTurn?: Color;
  readonly?: boolean;
  onMove?: (move: MovePayload<TMoveMeta>) => void;
  children: ReactNode;
};

export const ChessboardContextProvider = <TMoveMeta,>({
  children,
  orientation = 'white',
  playableTurn,
  default: { positionFen, moveHistory } = {
    positionFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  },
  gameResult,
  chessboard: controlledChessboard,
  readonly,
  onMove,
  size,
}: Props<TMoveMeta>) => {
  const [uncontrolledChessboard, setChessboard] = useState<Chessboard>(() => {
    return Chessboard.fromPosition(
      FenParser.toChessPosition(positionFen),
      moveHistory
    );
  });

  const chessboard = controlledChessboard ?? uncontrolledChessboard;

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

  const movePiece = useCallback(
    async (payload: MovePayload<TMoveMeta>) => {
      if (!controlledChessboard) {
        setChessboard((prevChessboard) => {
          return prevChessboard.playMove(payload);
        });
      }
      onMoveRef.current?.(payload);
    },
    [controlledChessboard]
  );

  const latestMove = chessboard.movesRecord.at(-1);

  // Only show move options if not readonly and it's the player's turn
  const shouldShowMoveOptions =
    !readonly && (!playableTurn || chessboard.position.turn === playableTurn);

  const moveOptionsMap = shouldShowMoveOptions
    ? MoveOptionsMap.fromMoveOptions(
        chessboard.moveOptions.map((option) => MoveOption.toMove(option))
      )
    : {};

  const chessboardGameResult = chessboard.isCheckmate
    ? chessboard.position.turn === Color.White
      ? 'black_win'
      : 'white_win'
    : chessboard.isStalemate ||
      chessboard.isInsufficientMaterial ||
      chessboard.isThreeFoldRepetition ||
      chessboard.isFiftyMoveRule
    ? 'draw'
    : undefined;

  return (
    <ChessboardContext.Provider
      value={{
        squares,
        chessboard,
        gameResult: gameResult ?? chessboardGameResult,
        movePiece: movePiece as (payload: MovePayload<unknown>) => void,
        moveOptionsMap,
        latestMove,
      }}
    >
      {children}
    </ChessboardContext.Provider>
  );
};
