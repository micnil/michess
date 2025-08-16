import {
  CastlingAbility,
  CastlingRight,
  Color,
  Coordinate,
  GameState,
  ChessPosition,
  Piece,
  PiecePlacements,
  PieceType,
  Move,
} from '@michess/core-models';
import { Chessboard, ZobristHash } from '@michess/core-state';
import { MoveGenerator } from './MoveGenerator';
import { MoveGeneratorResult } from './model/MoveGeneratorResult';

export type ChessGame = {
  getState(): GameState;
  getMoves(): Move[];
  makeMove(move: Move): ChessGame;
};

type GameStateInternal = GameState & {
  positionHash: ZobristHash;
  previousPositionHash: ZobristHash[];
};

const oneStepBackFromIndex = (index: number, color: Color): Coordinate => {
  return Coordinate.fromIndex(color === Color.White ? index + 8 : index - 8);
};

const rookStartingPositions: Record<CastlingAbility, Coordinate> = {
  [CastlingAbility.BlackKing]: 'h8',
  [CastlingAbility.BlackQueen]: 'a8',
  [CastlingAbility.WhiteKing]: 'h1',
  [CastlingAbility.WhiteQueen]: 'a1',
} as const;

const makeMove = (
  gameState: GameStateInternal,
  move: Move
): {
  gameState: GameStateInternal;
} => {
  if (move.start == move.target) {
    return { gameState };
  }

  let newPositionHash = gameState.positionHash.copy();
  const chessboard = Chessboard(gameState);
  const boardState = chessboard.getState();
  const coordinates = chessboard.getCoordinates();
  const castlingRights = new Set(
    CastlingAbility.toCastlingRights(gameState.turn, [
      ...gameState.castlingAbility,
    ])
  );
  const castlingAbility = new Set(gameState.castlingAbility);

  const fromCoord = coordinates[move.start];
  const toCoord = coordinates[move.target];

  const pieceToMove = boardState.pieces[fromCoord];
  const isEnpassantCapture =
    Coordinate.fromIndex(move.target) === gameState.enPassant;
  const enPassantCaptureCoord = oneStepBackFromIndex(
    move.target,
    gameState.turn
  );
  const captureCoord = isEnpassantCapture ? enPassantCaptureCoord : toCoord;
  const pieceToCapture = boardState.pieces[captureCoord];

  const newPiecePlacements: PiecePlacements = {
    ...boardState.pieces,
  };
  delete newPiecePlacements[captureCoord];
  delete newPiecePlacements[fromCoord];
  newPiecePlacements[toCoord] = pieceToMove;
  newPositionHash = pieceToMove
    ? newPositionHash.movePiece(pieceToMove, move.start, move.target)
    : newPositionHash;
  newPositionHash = pieceToCapture
    ? newPositionHash.capturePiece(pieceToCapture, move.target)
    : newPositionHash;

  if (move.promotion && pieceToMove) {
    const promotedPiece = Piece.from(move.promotion, pieceToMove.color);
    newPiecePlacements[toCoord] = promotedPiece;
    newPositionHash = newPositionHash.promotePawn(
      pieceToMove,
      promotedPiece,
      move.target
    );
  }

  if (move.castling === CastlingRight.KingSide) {
    const rookCoord = gameState.turn === Color.White ? 'h1' : 'h8';
    const newRookCoord = gameState.turn === Color.White ? 'f1' : 'f8';
    newPiecePlacements[newRookCoord] = newPiecePlacements[rookCoord];
    delete newPiecePlacements[rookCoord];
  } else if (move.castling === CastlingRight.QueenSide) {
    const rookCoord = gameState.turn === Color.White ? 'a1' : 'a8';
    const newRookCoord = gameState.turn === Color.White ? 'd1' : 'd8';
    newPiecePlacements[newRookCoord] = newPiecePlacements[rookCoord];
    delete newPiecePlacements[rookCoord];
  }

  if (move.castling) {
    const abilitiesToRemove =
      gameState.turn === Color.White
        ? CastlingAbility.whiteValues
        : CastlingAbility.blackValues;
    abilitiesToRemove.forEach((ability) => castlingAbility.delete(ability));
  } else if (pieceToMove?.type === PieceType.King && castlingRights.size > 0) {
    const abilitiesToRemove =
      gameState.turn === Color.White
        ? CastlingAbility.whiteValues
        : CastlingAbility.blackValues;
    abilitiesToRemove.forEach((ability) => castlingAbility.delete(ability));
  }

  CastlingAbility.allValues.forEach((ability) => {
    const rookStartingPosition = rookStartingPositions[ability];
    const pieceOnRookStartingPositionOld =
      boardState.pieces[rookStartingPosition];
    const pieceOnRookStartingPositionNew =
      newPiecePlacements[rookStartingPosition];

    if (
      !Piece.isEqual(
        pieceOnRookStartingPositionOld,
        pieceOnRookStartingPositionNew
      )
    ) {
      castlingAbility.delete(ability);
    }
  });

  const captureOrPawnMove =
    move.capture || pieceToMove?.type === PieceType.Pawn;
  const ply = captureOrPawnMove ? 0 : gameState.ply + 1;

  const enPassant =
    pieceToMove?.type === PieceType.Pawn &&
    Math.abs(move.start - move.target) === 16
      ? oneStepBackFromIndex(move.target, gameState.turn)
      : undefined;

  if (enPassant !== gameState.enPassant) {
    newPositionHash = newPositionHash.updateEnPassant(enPassant);
  }

  if (
    castlingAbility.symmetricDifference(gameState.castlingAbility).size == 0
  ) {
    newPositionHash = newPositionHash.updateCastlingRights(
      gameState.castlingAbility,
      castlingAbility
    );
  }
  newPositionHash = newPositionHash.toggleSideToMove();

  return {
    gameState: {
      ...gameState,
      positionHash: newPositionHash,
      previousPositionHash: [
        ...gameState.previousPositionHash,
        gameState.positionHash,
      ],
      moveHistory: [...gameState.moveHistory, move],
      castlingAbility,
      turn: gameState.turn === Color.White ? Color.Black : Color.White,
      fullMoves:
        gameState.turn === Color.Black
          ? gameState.fullMoves + 1
          : gameState.fullMoves,
      ply,
      pieces: newPiecePlacements,
      enPassant,
    },
  };
};

const fromGameStateInternal = (
  gameStateInternal: GameStateInternal,
  moveGenResult: MoveGeneratorResult
): ChessGame => {
  const getState = (): GameState => {
    return gameStateInternal;
  };

  return {
    getState,
    getMoves: () => moveGenResult.moves,
    makeMove: (move) => {
      const { gameState } = makeMove(gameStateInternal, move);
      const moveGenerator = MoveGenerator(gameState);
      return fromGameStateInternal(gameState, moveGenerator.generateMoves());
    },
  };
};

const fromGameState = (gameState: GameState): ChessGame => {
  const moveGenerator = MoveGenerator(gameState);
  return fromGameStateInternal(
    {
      ...gameState,
      positionHash: ZobristHash.fromChessPosition(gameState),
      previousPositionHash: [],
    },
    moveGenerator.generateMoves()
  );
};

const fromChessPosition = (chessPosition: ChessPosition): ChessGame => {
  return fromGameState(GameState.fromChessPosition(chessPosition));
};

export const ChessGame = {
  fromChessPosition,
  fromGameState,
};
