import { assertDefined, Maybe } from '@michess/common-utils';
import {
  CastlingAbility,
  CastlingRight,
  ChessPosition,
  Color,
  Coordinate,
  Move,
  Piece,
  PiecePlacements,
  PieceType,
} from '@michess/core-board';
import { MoveGenerator } from './MoveGenerator';
import { ZobristHash } from './ZobristHash';
import { MoveOption } from './move/MoveOption';

type BoardState = {
  position: ChessPosition;
  positionHash: ZobristHash;
};
type BoardStateHistoryItem = BoardState & {
  playedMove: MoveOption;
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
  playMove: (move: Move) => Chessboard;
  playMoves: (moves: Move[]) => Chessboard;
  updateMoves: (moves: Move[]) => Chessboard;
  unmakeMove: (toMoveNumber?: number) => Chessboard;
  perft: (depth: number) => { nodes: number };
};

const rookStartingPositions: Record<CastlingAbility, Coordinate> = {
  [CastlingAbility.BlackKing]: 'h8',
  [CastlingAbility.BlackQueen]: 'a8',
  [CastlingAbility.WhiteKing]: 'h1',
  [CastlingAbility.WhiteQueen]: 'a1',
} as const;

const oneStepBackFromIndex = (index: number, color: Color): Coordinate => {
  return Coordinate.fromIndex(color === Color.White ? index + 8 : index - 8);
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
  boardHistory: BoardStateHistoryItem[]
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

const updatePiecePlacements = (
  move: MoveOption,
  piecePlacements: PiecePlacements
): {
  newPiecePlacements: PiecePlacements;
  movedPiece: Piece;
  capturedPiece?: Piece;
  promotedPiece?: Piece;
} => {
  const fromCoord = Coordinate.fromIndex(move.start);
  const toCoord = Coordinate.fromIndex(move.target);
  const pieceToMove = piecePlacements.get(fromCoord);
  assertDefined(pieceToMove, `No piece at ${fromCoord} to move`);
  const turn = pieceToMove.color;

  const captureCoord = move.enPassant
    ? oneStepBackFromIndex(move.target, turn)
    : toCoord;
  const pieceToCapture = piecePlacements.get(captureCoord);
  const promotedPiece = move.promotion
    ? Piece.from(move.promotion, pieceToMove.color)
    : undefined;

  const newPiecePlacements: PiecePlacements = new Map(piecePlacements);

  newPiecePlacements.delete(captureCoord);
  newPiecePlacements.delete(fromCoord);
  newPiecePlacements.set(toCoord, promotedPiece || pieceToMove);

  if (move.castling) {
    const castlingAbility = CastlingAbility.fromCastlingRight(
      move.castling,
      turn
    );
    const rookCoord = rookStartingPositions[castlingAbility];
    const newRookIndex =
      move.castling === CastlingRight.KingSide
        ? move.target - 1
        : move.target + 1;
    const newRookCoord = Coordinate.fromIndex(newRookIndex);
    const rook = newPiecePlacements.get(rookCoord);
    rook && newPiecePlacements.set(newRookCoord, rook);
    newPiecePlacements.delete(rookCoord);
  }

  return {
    newPiecePlacements,
    movedPiece: pieceToMove,
    capturedPiece: pieceToCapture,
    promotedPiece,
  };
};

const isRookOnStartingSquare = (
  castlingAbility: CastlingAbility,
  oldPiecePlacements: PiecePlacements,
  newPiecePlacements: PiecePlacements
): boolean => {
  const rookStartingPosition = rookStartingPositions[castlingAbility];
  const pieceOnRookStartingPositionOld =
    oldPiecePlacements.get(rookStartingPosition);
  const pieceOnRookStartingPositionNew =
    newPiecePlacements.get(rookStartingPosition);

  return Piece.isEqual(
    pieceOnRookStartingPositionOld,
    pieceOnRookStartingPositionNew
  );
};

const updateCastlingRights = (
  move: MoveOption,
  castlingAbility: Set<CastlingAbility>,
  pieceToMove: Piece,
  capturedPiece: Maybe<Piece>,
  oldPiecePlacements: PiecePlacements,
  newPiecePlacements: PiecePlacements
): Set<CastlingAbility> => {
  let newCastlingAbility = new Set(castlingAbility);

  const ownAbilities = newCastlingAbility.intersection(
    CastlingAbility.fromColor(pieceToMove.color)
  );

  if (move.castling) {
    newCastlingAbility = newCastlingAbility.difference(ownAbilities);
  } else if (pieceToMove.type === PieceType.King && ownAbilities.size > 0) {
    newCastlingAbility = newCastlingAbility.difference(ownAbilities);
  } else if (pieceToMove.type === PieceType.Rook && ownAbilities.size > 0) {
    CastlingAbility.fromColor(pieceToMove.color).forEach((ability) => {
      if (
        !isRookOnStartingSquare(ability, oldPiecePlacements, newPiecePlacements)
      ) {
        newCastlingAbility.delete(ability);
      }
    });
  }

  if (
    capturedPiece?.type === PieceType.Rook &&
    newCastlingAbility.difference(ownAbilities).size > 0
  ) {
    CastlingAbility.fromColor(capturedPiece.color).forEach((ability) => {
      if (
        !isRookOnStartingSquare(ability, oldPiecePlacements, newPiecePlacements)
      ) {
        newCastlingAbility.delete(ability);
      }
    });
  }

  return newCastlingAbility;
};

const makeMove = (
  { position, positionHash }: BoardState,
  move: MoveOption
): {
  boardState: BoardState;
} => {
  const { newPiecePlacements, movedPiece, capturedPiece, promotedPiece } =
    updatePiecePlacements(move, position.pieces);

  const newCastlingAbilities = updateCastlingRights(
    move,
    position.castlingAbility,
    movedPiece,
    capturedPiece,
    position.pieces,
    newPiecePlacements
  );

  const captureOrPawnMove = move.capture || movedPiece.type === PieceType.Pawn;
  const ply = captureOrPawnMove ? 0 : position.ply + 1;

  const enPassant =
    movedPiece.type === PieceType.Pawn &&
    Math.abs(move.start - move.target) === 16
      ? oneStepBackFromIndex(move.target, position.turn)
      : undefined;

  const newPositionHash = positionHash
    .movePiece(movedPiece, move.start, move.target)
    .capturePiece(capturedPiece, move.target)
    .promotePawn(movedPiece, promotedPiece, move.target)
    .updateEnPassant(position.enPassant, enPassant)
    .updateCastlingRights(position.castlingAbility, newCastlingAbilities)
    .toggleSideToMove();

  const newTurn = position.turn === Color.White ? Color.Black : Color.White;
  const newFullMoves =
    position.turn === Color.Black ? position.fullMoves + 1 : position.fullMoves;

  return {
    boardState: {
      positionHash: newPositionHash,
      position: {
        pieces: newPiecePlacements,
        castlingAbility: newCastlingAbilities,
        turn: newTurn,
        fullMoves: newFullMoves,
        ply,
        enPassant,
      },
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
  history: BoardStateHistoryItem[] = []
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
      return history.map((item) => MoveOption.toMove(item.playedMove));
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
        newHistory
      );
    },

    perft: (depth: number) => {
      return perft(state, depth);
    },
    playMove: (move: Move): Chessboard => {
      const moveOption = moveGen
        .generateMoves()
        .moves.find((m) => Move.isEqual(MoveOption.toMove(m), move));
      if (moveOption) {
        const newHistory = history.slice();
        newHistory.push({ ...state, playedMove: moveOption });
        return from(makeMove(state, moveOption).boardState, newHistory);
      } else {
        throw new Error(`Invalid move: ${Move.toUci(move)}`);
      }
    },
    playMoves: (moves: Move[]): Chessboard => {
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
          index >= moves.length ||
          !Move.isEqual(moves[index], MoveOption.toMove(item.playedMove))
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
        []
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
  moves: Move[] = []
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
