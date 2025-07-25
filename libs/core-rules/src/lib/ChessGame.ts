import {
  CastlingAbility,
  CastlingRight,
  Color,
  Coordinate,
  GameState,
  Piece,
  PiecePlacements,
  PieceType,
} from '@michess/core-models';
import { Chessboard } from '@michess/core-state';
import { IChessGame } from './model/IChessGame';
import { Move } from './model/Move';
import { MoveGenerator } from './MoveGenerator';

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
    castlingAbility.delete(
      gameState.turn === Color.White
        ? CastlingAbility.WhiteKing
        : CastlingAbility.BlackKing
    );
    delete newPiecePlacements[rookCoord];
  } else if (move.castling === CastlingRight.QueenSide) {
    const rookCoord = gameState.turn === Color.White ? 'a1' : 'a8';
    const newRookCoord = gameState.turn === Color.White ? 'd1' : 'd8';
    newPiecePlacements[newRookCoord] = newPiecePlacements[rookCoord];
    castlingAbility.delete(
      gameState.turn === Color.White
        ? CastlingAbility.WhiteQueen
        : CastlingAbility.BlackQueen
    );
    delete newPiecePlacements[rookCoord];
  }

  if (
    pieceToMove?.type === PieceType.King &&
    !move.castling &&
    castlingRights.size > 0
  ) {
    const abilitiesToRemove =
      gameState.turn === Color.White
        ? CastlingAbility.whiteValues
        : CastlingAbility.blackValues;
    abilitiesToRemove.forEach((ability) => castlingAbility.delete(ability));
  }

  if (
    pieceToMove?.type === PieceType.Rook &&
    fromCoord === 'a1' &&
    castlingRights.has(CastlingRight.QueenSide)
  ) {
    castlingAbility.delete(
      gameState.turn === Color.White
        ? CastlingAbility.WhiteQueen
        : CastlingAbility.BlackQueen
    );
  } else if (
    pieceToMove?.type === PieceType.Rook &&
    fromCoord === 'h8' &&
    castlingRights.has(CastlingRight.KingSide)
  ) {
    castlingAbility.delete(
      gameState.turn === Color.White
        ? CastlingAbility.WhiteKing
        : CastlingAbility.BlackKing
    );
  }

  return {
    ...gameState,
    castlingAbility,
    turn: gameState.turn === Color.White ? Color.Black : Color.White,
    pieces: newPiecePlacements,
    // Update enPassant if the move is a double pawn advance
    enPassant:
      pieceToMove?.type === 'p' && Math.abs(move.start - move.target) === 16
        ? oneStepBackFromIndex(move.target, gameState.turn)
        : undefined,
  };
};

export const ChessGame = (gameState: GameState): IChessGame => {
  const chessboard = Chessboard(gameState);
  const moveGenerator = MoveGenerator(gameState);

  return {
    ...chessboard,
    getState: () => gameState,
    getMoves: () => moveGenerator.generateMoves().moves,
    makeMove: (move) => ChessGame(makeMove(gameState, move)),
  };
};
