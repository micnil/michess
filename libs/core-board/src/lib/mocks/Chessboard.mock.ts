import { Chessboard, ChessPosition, Move } from '@michess/core-board';

const standardInitial = () => {
  return Chessboard.fromPosition(ChessPosition.standardInitial());
};

const threefoldRepetition = () => {
  const moves: Move[] = [
    { from: 'g1', to: 'f3' },
    { from: 'g8', to: 'f6' },
    { from: 'f3', to: 'g1' },
    { from: 'f6', to: 'g8' },
    { from: 'g1', to: 'f3' },
    { from: 'g8', to: 'f6' },
    { from: 'f3', to: 'g1' },
    { from: 'f6', to: 'g8' },
  ];
  return Chessboard.fromPosition(ChessPosition.standardInitial(), moves);
};

export const ChessboardMock = {
  standardInitial,
  threefoldRepetition,
};
