import {
  BoardCoordinates,
  CastlingRight,
  Color,
  Coordinate,
  Piece,
  PiecePlacement,
  PieceType,
} from '@michess/core-models';
import { Move } from './model/Move';
import { MoveGeneratorContext } from './model/MoveGeneratorContext';

import { Bitboard } from '@michess/core-state';
import { isDefined, Maybe } from '@michess/common-utils';

enum DirectionOffset {
  N = -8,
  S = +8,
  E = +1,
  W = -1,
  NE = -7,
  SE = +9,
  NW = -9,
  SW = +7,
}

const DIAGONAL_OFFSETS = [
  DirectionOffset.NE,
  DirectionOffset.NW,
  DirectionOffset.SE,
  DirectionOffset.SW,
];
const VERTICAL_OFFSETS = [DirectionOffset.N, DirectionOffset.S];
const HORIZONTAL_OFFSETS = [DirectionOffset.E, DirectionOffset.W];
const ADJECENT_OFFSETS = [...VERTICAL_OFFSETS, ...HORIZONTAL_OFFSETS];
const NEIGHBORING_OFFSETS = [...ADJECENT_OFFSETS, ...DIAGONAL_OFFSETS];

const KNIGHT_JUMP_OFFSETS = [15, 17, -17, -15, 10, -6, 6, -10];
const aFileBb = Bitboard().between('a1', 'a8');
const hFileBb = Bitboard().between('h1', 'h8');

const withinBoard = (index: number): boolean => 0 <= index && index <= 63;

const chebyshevDistance = (startIndex: number, nextIndex: number): number => {
  const startFile = startIndex % 8;
  const nextFile = nextIndex % 8;
  const startRank = (startIndex - startFile) / 8;
  const nextRank = (nextIndex - nextFile) / 8;

  return Math.max(
    Math.abs(startRank - nextRank),
    Math.abs(startFile - nextFile)
  );
};
const isNeighbors = (startIndex: number, nextIndex: number): boolean => {
  return chebyshevDistance(startIndex, nextIndex) <= 1;
};

const unfoldDirection = (
  startIndex: number,
  directionOffset: number
): number[] => {
  const indexes: number[] = [];
  for (
    let currentIndex = startIndex, nextIndex = startIndex + directionOffset;
    withinBoard(nextIndex) && isNeighbors(currentIndex, nextIndex);
    currentIndex = nextIndex, nextIndex = nextIndex + directionOffset
  ) {
    indexes.push(nextIndex);
  }
  return indexes;
};

type BitboardByDirection = Record<DirectionOffset, Bitboard>;
type DirectionalBitboardsByCoordinate = Record<Coordinate, BitboardByDirection>;

const SLIDER_ATTACKS: DirectionalBitboardsByCoordinate = Object.fromEntries(
  BoardCoordinates.createWhite().map((coord, index) => {
    const attacks: BitboardByDirection = {
      [DirectionOffset.N]: Bitboard().setIndices(
        unfoldDirection(index, DirectionOffset.N)
      ),
      [DirectionOffset.S]: Bitboard().setIndices(
        unfoldDirection(index, DirectionOffset.S)
      ),
      [DirectionOffset.E]: Bitboard().setIndices(
        unfoldDirection(index, DirectionOffset.E)
      ),
      [DirectionOffset.W]: Bitboard().setIndices(
        unfoldDirection(index, DirectionOffset.W)
      ),
      [DirectionOffset.NE]: Bitboard().setIndices(
        unfoldDirection(index, DirectionOffset.NE)
      ),
      [DirectionOffset.SE]: Bitboard().setIndices(
        unfoldDirection(index, DirectionOffset.SE)
      ),
      [DirectionOffset.NW]: Bitboard().setIndices(
        unfoldDirection(index, DirectionOffset.NW)
      ),
      [DirectionOffset.SW]: Bitboard().setIndices(
        unfoldDirection(index, DirectionOffset.SW)
      ),
    };

    return [coord, attacks];
  })
) as DirectionalBitboardsByCoordinate;

const KNIGHT_ATTACKS: Record<Coordinate, Bitboard> = Object.fromEntries(
  BoardCoordinates.createWhite().map((coord, index) => {
    const attacks = KNIGHT_JUMP_OFFSETS.map((offset) => index + offset)
      .filter(
        (targetIndex) =>
          withinBoard(targetIndex) && chebyshevDistance(index, targetIndex) <= 2
      )
      .reduce((acc, targetIndex) => acc.setIndex(targetIndex), Bitboard());

    return [coord, attacks];
  })
) as Record<Coordinate, Bitboard>;

const KING_ATTACKS: Record<Coordinate, Bitboard> = Object.fromEntries(
  BoardCoordinates.createWhite().map((coord, index) => {
    const attacks = NEIGHBORING_OFFSETS.reduce((attackBitboard, offset) => {
      const target = index + offset;
      return withinBoard(target) && isNeighbors(index, target)
        ? attackBitboard.setIndex(target)
        : attackBitboard;
    }, Bitboard());

    return [coord, attacks];
  })
) as Record<Coordinate, Bitboard>;

const PAWN_ATTACKS: Record<
  Coordinate,
  Record<Color, Bitboard>
> = Object.fromEntries(
  BoardCoordinates.createWhite().map((coord, index) => {
    const whiteAttacks = [index - 7, index - 9].filter(
      (targetIndex) =>
        withinBoard(targetIndex) && isNeighbors(index, targetIndex)
    );
    const blackAttacks = [index + 7, index + 9].filter(
      (targetIndex) =>
        withinBoard(targetIndex) && isNeighbors(index, targetIndex)
    );
    const attacks: Record<Color, Bitboard> = {
      white: Bitboard().setIndices(whiteAttacks),
      black: Bitboard().setIndices(blackAttacks),
    };
    return [coord, attacks];
  })
) as Record<Coordinate, Record<Color, Bitboard>>;

const getRayAttacks = (
  context: MoveGeneratorContext,
  direction: DirectionOffset,
  coord: Coordinate
): Bitboard => {
  const attacks = SLIDER_ATTACKS[coord][direction];
  const blockers = attacks.intersection(context.bitboards.occupied);
  if (!blockers.isEmpty()) {
    const indexOfFirstBlocker =
      direction > 0 ? blockers.scanForward() : blockers.scanBackward();
    return attacks.exclude(
      SLIDER_ATTACKS[context.board.getCoordinates()[indexOfFirstBlocker]][
        direction
      ]
    );
  } else {
    return attacks;
  }
};

const movesFromBitboard = (
  context: MoveGeneratorContext,
  { piece, coord }: PiecePlacement,
  legalMoves: Bitboard
): Move[] => {
  const startIndex = context.board.getIndex(coord);
  const opponentOccupancy = context.bitboards.getOpponentOccupancy(piece.color);
  return legalMoves.getIndices().map((targetIndex) => ({
    start: startIndex,
    target: targetIndex,
    capture: opponentOccupancy.isIndexSet(targetIndex),
  }));
};

const getSlidingAttacks = (
  context: MoveGeneratorContext,
  { piece, coord }: PiecePlacement
): Bitboard => {
  const moveOffsets =
    piece.type === PieceType.Bishop
      ? DIAGONAL_OFFSETS
      : piece.type === PieceType.Rook
      ? ADJECENT_OFFSETS
      : piece.type === PieceType.Queen
      ? NEIGHBORING_OFFSETS
      : [];
  return moveOffsets.reduce((attacksBoard, direction) => {
    return attacksBoard.union(getRayAttacks(context, direction, coord));
  }, Bitboard());
};

const getSlidingMoves = (
  context: MoveGeneratorContext,
  { piece, coord }: PiecePlacement
): Move[] => {
  const ownOccupancy = context.bitboards.getOwnOccupancy(piece.color);
  const attacks = getSlidingAttacks(context, { piece, coord });
  const legalMoves = attacks.exclude(ownOccupancy);
  return movesFromBitboard(context, { piece, coord }, legalMoves);
};

const getMovesForQueen = (
  context: MoveGeneratorContext,
  piecePlacement: PiecePlacement
): Move[] => {
  return getSlidingMoves(context, piecePlacement);
};

const getMovesForBishop = (
  context: MoveGeneratorContext,
  piecePlacement: PiecePlacement
): Move[] => {
  return getSlidingMoves(context, piecePlacement);
};

const getMovesForRook = (
  context: MoveGeneratorContext,
  piecePlacement: PiecePlacement
): Move[] => {
  return getSlidingMoves(context, piecePlacement);
};

const getMovesForKing = (
  context: MoveGeneratorContext,
  { coord, piece }: PiecePlacement
): Move[] => {
  const ownOccupancy = context.bitboards.getOwnOccupancy(piece.color);
  const kingAttacks = KING_ATTACKS[coord];
  const legalKingMoves = kingAttacks.exclude(ownOccupancy);

  return movesFromBitboard(context, { coord, piece }, legalKingMoves);
};

const getMovesForKnight = (
  context: MoveGeneratorContext,
  { coord, piece }: PiecePlacement
): Move[] => {
  const ownOccupancy = context.bitboards.getOwnOccupancy(piece.color);
  const legalKnightMoves = KNIGHT_ATTACKS[coord].exclude(ownOccupancy);

  return movesFromBitboard(context, { piece, coord }, legalKnightMoves);
};

const getRank = (index: number) => 8 - Math.floor(index / 8);

const getMovesForPawn = (
  context: MoveGeneratorContext,
  { coord, piece }: PiecePlacement
): Move[] => {
  const chessboard = context.board;
  const index = Coordinate.toIndex(coord);
  const coordinates = chessboard.getCoordinates();

  const direction = piece.color === Color.White ? -1 : +1;
  const startRank = piece.color === Color.White ? 6 : 1;
  const promotionRank = piece.color === Color.White ? 8 : 1;

  const oneStepIndex = index + direction * 8;
  const oneStepSquare = withinBoard(oneStepIndex)
    ? chessboard.getSquare(coordinates[oneStepIndex])
    : undefined;

  const twoStepIndex = index + direction * 16;
  const twoStepSquare = withinBoard(twoStepIndex)
    ? chessboard.getSquare(coordinates[twoStepIndex])
    : undefined;

  const opponentOccupied = context.bitboards.getOpponentOccupancy(piece.color);
  const pawnAttacks =
    PAWN_ATTACKS[coord][piece.color].intersection(opponentOccupied);
  const attackMoves = pawnAttacks.getIndices().flatMap((captureIndex) => {
    const attackMove = {
      start: index,
      target: captureIndex,
      capture: true,
    };
    const isPromotion = getRank(captureIndex) === promotionRank;
    return isPromotion
      ? PieceType.promotionValues.map((piece) => ({
          ...attackMove,
          promotion: piece,
        }))
      : [attackMove];
  });

  const currentRank = (index - (index % 8)) / 8;
  const isStartPosition = currentRank === startRank;

  const moves: Move[] = attackMoves;
  if (!oneStepSquare?.piece) {
    const move: Move = {
      start: index,
      target: oneStepIndex,
      capture: false,
    };
    const isPromotion = getRank(oneStepIndex) === promotionRank;
    if (isPromotion) {
      moves.push(
        ...PieceType.promotionValues.map((piece) => ({
          ...move,
          promotion: piece,
        }))
      );
    } else {
      moves.push(move);
    }
  }

  if (isStartPosition && !oneStepSquare?.piece && !twoStepSquare?.piece) {
    moves.push({
      start: index,
      target: twoStepIndex,
      capture: false,
    });
  }

  if (context.enPassantCoord) {
    const enPassantIndex = Coordinate.toIndex(context.enPassantCoord);
    if (PAWN_ATTACKS[coord][piece.color].isIndexSet(enPassantIndex)) {
      moves.push({
        start: index,
        target: enPassantIndex,
        capture: true,
      });
    }
  }

  return moves;
};

const getAttackedSquares = (
  context: MoveGeneratorContext,
  color: Color
): Bitboard => {
  const pieceBitboards = context.bitboards[color];
  const knightAttacks = pieceBitboards[PieceType.Knight]
    .getCoordinates()
    .reduce((attacks, coordinate) => {
      return attacks.union(KNIGHT_ATTACKS[coordinate]);
    }, Bitboard());
  const kingAttacks =
    KING_ATTACKS[
      Coordinate.fromIndex(pieceBitboards[PieceType.King].scanForward())
    ] ?? Bitboard();
  const pawnAttacksWest = pieceBitboards[PieceType.Pawn]
    .leftShift(7)
    .exclude(aFileBb);
  const pawnAttacksEast = pieceBitboards[PieceType.Pawn]
    .leftShift(9)
    .exclude(hFileBb);
  const pawnAttacks = pawnAttacksWest.union(pawnAttacksEast);
  const sliders = [PieceType.Bishop, PieceType.Rook, PieceType.Queen];
  const sliderAttacks = sliders.reduce((attacks, piece) => {
    const slidingPieceAttacks = pieceBitboards[piece]
      .getCoordinates()
      .reduce((attacks, coordinate) => {
        return attacks.union(
          getSlidingAttacks(context, {
            piece: Piece.from(piece, color),
            coord: coordinate,
          })
        );
      }, Bitboard());
    return attacks.union(slidingPieceAttacks);
  }, Bitboard());
  return knightAttacks
    .union(kingAttacks)
    .union(pawnAttacks)
    .union(sliderAttacks);
};

const getMovesFromSquare = (
  context: MoveGeneratorContext,
  piecePlacement: PiecePlacement
): Move[] => {
  switch (piecePlacement.piece.type) {
    case PieceType.Queen:
      return getMovesForQueen(context, piecePlacement);
    case PieceType.Rook:
      return getMovesForRook(context, piecePlacement);
    case PieceType.Pawn:
      return getMovesForPawn(context, piecePlacement);
    case PieceType.Knight:
      return getMovesForKnight(context, piecePlacement);
    case PieceType.King:
      return getMovesForKing(context, piecePlacement);
    case PieceType.Bishop:
      return getMovesForBishop(context, piecePlacement);
    default:
      throw new Error(`Invalid piece type: ${piecePlacement.piece.type}`);
  }
};

export const generateMoves = (context: MoveGeneratorContext): Move[] => {
  const attackers = getAttackedSquares(
    context,
    context.isTurn(Color.White) ? Color.Black : Color.White
  );
  const moves = context.board
    .getPiecePlacements()
    .filter((piecePlacement) => context.isTurn(piecePlacement.piece.color))
    .flatMap((piecePlacement) => {
      return getMovesFromSquare(context, piecePlacement);
    });

  // Castling moves
  const castlingMoves: Move[] = context.castlingRights
    .map((right) => {
      const kingIndex =
        context.bitboards[context.turn][PieceType.King].scanForward();
      const targetIndex =
        right === CastlingRight.KingSide ? kingIndex + 2 : kingIndex - 2;
      const castlingPath = context.bitboards.castlingPaths[context.turn][right];
      const castlingKingPath =
        context.bitboards.castlingKingPaths[context.turn][right];
      const isCastlingPathClear = castlingPath
        .intersection(context.bitboards.occupied)
        .isEmpty();
      const isKingPathNotAttacked = castlingKingPath
        .intersection(attackers)
        .isEmpty();
      const isKingNotInCheck = context.bitboards[context.turn][PieceType.King]
        .setIndex(targetIndex)
        .intersection(attackers)
        .isEmpty();
      if (
        isCastlingPathClear &&
        isKingPathNotAttacked &&
        isKingNotInCheck &&
        kingIndex !== -1
      ) {
        return {
          start: kingIndex,
          target: targetIndex,
          capture: false,
          castling: right,
        };
      } else {
        return undefined;
      }
    })
    .filter(isDefined);

  moves.push(...castlingMoves);
  return moves;
};
