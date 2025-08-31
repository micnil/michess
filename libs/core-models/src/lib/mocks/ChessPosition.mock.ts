import { CastlingAbility } from '../position/model/CastlingAbility';
import { ChessPosition } from '../position/model/ChessPosition';
import { Coordinate } from '../common/Coordinate';
import { Piece } from '../common/Piece';
import { PiecePlacements } from '../position/model/PiecePlacements';
import { boardStateMock } from './BoardState.mock';

export const chessPositionMock: ChessPosition = {
  ...boardStateMock,
  castlingAbility: new Set([
    CastlingAbility.BlackKing,
    CastlingAbility.BlackQueen,
    CastlingAbility.WhiteKing,
    CastlingAbility.WhiteQueen,
  ]),
  turn: 'white',
  fullMoves: 1,
  ply: 0,
};

// Type to allow both Map and object literal for pieces
type PiecesInput = PiecePlacements | Partial<Record<Coordinate, Piece>>;

// Helper function to convert object literal to Map for backward compatibility
const convertPiecesToMap = (pieces: PiecesInput): PiecePlacements => {
  if (pieces instanceof Map) {
    return pieces;
  }
  if (pieces && typeof pieces === 'object') {
    return new Map(Object.entries(pieces) as Array<[Coordinate, Piece]>);
  }
  return new Map();
};

export const createChessPositionMock = (
  partialChessPosition?: Partial<Omit<ChessPosition, 'pieces'>> & {
    pieces?: PiecesInput;
  }
): ChessPosition => {
  let finalPieces: PiecePlacements;

  if (partialChessPosition?.pieces) {
    finalPieces = convertPiecesToMap(partialChessPosition.pieces);
  } else {
    finalPieces = chessPositionMock.pieces;
  }

  return {
    ...chessPositionMock,
    ...partialChessPosition,
    pieces: finalPieces,
  };
};
