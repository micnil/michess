import { BoardSquares } from '@michess/core-models';
import { B, b, empty, K, k, N, n, P, p, Q, q, r, R } from './SquareState.mock';

// prettier-ignore
export const emptyBoard: BoardSquares = [
  empty, empty, empty, empty, empty, empty, empty, empty,
  empty, empty, empty, empty, empty, empty, empty, empty,
  empty, empty, empty, empty, empty, empty, empty, empty,
  empty, empty, empty, empty, empty, empty, empty, empty,
  empty, empty, empty, empty, empty, empty, empty, empty,
  empty, empty, empty, empty, empty, empty, empty, empty,
  empty, empty, empty, empty, empty, empty, empty, empty,
  empty, empty, empty, empty, empty, empty, empty, empty,
];

// prettier-ignore
export const startingBoard: BoardSquares = [
  r, n, b, q, k, b, n, r,
  p, p, p, p, p, p, p, p,
  empty, empty, empty, empty, empty, empty, empty, empty,
  empty, empty, empty, empty, empty, empty, empty, empty,
  empty, empty, empty, empty, empty, empty, empty, empty,
  empty, empty, empty, empty, empty, empty, empty, empty,
  P, P, P, P, P, P, P, P,
  R, N, B, Q, K, B, N, R,
]
