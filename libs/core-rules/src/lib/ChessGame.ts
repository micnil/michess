import {
  CastlingAbility,
  CastlingRight,
  Color,
  Coordinate,
  GameResult,
  GameState,
  Piece,
  PiecePlacements,
  PieceType,
} from '@michess/core-models';
import { Chessboard } from '@michess/core-state';
import { IChessGame } from './model/IChessGame';
import { Move } from './model/Move';
import { MoveGenerator } from './MoveGenerator';
import { MoveGeneratorResult } from './model/MoveGeneratorResult';
import { lazyValue, Maybe } from '@michess/common-utils';

const oneStepBackFromIndex = (index: number, color: Color): Coordinate => {
  return Coordinate.fromIndex(color === Color.White ? index + 8 : index - 8);
};
const oneStepBackFromCoordinate = (
  coord: Coordinate,
  color: Color
): Coordinate => {
  const index = Coordinate.toIndex(coord);
  return oneStepBackFromIndex(index, color);
};

const rookStartingPositions: Record<CastlingAbility, Coordinate> = {
  [CastlingAbility.BlackKing]: 'h8',
  [CastlingAbility.BlackQueen]: 'a8',
  [CastlingAbility.WhiteKing]: 'h1',
  [CastlingAbility.WhiteQueen]: 'a1',
} as const;

const makeMove = (gameState: GameState, move: Move): GameState => {
  const chessboard = Chessboard(gameState);
  const boardState = chessboard.getState();
  const coordinates = chessboard.getCoordinates();
  const castlingRights = new Set(
    CastlingAbility.toCastlingRights(gameState.turn, [
      ...gameState.castlingAbility,
    ])
  );
  const castlingAbility = new Set(gameState.castlingAbility);

  if (move.start == move.target) {
    return gameState;
  }

  const fromCoord = coordinates[move.start];
  const toCoord = coordinates[move.target];

  const pieceToMove = boardState.pieces[fromCoord];
  const newPiecePlacements: PiecePlacements = {
    ...boardState.pieces,
    [toCoord]: pieceToMove,
  };
  delete newPiecePlacements[fromCoord];

  if (Coordinate.fromIndex(move.target) === gameState.enPassant) {
    delete newPiecePlacements[
      oneStepBackFromCoordinate(gameState.enPassant, gameState.turn)
    ];
  }

  if (move.promotion && pieceToMove) {
    newPiecePlacements[toCoord] = Piece.from(move.promotion, pieceToMove.color);
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

  return {
    ...gameState,
    castlingAbility,
    turn: gameState.turn === Color.White ? Color.Black : Color.White,
    fullMoves:
      gameState.turn === Color.Black
        ? gameState.fullMoves + 1
        : gameState.fullMoves,
    ply,
    pieces: newPiecePlacements,
    // Update enPassant if the move is a double pawn advance
    enPassant:
      pieceToMove?.type === 'p' && Math.abs(move.start - move.target) === 16
        ? oneStepBackFromIndex(move.target, gameState.turn)
        : undefined,
  };
};

const toGameResult = (
  gameState: GameState,
  moveGeneratorResult: MoveGeneratorResult
): GameResult => {
  const fiftyMoveRule = gameState.ply >= 100;

  const noLegalMoves = moveGeneratorResult.moves.length === 0;

  const isGameOver = noLegalMoves || fiftyMoveRule;

  const winner: Maybe<Color | 'draw'> = !isGameOver
    ? undefined
    : noLegalMoves && moveGeneratorResult.isCheck
    ? gameState.turn === Color.White
      ? Color.Black
      : Color.White
    : 'draw';

  return {
    isGameOver,
    winner,
  };
};

export const ChessGame = (gameState: GameState): IChessGame => {
  const chessboard = Chessboard(gameState);
  const moveGenerator = MoveGenerator(gameState);

  const getMovesLazy = lazyValue(() => moveGenerator.generateMoves());
  const getState = (): GameState & GameResult => {
    const moveGeneratorResult: MoveGeneratorResult = getMovesLazy();
    const gameResult = toGameResult(gameState, moveGeneratorResult);
    return {
      ...gameState,
      ...gameResult,
    };
  };
  return {
    ...chessboard,
    getState,
    getMoves: () => getMovesLazy().moves,
    makeMove: (move) => ChessGame(makeMove(gameState, move)),
  };
};
