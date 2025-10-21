import { Maybe } from '@michess/common-utils';
import {
  ChessPosition,
  Move,
  MoveGenerator,
  MoveNotation,
  MoveOption,
  MoveRecord,
  Piece,
  PiecePlacements,
  PieceType,
} from '@michess/core-board';
import { ZobristHash } from './ZobristHash';

type BoardState = {
  position: ChessPosition;
  positionHash: ZobristHash;
};
type BoardStateHistoryItem = BoardState & {
  playedMove: MoveRecord;
};

export type Chessboard = BoardState & {
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  isThreeFoldRepetition: boolean;
  isFiftyMoveRule: boolean;
  isInsufficientMaterial: boolean;
  initialPosition: ChessPosition;
  moveOptions: MoveOption[];
  movesRecord: Move[];
  moveNotations: MoveNotation[];
  playMove: (move: Move) => Chessboard;
  playMoves: (moves: Move[]) => Chessboard;
  updateMoves: (moves: Move[]) => Chessboard;
  unmakeMove: (toMoveNumber?: number) => Chessboard;
  perft: (depth: number) => { nodes: number };
};

const isInsufficientMaterial = (piecePlacements: PiecePlacements): boolean => {
  const pieceCount = piecePlacements.size;
  if (pieceCount <= 2) {
    return true;
  } else if (pieceCount === 3) {
    const isKingOrMinorPiece = (piece: Maybe<Piece>) =>
      piece?.type === PieceType.King ||
      piece?.type === PieceType.Bishop ||
      piece?.type === PieceType.Knight;
    return Array.from(piecePlacements.values()).every(isKingOrMinorPiece);
  } else {
    return false;
  }
};

const isThreeFoldRepetition = (
  positionHash: ZobristHash,
  boardHistory: BoardStateHistoryItem[],
): boolean => {
  let occurrences = 1;
  for (let index = boardHistory.length - 1; index >= 0; index--) {
    const historyItem = boardHistory[index];
    if (historyItem.positionHash.equals(positionHash)) {
      occurrences++;
    }

    if (occurrences === 3) {
      break;
    }
  }
  return occurrences === 3;
};

const makeMove = (
  { position, positionHash }: BoardState,
  move: MoveOption,
): {
  boardState: BoardState;
} => {
  const {
    position: newPosition,
    movedPiece,
    capturedPiece,
    promotedPiece,
  } = ChessPosition.makeMove(position, move);

  const newPositionHash = positionHash
    .movePiece(movedPiece, move.start, move.target)
    .capturePiece(capturedPiece, move.target)
    .promotePawn(movedPiece, promotedPiece, move.target)
    .updateEnPassant(position.enPassant, newPosition.enPassant)
    .updateCastlingRights(position.castlingAbility, newPosition.castlingAbility)
    .toggleSideToMove();

  return {
    boardState: {
      positionHash: newPositionHash,
      position: newPosition,
    },
  };
};

const perft = (boardState: BoardState, depth: number): { nodes: number } => {
  if (depth === 0) {
    return { nodes: 1 };
  }

  const moveGenerator = MoveGenerator(boardState.position);
  const moveGenResult = moveGenerator.generateMoves();
  let nodes = 0;

  for (const move of moveGenResult.moves) {
    const result = perft(makeMove(boardState, move).boardState, depth - 1);
    nodes += result.nodes;
  }

  return { nodes };
};

const from = (
  state: BoardState,
  history: BoardStateHistoryItem[] = [],
): Chessboard => {
  const moveGen = MoveGenerator(state.position);
  return {
    get position() {
      return state.position;
    },
    get positionHash() {
      return state.positionHash;
    },
    get isCheck() {
      return moveGen.generateMoves().isCheck;
    },
    get isCheckmate() {
      return moveGen.generateMoves().isCheckmate;
    },
    get isStalemate() {
      const moveOptions = moveGen.generateMoves();
      return moveOptions.moves.length === 0 && !moveOptions.isCheck;
    },
    get isThreeFoldRepetition() {
      return isThreeFoldRepetition(state.positionHash, history);
    },
    get isInsufficientMaterial() {
      return isInsufficientMaterial(state.position.pieces);
    },
    get isFiftyMoveRule() {
      return state.position.ply >= 100;
    },
    get moveOptions() {
      return moveGen.generateMoves().moves;
    },
    get movesRecord() {
      return history.map((item) => item.playedMove);
    },
    get moveNotations() {
      return history.map<MoveNotation>((item) => {
        const moveNotation = MoveNotation.from(item.position, item.playedMove);
        return moveNotation;
      });
    },
    get initialPosition() {
      return history.length > 0 ? history[0].position : state.position;
    },
    unmakeMove: (toMoveNumber = history.length): Chessboard => {
      const newPosition = history[toMoveNumber - 1];
      if (!newPosition) {
        return from(state, history);
      }
      const newHistory = history.slice(0, toMoveNumber - 1);
      return from(
        {
          position: newPosition.position,
          positionHash: newPosition.positionHash,
        },
        newHistory,
      );
    },

    perft: (depth: number) => {
      return perft(state, depth);
    },
    playMove: (move: Move | MoveRecord): Chessboard => {
      const moveOption = moveGen
        .generateMoves()
        .moves.find((m) => Move.isEqual(MoveOption.toMove(m), move));
      if (moveOption) {
        const newHistory = history.slice();
        const playedMove = MoveRecord.isRecord(move)
          ? move
          : MoveRecord.fromMove(move);
        newHistory.push({
          ...state,
          playedMove,
        });
        return from(makeMove(state, moveOption).boardState, newHistory);
      } else {
        throw new Error(`Invalid move: ${Move.toUci(move)}`);
      }
    },
    playMoves: (moves: Move[] | MoveRecord[]): Chessboard => {
      let board = from(state, history);
      for (const move of moves) {
        board = board.playMove(move);
      }
      return board;
    },
    updateMoves: (moves: Move[]): Chessboard => {
      // Find the first move that doesn't match between current history and target moves
      const indexOfFirstNonMatchingMove = history.findIndex((item, index) => {
        return (
          index >= moves.length || !Move.isEqual(moves[index], item.playedMove)
        );
      });

      // If all current moves match and we have the exact same number of moves, no change needed
      if (
        indexOfFirstNonMatchingMove === -1 &&
        moves.length === history.length
      ) {
        return from(state, history);
      }

      // Determine the sync point - either where moves diverge or where current history ends
      const syncPoint =
        indexOfFirstNonMatchingMove === -1
          ? history.length // No divergence found, sync from end of current history
          : indexOfFirstNonMatchingMove; // Divergence found, sync from that point

      // Get the initial position (before any moves were played)
      const initialPosition =
        history.length > 0 ? history[0].position : state.position;
      const initialPositionHash =
        history.length > 0 ? history[0].positionHash : state.positionHash;
      const initialBoard = from(
        { position: initialPosition, positionHash: initialPositionHash },
        [],
      );

      // If syncPoint is 0, start from initial position, otherwise play moves up to syncPoint
      const syncedBoard =
        syncPoint === 0
          ? initialBoard
          : initialBoard.playMoves(moves.slice(0, syncPoint));

      // Apply the remaining moves from the input array starting from sync point
      const remainingMoves = moves.slice(syncPoint);
      return remainingMoves.length > 0
        ? syncedBoard.playMoves(remainingMoves)
        : syncedBoard;
    },
  };
};

const fromPosition = (
  position: ChessPosition,
  moves: Move[] | MoveRecord[] = [],
): Chessboard => {
  const positionHash = ZobristHash.fromChessPosition(position);
  let board = from({ position, positionHash });
  for (const move of moves) {
    board = board.playMove(move);
  }
  return board;
};

export const Chessboard = {
  fromPosition,
};
