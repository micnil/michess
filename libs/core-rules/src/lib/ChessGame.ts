import {
  CastlingAbility,
  CastlingRight,
  Color,
  Coordinate,
  GameResult,
  ChessPosition,
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

const makeMove = (chessPosition: ChessPosition, move: Move): ChessPosition => {
  const chessboard = Chessboard(chessPosition);
  const boardState = chessboard.getState();
  const coordinates = chessboard.getCoordinates();
  const castlingRights = new Set(
    CastlingAbility.toCastlingRights(chessPosition.turn, [
      ...chessPosition.castlingAbility,
    ])
  );
  const castlingAbility = new Set(chessPosition.castlingAbility);

  if (move.start == move.target) {
    return chessPosition;
  }

  const fromCoord = coordinates[move.start];
  const toCoord = coordinates[move.target];

  const pieceToMove = boardState.pieces[fromCoord];
  const newPiecePlacements: PiecePlacements = {
    ...boardState.pieces,
    [toCoord]: pieceToMove,
  };
  delete newPiecePlacements[fromCoord];

  if (Coordinate.fromIndex(move.target) === chessPosition.enPassant) {
    delete newPiecePlacements[
      oneStepBackFromCoordinate(chessPosition.enPassant, chessPosition.turn)
    ];
  }

  if (move.promotion && pieceToMove) {
    newPiecePlacements[toCoord] = Piece.from(move.promotion, pieceToMove.color);
  }

  if (move.castling === CastlingRight.KingSide) {
    const rookCoord = chessPosition.turn === Color.White ? 'h1' : 'h8';
    const newRookCoord = chessPosition.turn === Color.White ? 'f1' : 'f8';
    newPiecePlacements[newRookCoord] = newPiecePlacements[rookCoord];
    delete newPiecePlacements[rookCoord];
  } else if (move.castling === CastlingRight.QueenSide) {
    const rookCoord = chessPosition.turn === Color.White ? 'a1' : 'a8';
    const newRookCoord = chessPosition.turn === Color.White ? 'd1' : 'd8';
    newPiecePlacements[newRookCoord] = newPiecePlacements[rookCoord];
    delete newPiecePlacements[rookCoord];
  }

  if (move.castling) {
    const abilitiesToRemove =
      chessPosition.turn === Color.White
        ? CastlingAbility.whiteValues
        : CastlingAbility.blackValues;
    abilitiesToRemove.forEach((ability) => castlingAbility.delete(ability));
  } else if (pieceToMove?.type === PieceType.King && castlingRights.size > 0) {
    const abilitiesToRemove =
      chessPosition.turn === Color.White
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
  const ply = captureOrPawnMove ? 0 : chessPosition.ply + 1;

  return {
    ...chessPosition,
    castlingAbility,
    turn: chessPosition.turn === Color.White ? Color.Black : Color.White,
    fullMoves:
      chessPosition.turn === Color.Black
        ? chessPosition.fullMoves + 1
        : chessPosition.fullMoves,
    ply,
    pieces: newPiecePlacements,
    // Update enPassant if the move is a double pawn advance
    enPassant:
      pieceToMove?.type === 'p' && Math.abs(move.start - move.target) === 16
        ? oneStepBackFromIndex(move.target, chessPosition.turn)
        : undefined,
  };
};

const toGameResult = (
  chessPosition: ChessPosition,
  moveGeneratorResult: MoveGeneratorResult
): GameResult => {
  const fiftyMoveRule = chessPosition.ply >= 100;

  const noLegalMoves = moveGeneratorResult.moves.length === 0;

  const isGameOver = noLegalMoves || fiftyMoveRule;

  const winner: Maybe<Color | 'draw'> = !isGameOver
    ? undefined
    : noLegalMoves && moveGeneratorResult.isCheck
    ? chessPosition.turn === Color.White
      ? Color.Black
      : Color.White
    : 'draw';

  return {
    isGameOver,
    winner,
  };
};

export const ChessGame = (chessPosition: ChessPosition): IChessGame => {
  const chessboard = Chessboard(chessPosition);
  const moveGenerator = MoveGenerator(chessPosition);

  const getMovesLazy = lazyValue(() => moveGenerator.generateMoves());
  const getState = (): ChessPosition & GameResult => {
    const moveGeneratorResult: MoveGeneratorResult = getMovesLazy();
    const gameResult = toGameResult(chessPosition, moveGeneratorResult);
    return {
      ...chessPosition,
      ...gameResult,
    };
  };
  return {
    ...chessboard,
    getState,
    getMoves: () => getMovesLazy().moves,
    makeMove: (move) => ChessGame(makeMove(chessPosition, move)),
  };
};
