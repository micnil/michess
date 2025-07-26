import { Maybe } from '@michess/common-utils';
import {
  // BoardCoordinates,
  CastlingAbility,
  Color,
  Coordinate,
  GameState,
  Piece,
} from '@michess/core-models';
import { boardStateFromFen } from './boardStateFromFen';
import { parseFenParts } from './parseFenParts';
import {
  FenCastlingAbilityPart,
  FenEnPassantTargetSquarePart,
  FenSideToMovePart,
  FenStr,
} from './types/FenStr';
import { FenValidationError } from './types/FenValidationError';
import { coordIterator } from './util/coordIterator';

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
const gameStateFromFen = (fen: FenStr): GameState => {
  const fenParts = parseFenParts(fen);

  return {
    ...boardStateFromFen(fen),
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

const toFenStr = (gameState: GameState): FenStr => {
  const coordIter = coordIterator();
  let piecePlacement = '';
  let empty = 0;
  while (!coordIter.isFinished()) {
    const coord = coordIter.get();
    const piece = gameState.pieces[coord];
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
  const activeColor = gameState.turn === 'white' ? 'w' : 'b';

  // Castling rights
  const castlingMap = {
    [CastlingAbility.WhiteKing]: 'K',
    [CastlingAbility.WhiteQueen]: 'Q',
    [CastlingAbility.BlackKing]: 'k',
    [CastlingAbility.BlackQueen]: 'q',
  };
  let castling = '';
  if (gameState.castlingAbility && gameState.castlingAbility.size > 0) {
    for (const right of [
      CastlingAbility.WhiteKing,
      CastlingAbility.WhiteQueen,
      CastlingAbility.BlackKing,
      CastlingAbility.BlackQueen,
    ]) {
      if (gameState.castlingAbility.has(right)) castling += castlingMap[right];
    }
  } else {
    castling = '-';
  }

  // En passant
  const enPassant = gameState.enPassant ? gameState.enPassant : '-';

  // Halfmove clock
  const halfMoveClock = gameState.ply ?? 0;

  // Fullmove number
  const fullMoveNumber = gameState.fullMoves ?? 1;

  return `${piecePlacement} ${activeColor} ${castling} ${enPassant} ${halfMoveClock} ${fullMoveNumber}` as FenStr;
};

export const FenParser = {
  toGameState: gameStateFromFen,
  toFenStr,
};
