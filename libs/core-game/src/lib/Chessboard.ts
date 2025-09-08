import { assertDefined, lazyValue, Maybe } from '@michess/common-utils';
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

export type Chessboard = {
  position: ChessPosition;
  positionHash: ZobristHash;
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  moveOptions: MoveOption[];
  playMove: (move: Move) => Chessboard;
  perft: (depth: number) => { nodes: number };
};

type ChessboardState = {
  position: ChessPosition;
  positionHash: ZobristHash;
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
  { position, positionHash }: ChessboardState,
  move: MoveOption
): {
  boardState: ChessboardState;
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

const perft = (
  boardState: ChessboardState,
  depth: number
): { nodes: number } => {
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

const from = (state: ChessboardState): Chessboard => {
  const moveGenerator = MoveGenerator(state.position);
  const getMoveOptions = lazyValue(() => moveGenerator.generateMoves());
  return {
    get position() {
      return state.position;
    },
    get positionHash() {
      return state.positionHash;
    },
    get isCheck() {
      return getMoveOptions().isCheck;
    },
    get isCheckmate() {
      return getMoveOptions().isCheckmate;
    },
    get isStalemate() {
      const moveOptions = getMoveOptions();
      return moveOptions.moves.length === 0 && !moveOptions.isCheck;
    },
    get moveOptions() {
      return getMoveOptions().moves;
    },
    perft: (depth: number) => {
      return perft(state, depth);
    },
    playMove: (move: Move): Chessboard => {
      const moveOption = getMoveOptions().moves.find((m) =>
        Move.isEqual(MoveOption.toMove(m), move)
      );
      if (moveOption) {
        return from(makeMove(state, moveOption).boardState);
      } else {
        throw new Error(`Invalid move: ${Move.toUci(move)}`);
      }
    },
  };
};

const fromPosition = (position: ChessPosition): Chessboard => {
  const positionHash = ZobristHash.fromChessPosition(position);
  return from({
    position,
    positionHash,
  });
};

export const Chessboard = {
  fromPosition,
};
