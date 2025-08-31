import { DirectionOffset } from '../model/DirectionOffset';

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
  directionOffset: DirectionOffset
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

export const IndexBoardUtil = {
  withinBoard,
  chebyshevDistance,
  isNeighbors,
  unfoldDirection,
};
