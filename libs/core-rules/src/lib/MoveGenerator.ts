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
  const moves = attacks.exclude(ownOccupancy);
  const legalMoves = applyPinRestrictions(context, moves, coord).intersection(
    context.moveMasks.checkEvasion
  );
  return movesFromBitboard(context, { piece, coord }, legalMoves);
};

const getMovesForKing = (
  context: MoveGeneratorContext,
  { coord, piece }: PiecePlacement
): Move[] => {
  const ownOccupancy = context.bitboards.getOwnOccupancy(piece.color);
  const kingAttacks = KingAttacks.fromCoord(coord);
  const legalKingMoves = kingAttacks
    .exclude(ownOccupancy)
    .exclude(context.moveMasks.kingXRayAttacks);

  return movesFromBitboard(context, { coord, piece }, legalKingMoves);
};

const getPinMoveRestrictions = (
  context: MoveGeneratorContext,
  coordinate: Coordinate
): Bitboard => {
  const kingIndex =
    context.bitboards[context.turn][PieceType.King].scanForward();
  const pinDirection = DirectionOffset.fromCoordinates(
    kingIndex,
    Coordinate.toIndex(coordinate)
  );
  const pinMoveRestrictions = SliderAttacks.fromCoordAndDirection(
    Coordinate.fromIndex(kingIndex),
    pinDirection
  );
  return pinMoveRestrictions;
};

const applyPinRestrictions = (
  context: MoveGeneratorContext,
  moves: Bitboard,
  coordinate: Coordinate
): Bitboard => {
  const isPinned = context.moveMasks.pinnedPieces.isCoordSet(coordinate);
  if (isPinned) {
    const pinMoveRestrictions = getPinMoveRestrictions(context, coordinate);
    return moves.intersection(pinMoveRestrictions);
  } else {
    return moves;
  }
};

const getMovesForKnight = (
  context: MoveGeneratorContext,
  { coord, piece }: PiecePlacement
): Move[] => {
  const isPinned = context.moveMasks.pinnedPieces.isCoordSet(coord);
  // Knight can never move when pinned
  if (isPinned) {
    return [];
  } else {
    const ownOccupancy = context.bitboards.getOwnOccupancy(piece.color);

    const knightMoves = KnightAttacks.fromCoord(coord)
      .exclude(ownOccupancy)
      .intersection(context.moveMasks.checkEvasion);

    return movesFromBitboard(context, { piece, coord }, knightMoves);
  }
};

const getRank = (index: number) => 8 - Math.floor(index / 8);

const getMovesForPawn = (
  context: MoveGeneratorContext,
  { coord, piece }: PiecePlacement
): Move[] => {
  const index = Coordinate.toIndex(coord);
  const isPinned = context.moveMasks.pinnedPieces.isCoordSet(coord);
  const pinMoveRestrictions = isPinned
    ? getPinMoveRestrictions(context, coord)
    : // Bitboard with all bits set to 1
      Bitboard(0xffffffffffffffffn);

  const directionOffset =
    piece.color === Color.White ? DirectionOffset.N : DirectionOffset.S;
  const startRank = piece.color === Color.White ? 6 : 1;
  const promotionRank = piece.color === Color.White ? 8 : 1;

  const oneStepIndex = index + directionOffset;
  const isOneStepLegal =
    IndexBoardUtil.withinBoard(oneStepIndex) &&
    !context.bitboards.occupied.isIndexSet(oneStepIndex) &&
    pinMoveRestrictions.isIndexSet(oneStepIndex) &&
    context.moveMasks.checkEvasion.isIndexSet(oneStepIndex);

  const twoStepIndex = oneStepIndex + directionOffset;
  const isTwoStepLegal =
    IndexBoardUtil.withinBoard(twoStepIndex) &&
    !context.bitboards.occupied.isIndexSet(twoStepIndex) &&
    pinMoveRestrictions.isIndexSet(twoStepIndex) &&
    context.moveMasks.checkEvasion.isIndexSet(twoStepIndex);

  const opponentOccupied = context.bitboards.getOpponentOccupancy(piece.color);
  const pawnAttacks = PawnAttacks.fromCoordAndColor(coord, piece.color)
    .intersection(pinMoveRestrictions)
    .intersection(context.moveMasks.checkEvasion)
    .intersection(opponentOccupied);
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
  if (isOneStepLegal) {
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

  if (isStartPosition && isOneStepLegal && isTwoStepLegal) {
    moves.push({
      start: index,
      target: twoStepIndex,
      capture: false,
    });
  }

  if (context.enPassantCoord) {
    const pawnAttacks = PawnAttacks.fromCoordAndColor(
      coord,
      piece.color
    ).intersection(pinMoveRestrictions);

    const enPassantIndex = Coordinate.toIndex(context.enPassantCoord);
    const checkEvasionMask = context.moveMasks.checkEvasion;
    if (
      pawnAttacks.isIndexSet(enPassantIndex) &&
      // Special case for en passant.
      // we can evade check either by blocking the path of a
      // sliding piece (moving to ep-square), or by capturing
      // the attacker (pawn we take with ep).
      (checkEvasionMask.isIndexSet(enPassantIndex) ||
        checkEvasionMask.isIndexSet(enPassantIndex - directionOffset))
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

const getSliderAttacks = (
  chessBitboard: ChessBitboard,
  piece: Piece
): Bitboard => {
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

const getKingAttackers = (
  chessBitboard: ChessBitboard,
  color: Color
): {
  kingAttackers: Bitboard;
  checkBlockPaths: Bitboard;
} => {
  const kingIndex = chessBitboard[color][PieceType.King].scanForward();

  if (kingIndex === -1) {
    return { kingAttackers: Bitboard(), checkBlockPaths: Bitboard() };
  } else {
    const kingCoord = Coordinate.fromIndex(kingIndex);

    const opponentPieces = chessBitboard.getOpponentPieceBoards(color);

    const knightAttackers = KnightAttacks.fromCoord(kingCoord).intersection(
      opponentPieces[PieceType.Knight]
    );
    const pawnAttackers = PawnAttacks.fromCoordAndColor(
      kingCoord,
      color
    ).intersection(opponentPieces[PieceType.Pawn]);

    const opponentDiagonalSliders = opponentPieces[PieceType.Bishop].union(
      opponentPieces[PieceType.Queen]
    );
    const opponentOrthogonalSliders = opponentPieces[PieceType.Rook].union(
      opponentPieces[PieceType.Queen]
    );

    const diagonalSliderAttackers = getSlidingAttacks(chessBitboard, {
      coord: kingCoord,
      piece: Piece.from(PieceType.Bishop, color),
    }).intersection(opponentDiagonalSliders);
    const orthogonalSliderAttackers = getSlidingAttacks(chessBitboard, {
      coord: kingCoord,
      piece: Piece.from(PieceType.Rook, color),
    }).intersection(opponentOrthogonalSliders);
    const sliderAttackers = diagonalSliderAttackers.union(
      orthogonalSliderAttackers
    );
    const kingAttackers = knightAttackers
      .union(pawnAttackers)
      .union(sliderAttackers);

    let checkBlockPaths = Bitboard();
    if (kingAttackers.countBits() === 1) {
      if (!kingAttackers.intersection(sliderAttackers).isEmpty()) {
        checkBlockPaths = Bitboard().between(
          kingCoord,
          Coordinate.fromIndex(kingAttackers.scanForward())
        );
      }
    }
    return { kingAttackers, checkBlockPaths };
  }
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
  const pawnWestAttackOffset =
    color === Color.White ? DirectionOffset.NW : DirectionOffset.SW;
  const pawnEastAttackOffset =
    color === Color.White ? DirectionOffset.NE : DirectionOffset.SE;

  const pawnAttacksWest = pieceBitboards[PieceType.Pawn]
    .leftShift(pawnWestAttackOffset)
    .exclude(aFileBb);
  const pawnAttacksEast = pieceBitboards[PieceType.Pawn]
    .leftShift(pawnEastAttackOffset)
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

const getKingXRayAttacks = (
  chessBitboard: ChessBitboard,
  color: Color
): Bitboard => {
  const chessBitboardWithoutKing = chessBitboard.removePiece(
    Piece.from(PieceType.King, color)
  );
  return getAttackedSquares(chessBitboardWithoutKing, Color.opposite(color));
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
  const numKingAttackers = context.moveMasks.kingAttackers.countBits();
  const isDoubleCheck = numKingAttackers >= 2;
  const piecePlacements = isDoubleCheck
    ? context.piecePlacements.filter(
        (piecePlacement) => piecePlacement.piece.type === PieceType.King
      )
    : context.piecePlacements;

  const moves = piecePlacements
    .filter((piecePlacement) => context.isTurn(piecePlacement.piece.color))
    .flatMap((piecePlacement) => {
      return getMovesFromSquare(context, piecePlacement);
    });

  const castlingMoves = getCastlingMoves(context);

  moves.push(...castlingMoves);
  return moves;
};

export type MoveGenerator = {
  generateMoves: () => {
    moves: Move[];
    isCheckmate: boolean;
    isCheck: boolean;
  };
};

export const MoveGenerator = (gameState: GameState): MoveGenerator => {
  return {
    generateMoves: () => {
      const chessBitboards = ChessBitboard(gameState.pieces);
      const { kingAttackers, checkBlockPaths } = getKingAttackers(
        chessBitboards,
        gameState.turn
      );
      const pinnedPieces = getPinnedPieces(chessBitboards, gameState.turn);
      const attackers = getAttackedSquares(
        chessBitboards,
        Color.opposite(gameState.turn)
      );
      const numKingAttackers = kingAttackers.countBits();
      const isCheck = numKingAttackers > 0;

      const checkEvasionMask =
        numKingAttackers === 0
          ? Bitboard(0xffffffffffffffffn)
          : kingAttackers.union(checkBlockPaths);

      const kingXRayAttacks = isCheck
        ? getKingXRayAttacks(chessBitboards, gameState.turn)
        : attackers;

      const moves = generateMoves(
        MoveGeneratorContext.from(gameState, chessBitboards, {
          attacks: attackers,
          pinnedPieces,
          kingXRayAttacks,
          kingAttackers,
          checkEvasion: checkEvasionMask,
        })
      );
      return {
        moves,
        isCheckmate: isCheck && moves.length === 0,
        isStaleMate: !isCheck && moves.length === 0,
        isCheck,
      };
    },
  };
};
