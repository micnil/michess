import { assertDefined } from '@michess/common-utils';
import { Color } from '../common/Color';
import { Coordinate } from '../common/Coordinate';
import { PieceType } from '../common/PieceType';
import { CastlingRight } from '../position/model/CastlingRight';
import { ChessPosition } from '../position/model/ChessPosition';
import { PiecePlacements } from '../position/model/PiecePlacements';
import { MoveGenerator } from './generator/MoveGenerator';
import { MoveOption } from './MoveOption';

export type MoveNotation = {
  displayStr: string;
  moveNumber: number;
  turn: Color;
};

/**
 * Add check/checkmate notation to a SAN string
 */
const addCheckNotation = (
  san: string,
  isCheck: boolean,
  isCheckmate: boolean
): string => {
  if (isCheckmate) {
    return san + '#';
  } else if (isCheck) {
    return san + '+';
  }
  return san;
};

const moveOptionToSan = (
  moveOption: MoveOption,
  pieces: PiecePlacements,
  allLegalMoves: MoveOption[]
): string => {
  const move = MoveOption.toMove(moveOption);

  const piece = pieces.get(move.from);

  assertDefined(piece, `No piece at ${move.from}`);

  if (moveOption.castling) {
    return moveOption.castling === CastlingRight.KingSide ? 'O-O' : 'O-O-O';
  }

  let notation = '';

  if (piece.type !== PieceType.Pawn) {
    notation += piece.type.toUpperCase();
  }

  if (piece.type !== PieceType.Pawn) {
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

    if (ambiguousMoves.length > 0) {
      const fromFile = Coordinate.toFile(move.from);
      const fromRank = Coordinate.toRank(move.from);

      const sameFile = ambiguousMoves.some(
        (move) => Coordinate.fromIndex(move.start)[0] === fromFile
      );

      if (!sameFile) {
        notation += fromFile;
      } else {
        const sameRank = ambiguousMoves.some(
          (move) => Coordinate.fromIndex(move.start)[1] === fromRank
        );

        if (!sameRank) {
          notation += fromRank;
        } else {
          notation += move.from;
        }
      }
    }
  }

  if (piece.type === PieceType.Pawn && moveOption.capture) {
    notation += Coordinate.toFile(move.from);
  }

  if (moveOption.capture) {
    notation += 'x';
  }

  notation += move.to;

  if (moveOption.promotion) {
    notation += `=${moveOption.promotion.toUpperCase()}`;
  }

  return notation;
};

const from = (position: ChessPosition, move: MoveOption): MoveNotation => {
  const moveGen = MoveGenerator(position);
  const legalMoves = moveGen.generateMoves();
  const {
    position: nextPosition,
    movedPiece,
    capturedPiece,
    promotedPiece,
  } = ChessPosition.makeMove(position, move);
  const nextMoveGen = MoveGenerator(nextPosition);
  const { isCheck, isCheckmate } = nextMoveGen.generateMoves();
  const san = moveOptionToSan(move, position.pieces, legalMoves.moves);

  return {
    displayStr: addCheckNotation(san, isCheck, isCheckmate),
    moveNumber: position.fullMoves + (position.turn === Color.White ? 0 : 1),
    turn: position.turn,
  };
};

export const MoveNotation = {
  from,
};
