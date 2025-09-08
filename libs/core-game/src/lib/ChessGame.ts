import { Maybe } from '@michess/common-utils';
import {
  ChessPosition,
  Color,
  Move,
  Piece,
  PiecePlacements,
  PieceType,
} from '@michess/core-board';
import { Chessboard } from './Chessboard';
import { ChessGameActions } from './ChessGameActions';
import { ChessGameAction } from './model/ChessGameAction';
import { ChessGameInternalState } from './model/ChessGameInternalState';
import { ChessGameResult } from './model/ChessGameResult';
import { GameState } from './model/GameState';
import { GameStateHistoryItem } from './model/GameStateHistoryItem';
import { MoveOption } from './move/MoveOption';
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

const fromGameStateInternal = (
  gameStateInternal: ChessGameInternalState
): ChessGame => {
  const board = Chessboard.fromPosition(gameStateInternal);
  const getState = (): GameState => {
    return ChessGameInternalState.toGameState(gameStateInternal);
  };

  const playMove = (move: Move): ChessGame => {
    const newBoard = board.playMove(move);
    const newPosition = newBoard.position;
    const historyCopy = gameStateInternal.gameHistory.slice();
    historyCopy.push({
      move,
      positionHash: newBoard.positionHash,
      castlingAbility: newPosition.castlingAbility,
      pieces: newPosition.pieces,
      ply: newPosition.ply,
      enPassant: newPosition.enPassant,
    });
    return fromGameStateInternal({
      ...gameStateInternal,
      ...newPosition,
      gameHistory: historyCopy,
      additionalActions: evalAdditionalActions(
        gameStateInternal.additionalActions,
        {
          positionHash: newBoard.positionHash,
          gameHistory: historyCopy,
          ply: newPosition.ply + 1,
          piecePlacements: newPosition.pieces,
        }
      ),
    });
  };

  return {
    makeMove: (moveOption: MoveOption): ChessGame => {
      const move = MoveOption.toMove(moveOption);
      return playMove(move);
    },
    getPosition: () => gameStateInternal,
    makeAction: (action: ChessGameAction, playerColor: Color): ChessGame =>
      fromGameStateInternal(
        makeAction(gameStateInternal, action, playerColor).gameState
      ),
    getState,
    getMoves: () => board.moveOptions,
    play: playMove,
    unmakeMove: () => {
      const { gameState } = unmakeMove(gameStateInternal);
      return fromGameStateInternal(gameState);
    },
    setResult: (result: ChessGameResult): ChessGame => {
      const newGameState = {
        ...gameStateInternal,
        additionalActions: ChessGameActions.fromResult(result),
        result,
      };
      return fromGameStateInternal(newGameState);
    },
    getAdditionalActions: () => gameStateInternal.additionalActions.value(),
    perft: (depth: number) => board.perft(depth),
  };
};

const fromGameState = (gameState: GameState): ChessGame => {
  const initialChessGame = fromGameStateInternal({
    ...gameState.initialPosition,
    result: undefined,
    additionalActions: ChessGameActions.fromResult(undefined),
    positionHash: ZobristHash.fromChessPosition(gameState.initialPosition),
    gameHistory: [],

    initialPosition: gameState.initialPosition,
  });
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
