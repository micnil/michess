import {
  CastlingAbility,
  CastlingRight,
  Color,
  Coordinate,
  GameState,
  ChessPosition,
  Piece,
  PiecePlacements,
  PieceType,
  Move,
  ChessGameResult,
  ChessGameAction,
} from '@michess/core-models';
import { Chessboard, ZobristHash } from '@michess/core-state';
import { MoveGenerator } from './MoveGenerator';
import { MoveGeneratorResult } from './model/MoveGeneratorResult';
import { ChessGameInternalState } from './model/ChessGameInternalState';
import { GameStateHistoryItem } from './model/GameStateHistoryItem';
import { assertDefined } from '@michess/common-utils';

export type ChessGame = {
  getState(): GameState;
  getMoves(): Move[];
  getAdditionalActions(): ChessGameAction[];
  makeAction(action: ChessGameAction): ChessGame;
  makeMove(move: Move): ChessGame;
  setResult(result: ChessGameResult): ChessGame;
};

const oneStepBackFromIndex = (index: number, color: Color): Coordinate => {
  return Coordinate.fromIndex(color === Color.White ? index + 8 : index - 8);
};

const rookStartingPositions: Record<CastlingAbility, Coordinate> = {
  [CastlingAbility.BlackKing]: 'h8',
  [CastlingAbility.BlackQueen]: 'a8',
  [CastlingAbility.WhiteKing]: 'h1',
  [CastlingAbility.WhiteQueen]: 'a1',
} as const;

const isThreeFoldRepetition = (
  positionHash: ZobristHash,
  gameState: GameStateHistoryItem[]
): boolean => {
  let occurrences = 1;
  for (let index = gameState.length - 1; index >= 0; index--) {
    const historyItem = gameState[index];
    if (historyItem.positionHash.equals(positionHash)) {
      occurrences++;
    }

    if (occurrences === 3) {
      break;
    }
  }

  return occurrences === 3;
};

const updatePiecePlacements = (
  move: Move,
  piecePlacements: PiecePlacements
): {
  newPiecePlacements: PiecePlacements;
  movedPiece: Piece;
  capturedPiece?: Piece;
  promotedPiece?: Piece;
} => {
  const newPiecePlacements: PiecePlacements = { ...piecePlacements };
  const fromCoord = Coordinate.fromIndex(move.start);
  const toCoord = Coordinate.fromIndex(move.target);
  const pieceToMove = piecePlacements[fromCoord];
  assertDefined(pieceToMove, `No piece at ${fromCoord} to move`);
  const turn = pieceToMove.color;

  const enPassantCaptureCoord = oneStepBackFromIndex(move.target, turn);
  const captureCoord = move.enPassant ? enPassantCaptureCoord : toCoord;
  const pieceToCapture = piecePlacements[captureCoord];

  delete newPiecePlacements[captureCoord];
  delete newPiecePlacements[fromCoord];
  newPiecePlacements[toCoord] = pieceToMove;

  const promotedPiece = move.promotion
    ? Piece.from(move.promotion, pieceToMove.color)
    : undefined;
  promotedPiece && (newPiecePlacements[toCoord] = promotedPiece);

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
    newPiecePlacements[newRookCoord] = newPiecePlacements[rookCoord];
    delete newPiecePlacements[rookCoord];
  }

  return {
    newPiecePlacements,
    movedPiece: pieceToMove,
    capturedPiece: pieceToCapture,
    promotedPiece,
  };
};

const updateCastlingRights = (
  move: Move,
  castlingAbility: Set<CastlingAbility>,
  pieceToMove: Piece,
  oldPiecePlacements: PiecePlacements,
  newPiecePlacements: PiecePlacements
): Set<CastlingAbility> => {
  const castlingAbilitySet = new Set(castlingAbility);
  const castlingRights = new Set(
    CastlingAbility.toCastlingRights(pieceToMove.color, [...castlingAbility])
  );
  const ownAbilities = CastlingAbility.fromCastlingRights(
    [...castlingRights],
    pieceToMove.color
  );

  if (move.castling) {
    ownAbilities.forEach((ability) => castlingAbilitySet.delete(ability));
  } else if (pieceToMove.type === PieceType.King && castlingRights.size > 0) {
    ownAbilities.forEach((ability) => castlingAbilitySet.delete(ability));
  } else {
    CastlingAbility.allValues.forEach((ability) => {
      const rookStartingPosition = rookStartingPositions[ability];
      const pieceOnRookStartingPositionOld =
        oldPiecePlacements[rookStartingPosition];
      const pieceOnRookStartingPositionNew =
        newPiecePlacements[rookStartingPosition];

      if (
        !Piece.isEqual(
          pieceOnRookStartingPositionOld,
          pieceOnRookStartingPositionNew
        )
      ) {
        castlingAbilitySet.delete(ability);
      }
    });
  }
  return castlingAbilitySet;
};

const makeMove = (
  gameState: ChessGameInternalState,
  move: Move
): {
  gameState: ChessGameInternalState;
} => {
  if (move.start == move.target) {
    return { gameState };
  }

  let newPositionHash = gameState.positionHash.copy();
  const chessboard = Chessboard(gameState);
  const boardState = chessboard.getState();

  const { newPiecePlacements, movedPiece, capturedPiece, promotedPiece } =
    updatePiecePlacements(move, boardState.pieces);

  const historyItem: GameStateHistoryItem = {
    move,
    positionHash: gameState.positionHash,
    ply: gameState.ply,
    castlingAbility: new Set(gameState.castlingAbility),
    capture: capturedPiece,
    enPassant: gameState.enPassant,
  };

  const newCastlingAbilities = updateCastlingRights(
    move,
    gameState.castlingAbility,
    movedPiece,
    boardState.pieces,
    newPiecePlacements
  );

  const captureOrPawnMove = move.capture || movedPiece.type === PieceType.Pawn;
  const ply = captureOrPawnMove ? 0 : gameState.ply + 1;

  const enPassant =
    movedPiece.type === PieceType.Pawn &&
    Math.abs(move.start - move.target) === 16
      ? oneStepBackFromIndex(move.target, gameState.turn)
      : undefined;

  // Update the hash of the position
  newPositionHash = movedPiece
    ? newPositionHash.movePiece(movedPiece, move.start, move.target)
    : newPositionHash;
  newPositionHash = capturedPiece
    ? newPositionHash.capturePiece(capturedPiece, move.target)
    : newPositionHash;
  newPositionHash = promotedPiece
    ? newPositionHash.promotePawn(movedPiece, promotedPiece, move.target)
    : newPositionHash;

  if (enPassant !== gameState.enPassant) {
    newPositionHash = newPositionHash.updateEnPassant(enPassant);
  }

  if (
    newCastlingAbilities.symmetricDifference(gameState.castlingAbility).size ==
    0
  ) {
    newPositionHash = newPositionHash.updateCastlingRights(
      gameState.castlingAbility,
      newCastlingAbilities
    );
  }
  newPositionHash = newPositionHash.toggleSideToMove();

  const gameHistory = [...gameState.gameHistory, historyItem];

  return {
    gameState: {
      ...gameState,
      additionalActions: isThreeFoldRepetition(
        newPositionHash,
        gameState.gameHistory
      )
        ? [ChessGameAction.claimDrawThreeFold()]
        : [],
      positionHash: newPositionHash,
      gameHistory,
      castlingAbility: newCastlingAbilities,
      turn: gameState.turn === Color.White ? Color.Black : Color.White,
      fullMoves:
        gameState.turn === Color.Black
          ? gameState.fullMoves + 1
          : gameState.fullMoves,
      ply,
      pieces: newPiecePlacements,
      enPassant,
    },
  };
};

const makeAction = (
  gameState: ChessGameInternalState,
  action: ChessGameAction
): {
  gameState: ChessGameInternalState;
} => {
  switch (action.type) {
    case 'CLAIM_DRAW':
      return {
        gameState: {
          ...gameState,
          result: ChessGameResult.fromChessGameAction(action),
          additionalActions: [],
        },
      };
    default:
      return {
        gameState,
      };
  }
};

const fromGameStateInternal = (
  gameStateInternal: ChessGameInternalState,
  moveGenResult: MoveGeneratorResult
): ChessGame => {
  const getState = (): GameState => {
    return ChessGameInternalState.toGameState(gameStateInternal);
  };

  return {
    makeAction: (action: ChessGameAction): ChessGame =>
      fromGameStateInternal(
        makeAction(gameStateInternal, action).gameState,
        moveGenResult
      ),
    getState,
    getMoves: () => moveGenResult.moves,
    makeMove: (move) => {
      const { gameState } = makeMove(gameStateInternal, move);
      const moveGenerator = MoveGenerator(gameState);
      return fromGameStateInternal(gameState, moveGenerator.generateMoves());
    },
    setResult: (result: ChessGameResult): ChessGame => {
      const newGameState = {
        ...gameStateInternal,
        additionalActions: [],
        result,
      };
      return fromGameStateInternal(newGameState, moveGenResult);
    },
    getAdditionalActions: () => gameStateInternal.additionalActions,
  };
};

const fromGameState = (gameState: GameState): ChessGame => {
  const moveGenerator = MoveGenerator(gameState.initialPosition);
  const initialChessGame = fromGameStateInternal(
    {
      ...gameState.initialPosition,
      result: undefined,
      additionalActions: [],
      positionHash: ZobristHash.fromChessPosition(gameState.initialPosition),
      gameHistory: [],
      initialPosition: gameState.initialPosition,
    },
    moveGenerator.generateMoves()
  );
  const chessGame = gameState.moveHistory.reduce((chessGame, move) => {
    return chessGame.makeMove(move);
  }, initialChessGame);

  return gameState.result ? chessGame.setResult(gameState.result) : chessGame;
};

const fromChessPosition = (chessPosition: ChessPosition): ChessGame => {
  return fromGameState(GameState.fromChessPosition(chessPosition));
};

export const ChessGame = {
  fromChessPosition,
  fromGameState,
};
