import { assertDefined } from '@michess/common-utils';
import { Color } from '../common/Color';
import { Coordinate } from '../common/Coordinate';
import { Piece } from '../common/Piece';
import { PieceType } from '../common/PieceType';
import { CastlingRight } from '../position/model/CastlingRight';
import { ChessPosition } from '../position/model/ChessPosition';
import { PiecePlacements } from '../position/model/PiecePlacements';
import { MoveGenerator } from './generator/MoveGenerator';
import { Move } from './Move';
import { MoveOption } from './MoveOption';

export type MoveNotation = {
  displayStr: string;
  moveNumber: number;
  turn: Color;
};

const addCheckNotation = (
  san: string,
  isCheck: boolean,
  isCheckmate: boolean,
): string => {
  if (isCheckmate) return san + '#';
  if (isCheck) return san + '+';
  return san;
};

const getDisambiguation = (
  moveOption: MoveOption,
  piece: Piece,
  allLegalMoves: MoveOption[],
  pieces: PiecePlacements,
): string => {
  const ambiguousMoves = allLegalMoves.filter((move) => {
    const isSameMove =
      move.start === moveOption.start &&
      move.target === moveOption.target &&
      move.promotion === moveOption.promotion;
    const isSameTarget = move.target === moveOption.target;
    const isSamePieceType =
      pieces.get(Coordinate.fromIndex(move.start))?.type === piece.type;

    return !isSameMove && isSameTarget && isSamePieceType;
  });

  if (ambiguousMoves.length === 0) return '';

  const move = MoveOption.toMove(moveOption);
  const fromFile = Coordinate.toFile(move.from);
  const fromRank = Coordinate.toRank(move.from);

  const sameFile = ambiguousMoves.some(
    (move) => Coordinate.fromIndex(move.start)[0] === fromFile,
  );

  if (!sameFile) return fromFile;

  const sameRank = ambiguousMoves.some(
    (move) => Coordinate.fromIndex(move.start)[1] === fromRank,
  );

  return sameRank ? move.from : fromRank;
};

/**
 * Convert a move option to Standard Algebraic Notation (SAN)
 */
const moveOptionToSan = (
  moveOption: MoveOption,
  pieces: PiecePlacements,
  allLegalMoves: MoveOption[],
): string => {
  const move = MoveOption.toMove(moveOption);
  const piece = pieces.get(move.from);

  assertDefined(piece, `No piece at ${move.from}`);

  // Handle castling
  if (moveOption.castling) {
    return moveOption.castling === CastlingRight.KingSide ? 'O-O' : 'O-O-O';
  }

  let notation = '';
  const isPawn = piece.type === PieceType.Pawn;

  // Add piece type for non-pawn moves
  if (!isPawn) {
    notation += piece.type.toUpperCase();
    // Add disambiguation for non-pawn pieces
    notation += getDisambiguation(moveOption, piece, allLegalMoves, pieces);
  }

  // Add file for pawn captures
  if (isPawn && moveOption.capture) {
    notation += Coordinate.toFile(move.from);
  }

  // Add capture notation
  if (moveOption.capture) {
    notation += 'x';
  }

  // Add target square
  notation += move.to;

  // Add promotion
  if (moveOption.promotion) {
    notation += `=${moveOption.promotion.toUpperCase()}`;
  }

  return notation;
};

/**
 * Generate move notation from a chess position and move
 */
const from = (position: ChessPosition, move: Move): MoveNotation => {
  const moveGen = MoveGenerator(position);
  const legalMoves = moveGen.generateMoves();
  const moveOption = legalMoves.moves.find((m) =>
    Move.isEqual(move, MoveOption.toMove(m)),
  );
  assertDefined(moveOption, `Move option not found for move record`);
  const { position: nextPosition } = ChessPosition.makeMove(
    position,
    moveOption,
  );
  const nextMoveGen = MoveGenerator(nextPosition);
  const { isCheck, isCheckmate } = nextMoveGen.generateMoves();
  const san = moveOptionToSan(moveOption, position.pieces, legalMoves.moves);

  return {
    displayStr: addCheckNotation(san, isCheck, isCheckmate),
    moveNumber: position.fullMoves,
    turn: position.turn,
  };
};

export const MoveNotation = {
  from,
};
