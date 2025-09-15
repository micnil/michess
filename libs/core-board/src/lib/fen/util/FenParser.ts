import { Maybe } from '@michess/common-utils';
import { Color } from '../../common/Color';
import { Coordinate } from '../../common/Coordinate';
import { Piece } from '../../common/Piece';
import { CastlingAbility } from '../../position/model/CastlingAbility';
import { ChessPosition } from '../../position/model/ChessPosition';
import {
  FenCastlingAbilityPart,
  FenEnPassantTargetSquarePart,
  FenSideToMovePart,
  FenStr,
} from '../model/FenStr';
import { FenValidationError } from '../model/FenValidationError';
import { coordIterator } from './coordIterator';
import { parseFenParts } from './parseFenParts';
import { piecePlacementsFromFen } from './piecePlacementsFromFen';

const sideToMoveToColor = (sideToMove: FenSideToMovePart): Color => {
  return sideToMove === 'w' ? 'white' : 'black';
};

const charToCastlingAbility = (char: string): CastlingAbility => {
  switch (char) {
    case 'k':
      return CastlingAbility.BlackKing;
    case 'q':
      return CastlingAbility.BlackQueen;
    case 'Q':
      return CastlingAbility.WhiteQueen;
    case 'K':
      return CastlingAbility.WhiteKing;
    default:
      throw new FenValidationError('FenCastlingAbilityPart');
  }
};

const castlingAbilityFromFen = (
  fenCastlingAbility: FenCastlingAbilityPart
): Set<CastlingAbility> => {
  if (fenCastlingAbility === '-') {
    return new Set();
  } else {
    const list: CastlingAbility[] = [...fenCastlingAbility].map(
      charToCastlingAbility
    );
    return new Set(list);
  }
};

const enPassantCoordinateFromFenStr = (
  fenEnPassantTargetSquare: FenEnPassantTargetSquarePart
): Maybe<Coordinate> => {
  if (fenEnPassantTargetSquare === '-') {
    return undefined;
  } else {
    return fenEnPassantTargetSquare as Coordinate;
  }
};
const chessPositionFromFen = (fen: string): ChessPosition => {
  const fenParts = parseFenParts(fen);

  return {
    pieces: piecePlacementsFromFen(fen),
    enPassant: enPassantCoordinateFromFenStr(fenParts.enPassantTargetSquare),
    turn: sideToMoveToColor(fenParts.sideToMove),
    castlingAbility: castlingAbilityFromFen(fenParts.castlingAbility),
    ply: Number(fenParts.halfMoveClock),
    fullMoves: Number(fenParts.fullMoveCounter),
  };
};

const pieceToChar = (piece: Piece) => {
  return piece.color === 'white'
    ? piece.type.toUpperCase()
    : piece.type.toLowerCase();
};

const toFenStr = (chessPosition: ChessPosition): FenStr => {
  const coordIter = coordIterator();
  let piecePlacement = '';
  let empty = 0;
  while (!coordIter.isFinished()) {
    const coord = coordIter.get();
    const piece = chessPosition.pieces.get(coord);
    if (piece) {
      if (empty > 0) {
        piecePlacement += empty;
        empty = 0;
      }
      piecePlacement += pieceToChar(piece);
    } else {
      empty++;
    }

    if ((Coordinate.toIndex(coord) + 1) % 8 === 0) {
      if (empty > 0) {
        piecePlacement += empty;
        empty = 0;
      }
      if (Coordinate.toRankIndex(coord) !== 7) {
        piecePlacement += '/';
      }
    }
    coordIter.next(1);
  }

  // Active color
  const activeColor = chessPosition.turn === 'white' ? 'w' : 'b';

  // Castling rights
  const castlingMap = {
    [CastlingAbility.WhiteKing]: 'K',
    [CastlingAbility.WhiteQueen]: 'Q',
    [CastlingAbility.BlackKing]: 'k',
    [CastlingAbility.BlackQueen]: 'q',
  };
  let castling = '';
  if (chessPosition.castlingAbility && chessPosition.castlingAbility.size > 0) {
    for (const right of CastlingAbility.allValues) {
      if (chessPosition.castlingAbility.has(right)) {
        castling += castlingMap[right];
      }
    }
  } else {
    castling = '-';
  }

  // En passant
  const enPassant = chessPosition.enPassant ? chessPosition.enPassant : '-';

  // Halfmove clock
  const halfMoveClock = chessPosition.ply ?? 0;

  // Fullmove number
  const fullMoveNumber = chessPosition.fullMoves ?? 1;

  return `${piecePlacement} ${activeColor} ${castling} ${enPassant} ${halfMoveClock} ${fullMoveNumber}` as FenStr;
};

export const FenParser = {
  toChessPosition: chessPositionFromFen,
  toFenStr,
};
