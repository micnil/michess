import { assertDefined, Maybe } from '@michess/common-utils';
import {
  CastlingAbility,
  CastlingRight,
  ChessPosition,
  Color,
  Coordinate,
  Move,
  Piece,
  PiecePlacements,
  PieceType,
} from '@michess/core-board';
import { ChessGameActions } from './ChessGameActions';
import { ChessGameAction } from './model/ChessGameAction';
import { ChessGameInternalState } from './model/ChessGameInternalState';
import { ChessGameResult } from './model/ChessGameResult';
import { GameState } from './model/GameState';
import { GameStateHistoryItem } from './model/GameStateHistoryItem';
import { MoveGeneratorResult } from './model/MoveGeneratorResult';
import { MoveOption } from './move/MoveOption';
import { MoveGenerator } from './MoveGenerator';
import { ZobristHash } from './ZobristHash';

export type ChessGame = {
  getState(): GameState;
  getMoves(): MoveOption[];
  getAdditionalActions(): ChessGameAction[];
  makeAction(action: ChessGameAction, playerColor: Color): ChessGame;
  makeMove(move: MoveOption): ChessGame;
  getPosition(): ChessPosition;
  unmakeMove(): ChessGame;
  play(moveRecord: Move): ChessGame;
  setResult(result: ChessGameResult): ChessGame;
  perft: (depth: number) => {
    nodes: number;
  };
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

const isFiftyMoveRule = (ply: number): boolean => {
  return ply >= 100; // 50 moves = 100 plies (half-moves)
};

const isInsufficientMaterial = (piecePlacements: PiecePlacements): boolean => {
  const pieceCount = piecePlacements.size;
  if (pieceCount <= 2) {
    return true;
  } else if (pieceCount === 3) {
    const isKingOrMinorPiece = (piece: Maybe<Piece>) =>
      piece?.type === PieceType.King ||
      piece?.type === PieceType.Bishop ||
      piece?.type === PieceType.Knight;
    return Array.from(piecePlacements.values()).every(isKingOrMinorPiece);
  } else {
    return false;
  }
};

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

const evalAdditionalActions = (
  previousActions: ChessGameActions,
  args: {
    positionHash: ZobristHash;
    gameHistory: GameStateHistoryItem[];
    ply: number;
    piecePlacements: PiecePlacements;
  }
): ChessGameActions => {
  let additionalActions = previousActions;
  additionalActions = isThreeFoldRepetition(args.positionHash, args.gameHistory)
    ? additionalActions.addAction(ChessGameAction.claimDrawThreeFold())
    : additionalActions;
  additionalActions = isFiftyMoveRule(args.ply)
    ? additionalActions.addAction(ChessGameAction.claimDrawFiftyMoveRule())
    : additionalActions;
  additionalActions = isInsufficientMaterial(args.piecePlacements)
    ? additionalActions.addAction(
        ChessGameAction.claimDrawInsufficientMaterial()
      )
    : additionalActions;
  return additionalActions;
};

const makeMove = (
  gameState: ChessGameInternalState,
  move: MoveOption
): {
  gameState: ChessGameInternalState;
} => {
  if (move.start == move.target) {
    return { gameState };
  }

  const { newPiecePlacements, movedPiece, capturedPiece, promotedPiece } =
    updatePiecePlacements(move, gameState.pieces);

  const historyItem: GameStateHistoryItem = {
    move,
    positionHash: gameState.positionHash,
    ply: gameState.ply,
    castlingAbility: gameState.castlingAbility,
    enPassant: gameState.enPassant,
    pieces: gameState.pieces,
  };

  const newCastlingAbilities = updateCastlingRights(
    move,
    gameState.castlingAbility,
    movedPiece,
    capturedPiece,
    gameState.pieces,
    newPiecePlacements
  );

  const captureOrPawnMove = move.capture || movedPiece.type === PieceType.Pawn;
  const ply = captureOrPawnMove ? 0 : gameState.ply + 1;

  const enPassant =
    movedPiece.type === PieceType.Pawn &&
    Math.abs(move.start - move.target) === 16
      ? oneStepBackFromIndex(move.target, gameState.turn)
      : undefined;

  const newPositionHash = gameState.positionHash
    .movePiece(movedPiece, move.start, move.target)
    .capturePiece(capturedPiece, move.target)
    .promotePawn(movedPiece, promotedPiece, move.target)
    .updateEnPassant(gameState.enPassant, enPassant)
    .updateCastlingRights(gameState.castlingAbility, newCastlingAbilities)
    .toggleSideToMove();

  const gameHistory = gameState.gameHistory.slice();
  gameHistory.push(historyItem);

  const additionalActions = evalAdditionalActions(gameState.additionalActions, {
    positionHash: newPositionHash,
    gameHistory,
    ply,
    piecePlacements: newPiecePlacements,
  });

  // Pre-calculate values to avoid repeated computations
  const newTurn = gameState.turn === Color.White ? Color.Black : Color.White;
  const newFullMoves =
    gameState.turn === Color.Black
      ? gameState.fullMoves + 1
      : gameState.fullMoves;

  return {
    gameState: {
      initialPosition: gameState.initialPosition,
      result: gameState.result,
      additionalActions,
      positionHash: newPositionHash,
      gameHistory,
      castlingAbility: newCastlingAbilities,
      turn: newTurn,
      fullMoves: newFullMoves,
      ply,
      pieces: newPiecePlacements,
      enPassant,
    },
  };
};

const unmakeMove = (
  gameState: ChessGameInternalState
): {
  gameState: ChessGameInternalState;
} => {
  if (gameState.gameHistory.length === 0) {
    return { gameState };
  }

  const lastHistoryItem =
    gameState.gameHistory[gameState.gameHistory.length - 1];
  const piecePlacements = lastHistoryItem.pieces;
  const gameHistory = gameState.gameHistory.slice(0, -1);

  let additionalActions = ChessGameActions.fromResult(undefined);
  additionalActions = isThreeFoldRepetition(
    lastHistoryItem.positionHash,
    gameHistory
  )
    ? additionalActions.addAction(ChessGameAction.claimDrawThreeFold())
    : additionalActions;
  additionalActions = isFiftyMoveRule(lastHistoryItem.ply)
    ? additionalActions.addAction(ChessGameAction.claimDrawFiftyMoveRule())
    : additionalActions;
  additionalActions = isInsufficientMaterial(piecePlacements)
    ? additionalActions.addAction(
        ChessGameAction.claimDrawInsufficientMaterial()
      )
    : additionalActions;

  return {
    gameState: {
      ...gameState,
      additionalActions,
      positionHash: lastHistoryItem.positionHash,
      gameHistory,
      castlingAbility: lastHistoryItem.castlingAbility,
      turn: gameState.turn === Color.White ? Color.Black : Color.White,
      fullMoves:
        gameState.turn === Color.White
          ? gameState.fullMoves - 1
          : gameState.fullMoves,
      ply: lastHistoryItem.ply,
      pieces: lastHistoryItem.pieces,
      enPassant: lastHistoryItem.enPassant,
    },
  };
};

const makeAction = (
  gameState: ChessGameInternalState,
  action: ChessGameAction,
  playerColor: Color
): {
  gameState: ChessGameInternalState;
} => {
  if (gameState.additionalActions.isActionAvailable(action, playerColor)) {
    const newActions = gameState.additionalActions.useAction(
      action,
      playerColor
    );
    switch (action.type) {
      case 'CLAIM_DRAW':
      case 'ACCEPT_DRAW':
      case 'RESIGN':
        return {
          gameState: {
            ...gameState,
            result: ChessGameResult.fromChessGameAction(action, gameState.turn),
            additionalActions: newActions,
          },
        };
      case 'OFFER_DRAW':
      case 'REJECT_DRAW':
        return {
          gameState: {
            ...gameState,
            additionalActions: newActions,
          },
        };
      default:
        return {
          gameState,
        };
    }
  } else {
    throw new Error(
      `Action ${action.type} is not available for turn ${gameState.turn}`
    );
  }
};

const perft = (
  gameStateInternal: ChessGameInternalState,
  depth: number
): { nodes: number } => {
  if (depth === 0) {
    return { nodes: 1 };
  }

  const moveGenerator = MoveGenerator(gameStateInternal);
  const moveGenResult = moveGenerator.generateMoves();
  let nodes = 0;

  for (const move of moveGenResult.moves) {
    const { gameState } = makeMove(gameStateInternal, move);
    const result = perft(gameState, depth - 1);
    nodes += result.nodes;
  }

  return { nodes };
};

const fromGameStateInternal = (
  gameStateInternal: ChessGameInternalState,
  moveGenResult: MoveGeneratorResult
): ChessGame => {
  const getState = (): GameState => {
    return ChessGameInternalState.toGameState(gameStateInternal);
  };
  const makeMoveAndUpdate = (move: MoveOption): ChessGame => {
    const { gameState } = makeMove(gameStateInternal, move);
    const moveGenerator = MoveGenerator(gameState);
    return fromGameStateInternal(gameState, moveGenerator.generateMoves());
  };

  return {
    getPosition: () => gameStateInternal,
    makeAction: (action: ChessGameAction, playerColor: Color): ChessGame =>
      fromGameStateInternal(
        makeAction(gameStateInternal, action, playerColor).gameState,
        moveGenResult
      ),
    getState,
    getMoves: () => moveGenResult.moves,
    makeMove: makeMoveAndUpdate,
    play: (moveRecord: Move): ChessGame => {
      const move = moveGenResult.moves.find((m) =>
        Move.isEqual(MoveOption.toMove(m), moveRecord)
      );
      if (move) {
        return makeMoveAndUpdate(move);
      } else {
        throw new Error(`Invalid move: ${Move.toUci(moveRecord)}`);
      }
    },
    unmakeMove: () => {
      const { gameState } = unmakeMove(gameStateInternal);
      const moveGenerator = MoveGenerator(gameState);
      return fromGameStateInternal(gameState, moveGenerator.generateMoves());
    },
    setResult: (result: ChessGameResult): ChessGame => {
      const newGameState = {
        ...gameStateInternal,
        additionalActions: ChessGameActions.fromResult(result),
        result,
      };
      return fromGameStateInternal(newGameState, moveGenResult);
    },
    getAdditionalActions: () => gameStateInternal.additionalActions.value(),
    perft: (depth: number) => perft(gameStateInternal, depth),
  };
};

const fromGameState = (gameState: GameState): ChessGame => {
  const moveGenerator = MoveGenerator(gameState.initialPosition);
  const initialChessGame = fromGameStateInternal(
    {
      ...gameState.initialPosition,
      result: undefined,
      additionalActions: ChessGameActions.fromResult(undefined),
      positionHash: ZobristHash.fromChessPosition(gameState.initialPosition),
      gameHistory: [],

      initialPosition: gameState.initialPosition,
    },
    moveGenerator.generateMoves()
  );
  const chessGame = gameState.moveHistory.reduce((chessGame, move) => {
    return chessGame.play(move);
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
