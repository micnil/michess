import { assertDefined, Maybe } from '@michess/common-utils';
import { Color } from '../../common/Color';
import { Coordinate } from '../../common/Coordinate';
import { Piece } from '../../common/Piece';
import { PieceType } from '../../common/PieceType';
import { MoveOption } from '../../move/MoveOption';
import { CastlingAbility } from './CastlingAbility';
import { CastlingRight } from './CastlingRight';
import { PiecePlacements } from './PiecePlacements';

export type ChessPosition = {
  enPassant?: Coordinate;
  turn: Color;
  castlingAbility: Set<CastlingAbility>;
  ply: number;
  fullMoves: number;
  pieces: PiecePlacements;
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

const updatePosition = (
  position: ChessPosition,
  move: MoveOption
): {
  position: ChessPosition;
  movedPiece: Piece;
  capturedPiece: Maybe<Piece>;
  promotedPiece: Maybe<Piece>;
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

  const newTurn = position.turn === Color.White ? Color.Black : Color.White;
  const newFullMoves =
    position.turn === Color.Black ? position.fullMoves + 1 : position.fullMoves;

  return {
    position: {
      pieces: newPiecePlacements,
      castlingAbility: newCastlingAbilities,
      turn: newTurn,
      fullMoves: newFullMoves,
      ply,
      enPassant,
    },
    movedPiece,
    capturedPiece,
    promotedPiece,
  };
};

export const ChessPosition = {
  standardInitial: (): ChessPosition => ({
    pieces: PiecePlacements.startingBoard,
    enPassant: undefined,
    turn: Color.White,
    castlingAbility: new Set(CastlingAbility.allValues),
    ply: 0,
    fullMoves: 1,
  }),
  makeMove: (
    position: ChessPosition,
    move: MoveOption
  ): {
    position: ChessPosition;
    movedPiece: Piece;
    capturedPiece?: Piece;
    promotedPiece?: Piece;
  } => {
    return updatePosition(position, move);
  },
};
