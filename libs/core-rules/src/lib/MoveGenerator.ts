import {
  CastlingRight,
  Color,
  Coordinate,
  GameState,
  Piece,
  PiecePlacement,
  PieceType,
} from '@michess/core-models';
import { Move } from './model/Move';
import { MoveGeneratorContext } from './model/MoveGeneratorContext';
import { isDefined } from '@michess/common-utils';
import { Bitboard, ChessBitboard } from '@michess/core-state';
import { KingAttacks } from './bitboard/KingAttacks';
import { KnightAttacks } from './bitboard/KnightAttacks';
import { PawnAttacks } from './bitboard/PawnAttacks';
import { SliderAttacks } from './bitboard/SliderAttacks';
import { DirectionOffset } from './model/DirectionOffset';
import { IndexBoardUtil } from './util/IndexBoardUtil';

const SLIDERS_BY_DIRECTION: Record<DirectionOffset, PieceType[]> = {
  [DirectionOffset.N]: [PieceType.Rook, PieceType.Queen],
  [DirectionOffset.S]: [PieceType.Rook, PieceType.Queen],
  [DirectionOffset.E]: [PieceType.Rook, PieceType.Queen],
  [DirectionOffset.W]: [PieceType.Rook, PieceType.Queen],
  [DirectionOffset.NE]: [PieceType.Bishop, PieceType.Queen],
  [DirectionOffset.SE]: [PieceType.Bishop, PieceType.Queen],
  [DirectionOffset.NW]: [PieceType.Bishop, PieceType.Queen],
  [DirectionOffset.SW]: [PieceType.Bishop, PieceType.Queen],
};
const DIRECTIONS_BY_SLIDER: Record<PieceType, DirectionOffset[]> = {
  [PieceType.Bishop]: [
    DirectionOffset.NE,
    DirectionOffset.NW,
    DirectionOffset.SE,
    DirectionOffset.SW,
  ],
  [PieceType.Rook]: [
    DirectionOffset.N,
    DirectionOffset.S,
    DirectionOffset.E,
    DirectionOffset.W,
  ],
  [PieceType.Queen]: [
    DirectionOffset.N,
    DirectionOffset.S,
    DirectionOffset.E,
    DirectionOffset.W,
    DirectionOffset.NE,
    DirectionOffset.NW,
    DirectionOffset.SE,
    DirectionOffset.SW,
  ],
  [PieceType.Knight]: [],
  [PieceType.King]: [],
  [PieceType.Pawn]: [],
};

const aFileBb = Bitboard().between('a1', 'a8');
const hFileBb = Bitboard().between('h1', 'h8');

const getRayAttacks = (
  chessBitboard: ChessBitboard,
  direction: DirectionOffset,
  coord: Coordinate
): Bitboard => {
  const attacks = SliderAttacks.fromCoordAndDirection(coord, direction);
  const blockers = attacks.intersection(chessBitboard.occupied);
  if (!blockers.isEmpty()) {
    const indexOfFirstBlocker =
      direction > 0 ? blockers.scanForward() : blockers.scanBackward();
    return attacks.exclude(
      SliderAttacks.fromCoordAndDirection(
        Coordinate.fromIndex(indexOfFirstBlocker),
        direction
      )
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
  const startIndex = Coordinate.toIndex(coord);
  const opponentOccupancy = context.bitboards.getOpponentOccupancy(piece.color);
  return legalMoves.getIndices().map((targetIndex) => ({
    start: startIndex,
    target: targetIndex,
    capture: opponentOccupancy.isIndexSet(targetIndex),
  }));
};

const getSlidingAttacks = (
  chessBitboard: ChessBitboard,
  { piece, coord }: PiecePlacement
): Bitboard => {
  const moveOffsets = DIRECTIONS_BY_SLIDER[piece.type] ?? [];
  return moveOffsets.reduce((attacksBoard, direction) => {
    return attacksBoard.union(getRayAttacks(chessBitboard, direction, coord));
  }, Bitboard());
};

const getSlidingMoves = (
  context: MoveGeneratorContext,
  { piece, coord }: PiecePlacement
): Move[] => {
  const ownOccupancy = context.bitboards.getOwnOccupancy(piece.color);
  const attacks = getSlidingAttacks(context.bitboards, { piece, coord });
  const legalMoves = attacks.exclude(ownOccupancy);
  return movesFromBitboard(context, { piece, coord }, legalMoves);
};

const getMovesForKing = (
  context: MoveGeneratorContext,
  { coord, piece }: PiecePlacement
): Move[] => {
  const ownOccupancy = context.bitboards.getOwnOccupancy(piece.color);
  const kingAttacks = KingAttacks.fromCoord(coord);
  const legalKingMoves = kingAttacks.exclude(ownOccupancy);

  return movesFromBitboard(context, { coord, piece }, legalKingMoves);
};

const getMovesForKnight = (
  context: MoveGeneratorContext,
  { coord, piece }: PiecePlacement
): Move[] => {
  const ownOccupancy = context.bitboards.getOwnOccupancy(piece.color);
  const legalKnightMoves = KnightAttacks.fromCoord(coord).exclude(ownOccupancy);

  return movesFromBitboard(context, { piece, coord }, legalKnightMoves);
};

const getRank = (index: number) => 8 - Math.floor(index / 8);

const getMovesForPawn = (
  context: MoveGeneratorContext,
  { coord, piece }: PiecePlacement
): Move[] => {
  const index = Coordinate.toIndex(coord);

  const direction = piece.color === Color.White ? -1 : +1;
  const startRank = piece.color === Color.White ? 6 : 1;
  const promotionRank = piece.color === Color.White ? 8 : 1;

  const oneStepIndex = index + direction * 8;
  const oneStepSquareOccupied =
    IndexBoardUtil.withinBoard(oneStepIndex) &&
    context.bitboards.occupied.isIndexSet(oneStepIndex);

  const twoStepIndex = index + direction * 16;
  const twoStepSquareOccupied =
    IndexBoardUtil.withinBoard(twoStepIndex) &&
    context.bitboards.occupied.isIndexSet(twoStepIndex);

  const opponentOccupied = context.bitboards.getOpponentOccupancy(piece.color);
  const pawnAttacks = PawnAttacks.fromCoordAndColor(
    coord,
    piece.color
  ).intersection(opponentOccupied);
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
  if (!oneStepSquareOccupied) {
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

  if (isStartPosition && !oneStepSquareOccupied && !twoStepSquareOccupied) {
    moves.push({
      start: index,
      target: twoStepIndex,
      capture: false,
    });
  }

  if (context.enPassantCoord) {
    const enPassantIndex = Coordinate.toIndex(context.enPassantCoord);
    if (
      PawnAttacks.fromCoordAndColor(coord, piece.color).isIndexSet(
        enPassantIndex
      )
    ) {
      moves.push({
        start: index,
        target: enPassantIndex,
        capture: true,
      });
    }
  }

  return moves;
};

const getSliderAttacks = (chessBitboard: ChessBitboard, piece: Piece) => {
  return chessBitboard[piece.color][piece.type]
    .getCoordinates()
    .reduce((attacks, coordinate) => {
      return attacks.union(
        getSlidingAttacks(chessBitboard, {
          piece,
          coord: coordinate,
        })
      );
    }, Bitboard());
};

const getAttackedSquares = (
  chessBitboard: ChessBitboard,
  color: Color
): Bitboard => {
  const pieceBitboards = chessBitboard[color];
  const knightAttacks = pieceBitboards[PieceType.Knight]
    .getCoordinates()
    .reduce((attacks, coordinate) => {
      return attacks.union(KnightAttacks.fromCoord(coordinate));
    }, Bitboard());
  const kingAttacks = KingAttacks.fromCoord(
    Coordinate.fromIndex(pieceBitboards[PieceType.King].scanForward())
  );
  const pawnAttacksWest = pieceBitboards[PieceType.Pawn]
    .leftShift(7)
    .exclude(aFileBb);
  const pawnAttacksEast = pieceBitboards[PieceType.Pawn]
    .leftShift(9)
    .exclude(hFileBb);
  const pawnAttacks = pawnAttacksWest.union(pawnAttacksEast);
  const sliders = [PieceType.Bishop, PieceType.Rook, PieceType.Queen];
  const sliderAttacks = sliders.reduce((attacks, pieceType) => {
    const slidingPieceAttacks = getSliderAttacks(
      chessBitboard,
      Piece.from(pieceType, color)
    );
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
    case PieceType.Pawn:
      return getMovesForPawn(context, piecePlacement);
    case PieceType.Knight:
      return getMovesForKnight(context, piecePlacement);
    case PieceType.King:
      return getMovesForKing(context, piecePlacement);
    case PieceType.Queen:
    case PieceType.Rook:
    case PieceType.Bishop:
      return getSlidingMoves(context, piecePlacement);
    default:
      throw new Error(`Invalid piece type: ${piecePlacement.piece.type}`);
  }
};

const getCastlingMoves = (context: MoveGeneratorContext): Move[] => {
  return context.castlingRights
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
        .intersection(context.moveMasks.attacks)
        .isEmpty();
      const isKingNotInCheck = context.bitboards[context.turn][PieceType.King]
        .setIndex(targetIndex)
        .intersection(context.moveMasks.attacks)
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
};

const getPinnedPieces = (
  chessBitboard: ChessBitboard,
  color: Color
): Bitboard => {
  const ownOccupancy = chessBitboard.getOwnOccupancy(color);
  const getNextBlockerInDirection = (
    blockers: Bitboard,
    direction: DirectionOffset
  ): Bitboard =>
    direction > 0 ? blockers.getLowestSetBit() : blockers.getHighestSetBit();

  const kingIndex = chessBitboard[color][PieceType.King].scanForward();
  if (kingIndex === -1) {
    return Bitboard();
  } else {
    const kingCoord = Coordinate.fromIndex(kingIndex);
    return DirectionOffset.neighbors.reduce((pinnedPieces, direction) => {
      const attacks = SliderAttacks.fromCoordAndDirection(kingCoord, direction);
      const blockers = attacks.intersection(chessBitboard.occupied);
      if (!blockers.isEmpty()) {
        const pinningPieces = SLIDERS_BY_DIRECTION[direction];
        const potentialPinners = pinningPieces.reduce(
          (potentialPinners, pieceType) => {
            return chessBitboard[Color.opposite(color)][pieceType].union(
              potentialPinners
            );
          },
          Bitboard()
        );
        const firstBlocker = getNextBlockerInDirection(blockers, direction);
        const secondBlocker = getNextBlockerInDirection(
          blockers.exclude(firstBlocker),
          direction
        );

        if (
          !ownOccupancy.intersection(firstBlocker).isEmpty() &&
          !potentialPinners.intersection(secondBlocker).isEmpty()
        ) {
          return pinnedPieces.union(firstBlocker);
        } else {
          return pinnedPieces;
        }
      } else {
        return pinnedPieces;
      }
    }, Bitboard());
  }
};

const generateMoves = (context: MoveGeneratorContext): Move[] => {
  const moves = context.piecePlacements
    .filter((piecePlacement) => context.isTurn(piecePlacement.piece.color))
    .flatMap((piecePlacement) => {
      return getMovesFromSquare(context, piecePlacement);
    });

  const castlingMoves = getCastlingMoves(context);

  moves.push(...castlingMoves);
  return moves;
};

export type MoveGenerator = {
  generateMoves: () => { moves: Move[] };
};

export const MoveGenerator = (gameState: GameState): MoveGenerator => {
  return {
    generateMoves: () => {
      const chessBitboards = ChessBitboard(gameState.pieces);
      const pinnedPieces = getPinnedPieces(chessBitboards, gameState.turn);
      const attackers = getAttackedSquares(
        chessBitboards,
        Color.opposite(gameState.turn)
      );
      return {
        moves: generateMoves(
          MoveGeneratorContext.from(gameState, chessBitboards, {
            attacks: attackers,
            doubleAttacks: Bitboard(),
            pinnedPieces: pinnedPieces,
          })
        ),
      };
    },
  };
};
