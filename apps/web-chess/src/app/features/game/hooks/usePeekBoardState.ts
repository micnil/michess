import { Chessboard } from '@michess/core-game';
import { useState } from 'react';
import { PeekActions } from '../model/PeekHandlers';

export type PeekBoard = {
  isPeeking: boolean;
  actions: PeekActions;
  board: Chessboard;
};

export const usePeekBoardState = (chessboard: Chessboard): PeekBoard => {
  const [peekedBoard, setPeekedBoard] = useState<Chessboard>(chessboard);
  const [previousChessboard, setPreviousChessboard] =
    useState<Chessboard>(chessboard);

  if (chessboard !== previousChessboard) {
    setPreviousChessboard(chessboard);
    setPeekedBoard(chessboard);
  }
  const isPeeking = peekedBoard.positionHash !== chessboard.positionHash;

  const peekForward = () => {
    setPeekedBoard(chessboard.unmakeMove(peekedBoard.movesRecord.length + 2));
  };

  const peekBack = () => {
    setPeekedBoard((prevBoard) => {
      return prevBoard.unmakeMove();
    });
  };

  const peekToMove = (moveNumber: number) => {
    setPeekedBoard(chessboard.unmakeMove(moveNumber));
  };
  return {
    isPeeking,
    actions: {
      forward: peekForward,
      back: peekBack,
      toMove: peekToMove,
    },
    board: peekedBoard,
  };
};
