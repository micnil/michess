import { TestCases } from './TestCases';

export const castlingTestCases: TestCases = {
  description: 'Test cases involving castling.',
  testCases: [
    {
      start: {
        fen: '8/4k3/8/8/8/8/r6r/R3K2R w KQ - 0 1',
        description: 'White can castle normally in either direction.',
      },
      expected: [
        {
          move: 'Rb1',
          fen: '8/4k3/8/8/8/8/r6r/1R2K2R b K - 1 1',
        },
        {
          move: 'Rc1',
          fen: '8/4k3/8/8/8/8/r6r/2R1K2R b K - 1 1',
        },
        {
          move: 'Rd1',
          fen: '8/4k3/8/8/8/8/r6r/3RK2R b K - 1 1',
        },
        {
          move: 'Rxa2',
          fen: '8/4k3/8/8/8/8/R6r/4K2R b K - 0 1',
        },
        {
          move: 'Kd1',
          fen: '8/4k3/8/8/8/8/r6r/R2K3R b - - 1 1',
        },
        {
          move: 'Kf1',
          fen: '8/4k3/8/8/8/8/r6r/R4K1R b - - 1 1',
        },
        {
          move: 'O-O-O',
          fen: '8/4k3/8/8/8/8/r6r/2KR3R b - - 1 1',
        },
        {
          move: 'O-O',
          fen: '8/4k3/8/8/8/8/r6r/R4RK1 b - - 1 1',
        },
        {
          move: 'Rg1',
          fen: '8/4k3/8/8/8/8/r6r/R3K1R1 b Q - 1 1',
        },
        {
          move: 'Rf1',
          fen: '8/4k3/8/8/8/8/r6r/R3KR2 b Q - 1 1',
        },
        {
          move: 'Rxh2',
          fen: '8/4k3/8/8/8/8/r6R/R3K3 b Q - 0 1',
        },
      ],
    },
    {
      description: 'Transpose of 8/4k3/8/8/8/8/r6r/R3K2R w KQ - 0 1',
      start: {
        fen: 'r3k2r/R6R/8/8/8/8/4K3/8 b kq - 0 1',
        description: 'Black can castle normally in either direction.',
      },
      expected: [
        {
          move: 'Rxa7',
          fen: '4k2r/r6R/8/8/8/8/4K3/8 w k - 0 2',
        },
        {
          move: 'Rb8',
          fen: '1r2k2r/R6R/8/8/8/8/4K3/8 w k - 1 2',
        },
        {
          move: 'Rc8',
          fen: '2r1k2r/R6R/8/8/8/8/4K3/8 w k - 1 2',
        },
        {
          move: 'Rd8',
          fen: '3rk2r/R6R/8/8/8/8/4K3/8 w k - 1 2',
        },
        {
          move: 'Kd8',
          fen: 'r2k3r/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Kf8',
          fen: 'r4k1r/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'O-O-O',
          fen: '2kr3r/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'O-O',
          fen: 'r4rk1/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Rxh7',
          fen: 'r3k3/R6r/8/8/8/8/4K3/8 w q - 0 2',
        },
        {
          move: 'Rg8',
          fen: 'r3k1r1/R6R/8/8/8/8/4K3/8 w q - 1 2',
        },
        {
          move: 'Rf8',
          fen: 'r3kr2/R6R/8/8/8/8/4K3/8 w q - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '8/4k3/8/8/8/8/r6r/R3K2R w Q - 0 1',
        description: 'White can only castle queenside.',
      },
      expected: [
        {
          move: 'Rb1',
          fen: '8/4k3/8/8/8/8/r6r/1R2K2R b - - 1 1',
        },
        {
          move: 'Rc1',
          fen: '8/4k3/8/8/8/8/r6r/2R1K2R b - - 1 1',
        },
        {
          move: 'Rd1',
          fen: '8/4k3/8/8/8/8/r6r/3RK2R b - - 1 1',
        },
        {
          move: 'Rxa2',
          fen: '8/4k3/8/8/8/8/R6r/4K2R b - - 0 1',
        },
        {
          move: 'Kd1',
          fen: '8/4k3/8/8/8/8/r6r/R2K3R b - - 1 1',
        },
        {
          move: 'Kf1',
          fen: '8/4k3/8/8/8/8/r6r/R4K1R b - - 1 1',
        },
        {
          move: 'O-O-O',
          fen: '8/4k3/8/8/8/8/r6r/2KR3R b - - 1 1',
        },
        {
          move: 'Rg1',
          fen: '8/4k3/8/8/8/8/r6r/R3K1R1 b Q - 1 1',
        },
        {
          move: 'Rf1',
          fen: '8/4k3/8/8/8/8/r6r/R3KR2 b Q - 1 1',
        },
        {
          move: 'Rxh2',
          fen: '8/4k3/8/8/8/8/r6R/R3K3 b Q - 0 1',
        },
      ],
    },
    {
      description: 'Transpose of 8/4k3/8/8/8/8/r6r/R3K2R w Q - 0 1',
      start: {
        fen: 'r3k2r/R6R/8/8/8/8/4K3/8 b q - 0 1',
        description: 'Black can only castle queenside.',
      },
      expected: [
        {
          move: 'Rxa7',
          fen: '4k2r/r6R/8/8/8/8/4K3/8 w - - 0 2',
        },
        {
          move: 'Rb8',
          fen: '1r2k2r/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Rc8',
          fen: '2r1k2r/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Rd8',
          fen: '3rk2r/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Kd8',
          fen: 'r2k3r/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Kf8',
          fen: 'r4k1r/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'O-O-O',
          fen: '2kr3r/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Rxh7',
          fen: 'r3k3/R6r/8/8/8/8/4K3/8 w q - 0 2',
        },
        {
          move: 'Rg8',
          fen: 'r3k1r1/R6R/8/8/8/8/4K3/8 w q - 1 2',
        },
        {
          move: 'Rf8',
          fen: 'r3kr2/R6R/8/8/8/8/4K3/8 w q - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '8/4k3/8/8/8/8/r6r/R3K2R w K - 0 1',
        description: 'White can only castle kingside.',
      },
      expected: [
        {
          move: 'Rb1',
          fen: '8/4k3/8/8/8/8/r6r/1R2K2R b K - 1 1',
        },
        {
          move: 'Rc1',
          fen: '8/4k3/8/8/8/8/r6r/2R1K2R b K - 1 1',
        },
        {
          move: 'Rd1',
          fen: '8/4k3/8/8/8/8/r6r/3RK2R b K - 1 1',
        },
        {
          move: 'Rxa2',
          fen: '8/4k3/8/8/8/8/R6r/4K2R b K - 0 1',
        },
        {
          move: 'Kd1',
          fen: '8/4k3/8/8/8/8/r6r/R2K3R b - - 1 1',
        },
        {
          move: 'Kf1',
          fen: '8/4k3/8/8/8/8/r6r/R4K1R b - - 1 1',
        },
        {
          move: 'O-O',
          fen: '8/4k3/8/8/8/8/r6r/R4RK1 b - - 1 1',
        },
        {
          move: 'Rg1',
          fen: '8/4k3/8/8/8/8/r6r/R3K1R1 b - - 1 1',
        },
        {
          move: 'Rf1',
          fen: '8/4k3/8/8/8/8/r6r/R3KR2 b - - 1 1',
        },
        {
          move: 'Rxh2',
          fen: '8/4k3/8/8/8/8/r6R/R3K3 b - - 0 1',
        },
      ],
    },
    {
      description: 'Transpose of 8/4k3/8/8/8/8/r6r/R3K2R w K - 0 1',
      start: {
        fen: 'r3k2r/R6R/8/8/8/8/4K3/8 b k - 0 1',
        description: 'Black can only castle kingside.',
      },
      expected: [
        {
          move: 'Rxa7',
          fen: '4k2r/r6R/8/8/8/8/4K3/8 w k - 0 2',
        },
        {
          move: 'Rb8',
          fen: '1r2k2r/R6R/8/8/8/8/4K3/8 w k - 1 2',
        },
        {
          move: 'Rc8',
          fen: '2r1k2r/R6R/8/8/8/8/4K3/8 w k - 1 2',
        },
        {
          move: 'Rd8',
          fen: '3rk2r/R6R/8/8/8/8/4K3/8 w k - 1 2',
        },
        {
          move: 'Kd8',
          fen: 'r2k3r/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Kf8',
          fen: 'r4k1r/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'O-O',
          fen: 'r4rk1/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Rxh7',
          fen: 'r3k3/R6r/8/8/8/8/4K3/8 w - - 0 2',
        },
        {
          move: 'Rg8',
          fen: 'r3k1r1/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Rf8',
          fen: 'r3kr2/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '8/4k3/8/8/8/8/r6r/R3K2R w - - 0 1',
        description:
          "White can't castle despite pieces being in the right position; presumably they've already moved the king or rooks.",
      },
      expected: [
        {
          move: 'Rb1',
          fen: '8/4k3/8/8/8/8/r6r/1R2K2R b - - 1 1',
        },
        {
          move: 'Rc1',
          fen: '8/4k3/8/8/8/8/r6r/2R1K2R b - - 1 1',
        },
        {
          move: 'Rd1',
          fen: '8/4k3/8/8/8/8/r6r/3RK2R b - - 1 1',
        },
        {
          move: 'Rxa2',
          fen: '8/4k3/8/8/8/8/R6r/4K2R b - - 0 1',
        },
        {
          move: 'Kd1',
          fen: '8/4k3/8/8/8/8/r6r/R2K3R b - - 1 1',
        },
        {
          move: 'Kf1',
          fen: '8/4k3/8/8/8/8/r6r/R4K1R b - - 1 1',
        },
        {
          move: 'Rg1',
          fen: '8/4k3/8/8/8/8/r6r/R3K1R1 b - - 1 1',
        },
        {
          move: 'Rf1',
          fen: '8/4k3/8/8/8/8/r6r/R3KR2 b - - 1 1',
        },
        {
          move: 'Rxh2',
          fen: '8/4k3/8/8/8/8/r6R/R3K3 b - - 0 1',
        },
      ],
    },
    {
      description: 'Transpose of 8/4k3/8/8/8/8/r6r/R3K2R w - - 0 1',
      start: {
        fen: 'r3k2r/R6R/8/8/8/8/4K3/8 b - - 0 1',
        description:
          "Black can't castle despite pieces being in the right position; presumably they've already moved the king or rooks.",
      },
      expected: [
        {
          move: 'Rxa7',
          fen: '4k2r/r6R/8/8/8/8/4K3/8 w - - 0 2',
        },
        {
          move: 'Rb8',
          fen: '1r2k2r/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Rc8',
          fen: '2r1k2r/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Rd8',
          fen: '3rk2r/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Kd8',
          fen: 'r2k3r/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Kf8',
          fen: 'r4k1r/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Rxh7',
          fen: 'r3k3/R6r/8/8/8/8/4K3/8 w - - 0 2',
        },
        {
          move: 'Rg8',
          fen: 'r3k1r1/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Rf8',
          fen: 'r3kr2/R6R/8/8/8/8/4K3/8 w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '1r6/4k3/8/8/8/8/r7/R3K3 w Q - 0 1',
        description: 'White can castle queenside despite b1 being attacked.',
      },
      expected: [
        {
          move: 'Rb1',
          fen: '1r6/4k3/8/8/8/8/r7/1R2K3 b - - 1 1',
        },
        {
          move: 'Rc1',
          fen: '1r6/4k3/8/8/8/8/r7/2R1K3 b - - 1 1',
        },
        {
          move: 'Rd1',
          fen: '1r6/4k3/8/8/8/8/r7/3RK3 b - - 1 1',
        },
        {
          move: 'Rxa2',
          fen: '1r6/4k3/8/8/8/8/R7/4K3 b - - 0 1',
        },
        {
          move: 'Kd1',
          fen: '1r6/4k3/8/8/8/8/r7/R2K4 b - - 1 1',
        },
        {
          move: 'Kf1',
          fen: '1r6/4k3/8/8/8/8/r7/R4K2 b - - 1 1',
        },
        {
          move: 'O-O-O',
          fen: '1r6/4k3/8/8/8/8/r7/2KR4 b - - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of 1r6/4k3/8/8/8/8/r7/R3K3 w Q - 0 1',
      start: {
        fen: 'r3k3/R7/8/8/8/8/4K3/1R6 b q - 0 1',
        description: 'Black can castle queenside despite b1 being attacked.',
      },
      expected: [
        {
          move: 'Rxa7',
          fen: '4k3/r7/8/8/8/8/4K3/1R6 w - - 0 2',
        },
        {
          move: 'Rb8',
          fen: '1r2k3/R7/8/8/8/8/4K3/1R6 w - - 1 2',
        },
        {
          move: 'Rc8',
          fen: '2r1k3/R7/8/8/8/8/4K3/1R6 w - - 1 2',
        },
        {
          move: 'Rd8',
          fen: '3rk3/R7/8/8/8/8/4K3/1R6 w - - 1 2',
        },
        {
          move: 'Kd8',
          fen: 'r2k4/R7/8/8/8/8/4K3/1R6 w - - 1 2',
        },
        {
          move: 'Kf8',
          fen: 'r4k2/R7/8/8/8/8/4K3/1R6 w - - 1 2',
        },
        {
          move: 'O-O-O',
          fen: '2kr4/R7/8/8/8/8/4K3/1R6 w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '2r5/4k3/8/8/8/8/r7/R3K3 w Q - 0 1',
        description:
          "White can't castle queenside because it would into check from a rook.",
      },
      expected: [
        {
          move: 'Rb1',
          fen: '2r5/4k3/8/8/8/8/r7/1R2K3 b - - 1 1',
        },
        {
          move: 'Rc1',
          fen: '2r5/4k3/8/8/8/8/r7/2R1K3 b - - 1 1',
        },
        {
          move: 'Rd1',
          fen: '2r5/4k3/8/8/8/8/r7/3RK3 b - - 1 1',
        },
        {
          move: 'Rxa2',
          fen: '2r5/4k3/8/8/8/8/R7/4K3 b - - 0 1',
        },
        {
          move: 'Kd1',
          fen: '2r5/4k3/8/8/8/8/r7/R2K4 b - - 1 1',
        },
        {
          move: 'Kf1',
          fen: '2r5/4k3/8/8/8/8/r7/R4K2 b - - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of 2r5/4k3/8/8/8/8/r7/R3K3 w Q - 0 1',
      start: {
        fen: 'r3k3/R7/8/8/8/8/4K3/2R5 b q - 0 1',
        description:
          "Black can't castle queenside because it would into check from a rook.",
      },
      expected: [
        {
          move: 'Rxa7',
          fen: '4k3/r7/8/8/8/8/4K3/2R5 w - - 0 2',
        },
        {
          move: 'Rb8',
          fen: '1r2k3/R7/8/8/8/8/4K3/2R5 w - - 1 2',
        },
        {
          move: 'Rc8',
          fen: '2r1k3/R7/8/8/8/8/4K3/2R5 w - - 1 2',
        },
        {
          move: 'Rd8',
          fen: '3rk3/R7/8/8/8/8/4K3/2R5 w - - 1 2',
        },
        {
          move: 'Kd8',
          fen: 'r2k4/R7/8/8/8/8/4K3/2R5 w - - 1 2',
        },
        {
          move: 'Kf8',
          fen: 'r4k2/R7/8/8/8/8/4K3/2R5 w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '8/4k3/8/8/8/b7/r7/R3K3 w Q - 0 1',
        description:
          "White can't castle queenside because it would be into check from a bishop.",
      },
      expected: [
        {
          move: 'Rb1',
          fen: '8/4k3/8/8/8/b7/r7/1R2K3 b - - 1 1',
        },
        {
          move: 'Rc1',
          fen: '8/4k3/8/8/8/b7/r7/2R1K3 b - - 1 1',
        },
        {
          move: 'Rd1',
          fen: '8/4k3/8/8/8/b7/r7/3RK3 b - - 1 1',
        },
        {
          move: 'Rxa2',
          fen: '8/4k3/8/8/8/b7/R7/4K3 b - - 0 1',
        },
        {
          move: 'Kd1',
          fen: '8/4k3/8/8/8/b7/r7/R2K4 b - - 1 1',
        },
        {
          move: 'Kf1',
          fen: '8/4k3/8/8/8/b7/r7/R4K2 b - - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of 8/4k3/8/8/8/b7/r7/R3K3 w Q - 0 1',
      start: {
        fen: 'r3k3/R7/B7/8/8/8/4K3/8 b q - 0 1',
        description:
          "Black can't castle queenside because it would be into check from a bishop.",
      },
      expected: [
        {
          move: 'Rxa7',
          fen: '4k3/r7/B7/8/8/8/4K3/8 w - - 0 2',
        },
        {
          move: 'Rb8',
          fen: '1r2k3/R7/B7/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Rc8',
          fen: '2r1k3/R7/B7/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Rd8',
          fen: '3rk3/R7/B7/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Kd8',
          fen: 'r2k4/R7/B7/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Kf8',
          fen: 'r4k2/R7/B7/8/8/8/4K3/8 w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '8/4k3/8/8/8/8/n7/R3K3 w Q - 0 1',
        description:
          "White can't castle queenside because it would be into check from a knight.",
      },
      expected: [
        {
          move: 'Rb1',
          fen: '8/4k3/8/8/8/8/n7/1R2K3 b - - 1 1',
        },
        {
          move: 'Rc1',
          fen: '8/4k3/8/8/8/8/n7/2R1K3 b - - 1 1',
        },
        {
          move: 'Rd1',
          fen: '8/4k3/8/8/8/8/n7/3RK3 b - - 1 1',
        },
        {
          move: 'Rxa2',
          fen: '8/4k3/8/8/8/8/R7/4K3 b - - 0 1',
        },
        {
          move: 'Kd1',
          fen: '8/4k3/8/8/8/8/n7/R2K4 b - - 1 1',
        },
        {
          move: 'Kf1',
          fen: '8/4k3/8/8/8/8/n7/R4K2 b - - 1 1',
        },
        {
          move: 'Kd2',
          fen: '8/4k3/8/8/8/8/n2K4/R7 b - - 1 1',
        },
        {
          move: 'Ke2',
          fen: '8/4k3/8/8/8/8/n3K3/R7 b - - 1 1',
        },
        {
          move: 'Kf2',
          fen: '8/4k3/8/8/8/8/n4K2/R7 b - - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of 8/4k3/8/8/8/8/n7/R3K3 w Q - 0 1',
      start: {
        fen: 'r3k3/N7/8/8/8/8/4K3/8 b q - 0 1',
        description:
          "Black can't castle queenside because it would be into check from a knight.",
      },
      expected: [
        {
          move: 'Rxa7',
          fen: '4k3/r7/8/8/8/8/4K3/8 w - - 0 2',
        },
        {
          move: 'Rb8',
          fen: '1r2k3/N7/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Rc8',
          fen: '2r1k3/N7/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Rd8',
          fen: '3rk3/N7/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Kd7',
          fen: 'r7/N2k4/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Ke7',
          fen: 'r7/N3k3/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Kf7',
          fen: 'r7/N4k2/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Kd8',
          fen: 'r2k4/N7/8/8/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Kf8',
          fen: 'r4k2/N7/8/8/8/8/4K3/8 w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '8/4k3/8/8/5q2/8/r7/R3K3 w Q - 0 1',
        description:
          "White can't castle queenside because it would be into check from a queen.",
      },
      expected: [
        {
          move: 'Rb1',
          fen: '8/4k3/8/8/5q2/8/r7/1R2K3 b - - 1 1',
        },
        {
          move: 'Rc1',
          fen: '8/4k3/8/8/5q2/8/r7/2R1K3 b - - 1 1',
        },
        {
          move: 'Rd1',
          fen: '8/4k3/8/8/5q2/8/r7/3RK3 b - - 1 1',
        },
        {
          move: 'Rxa2',
          fen: '8/4k3/8/8/5q2/8/R7/4K3 b - - 0 1',
        },
        {
          move: 'Kd1',
          fen: '8/4k3/8/8/5q2/8/r7/R2K4 b - - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of 8/4k3/8/8/5q2/8/r7/R3K3 w Q - 0 1',
      start: {
        fen: 'r3k3/R7/8/5Q2/8/8/4K3/8 b q - 0 1',
        description:
          "Black can't castle queenside because it would be into check from a queen.",
      },
      expected: [
        {
          move: 'Rxa7',
          fen: '4k3/r7/8/5Q2/8/8/4K3/8 w - - 0 2',
        },
        {
          move: 'Rb8',
          fen: '1r2k3/R7/8/5Q2/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Rc8',
          fen: '2r1k3/R7/8/5Q2/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Rd8',
          fen: '3rk3/R7/8/5Q2/8/8/4K3/8 w - - 1 2',
        },
        {
          move: 'Kd8',
          fen: 'r2k4/R7/8/5Q2/8/8/4K3/8 w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '8/8/8/8/8/8/rk6/R3K3 w Q - 0 1',
        description:
          "White can't castle queenside because it would be into check from black king.",
      },
      expected: [
        {
          move: 'Rb1+',
          fen: '8/8/8/8/8/8/rk6/1R2K3 b - - 1 1',
        },
        {
          move: 'Rc1',
          fen: '8/8/8/8/8/8/rk6/2R1K3 b - - 1 1',
        },
        {
          move: 'Rd1',
          fen: '8/8/8/8/8/8/rk6/3RK3 b - - 1 1',
        },
        {
          move: 'Rxa2+',
          fen: '8/8/8/8/8/8/Rk6/4K3 b - - 0 1',
        },
        {
          move: 'Kd1',
          fen: '8/8/8/8/8/8/rk6/R2K4 b - - 1 1',
        },
        {
          move: 'Kf1',
          fen: '8/8/8/8/8/8/rk6/R4K2 b - - 1 1',
        },
        {
          move: 'Kd2',
          fen: '8/8/8/8/8/8/rk1K4/R7 b - - 1 1',
        },
        {
          move: 'Ke2',
          fen: '8/8/8/8/8/8/rk2K3/R7 b - - 1 1',
        },
        {
          move: 'Kf2',
          fen: '8/8/8/8/8/8/rk3K2/R7 b - - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of 8/8/8/8/8/8/rk6/R3K3 w Q - 0 1',
      start: {
        fen: 'r3k3/RK6/8/8/8/8/8/8 b q - 0 1',
        description:
          "Black can't castle queenside because it would be into check from white king.",
      },
      expected: [
        {
          move: 'Rxa7+',
          fen: '4k3/rK6/8/8/8/8/8/8 w - - 0 2',
        },
        {
          move: 'Rb8+',
          fen: '1r2k3/RK6/8/8/8/8/8/8 w - - 1 2',
        },
        {
          move: 'Rc8',
          fen: '2r1k3/RK6/8/8/8/8/8/8 w - - 1 2',
        },
        {
          move: 'Rd8',
          fen: '3rk3/RK6/8/8/8/8/8/8 w - - 1 2',
        },
        {
          move: 'Kd7',
          fen: 'r7/RK1k4/8/8/8/8/8/8 w - - 1 2',
        },
        {
          move: 'Ke7',
          fen: 'r7/RK2k3/8/8/8/8/8/8 w - - 1 2',
        },
        {
          move: 'Kf7',
          fen: 'r7/RK3k2/8/8/8/8/8/8 w - - 1 2',
        },
        {
          move: 'Kd8',
          fen: 'r2k4/RK6/8/8/8/8/8/8 w - - 1 2',
        },
        {
          move: 'Kf8',
          fen: 'r4k2/RK6/8/8/8/8/8/8 w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '8/8/8/8/3k4/8/rp6/R3K3 w Q - 0 1',
        description:
          "White can't castle queenside because it would be into check from a pawn.",
      },
      expected: [
        {
          move: 'Rb1',
          fen: '8/8/8/8/3k4/8/rp6/1R2K3 b - - 1 1',
        },
        {
          move: 'Rc1',
          fen: '8/8/8/8/3k4/8/rp6/2R1K3 b - - 1 1',
        },
        {
          move: 'Rd1+',
          fen: '8/8/8/8/3k4/8/rp6/3RK3 b - - 1 1',
        },
        {
          move: 'Rxa2',
          fen: '8/8/8/8/3k4/8/Rp6/4K3 b - - 0 1',
        },
        {
          move: 'Kd1',
          fen: '8/8/8/8/3k4/8/rp6/R2K4 b - - 1 1',
        },
        {
          move: 'Kf1',
          fen: '8/8/8/8/3k4/8/rp6/R4K2 b - - 1 1',
        },
        {
          move: 'Kd2',
          fen: '8/8/8/8/3k4/8/rp1K4/R7 b - - 1 1',
        },
        {
          move: 'Ke2',
          fen: '8/8/8/8/3k4/8/rp2K3/R7 b - - 1 1',
        },
        {
          move: 'Kf2',
          fen: '8/8/8/8/3k4/8/rp3K2/R7 b - - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of 8/8/8/8/3k4/8/rp6/R3K3 w Q - 0 1',
      start: {
        fen: 'r3k3/RP6/8/3K4/8/8/8/8 b q - 0 1',
        description:
          "Black can't castle queenside because it would be into check from a pawn.",
      },
      expected: [
        {
          move: 'Rxa7',
          fen: '4k3/rP6/8/3K4/8/8/8/8 w - - 0 2',
        },
        {
          move: 'Rb8',
          fen: '1r2k3/RP6/8/3K4/8/8/8/8 w - - 1 2',
        },
        {
          move: 'Rc8',
          fen: '2r1k3/RP6/8/3K4/8/8/8/8 w - - 1 2',
        },
        {
          move: 'Rd8+',
          fen: '3rk3/RP6/8/3K4/8/8/8/8 w - - 1 2',
        },
        {
          move: 'Kd7',
          fen: 'r7/RP1k4/8/3K4/8/8/8/8 w - - 1 2',
        },
        {
          move: 'Ke7',
          fen: 'r7/RP2k3/8/3K4/8/8/8/8 w - - 1 2',
        },
        {
          move: 'Kf7',
          fen: 'r7/RP3k2/8/3K4/8/8/8/8 w - - 1 2',
        },
        {
          move: 'Kd8',
          fen: 'r2k4/RP6/8/3K4/8/8/8/8 w - - 1 2',
        },
        {
          move: 'Kf8',
          fen: 'r4k2/RP6/8/3K4/8/8/8/8 w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '8/8/8/4r3/3k4/8/8/R3K2R w Q - 0 1',
        description:
          "White can't castle either direction because they are in check from a rook.",
      },
      expected: [
        {
          move: 'Kd1',
          fen: '8/8/8/4r3/3k4/8/8/R2K3R b - - 1 1',
        },
        {
          move: 'Kf1',
          fen: '8/8/8/4r3/3k4/8/8/R4K1R b - - 1 1',
        },
        {
          move: 'Kd2',
          fen: '8/8/8/4r3/3k4/8/3K4/R6R b - - 1 1',
        },
        {
          move: 'Kf2',
          fen: '8/8/8/4r3/3k4/8/5K2/R6R b - - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of 8/8/8/4r3/3k4/8/8/R3K2R w Q - 0 1',
      start: {
        fen: 'r3k2r/8/8/3K4/4R3/8/8/8 b q - 0 1',
        description:
          "Black can't castle either direction because they are in check from a rook.",
      },
      expected: [
        {
          move: 'Kd7',
          fen: 'r6r/3k4/8/3K4/4R3/8/8/8 w - - 1 2',
        },
        {
          move: 'Kf7',
          fen: 'r6r/5k2/8/3K4/4R3/8/8/8 w - - 1 2',
        },
        {
          move: 'Kd8',
          fen: 'r2k3r/8/8/3K4/4R3/8/8/8 w - - 1 2',
        },
        {
          move: 'Kf8',
          fen: 'r4k1r/8/8/3K4/4R3/8/8/8 w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '8/8/4k3/8/8/8/4p3/R3K2R w KQ - 0 1',
        description:
          "White can't castle because it would be through squares attacked by a pawn.",
      },
      expected: [
        {
          move: 'Rb1',
          fen: '8/8/4k3/8/8/8/4p3/1R2K2R b K - 1 1',
        },
        {
          move: 'Rc1',
          fen: '8/8/4k3/8/8/8/4p3/2R1K2R b K - 1 1',
        },
        {
          move: 'Rd1',
          fen: '8/8/4k3/8/8/8/4p3/3RK2R b K - 1 1',
        },
        {
          move: 'Ra2',
          fen: '8/8/4k3/8/8/8/R3p3/4K2R b K - 1 1',
        },
        {
          move: 'Ra3',
          fen: '8/8/4k3/8/8/R7/4p3/4K2R b K - 1 1',
        },
        {
          move: 'Ra4',
          fen: '8/8/4k3/8/R7/8/4p3/4K2R b K - 1 1',
        },
        {
          move: 'Ra5',
          fen: '8/8/4k3/R7/8/8/4p3/4K2R b K - 1 1',
        },
        {
          move: 'Ra6+',
          fen: '8/8/R3k3/8/8/8/4p3/4K2R b K - 1 1',
        },
        {
          move: 'Ra7',
          fen: '8/R7/4k3/8/8/8/4p3/4K2R b K - 1 1',
        },
        {
          move: 'Ra8',
          fen: 'R7/8/4k3/8/8/8/4p3/4K2R b K - 1 1',
        },
        {
          move: 'Kd2',
          fen: '8/8/4k3/8/8/8/3Kp3/R6R b - - 1 1',
        },
        {
          move: 'Kxe2',
          fen: '8/8/4k3/8/8/8/4K3/R6R b - - 0 1',
        },
        {
          move: 'Kf2',
          fen: '8/8/4k3/8/8/8/4pK2/R6R b - - 1 1',
        },
        {
          move: 'Rg1',
          fen: '8/8/4k3/8/8/8/4p3/R3K1R1 b Q - 1 1',
        },
        {
          move: 'Rf1',
          fen: '8/8/4k3/8/8/8/4p3/R3KR2 b Q - 1 1',
        },
        {
          move: 'Rh2',
          fen: '8/8/4k3/8/8/8/4p2R/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh3',
          fen: '8/8/4k3/8/8/7R/4p3/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh4',
          fen: '8/8/4k3/8/7R/8/4p3/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh5',
          fen: '8/8/4k3/7R/8/8/4p3/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh6+',
          fen: '8/8/4k2R/8/8/8/4p3/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh7',
          fen: '8/7R/4k3/8/8/8/4p3/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh8',
          fen: '7R/8/4k3/8/8/8/4p3/R3K3 b Q - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of 8/8/4k3/8/8/8/4p3/R3K2R w KQ - 0 1',
      start: {
        fen: 'r3k2r/4P3/8/8/8/4K3/8/8 b kq - 0 1',
        description:
          "Black can't castle because it would be through squares attacked by a pawn.",
      },
      expected: [
        {
          move: 'Ra7',
          fen: '4k2r/r3P3/8/8/8/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Ra6',
          fen: '4k2r/4P3/r7/8/8/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Ra5',
          fen: '4k2r/4P3/8/r7/8/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Ra4',
          fen: '4k2r/4P3/8/8/r7/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Ra3+',
          fen: '4k2r/4P3/8/8/8/r3K3/8/8 w k - 1 2',
        },
        {
          move: 'Ra2',
          fen: '4k2r/4P3/8/8/8/4K3/r7/8 w k - 1 2',
        },
        {
          move: 'Ra1',
          fen: '4k2r/4P3/8/8/8/4K3/8/r7 w k - 1 2',
        },
        {
          move: 'Rb8',
          fen: '1r2k2r/4P3/8/8/8/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Rc8',
          fen: '2r1k2r/4P3/8/8/8/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Rd8',
          fen: '3rk2r/4P3/8/8/8/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Kd7',
          fen: 'r6r/3kP3/8/8/8/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Kxe7',
          fen: 'r6r/4k3/8/8/8/4K3/8/8 w - - 0 2',
        },
        {
          move: 'Kf7',
          fen: 'r6r/4Pk2/8/8/8/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Rh7',
          fen: 'r3k3/4P2r/8/8/8/4K3/8/8 w q - 1 2',
        },
        {
          move: 'Rh6',
          fen: 'r3k3/4P3/7r/8/8/4K3/8/8 w q - 1 2',
        },
        {
          move: 'Rh5',
          fen: 'r3k3/4P3/8/7r/8/4K3/8/8 w q - 1 2',
        },
        {
          move: 'Rh4',
          fen: 'r3k3/4P3/8/8/7r/4K3/8/8 w q - 1 2',
        },
        {
          move: 'Rh3+',
          fen: 'r3k3/4P3/8/8/8/4K2r/8/8 w q - 1 2',
        },
        {
          move: 'Rh2',
          fen: 'r3k3/4P3/8/8/8/4K3/7r/8 w q - 1 2',
        },
        {
          move: 'Rh1',
          fen: 'r3k3/4P3/8/8/8/4K3/8/7r w q - 1 2',
        },
        {
          move: 'Rg8',
          fen: 'r3k1r1/4P3/8/8/8/4K3/8/8 w q - 1 2',
        },
        {
          move: 'Rf8',
          fen: 'r3kr2/4P3/8/8/8/4K3/8/8 w q - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '8/8/4k3/3bb3/8/8/8/R3K2R w KQ - 0 1',
        description: "Attacks on the rooks shouldn't prevent castling.",
      },
      expected: [
        {
          move: 'Rb1',
          fen: '8/8/4k3/3bb3/8/8/8/1R2K2R b K - 1 1',
        },
        {
          move: 'Rc1',
          fen: '8/8/4k3/3bb3/8/8/8/2R1K2R b K - 1 1',
        },
        {
          move: 'Rd1',
          fen: '8/8/4k3/3bb3/8/8/8/3RK2R b K - 1 1',
        },
        {
          move: 'Ra2',
          fen: '8/8/4k3/3bb3/8/8/R7/4K2R b K - 1 1',
        },
        {
          move: 'Ra3',
          fen: '8/8/4k3/3bb3/8/R7/8/4K2R b K - 1 1',
        },
        {
          move: 'Ra4',
          fen: '8/8/4k3/3bb3/R7/8/8/4K2R b K - 1 1',
        },
        {
          move: 'Ra5',
          fen: '8/8/4k3/R2bb3/8/8/8/4K2R b K - 1 1',
        },
        {
          move: 'Ra6+',
          fen: '8/8/R3k3/3bb3/8/8/8/4K2R b K - 1 1',
        },
        {
          move: 'Ra7',
          fen: '8/R7/4k3/3bb3/8/8/8/4K2R b K - 1 1',
        },
        {
          move: 'Ra8',
          fen: 'R7/8/4k3/3bb3/8/8/8/4K2R b K - 1 1',
        },
        {
          move: 'Kd1',
          fen: '8/8/4k3/3bb3/8/8/8/R2K3R b - - 1 1',
        },
        {
          move: 'Kf1',
          fen: '8/8/4k3/3bb3/8/8/8/R4K1R b - - 1 1',
        },
        {
          move: 'Kd2',
          fen: '8/8/4k3/3bb3/8/8/3K4/R6R b - - 1 1',
        },
        {
          move: 'Ke2',
          fen: '8/8/4k3/3bb3/8/8/4K3/R6R b - - 1 1',
        },
        {
          move: 'Kf2',
          fen: '8/8/4k3/3bb3/8/8/5K2/R6R b - - 1 1',
        },
        {
          move: 'O-O-O',
          fen: '8/8/4k3/3bb3/8/8/8/2KR3R b - - 1 1',
        },
        {
          move: 'O-O',
          fen: '8/8/4k3/3bb3/8/8/8/R4RK1 b - - 1 1',
        },
        {
          move: 'Rg1',
          fen: '8/8/4k3/3bb3/8/8/8/R3K1R1 b Q - 1 1',
        },
        {
          move: 'Rf1',
          fen: '8/8/4k3/3bb3/8/8/8/R3KR2 b Q - 1 1',
        },
        {
          move: 'Rh2',
          fen: '8/8/4k3/3bb3/8/8/7R/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh3',
          fen: '8/8/4k3/3bb3/8/7R/8/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh4',
          fen: '8/8/4k3/3bb3/7R/8/8/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh5',
          fen: '8/8/4k3/3bb2R/8/8/8/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh6+',
          fen: '8/8/4k2R/3bb3/8/8/8/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh7',
          fen: '8/7R/4k3/3bb3/8/8/8/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh8',
          fen: '7R/8/4k3/3bb3/8/8/8/R3K3 b Q - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of 8/8/4k3/3bb3/8/8/8/R3K2R w KQ - 0 1',
      start: {
        fen: 'r3k2r/8/8/8/3BB3/4K3/8/8 b kq - 0 1',
        description: "Attacks on the rooks shouldn't prevent castling.",
      },
      expected: [
        {
          move: 'Ra7',
          fen: '4k2r/r7/8/8/3BB3/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Ra6',
          fen: '4k2r/8/r7/8/3BB3/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Ra5',
          fen: '4k2r/8/8/r7/3BB3/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Ra4',
          fen: '4k2r/8/8/8/r2BB3/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Ra3+',
          fen: '4k2r/8/8/8/3BB3/r3K3/8/8 w k - 1 2',
        },
        {
          move: 'Ra2',
          fen: '4k2r/8/8/8/3BB3/4K3/r7/8 w k - 1 2',
        },
        {
          move: 'Ra1',
          fen: '4k2r/8/8/8/3BB3/4K3/8/r7 w k - 1 2',
        },
        {
          move: 'Rb8',
          fen: '1r2k2r/8/8/8/3BB3/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Rc8',
          fen: '2r1k2r/8/8/8/3BB3/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Rd8',
          fen: '3rk2r/8/8/8/3BB3/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Kd7',
          fen: 'r6r/3k4/8/8/3BB3/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Ke7',
          fen: 'r6r/4k3/8/8/3BB3/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Kf7',
          fen: 'r6r/5k2/8/8/3BB3/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Kd8',
          fen: 'r2k3r/8/8/8/3BB3/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Kf8',
          fen: 'r4k1r/8/8/8/3BB3/4K3/8/8 w - - 1 2',
        },
        {
          move: 'O-O-O',
          fen: '2kr3r/8/8/8/3BB3/4K3/8/8 w - - 1 2',
        },
        {
          move: 'O-O',
          fen: 'r4rk1/8/8/8/3BB3/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Rh7',
          fen: 'r3k3/7r/8/8/3BB3/4K3/8/8 w q - 1 2',
        },
        {
          move: 'Rh6',
          fen: 'r3k3/8/7r/8/3BB3/4K3/8/8 w q - 1 2',
        },
        {
          move: 'Rh5',
          fen: 'r3k3/8/8/7r/3BB3/4K3/8/8 w q - 1 2',
        },
        {
          move: 'Rh4',
          fen: 'r3k3/8/8/8/3BB2r/4K3/8/8 w q - 1 2',
        },
        {
          move: 'Rh3+',
          fen: 'r3k3/8/8/8/3BB3/4K2r/8/8 w q - 1 2',
        },
        {
          move: 'Rh2',
          fen: 'r3k3/8/8/8/3BB3/4K3/7r/8 w q - 1 2',
        },
        {
          move: 'Rh1',
          fen: 'r3k3/8/8/8/3BB3/4K3/8/7r w q - 1 2',
        },
        {
          move: 'Rg8',
          fen: 'r3k1r1/8/8/8/3BB3/4K3/8/8 w q - 1 2',
        },
        {
          move: 'Rf8',
          fen: 'r3kr2/8/8/8/3BB3/4K3/8/8 w q - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '8/8/4k3/8/8/8/2p3p1/R3K2R w KQ - 0 1',
        description:
          "White can't castle through check from differently placed pawns.",
      },
      expected: [
        {
          move: 'Rb1',
          fen: '8/8/4k3/8/8/8/2p3p1/1R2K2R b K - 1 1',
        },
        {
          move: 'Rc1',
          fen: '8/8/4k3/8/8/8/2p3p1/2R1K2R b K - 1 1',
        },
        {
          move: 'Rd1',
          fen: '8/8/4k3/8/8/8/2p3p1/3RK2R b K - 1 1',
        },
        {
          move: 'Ra2',
          fen: '8/8/4k3/8/8/8/R1p3p1/4K2R b K - 1 1',
        },
        {
          move: 'Ra3',
          fen: '8/8/4k3/8/8/R7/2p3p1/4K2R b K - 1 1',
        },
        {
          move: 'Ra4',
          fen: '8/8/4k3/8/R7/8/2p3p1/4K2R b K - 1 1',
        },
        {
          move: 'Ra5',
          fen: '8/8/4k3/R7/8/8/2p3p1/4K2R b K - 1 1',
        },
        {
          move: 'Ra6+',
          fen: '8/8/R3k3/8/8/8/2p3p1/4K2R b K - 1 1',
        },
        {
          move: 'Ra7',
          fen: '8/R7/4k3/8/8/8/2p3p1/4K2R b K - 1 1',
        },
        {
          move: 'Ra8',
          fen: 'R7/8/4k3/8/8/8/2p3p1/4K2R b K - 1 1',
        },
        {
          move: 'Kd2',
          fen: '8/8/4k3/8/8/8/2pK2p1/R6R b - - 1 1',
        },
        {
          move: 'Ke2',
          fen: '8/8/4k3/8/8/8/2p1K1p1/R6R b - - 1 1',
        },
        {
          move: 'Kf2',
          fen: '8/8/4k3/8/8/8/2p2Kp1/R6R b - - 1 1',
        },
        {
          move: 'Rg1',
          fen: '8/8/4k3/8/8/8/2p3p1/R3K1R1 b Q - 1 1',
        },
        {
          move: 'Rf1',
          fen: '8/8/4k3/8/8/8/2p3p1/R3KR2 b Q - 1 1',
        },
        {
          move: 'Rh2',
          fen: '8/8/4k3/8/8/8/2p3pR/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh3',
          fen: '8/8/4k3/8/8/7R/2p3p1/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh4',
          fen: '8/8/4k3/8/7R/8/2p3p1/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh5',
          fen: '8/8/4k3/7R/8/8/2p3p1/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh6+',
          fen: '8/8/4k2R/8/8/8/2p3p1/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh7',
          fen: '8/7R/4k3/8/8/8/2p3p1/R3K3 b Q - 1 1',
        },
        {
          move: 'Rh8',
          fen: '7R/8/4k3/8/8/8/2p3p1/R3K3 b Q - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of 8/8/4k3/8/8/8/2p3p1/R3K2R w KQ - 0 1',
      start: {
        fen: 'r3k2r/2P3P1/8/8/8/4K3/8/8 b kq - 0 1',
        description:
          "Black can't castle through check from differently placed pawns.",
      },
      expected: [
        {
          move: 'Ra7',
          fen: '4k2r/r1P3P1/8/8/8/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Ra6',
          fen: '4k2r/2P3P1/r7/8/8/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Ra5',
          fen: '4k2r/2P3P1/8/r7/8/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Ra4',
          fen: '4k2r/2P3P1/8/8/r7/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Ra3+',
          fen: '4k2r/2P3P1/8/8/8/r3K3/8/8 w k - 1 2',
        },
        {
          move: 'Ra2',
          fen: '4k2r/2P3P1/8/8/8/4K3/r7/8 w k - 1 2',
        },
        {
          move: 'Ra1',
          fen: '4k2r/2P3P1/8/8/8/4K3/8/r7 w k - 1 2',
        },
        {
          move: 'Rb8',
          fen: '1r2k2r/2P3P1/8/8/8/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Rc8',
          fen: '2r1k2r/2P3P1/8/8/8/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Rd8',
          fen: '3rk2r/2P3P1/8/8/8/4K3/8/8 w k - 1 2',
        },
        {
          move: 'Kd7',
          fen: 'r6r/2Pk2P1/8/8/8/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Ke7',
          fen: 'r6r/2P1k1P1/8/8/8/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Kf7',
          fen: 'r6r/2P2kP1/8/8/8/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Rh7',
          fen: 'r3k3/2P3Pr/8/8/8/4K3/8/8 w q - 1 2',
        },
        {
          move: 'Rh6',
          fen: 'r3k3/2P3P1/7r/8/8/4K3/8/8 w q - 1 2',
        },
        {
          move: 'Rh5',
          fen: 'r3k3/2P3P1/8/7r/8/4K3/8/8 w q - 1 2',
        },
        {
          move: 'Rh4',
          fen: 'r3k3/2P3P1/8/8/7r/4K3/8/8 w q - 1 2',
        },
        {
          move: 'Rh3+',
          fen: 'r3k3/2P3P1/8/8/8/4K2r/8/8 w q - 1 2',
        },
        {
          move: 'Rh2',
          fen: 'r3k3/2P3P1/8/8/8/4K3/7r/8 w q - 1 2',
        },
        {
          move: 'Rh1',
          fen: 'r3k3/2P3P1/8/8/8/4K3/8/7r w q - 1 2',
        },
        {
          move: 'Rg8',
          fen: 'r3k1r1/2P3P1/8/8/8/4K3/8/8 w q - 1 2',
        },
        {
          move: 'Rf8',
          fen: 'r3kr2/2P3P1/8/8/8/4K3/8/8 w q - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '8/8/4k3/8/8/pr6/8/R3K3 w Q - 0 1',
        description: "An attack on b1 shouldn't prevent queenside castle.",
      },
      expected: [
        {
          move: 'Rb1',
          fen: '8/8/4k3/8/8/pr6/8/1R2K3 b - - 1 1',
        },
        {
          move: 'Rc1',
          fen: '8/8/4k3/8/8/pr6/8/2R1K3 b - - 1 1',
        },
        {
          move: 'Rd1',
          fen: '8/8/4k3/8/8/pr6/8/3RK3 b - - 1 1',
        },
        {
          move: 'Ra2',
          fen: '8/8/4k3/8/8/pr6/R7/4K3 b - - 1 1',
        },
        {
          move: 'Rxa3',
          fen: '8/8/4k3/8/8/Rr6/8/4K3 b - - 0 1',
        },
        {
          move: 'Kd1',
          fen: '8/8/4k3/8/8/pr6/8/R2K4 b - - 1 1',
        },
        {
          move: 'Kf1',
          fen: '8/8/4k3/8/8/pr6/8/R4K2 b - - 1 1',
        },
        {
          move: 'Kd2',
          fen: '8/8/4k3/8/8/pr6/3K4/R7 b - - 1 1',
        },
        {
          move: 'Ke2',
          fen: '8/8/4k3/8/8/pr6/4K3/R7 b - - 1 1',
        },
        {
          move: 'Kf2',
          fen: '8/8/4k3/8/8/pr6/5K2/R7 b - - 1 1',
        },
        {
          move: 'O-O-O',
          fen: '8/8/4k3/8/8/pr6/8/2KR4 b - - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of 8/8/4k3/8/8/pr6/8/R3K3 w Q - 0 1',
      start: {
        fen: 'r3k3/8/PR6/8/8/4K3/8/8 b q - 0 1',
        description: "An attack on b1 shouldn't prevent queenside castle.",
      },
      expected: [
        {
          move: 'Ra7',
          fen: '4k3/r7/PR6/8/8/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Rxa6',
          fen: '4k3/8/rR6/8/8/4K3/8/8 w - - 0 2',
        },
        {
          move: 'Rb8',
          fen: '1r2k3/8/PR6/8/8/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Rc8',
          fen: '2r1k3/8/PR6/8/8/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Rd8',
          fen: '3rk3/8/PR6/8/8/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Kd7',
          fen: 'r7/3k4/PR6/8/8/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Ke7',
          fen: 'r7/4k3/PR6/8/8/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Kf7',
          fen: 'r7/5k2/PR6/8/8/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Kd8',
          fen: 'r2k4/8/PR6/8/8/4K3/8/8 w - - 1 2',
        },
        {
          move: 'Kf8',
          fen: 'r4k2/8/PR6/8/8/4K3/8/8 w - - 1 2',
        },
        {
          move: 'O-O-O',
          fen: '2kr4/8/PR6/8/8/4K3/8/8 w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: 'r3k2r/R3P2R/8/8/8/8/8/4K3 b kq - 0 1',
        description:
          "Black can't castle either direction because of attack from pawn.",
      },
      expected: [
        {
          move: 'Rxa7',
          fen: '4k2r/r3P2R/8/8/8/8/8/4K3 w k - 0 2',
        },
        {
          move: 'Rb8',
          fen: '1r2k2r/R3P2R/8/8/8/8/8/4K3 w k - 1 2',
        },
        {
          move: 'Rc8',
          fen: '2r1k2r/R3P2R/8/8/8/8/8/4K3 w k - 1 2',
        },
        {
          move: 'Rd8',
          fen: '3rk2r/R3P2R/8/8/8/8/8/4K3 w k - 1 2',
        },
        {
          move: 'Rxh7',
          fen: 'r3k3/R3P2r/8/8/8/8/8/4K3 w q - 0 2',
        },
        {
          move: 'Rg8',
          fen: 'r3k1r1/R3P2R/8/8/8/8/8/4K3 w q - 1 2',
        },
        {
          move: 'Rf8',
          fen: 'r3kr2/R3P2R/8/8/8/8/8/4K3 w q - 1 2',
        },
      ],
    },
    {
      description: 'Transpose of r3k2r/R3P2R/8/8/8/8/8/4K3 b kq - 0 1',
      start: {
        fen: '4k3/8/8/8/8/8/r3p2r/R3K2R w KQ - 0 1',
        description:
          "White can't castle either direction because of attack from pawn.",
      },
      expected: [
        {
          move: 'Rb1',
          fen: '4k3/8/8/8/8/8/r3p2r/1R2K2R b K - 1 1',
        },
        {
          move: 'Rc1',
          fen: '4k3/8/8/8/8/8/r3p2r/2R1K2R b K - 1 1',
        },
        {
          move: 'Rd1',
          fen: '4k3/8/8/8/8/8/r3p2r/3RK2R b K - 1 1',
        },
        {
          move: 'Rxa2',
          fen: '4k3/8/8/8/8/8/R3p2r/4K2R b K - 0 1',
        },
        {
          move: 'Rg1',
          fen: '4k3/8/8/8/8/8/r3p2r/R3K1R1 b Q - 1 1',
        },
        {
          move: 'Rf1',
          fen: '4k3/8/8/8/8/8/r3p2r/R3KR2 b Q - 1 1',
        },
        {
          move: 'Rxh2',
          fen: '4k3/8/8/8/8/8/r3p2R/R3K3 b Q - 0 1',
        },
      ],
    },
    {
      start: {
        fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2n w Q - 1 8',
        description:
          'From https://www.youtube.com/watch?v=U4ogK0MIzqk&ab_channel=SebastianLague&t=10m10s',
      },
      expected: [
        {
          move: 'Nd2',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPPNN1PP/R1BQK2n b Q - 2 8',
        },
        {
          move: 'Na3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/N7/PPP1N1PP/R1BQK2n b Q - 2 8',
        },
        {
          move: 'Nbc3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/2N5/PPP1N1PP/R1BQK2n b Q - 2 8',
        },
        {
          move: 'Bd2',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPPBN1PP/RN1QK2n b Q - 2 8',
        },
        {
          move: 'Be3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/4B3/PPP1N1PP/RN1QK2n b Q - 2 8',
        },
        {
          move: 'Bf4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B2B2/8/PPP1N1PP/RN1QK2n b Q - 2 8',
        },
        {
          move: 'Bg5',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/6B1/2B5/8/PPP1N1PP/RN1QK2n b Q - 2 8',
        },
        {
          move: 'Bh6',
          fen: 'rnbq1k1r/pp1Pbppp/2p4B/8/2B5/8/PPP1N1PP/RN1QK2n b Q - 2 8',
        },
        {
          move: 'Qd2',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPPQN1PP/RNB1K2n b Q - 2 8',
        },
        {
          move: 'Qd3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/3Q4/PPP1N1PP/RNB1K2n b Q - 2 8',
        },
        {
          move: 'Qd4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2BQ4/8/PPP1N1PP/RNB1K2n b Q - 2 8',
        },
        {
          move: 'Qd5',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/3Q4/2B5/8/PPP1N1PP/RNB1K2n b Q - 2 8',
        },
        {
          move: 'Qd6',
          fen: 'rnbq1k1r/pp1Pbppp/2pQ4/8/2B5/8/PPP1N1PP/RNB1K2n b Q - 2 8',
        },
        {
          move: 'Kf1',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1N1PP/RNBQ1K1n b - - 2 8',
        },
        {
          move: 'Kd2',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPPKN1PP/RNBQ3n b - - 2 8',
        },
        {
          move: 'a3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/P7/1PP1N1PP/RNBQK2n b Q - 0 8',
        },
        {
          move: 'a4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/P1B5/8/1PP1N1PP/RNBQK2n b Q a3 0 8',
        },
        {
          move: 'b3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/1P6/P1P1N1PP/RNBQK2n b Q - 0 8',
        },
        {
          move: 'b4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/1PB5/8/P1P1N1PP/RNBQK2n b Q b3 0 8',
        },
        {
          move: 'c3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/2P5/PP2N1PP/RNBQK2n b Q - 0 8',
        },
        {
          move: 'Ng1',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP3PP/RNBQK1Nn b Q - 2 8',
        },
        {
          move: 'Nec3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/2N5/PPP3PP/RNBQK2n b Q - 2 8',
        },
        {
          move: 'Ng3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/6N1/PPP3PP/RNBQK2n b Q - 2 8',
        },
        {
          move: 'Nd4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2BN4/8/PPP3PP/RNBQK2n b Q - 2 8',
        },
        {
          move: 'Nf4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B2N2/8/PPP3PP/RNBQK2n b Q - 2 8',
        },
        {
          move: 'g3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/6P1/PPP1N2P/RNBQK2n b Q - 0 8',
        },
        {
          move: 'g4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B3P1/8/PPP1N2P/RNBQK2n b Q g3 0 8',
        },
        {
          move: 'h3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/7P/PPP1N1P1/RNBQK2n b Q - 0 8',
        },
        {
          move: 'h4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B4P/8/PPP1N1P1/RNBQK2n b Q h3 0 8',
        },
        {
          move: 'Bb3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/8/1B6/PPP1N1PP/RNBQK2n b Q - 2 8',
        },
        {
          move: 'Bd3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/8/3B4/PPP1N1PP/RNBQK2n b Q - 2 8',
        },
        {
          move: 'Bb5',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/1B6/8/8/PPP1N1PP/RNBQK2n b Q - 2 8',
        },
        {
          move: 'Ba6',
          fen: 'rnbq1k1r/pp1Pbppp/B1p5/8/8/8/PPP1N1PP/RNBQK2n b Q - 2 8',
        },
        {
          move: 'Bd5',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/3B4/8/8/PPP1N1PP/RNBQK2n b Q - 2 8',
        },
        {
          move: 'Be6',
          fen: 'rnbq1k1r/pp1Pbppp/2p1B3/8/8/8/PPP1N1PP/RNBQK2n b Q - 2 8',
        },
        {
          move: 'Bxf7',
          fen: 'rnbq1k1r/pp1PbBpp/2p5/8/8/8/PPP1N1PP/RNBQK2n b Q - 0 8',
        },
        {
          move: 'dxc8=Q',
          fen: 'rnQq1k1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2n b Q - 0 8',
        },
        {
          move: 'dxc8=R',
          fen: 'rnRq1k1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2n b Q - 0 8',
        },
        {
          move: 'dxc8=N',
          fen: 'rnNq1k1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2n b Q - 0 8',
        },
        {
          move: 'dxc8=B',
          fen: 'rnBq1k1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2n b Q - 0 8',
        },
      ],
    },
    {
      description:
        'Transpose of rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2n w Q - 1 8',
      start: {
        fen: 'rnbqk2N/ppp1n1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R b q - 1 8',
        description:
          'From https://www.youtube.com/watch?v=U4ogK0MIzqk&ab_channel=SebastianLague&t=10m10s',
      },
      expected: [
        {
          move: 'dxc1=Q',
          fen: 'rnbqk2N/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNqQ1K1R w q - 0 9',
        },
        {
          move: 'dxc1=R',
          fen: 'rnbqk2N/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNrQ1K1R w q - 0 9',
        },
        {
          move: 'dxc1=N',
          fen: 'rnbqk2N/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNnQ1K1R w q - 0 9',
        },
        {
          move: 'dxc1=B',
          fen: 'rnbqk2N/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNbQ1K1R w q - 0 9',
        },
        {
          move: 'Bb4',
          fen: 'rnbqk2N/ppp1n1pp/8/8/1b6/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Ba3',
          fen: 'rnbqk2N/ppp1n1pp/8/8/8/b1P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Bd4',
          fen: 'rnbqk2N/ppp1n1pp/8/8/3b4/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Be3',
          fen: 'rnbqk2N/ppp1n1pp/8/8/8/2P1b3/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Bxf2',
          fen: 'rnbqk2N/ppp1n1pp/8/8/8/2P5/PP1pBbPP/RNBQ1K1R w q - 0 9',
        },
        {
          move: 'Bb6',
          fen: 'rnbqk2N/ppp1n1pp/1b6/8/8/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Bd6',
          fen: 'rnbqk2N/ppp1n1pp/3b4/8/8/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'a6',
          fen: 'rnbqk2N/1pp1n1pp/p7/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 0 9',
        },
        {
          move: 'a5',
          fen: 'rnbqk2N/1pp1n1pp/8/p1b5/8/2P5/PP1pBPPP/RNBQ1K1R w q a6 0 9',
        },
        {
          move: 'b6',
          fen: 'rnbqk2N/p1p1n1pp/1p6/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 0 9',
        },
        {
          move: 'b5',
          fen: 'rnbqk2N/p1p1n1pp/8/1pb5/8/2P5/PP1pBPPP/RNBQ1K1R w q b6 0 9',
        },
        {
          move: 'c6',
          fen: 'rnbqk2N/pp2n1pp/2p5/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 0 9',
        },
        {
          move: 'Nd5',
          fen: 'rnbqk2N/ppp3pp/8/2bn4/8/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Nf5',
          fen: 'rnbqk2N/ppp3pp/8/2b2n2/8/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Nec6',
          fen: 'rnbqk2N/ppp3pp/2n5/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Ng6',
          fen: 'rnbqk2N/ppp3pp/6n1/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Ng8',
          fen: 'rnbqk1nN/ppp3pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'g6',
          fen: 'rnbqk2N/ppp1n2p/6p1/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 0 9',
        },
        {
          move: 'g5',
          fen: 'rnbqk2N/ppp1n2p/8/2b3p1/8/2P5/PP1pBPPP/RNBQ1K1R w q g6 0 9',
        },
        {
          move: 'h6',
          fen: 'rnbqk2N/ppp1n1p1/7p/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 0 9',
        },
        {
          move: 'h5',
          fen: 'rnbqk2N/ppp1n1p1/8/2b4p/8/2P5/PP1pBPPP/RNBQ1K1R w q h6 0 9',
        },
        {
          move: 'Na6',
          fen: 'r1bqk2N/ppp1n1pp/n7/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Nbc6',
          fen: 'r1bqk2N/ppp1n1pp/2n5/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Nd7',
          fen: 'r1bqk2N/pppnn1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Bd7',
          fen: 'rn1qk2N/pppbn1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Be6',
          fen: 'rn1qk2N/ppp1n1pp/4b3/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Bf5',
          fen: 'rn1qk2N/ppp1n1pp/8/2b2b2/8/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Bg4',
          fen: 'rn1qk2N/ppp1n1pp/8/2b5/6b1/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Bh3',
          fen: 'rn1qk2N/ppp1n1pp/8/2b5/8/2P4b/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Qd7',
          fen: 'rnb1k2N/pppqn1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Qd6',
          fen: 'rnb1k2N/ppp1n1pp/3q4/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Qd5',
          fen: 'rnb1k2N/ppp1n1pp/8/2bq4/8/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Qd4',
          fen: 'rnb1k2N/ppp1n1pp/8/2b5/3q4/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Qd3',
          fen: 'rnb1k2N/ppp1n1pp/8/2b5/8/2Pq4/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Kd7',
          fen: 'rnbq3N/pppkn1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w - - 2 9',
        },
        {
          move: 'Kf8',
          fen: 'rnbq1k1N/ppp1n1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w - - 2 9',
        },
      ],
    },
    {
      start: {
        fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1N1PP/RNBQKn1R w KQ - 1 8',
        description: "Shouldn't be able to castle through opponent piece.",
      },
      expected: [
        {
          move: 'Nd2',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPPNN1PP/R1BQKn1R b KQ - 2 8',
        },
        {
          move: 'Na3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/N7/PPP1N1PP/R1BQKn1R b KQ - 2 8',
        },
        {
          move: 'Nbc3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/2N5/PPP1N1PP/R1BQKn1R b KQ - 2 8',
        },
        {
          move: 'Bd2',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPPBN1PP/RN1QKn1R b KQ - 2 8',
        },
        {
          move: 'Be3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/4B3/PPP1N1PP/RN1QKn1R b KQ - 2 8',
        },
        {
          move: 'Bf4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B2B2/8/PPP1N1PP/RN1QKn1R b KQ - 2 8',
        },
        {
          move: 'Bg5',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/6B1/2B5/8/PPP1N1PP/RN1QKn1R b KQ - 2 8',
        },
        {
          move: 'Bh6',
          fen: 'rnbq1k1r/pp1Pbppp/2p4B/8/2B5/8/PPP1N1PP/RN1QKn1R b KQ - 2 8',
        },
        {
          move: 'Qd2',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPPQN1PP/RNB1Kn1R b KQ - 2 8',
        },
        {
          move: 'Qd3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/3Q4/PPP1N1PP/RNB1Kn1R b KQ - 2 8',
        },
        {
          move: 'Qd4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2BQ4/8/PPP1N1PP/RNB1Kn1R b KQ - 2 8',
        },
        {
          move: 'Qd5',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/3Q4/2B5/8/PPP1N1PP/RNB1Kn1R b KQ - 2 8',
        },
        {
          move: 'Qd6',
          fen: 'rnbq1k1r/pp1Pbppp/2pQ4/8/2B5/8/PPP1N1PP/RNB1Kn1R b KQ - 2 8',
        },
        {
          move: 'Kxf1',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1N1PP/RNBQ1K1R b - - 0 8',
        },
        {
          move: 'Kf2',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NKPP/RNBQ1n1R b - - 2 8',
        },
        {
          move: 'Rg1',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1N1PP/RNBQKnR1 b Q - 2 8',
        },
        {
          move: 'Rxf1',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1N1PP/RNBQKR2 b Q - 0 8',
        },
        {
          move: 'a3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/P7/1PP1N1PP/RNBQKn1R b KQ - 0 8',
        },
        {
          move: 'a4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/P1B5/8/1PP1N1PP/RNBQKn1R b KQ a3 0 8',
        },
        {
          move: 'b3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/1P6/P1P1N1PP/RNBQKn1R b KQ - 0 8',
        },
        {
          move: 'b4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/1PB5/8/P1P1N1PP/RNBQKn1R b KQ b3 0 8',
        },
        {
          move: 'c3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/2P5/PP2N1PP/RNBQKn1R b KQ - 0 8',
        },
        {
          move: 'Ng1',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP3PP/RNBQKnNR b KQ - 2 8',
        },
        {
          move: 'Nec3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/2N5/PPP3PP/RNBQKn1R b KQ - 2 8',
        },
        {
          move: 'Ng3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/6N1/PPP3PP/RNBQKn1R b KQ - 2 8',
        },
        {
          move: 'Nd4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2BN4/8/PPP3PP/RNBQKn1R b KQ - 2 8',
        },
        {
          move: 'Nf4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B2N2/8/PPP3PP/RNBQKn1R b KQ - 2 8',
        },
        {
          move: 'g3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/6P1/PPP1N2P/RNBQKn1R b KQ - 0 8',
        },
        {
          move: 'g4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B3P1/8/PPP1N2P/RNBQKn1R b KQ g3 0 8',
        },
        {
          move: 'h3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/7P/PPP1N1P1/RNBQKn1R b KQ - 0 8',
        },
        {
          move: 'h4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B4P/8/PPP1N1P1/RNBQKn1R b KQ h3 0 8',
        },
        {
          move: 'Bb3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/8/1B6/PPP1N1PP/RNBQKn1R b KQ - 2 8',
        },
        {
          move: 'Bd3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/8/3B4/PPP1N1PP/RNBQKn1R b KQ - 2 8',
        },
        {
          move: 'Bb5',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/1B6/8/8/PPP1N1PP/RNBQKn1R b KQ - 2 8',
        },
        {
          move: 'Ba6',
          fen: 'rnbq1k1r/pp1Pbppp/B1p5/8/8/8/PPP1N1PP/RNBQKn1R b KQ - 2 8',
        },
        {
          move: 'Bd5',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/3B4/8/8/PPP1N1PP/RNBQKn1R b KQ - 2 8',
        },
        {
          move: 'Be6',
          fen: 'rnbq1k1r/pp1Pbppp/2p1B3/8/8/8/PPP1N1PP/RNBQKn1R b KQ - 2 8',
        },
        {
          move: 'Bxf7',
          fen: 'rnbq1k1r/pp1PbBpp/2p5/8/8/8/PPP1N1PP/RNBQKn1R b KQ - 0 8',
        },
        {
          move: 'dxc8=Q',
          fen: 'rnQq1k1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQKn1R b KQ - 0 8',
        },
        {
          move: 'dxc8=R',
          fen: 'rnRq1k1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQKn1R b KQ - 0 8',
        },
        {
          move: 'dxc8=N',
          fen: 'rnNq1k1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQKn1R b KQ - 0 8',
        },
        {
          move: 'dxc8=B',
          fen: 'rnBq1k1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQKn1R b KQ - 0 8',
        },
      ],
    },
    {
      description:
        'Transpose of rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1N1PP/RNBQKn1R w KQ - 1 8',
      start: {
        fen: 'rnbqkN1r/ppp1n1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R b kq - 1 8',
        description: "Shouldn't be able to castle through opponent piece.",
      },
      expected: [
        {
          move: 'dxc1=Q',
          fen: 'rnbqkN1r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNqQ1K1R w kq - 0 9',
        },
        {
          move: 'dxc1=R',
          fen: 'rnbqkN1r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNrQ1K1R w kq - 0 9',
        },
        {
          move: 'dxc1=N',
          fen: 'rnbqkN1r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNnQ1K1R w kq - 0 9',
        },
        {
          move: 'dxc1=B',
          fen: 'rnbqkN1r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNbQ1K1R w kq - 0 9',
        },
        {
          move: 'Bb4',
          fen: 'rnbqkN1r/ppp1n1pp/8/8/1b6/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Ba3',
          fen: 'rnbqkN1r/ppp1n1pp/8/8/8/b1P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Bd4',
          fen: 'rnbqkN1r/ppp1n1pp/8/8/3b4/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Be3',
          fen: 'rnbqkN1r/ppp1n1pp/8/8/8/2P1b3/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Bxf2',
          fen: 'rnbqkN1r/ppp1n1pp/8/8/8/2P5/PP1pBbPP/RNBQ1K1R w kq - 0 9',
        },
        {
          move: 'Bb6',
          fen: 'rnbqkN1r/ppp1n1pp/1b6/8/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Bd6',
          fen: 'rnbqkN1r/ppp1n1pp/3b4/8/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'a6',
          fen: 'rnbqkN1r/1pp1n1pp/p7/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 0 9',
        },
        {
          move: 'a5',
          fen: 'rnbqkN1r/1pp1n1pp/8/p1b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq a6 0 9',
        },
        {
          move: 'b6',
          fen: 'rnbqkN1r/p1p1n1pp/1p6/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 0 9',
        },
        {
          move: 'b5',
          fen: 'rnbqkN1r/p1p1n1pp/8/1pb5/8/2P5/PP1pBPPP/RNBQ1K1R w kq b6 0 9',
        },
        {
          move: 'c6',
          fen: 'rnbqkN1r/pp2n1pp/2p5/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 0 9',
        },
        {
          move: 'Nd5',
          fen: 'rnbqkN1r/ppp3pp/8/2bn4/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Nf5',
          fen: 'rnbqkN1r/ppp3pp/8/2b2n2/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Nec6',
          fen: 'rnbqkN1r/ppp3pp/2n5/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Ng6',
          fen: 'rnbqkN1r/ppp3pp/6n1/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Ng8',
          fen: 'rnbqkNnr/ppp3pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'g6',
          fen: 'rnbqkN1r/ppp1n2p/6p1/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 0 9',
        },
        {
          move: 'g5',
          fen: 'rnbqkN1r/ppp1n2p/8/2b3p1/8/2P5/PP1pBPPP/RNBQ1K1R w kq g6 0 9',
        },
        {
          move: 'h6',
          fen: 'rnbqkN1r/ppp1n1p1/7p/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 0 9',
        },
        {
          move: 'h5',
          fen: 'rnbqkN1r/ppp1n1p1/8/2b4p/8/2P5/PP1pBPPP/RNBQ1K1R w kq h6 0 9',
        },
        {
          move: 'Na6',
          fen: 'r1bqkN1r/ppp1n1pp/n7/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Nbc6',
          fen: 'r1bqkN1r/ppp1n1pp/2n5/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Nd7',
          fen: 'r1bqkN1r/pppnn1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Bd7',
          fen: 'rn1qkN1r/pppbn1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Be6',
          fen: 'rn1qkN1r/ppp1n1pp/4b3/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Bf5',
          fen: 'rn1qkN1r/ppp1n1pp/8/2b2b2/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Bg4',
          fen: 'rn1qkN1r/ppp1n1pp/8/2b5/6b1/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Bh3',
          fen: 'rn1qkN1r/ppp1n1pp/8/2b5/8/2P4b/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Qd7',
          fen: 'rnb1kN1r/pppqn1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Qd6',
          fen: 'rnb1kN1r/ppp1n1pp/3q4/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Qd5',
          fen: 'rnb1kN1r/ppp1n1pp/8/2bq4/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Qd4',
          fen: 'rnb1kN1r/ppp1n1pp/8/2b5/3q4/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Qd3',
          fen: 'rnb1kN1r/ppp1n1pp/8/2b5/8/2Pq4/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Kf7',
          fen: 'rnbq1N1r/ppp1nkpp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w - - 2 9',
        },
        {
          move: 'Kxf8',
          fen: 'rnbq1k1r/ppp1n1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w - - 0 9',
        },
        {
          move: 'Rg8',
          fen: 'rnbqkNr1/ppp1n1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 2 9',
        },
        {
          move: 'Rxf8',
          fen: 'rnbqkr2/ppp1n1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 0 9',
        },
      ],
    },
    {
      start: {
        fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1N1PP/RNBQK1nR w KQ - 1 8',
        description: "Shouldn't be able to castle through opponent's piece.",
      },
      expected: [
        {
          move: 'Nd2',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPPNN1PP/R1BQK1nR b KQ - 2 8',
        },
        {
          move: 'Na3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/N7/PPP1N1PP/R1BQK1nR b KQ - 2 8',
        },
        {
          move: 'Nbc3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/2N5/PPP1N1PP/R1BQK1nR b KQ - 2 8',
        },
        {
          move: 'Bd2',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPPBN1PP/RN1QK1nR b KQ - 2 8',
        },
        {
          move: 'Be3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/4B3/PPP1N1PP/RN1QK1nR b KQ - 2 8',
        },
        {
          move: 'Bf4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B2B2/8/PPP1N1PP/RN1QK1nR b KQ - 2 8',
        },
        {
          move: 'Bg5',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/6B1/2B5/8/PPP1N1PP/RN1QK1nR b KQ - 2 8',
        },
        {
          move: 'Bh6',
          fen: 'rnbq1k1r/pp1Pbppp/2p4B/8/2B5/8/PPP1N1PP/RN1QK1nR b KQ - 2 8',
        },
        {
          move: 'Qd2',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPPQN1PP/RNB1K1nR b KQ - 2 8',
        },
        {
          move: 'Qd3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/3Q4/PPP1N1PP/RNB1K1nR b KQ - 2 8',
        },
        {
          move: 'Qd4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2BQ4/8/PPP1N1PP/RNB1K1nR b KQ - 2 8',
        },
        {
          move: 'Qd5',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/3Q4/2B5/8/PPP1N1PP/RNB1K1nR b KQ - 2 8',
        },
        {
          move: 'Qd6',
          fen: 'rnbq1k1r/pp1Pbppp/2pQ4/8/2B5/8/PPP1N1PP/RNB1K1nR b KQ - 2 8',
        },
        {
          move: 'Kf1',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1N1PP/RNBQ1KnR b - - 2 8',
        },
        {
          move: 'Kd2',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPPKN1PP/RNBQ2nR b - - 2 8',
        },
        {
          move: 'Kf2',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NKPP/RNBQ2nR b - - 2 8',
        },
        {
          move: 'Rxg1',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1N1PP/RNBQK1R1 b Q - 0 8',
        },
        {
          move: 'a3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/P7/1PP1N1PP/RNBQK1nR b KQ - 0 8',
        },
        {
          move: 'a4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/P1B5/8/1PP1N1PP/RNBQK1nR b KQ a3 0 8',
        },
        {
          move: 'b3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/1P6/P1P1N1PP/RNBQK1nR b KQ - 0 8',
        },
        {
          move: 'b4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/1PB5/8/P1P1N1PP/RNBQK1nR b KQ b3 0 8',
        },
        {
          move: 'c3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/2P5/PP2N1PP/RNBQK1nR b KQ - 0 8',
        },
        {
          move: 'Nxg1',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP3PP/RNBQK1NR b KQ - 0 8',
        },
        {
          move: 'Nec3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/2N5/PPP3PP/RNBQK1nR b KQ - 2 8',
        },
        {
          move: 'Ng3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/6N1/PPP3PP/RNBQK1nR b KQ - 2 8',
        },
        {
          move: 'Nd4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2BN4/8/PPP3PP/RNBQK1nR b KQ - 2 8',
        },
        {
          move: 'Nf4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B2N2/8/PPP3PP/RNBQK1nR b KQ - 2 8',
        },
        {
          move: 'g3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/6P1/PPP1N2P/RNBQK1nR b KQ - 0 8',
        },
        {
          move: 'g4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B3P1/8/PPP1N2P/RNBQK1nR b KQ g3 0 8',
        },
        {
          move: 'h3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/7P/PPP1N1P1/RNBQK1nR b KQ - 0 8',
        },
        {
          move: 'h4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B4P/8/PPP1N1P1/RNBQK1nR b KQ h3 0 8',
        },
        {
          move: 'Bb3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/8/1B6/PPP1N1PP/RNBQK1nR b KQ - 2 8',
        },
        {
          move: 'Bd3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/8/3B4/PPP1N1PP/RNBQK1nR b KQ - 2 8',
        },
        {
          move: 'Bb5',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/1B6/8/8/PPP1N1PP/RNBQK1nR b KQ - 2 8',
        },
        {
          move: 'Ba6',
          fen: 'rnbq1k1r/pp1Pbppp/B1p5/8/8/8/PPP1N1PP/RNBQK1nR b KQ - 2 8',
        },
        {
          move: 'Bd5',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/3B4/8/8/PPP1N1PP/RNBQK1nR b KQ - 2 8',
        },
        {
          move: 'Be6',
          fen: 'rnbq1k1r/pp1Pbppp/2p1B3/8/8/8/PPP1N1PP/RNBQK1nR b KQ - 2 8',
        },
        {
          move: 'Bxf7',
          fen: 'rnbq1k1r/pp1PbBpp/2p5/8/8/8/PPP1N1PP/RNBQK1nR b KQ - 0 8',
        },
        {
          move: 'dxc8=Q',
          fen: 'rnQq1k1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK1nR b KQ - 0 8',
        },
        {
          move: 'dxc8=R',
          fen: 'rnRq1k1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK1nR b KQ - 0 8',
        },
        {
          move: 'dxc8=N',
          fen: 'rnNq1k1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK1nR b KQ - 0 8',
        },
        {
          move: 'dxc8=B',
          fen: 'rnBq1k1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK1nR b KQ - 0 8',
        },
      ],
    },
    {
      description:
        'Transpose of rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1N1PP/RNBQK1nR w KQ - 1 8',
      start: {
        fen: 'rnbqk1Nr/ppp1n1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R b kq - 1 8',
        description: "Shouldn't be able to castle through opponent's piece.",
      },
      expected: [
        {
          move: 'dxc1=Q',
          fen: 'rnbqk1Nr/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNqQ1K1R w kq - 0 9',
        },
        {
          move: 'dxc1=R',
          fen: 'rnbqk1Nr/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNrQ1K1R w kq - 0 9',
        },
        {
          move: 'dxc1=N',
          fen: 'rnbqk1Nr/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNnQ1K1R w kq - 0 9',
        },
        {
          move: 'dxc1=B',
          fen: 'rnbqk1Nr/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNbQ1K1R w kq - 0 9',
        },
        {
          move: 'Bb4',
          fen: 'rnbqk1Nr/ppp1n1pp/8/8/1b6/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Ba3',
          fen: 'rnbqk1Nr/ppp1n1pp/8/8/8/b1P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Bd4',
          fen: 'rnbqk1Nr/ppp1n1pp/8/8/3b4/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Be3',
          fen: 'rnbqk1Nr/ppp1n1pp/8/8/8/2P1b3/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Bxf2',
          fen: 'rnbqk1Nr/ppp1n1pp/8/8/8/2P5/PP1pBbPP/RNBQ1K1R w kq - 0 9',
        },
        {
          move: 'Bb6',
          fen: 'rnbqk1Nr/ppp1n1pp/1b6/8/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Bd6',
          fen: 'rnbqk1Nr/ppp1n1pp/3b4/8/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'a6',
          fen: 'rnbqk1Nr/1pp1n1pp/p7/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 0 9',
        },
        {
          move: 'a5',
          fen: 'rnbqk1Nr/1pp1n1pp/8/p1b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq a6 0 9',
        },
        {
          move: 'b6',
          fen: 'rnbqk1Nr/p1p1n1pp/1p6/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 0 9',
        },
        {
          move: 'b5',
          fen: 'rnbqk1Nr/p1p1n1pp/8/1pb5/8/2P5/PP1pBPPP/RNBQ1K1R w kq b6 0 9',
        },
        {
          move: 'c6',
          fen: 'rnbqk1Nr/pp2n1pp/2p5/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 0 9',
        },
        {
          move: 'Nd5',
          fen: 'rnbqk1Nr/ppp3pp/8/2bn4/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Nf5',
          fen: 'rnbqk1Nr/ppp3pp/8/2b2n2/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Nec6',
          fen: 'rnbqk1Nr/ppp3pp/2n5/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Ng6',
          fen: 'rnbqk1Nr/ppp3pp/6n1/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Nxg8',
          fen: 'rnbqk1nr/ppp3pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 0 9',
        },
        {
          move: 'g6',
          fen: 'rnbqk1Nr/ppp1n2p/6p1/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 0 9',
        },
        {
          move: 'g5',
          fen: 'rnbqk1Nr/ppp1n2p/8/2b3p1/8/2P5/PP1pBPPP/RNBQ1K1R w kq g6 0 9',
        },
        {
          move: 'h6',
          fen: 'rnbqk1Nr/ppp1n1p1/7p/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 0 9',
        },
        {
          move: 'h5',
          fen: 'rnbqk1Nr/ppp1n1p1/8/2b4p/8/2P5/PP1pBPPP/RNBQ1K1R w kq h6 0 9',
        },
        {
          move: 'Na6',
          fen: 'r1bqk1Nr/ppp1n1pp/n7/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Nbc6',
          fen: 'r1bqk1Nr/ppp1n1pp/2n5/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Nd7',
          fen: 'r1bqk1Nr/pppnn1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Bd7',
          fen: 'rn1qk1Nr/pppbn1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Be6',
          fen: 'rn1qk1Nr/ppp1n1pp/4b3/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Bf5',
          fen: 'rn1qk1Nr/ppp1n1pp/8/2b2b2/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Bg4',
          fen: 'rn1qk1Nr/ppp1n1pp/8/2b5/6b1/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Bh3',
          fen: 'rn1qk1Nr/ppp1n1pp/8/2b5/8/2P4b/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Qd7',
          fen: 'rnb1k1Nr/pppqn1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Qd6',
          fen: 'rnb1k1Nr/ppp1n1pp/3q4/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Qd5',
          fen: 'rnb1k1Nr/ppp1n1pp/8/2bq4/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Qd4',
          fen: 'rnb1k1Nr/ppp1n1pp/8/2b5/3q4/2P5/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Qd3',
          fen: 'rnb1k1Nr/ppp1n1pp/8/2b5/8/2Pq4/PP1pBPPP/RNBQ1K1R w kq - 2 9',
        },
        {
          move: 'Kd7',
          fen: 'rnbq2Nr/pppkn1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w - - 2 9',
        },
        {
          move: 'Kf7',
          fen: 'rnbq2Nr/ppp1nkpp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w - - 2 9',
        },
        {
          move: 'Kf8',
          fen: 'rnbq1kNr/ppp1n1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w - - 2 9',
        },
        {
          move: 'Rxg8',
          fen: 'rnbqk1r1/ppp1n1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w q - 0 9',
        },
      ],
    },
    {
      start: {
        fen: 'rnbqkN1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R b KQkq - 1 8',
        description: "Can't castle through opposing piece.",
      },
      expected: [
        {
          move: 'c5',
          fen: 'rnbqkN1r/pp2bppp/8/2p5/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'a6',
          fen: 'rnbqkN1r/1p2bppp/p1p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'a5',
          fen: 'rnbqkN1r/1p2bppp/2p5/p7/2B5/8/PPP1N1PP/RNBQK2R w KQkq a6 0 9',
        },
        {
          move: 'b6',
          fen: 'rnbqkN1r/p3bppp/1pp5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'b5',
          fen: 'rnbqkN1r/p3bppp/2p5/1p6/2B5/8/PPP1N1PP/RNBQK2R w KQkq b6 0 9',
        },
        {
          move: 'Bd6',
          fen: 'rnbqkN1r/pp3ppp/2pb4/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bc5',
          fen: 'rnbqkN1r/pp3ppp/2p5/2b5/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bb4+',
          fen: 'rnbqkN1r/pp3ppp/2p5/8/1bB5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Ba3',
          fen: 'rnbqkN1r/pp3ppp/2p5/8/2B5/b7/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bf6',
          fen: 'rnbqkN1r/pp3ppp/2p2b2/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bg5',
          fen: 'rnbqkN1r/pp3ppp/2p5/6b1/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bh4+',
          fen: 'rnbqkN1r/pp3ppp/2p5/8/2B4b/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bxf8',
          fen: 'rnbqkb1r/pp3ppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'f6',
          fen: 'rnbqkN1r/pp2b1pp/2p2p2/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'f5',
          fen: 'rnbqkN1r/pp2b1pp/2p5/5p2/2B5/8/PPP1N1PP/RNBQK2R w KQkq f6 0 9',
        },
        {
          move: 'g6',
          fen: 'rnbqkN1r/pp2bp1p/2p3p1/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'g5',
          fen: 'rnbqkN1r/pp2bp1p/2p5/6p1/2B5/8/PPP1N1PP/RNBQK2R w KQkq g6 0 9',
        },
        {
          move: 'h6',
          fen: 'rnbqkN1r/pp2bpp1/2p4p/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'h5',
          fen: 'rnbqkN1r/pp2bpp1/2p5/7p/2B5/8/PPP1N1PP/RNBQK2R w KQkq h6 0 9',
        },
        {
          move: 'Na6',
          fen: 'r1bqkN1r/pp2bppp/n1p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Nd7',
          fen: 'r1bqkN1r/pp1nbppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bd7',
          fen: 'rn1qkN1r/pp1bbppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Be6',
          fen: 'rn1qkN1r/pp2bppp/2p1b3/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bf5',
          fen: 'rn1qkN1r/pp2bppp/2p5/5b2/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bg4',
          fen: 'rn1qkN1r/pp2bppp/2p5/8/2B3b1/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bh3',
          fen: 'rn1qkN1r/pp2bppp/2p5/8/2B5/7b/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qc7',
          fen: 'rnb1kN1r/ppq1bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qb6',
          fen: 'rnb1kN1r/pp2bppp/1qp5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qa5+',
          fen: 'rnb1kN1r/pp2bppp/2p5/q7/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qd7',
          fen: 'rnb1kN1r/pp1qbppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qd6',
          fen: 'rnb1kN1r/pp2bppp/2pq4/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qd5',
          fen: 'rnb1kN1r/pp2bppp/2p5/3q4/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qd4',
          fen: 'rnb1kN1r/pp2bppp/2p5/8/2Bq4/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qd3',
          fen: 'rnb1kN1r/pp2bppp/2p5/8/2B5/3q4/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qd2+',
          fen: 'rnb1kN1r/pp2bppp/2p5/8/2B5/8/PPPqN1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qxd1+',
          fen: 'rnb1kN1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBqK2R w KQkq - 0 9',
        },
        {
          move: 'Kxf8',
          fen: 'rnbq1k1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQ - 0 9',
        },
        {
          move: 'Rg8',
          fen: 'rnbqkNr1/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQq - 2 9',
        },
        {
          move: 'Rxf8',
          fen: 'rnbqkr2/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQq - 0 9',
        },
      ],
    },
    {
      description:
        'Transpose of rnbqkN1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R b KQkq - 1 8',
      start: {
        fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNBQKn1R w KQkq - 1 8',
        description: "Can't castle through opposing piece.",
      },
      expected: [
        {
          move: 'Nd2',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP1NBPPP/R1BQKn1R b KQkq - 2 8',
        },
        {
          move: 'Na3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/N1P5/PP2BPPP/R1BQKn1R b KQkq - 2 8',
        },
        {
          move: 'Bd2',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP1BBPPP/RN1QKn1R b KQkq - 2 8',
        },
        {
          move: 'Be3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P1B3/PP2BPPP/RN1QKn1R b KQkq - 2 8',
        },
        {
          move: 'Bf4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/5B2/2P5/PP2BPPP/RN1QKn1R b KQkq - 2 8',
        },
        {
          move: 'Bg5',
          fen: 'rnbqk2r/ppp1n1pp/8/2b3B1/8/2P5/PP2BPPP/RN1QKn1R b KQkq - 2 8',
        },
        {
          move: 'Bh6',
          fen: 'rnbqk2r/ppp1n1pp/7B/2b5/8/2P5/PP2BPPP/RN1QKn1R b KQkq - 2 8',
        },
        {
          move: 'Qc2',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PPQ1BPPP/RNB1Kn1R b KQkq - 2 8',
        },
        {
          move: 'Qb3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/1QP5/PP2BPPP/RNB1Kn1R b KQkq - 2 8',
        },
        {
          move: 'Qa4+',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/Q7/2P5/PP2BPPP/RNB1Kn1R b KQkq - 2 8',
        },
        {
          move: 'Qd2',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP1QBPPP/RNB1Kn1R b KQkq - 2 8',
        },
        {
          move: 'Qd3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2PQ4/PP2BPPP/RNB1Kn1R b KQkq - 2 8',
        },
        {
          move: 'Qd4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/3Q4/2P5/PP2BPPP/RNB1Kn1R b KQkq - 2 8',
        },
        {
          move: 'Qd5',
          fen: 'rnbqk2r/ppp1n1pp/8/2bQ4/8/2P5/PP2BPPP/RNB1Kn1R b KQkq - 2 8',
        },
        {
          move: 'Qd6',
          fen: 'rnbqk2r/ppp1n1pp/3Q4/2b5/8/2P5/PP2BPPP/RNB1Kn1R b KQkq - 2 8',
        },
        {
          move: 'Qd7+',
          fen: 'rnbqk2r/pppQn1pp/8/2b5/8/2P5/PP2BPPP/RNB1Kn1R b KQkq - 2 8',
        },
        {
          move: 'Qxd8+',
          fen: 'rnbQk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNB1Kn1R b KQkq - 0 8',
        },
        {
          move: 'Kxf1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNBQ1K1R b kq - 0 8',
        },
        {
          move: 'Rg1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNBQKnR1 b Qkq - 2 8',
        },
        {
          move: 'Rxf1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNBQKR2 b Qkq - 0 8',
        },
        {
          move: 'a3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/P1P5/1P2BPPP/RNBQKn1R b KQkq - 0 8',
        },
        {
          move: 'a4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/P7/2P5/1P2BPPP/RNBQKn1R b KQkq a3 0 8',
        },
        {
          move: 'b3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/1PP5/P3BPPP/RNBQKn1R b KQkq - 0 8',
        },
        {
          move: 'b4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/1P6/2P5/P3BPPP/RNBQKn1R b KQkq b3 0 8',
        },
        {
          move: 'Bxf1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP3PPP/RNBQKB1R b KQkq - 0 8',
        },
        {
          move: 'Bd3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2PB4/PP3PPP/RNBQKn1R b KQkq - 2 8',
        },
        {
          move: 'Bc4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/2B5/2P5/PP3PPP/RNBQKn1R b KQkq - 2 8',
        },
        {
          move: 'Bb5+',
          fen: 'rnbqk2r/ppp1n1pp/8/1Bb5/8/2P5/PP3PPP/RNBQKn1R b KQkq - 2 8',
        },
        {
          move: 'Ba6',
          fen: 'rnbqk2r/ppp1n1pp/B7/2b5/8/2P5/PP3PPP/RNBQKn1R b KQkq - 2 8',
        },
        {
          move: 'Bf3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P2B2/PP3PPP/RNBQKn1R b KQkq - 2 8',
        },
        {
          move: 'Bg4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/6B1/2P5/PP3PPP/RNBQKn1R b KQkq - 2 8',
        },
        {
          move: 'Bh5+',
          fen: 'rnbqk2r/ppp1n1pp/8/2b4B/8/2P5/PP3PPP/RNBQKn1R b KQkq - 2 8',
        },
        {
          move: 'f3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P2P2/PP2B1PP/RNBQKn1R b KQkq - 0 8',
        },
        {
          move: 'f4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/5P2/2P5/PP2B1PP/RNBQKn1R b KQkq f3 0 8',
        },
        {
          move: 'g3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P3P1/PP2BP1P/RNBQKn1R b KQkq - 0 8',
        },
        {
          move: 'g4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/6P1/2P5/PP2BP1P/RNBQKn1R b KQkq g3 0 8',
        },
        {
          move: 'h3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P4P/PP2BPP1/RNBQKn1R b KQkq - 0 8',
        },
        {
          move: 'h4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/7P/2P5/PP2BPP1/RNBQKn1R b KQkq h3 0 8',
        },
        {
          move: 'c4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/2P5/8/PP2BPPP/RNBQKn1R b KQkq - 0 8',
        },
      ],
    },
    {
      start: {
        fen: 'rnbqk1Nr/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R b KQkq - 1 8',
        description: "Can't castle through opposing piece.",
      },
      expected: [
        {
          move: 'c5',
          fen: 'rnbqk1Nr/pp2bppp/8/2p5/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'a6',
          fen: 'rnbqk1Nr/1p2bppp/p1p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'a5',
          fen: 'rnbqk1Nr/1p2bppp/2p5/p7/2B5/8/PPP1N1PP/RNBQK2R w KQkq a6 0 9',
        },
        {
          move: 'b6',
          fen: 'rnbqk1Nr/p3bppp/1pp5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'b5',
          fen: 'rnbqk1Nr/p3bppp/2p5/1p6/2B5/8/PPP1N1PP/RNBQK2R w KQkq b6 0 9',
        },
        {
          move: 'Bd6',
          fen: 'rnbqk1Nr/pp3ppp/2pb4/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bc5',
          fen: 'rnbqk1Nr/pp3ppp/2p5/2b5/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bb4+',
          fen: 'rnbqk1Nr/pp3ppp/2p5/8/1bB5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Ba3',
          fen: 'rnbqk1Nr/pp3ppp/2p5/8/2B5/b7/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bf6',
          fen: 'rnbqk1Nr/pp3ppp/2p2b2/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bg5',
          fen: 'rnbqk1Nr/pp3ppp/2p5/6b1/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bh4+',
          fen: 'rnbqk1Nr/pp3ppp/2p5/8/2B4b/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bf8',
          fen: 'rnbqkbNr/pp3ppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'f6',
          fen: 'rnbqk1Nr/pp2b1pp/2p2p2/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'f5',
          fen: 'rnbqk1Nr/pp2b1pp/2p5/5p2/2B5/8/PPP1N1PP/RNBQK2R w KQkq f6 0 9',
        },
        {
          move: 'g6',
          fen: 'rnbqk1Nr/pp2bp1p/2p3p1/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'g5',
          fen: 'rnbqk1Nr/pp2bp1p/2p5/6p1/2B5/8/PPP1N1PP/RNBQK2R w KQkq g6 0 9',
        },
        {
          move: 'h6',
          fen: 'rnbqk1Nr/pp2bpp1/2p4p/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'h5',
          fen: 'rnbqk1Nr/pp2bpp1/2p5/7p/2B5/8/PPP1N1PP/RNBQK2R w KQkq h6 0 9',
        },
        {
          move: 'Na6',
          fen: 'r1bqk1Nr/pp2bppp/n1p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Nd7',
          fen: 'r1bqk1Nr/pp1nbppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bd7',
          fen: 'rn1qk1Nr/pp1bbppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Be6',
          fen: 'rn1qk1Nr/pp2bppp/2p1b3/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bf5',
          fen: 'rn1qk1Nr/pp2bppp/2p5/5b2/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bg4',
          fen: 'rn1qk1Nr/pp2bppp/2p5/8/2B3b1/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bh3',
          fen: 'rn1qk1Nr/pp2bppp/2p5/8/2B5/7b/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qc7',
          fen: 'rnb1k1Nr/ppq1bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qb6',
          fen: 'rnb1k1Nr/pp2bppp/1qp5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qa5+',
          fen: 'rnb1k1Nr/pp2bppp/2p5/q7/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qd7',
          fen: 'rnb1k1Nr/pp1qbppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qd6',
          fen: 'rnb1k1Nr/pp2bppp/2pq4/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qd5',
          fen: 'rnb1k1Nr/pp2bppp/2p5/3q4/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qd4',
          fen: 'rnb1k1Nr/pp2bppp/2p5/8/2Bq4/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qd3',
          fen: 'rnb1k1Nr/pp2bppp/2p5/8/2B5/3q4/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qd2+',
          fen: 'rnb1k1Nr/pp2bppp/2p5/8/2B5/8/PPPqN1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Qxd1+',
          fen: 'rnb1k1Nr/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBqK2R w KQkq - 0 9',
        },
        {
          move: 'Kf8',
          fen: 'rnbq1kNr/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Rxg8',
          fen: 'rnbqk1r1/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQq - 0 9',
        },
      ],
    },
    {
      description:
        'Transpose of rnbqk1Nr/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R b KQkq - 1 8',
      start: {
        fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNBQK1nR w KQkq - 1 8',
        description: "Can't castle through opposing piece.",
      },
      expected: [
        {
          move: 'Nd2',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP1NBPPP/R1BQK1nR b KQkq - 2 8',
        },
        {
          move: 'Na3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/N1P5/PP2BPPP/R1BQK1nR b KQkq - 2 8',
        },
        {
          move: 'Bd2',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP1BBPPP/RN1QK1nR b KQkq - 2 8',
        },
        {
          move: 'Be3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P1B3/PP2BPPP/RN1QK1nR b KQkq - 2 8',
        },
        {
          move: 'Bf4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/5B2/2P5/PP2BPPP/RN1QK1nR b KQkq - 2 8',
        },
        {
          move: 'Bg5',
          fen: 'rnbqk2r/ppp1n1pp/8/2b3B1/8/2P5/PP2BPPP/RN1QK1nR b KQkq - 2 8',
        },
        {
          move: 'Bh6',
          fen: 'rnbqk2r/ppp1n1pp/7B/2b5/8/2P5/PP2BPPP/RN1QK1nR b KQkq - 2 8',
        },
        {
          move: 'Qc2',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PPQ1BPPP/RNB1K1nR b KQkq - 2 8',
        },
        {
          move: 'Qb3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/1QP5/PP2BPPP/RNB1K1nR b KQkq - 2 8',
        },
        {
          move: 'Qa4+',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/Q7/2P5/PP2BPPP/RNB1K1nR b KQkq - 2 8',
        },
        {
          move: 'Qd2',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP1QBPPP/RNB1K1nR b KQkq - 2 8',
        },
        {
          move: 'Qd3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2PQ4/PP2BPPP/RNB1K1nR b KQkq - 2 8',
        },
        {
          move: 'Qd4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/3Q4/2P5/PP2BPPP/RNB1K1nR b KQkq - 2 8',
        },
        {
          move: 'Qd5',
          fen: 'rnbqk2r/ppp1n1pp/8/2bQ4/8/2P5/PP2BPPP/RNB1K1nR b KQkq - 2 8',
        },
        {
          move: 'Qd6',
          fen: 'rnbqk2r/ppp1n1pp/3Q4/2b5/8/2P5/PP2BPPP/RNB1K1nR b KQkq - 2 8',
        },
        {
          move: 'Qd7+',
          fen: 'rnbqk2r/pppQn1pp/8/2b5/8/2P5/PP2BPPP/RNB1K1nR b KQkq - 2 8',
        },
        {
          move: 'Qxd8+',
          fen: 'rnbQk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNB1K1nR b KQkq - 0 8',
        },
        {
          move: 'Kf1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNBQ1KnR b kq - 2 8',
        },
        {
          move: 'Rxg1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/RNBQK1R1 b Qkq - 0 8',
        },
        {
          move: 'a3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/P1P5/1P2BPPP/RNBQK1nR b KQkq - 0 8',
        },
        {
          move: 'a4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/P7/2P5/1P2BPPP/RNBQK1nR b KQkq a3 0 8',
        },
        {
          move: 'b3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/1PP5/P3BPPP/RNBQK1nR b KQkq - 0 8',
        },
        {
          move: 'b4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/1P6/2P5/P3BPPP/RNBQK1nR b KQkq b3 0 8',
        },
        {
          move: 'Bf1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP3PPP/RNBQKBnR b KQkq - 2 8',
        },
        {
          move: 'Bd3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2PB4/PP3PPP/RNBQK1nR b KQkq - 2 8',
        },
        {
          move: 'Bc4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/2B5/2P5/PP3PPP/RNBQK1nR b KQkq - 2 8',
        },
        {
          move: 'Bb5+',
          fen: 'rnbqk2r/ppp1n1pp/8/1Bb5/8/2P5/PP3PPP/RNBQK1nR b KQkq - 2 8',
        },
        {
          move: 'Ba6',
          fen: 'rnbqk2r/ppp1n1pp/B7/2b5/8/2P5/PP3PPP/RNBQK1nR b KQkq - 2 8',
        },
        {
          move: 'Bf3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P2B2/PP3PPP/RNBQK1nR b KQkq - 2 8',
        },
        {
          move: 'Bg4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/6B1/2P5/PP3PPP/RNBQK1nR b KQkq - 2 8',
        },
        {
          move: 'Bh5+',
          fen: 'rnbqk2r/ppp1n1pp/8/2b4B/8/2P5/PP3PPP/RNBQK1nR b KQkq - 2 8',
        },
        {
          move: 'f3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P2P2/PP2B1PP/RNBQK1nR b KQkq - 0 8',
        },
        {
          move: 'f4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/5P2/2P5/PP2B1PP/RNBQK1nR b KQkq f3 0 8',
        },
        {
          move: 'g3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P3P1/PP2BP1P/RNBQK1nR b KQkq - 0 8',
        },
        {
          move: 'g4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/6P1/2P5/PP2BP1P/RNBQK1nR b KQkq g3 0 8',
        },
        {
          move: 'h3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P4P/PP2BPP1/RNBQK1nR b KQkq - 0 8',
        },
        {
          move: 'h4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/7P/2P5/PP2BPP1/RNBQK1nR b KQkq h3 0 8',
        },
        {
          move: 'c4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/2P5/8/PP2BPPP/RNBQK1nR b KQkq - 0 8',
        },
      ],
    },
    {
      start: {
        fen: 'r2Nk2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R b KQkq - 1 8',
        description: "Can't castle through opposing piece.",
      },
      expected: [
        {
          move: 'c5',
          fen: 'r2Nk2r/pp2bppp/8/2p5/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'a6',
          fen: 'r2Nk2r/1p2bppp/p1p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'a5',
          fen: 'r2Nk2r/1p2bppp/2p5/p7/2B5/8/PPP1N1PP/RNBQK2R w KQkq a6 0 9',
        },
        {
          move: 'b6',
          fen: 'r2Nk2r/p3bppp/1pp5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'b5',
          fen: 'r2Nk2r/p3bppp/2p5/1p6/2B5/8/PPP1N1PP/RNBQK2R w KQkq b6 0 9',
        },
        {
          move: 'Bd6',
          fen: 'r2Nk2r/pp3ppp/2pb4/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bc5',
          fen: 'r2Nk2r/pp3ppp/2p5/2b5/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bb4+',
          fen: 'r2Nk2r/pp3ppp/2p5/8/1bB5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Ba3',
          fen: 'r2Nk2r/pp3ppp/2p5/8/2B5/b7/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bf6',
          fen: 'r2Nk2r/pp3ppp/2p2b2/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bg5',
          fen: 'r2Nk2r/pp3ppp/2p5/6b1/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bh4+',
          fen: 'r2Nk2r/pp3ppp/2p5/8/2B4b/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bxd8',
          fen: 'r2bk2r/pp3ppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'Bf8',
          fen: 'r2Nkb1r/pp3ppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'f6',
          fen: 'r2Nk2r/pp2b1pp/2p2p2/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'f5',
          fen: 'r2Nk2r/pp2b1pp/2p5/5p2/2B5/8/PPP1N1PP/RNBQK2R w KQkq f6 0 9',
        },
        {
          move: 'g6',
          fen: 'r2Nk2r/pp2bp1p/2p3p1/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'g5',
          fen: 'r2Nk2r/pp2bp1p/2p5/6p1/2B5/8/PPP1N1PP/RNBQK2R w KQkq g6 0 9',
        },
        {
          move: 'h6',
          fen: 'r2Nk2r/pp2bpp1/2p4p/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'h5',
          fen: 'r2Nk2r/pp2bpp1/2p5/7p/2B5/8/PPP1N1PP/RNBQK2R w KQkq h6 0 9',
        },
        {
          move: 'Rb8',
          fen: '1r1Nk2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQk - 2 9',
        },
        {
          move: 'Rc8',
          fen: '2rNk2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQk - 2 9',
        },
        {
          move: 'Rxd8',
          fen: '3rk2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQk - 0 9',
        },
        {
          move: 'Kf8',
          fen: 'r2N1k1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'O-O',
          fen: 'r2N1rk1/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Rg8',
          fen: 'r2Nk1r1/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQq - 2 9',
        },
        {
          move: 'Rf8',
          fen: 'r2Nkr2/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQq - 2 9',
        },
      ],
    },
    {
      description:
        'Transpose of r2Nk2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R b KQkq - 1 8',
      start: {
        fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R2nK2R w KQkq - 1 8',
        description: "Can't castle through opposing piece.",
      },
      expected: [
        {
          move: 'Rb1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/1R1nK2R b Kkq - 2 8',
        },
        {
          move: 'Rc1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/2RnK2R b Kkq - 2 8',
        },
        {
          move: 'Rxd1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/3RK2R b Kkq - 0 8',
        },
        {
          move: 'Kf1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R2n1K1R b kq - 2 8',
        },
        {
          move: 'O-O',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R2n1RK1 b kq - 2 8',
        },
        {
          move: 'Rg1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R2nK1R1 b Qkq - 2 8',
        },
        {
          move: 'Rf1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R2nKR2 b Qkq - 2 8',
        },
        {
          move: 'a3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/P1P5/1P2BPPP/R2nK2R b KQkq - 0 8',
        },
        {
          move: 'a4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/P7/2P5/1P2BPPP/R2nK2R b KQkq a3 0 8',
        },
        {
          move: 'b3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/1PP5/P3BPPP/R2nK2R b KQkq - 0 8',
        },
        {
          move: 'b4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/1P6/2P5/P3BPPP/R2nK2R b KQkq b3 0 8',
        },
        {
          move: 'Bxd1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP3PPP/R2BK2R b KQkq - 0 8',
        },
        {
          move: 'Bf1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP3PPP/R2nKB1R b KQkq - 2 8',
        },
        {
          move: 'Bd3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2PB4/PP3PPP/R2nK2R b KQkq - 2 8',
        },
        {
          move: 'Bc4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/2B5/2P5/PP3PPP/R2nK2R b KQkq - 2 8',
        },
        {
          move: 'Bb5+',
          fen: 'rnbqk2r/ppp1n1pp/8/1Bb5/8/2P5/PP3PPP/R2nK2R b KQkq - 2 8',
        },
        {
          move: 'Ba6',
          fen: 'rnbqk2r/ppp1n1pp/B7/2b5/8/2P5/PP3PPP/R2nK2R b KQkq - 2 8',
        },
        {
          move: 'Bf3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P2B2/PP3PPP/R2nK2R b KQkq - 2 8',
        },
        {
          move: 'Bg4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/6B1/2P5/PP3PPP/R2nK2R b KQkq - 2 8',
        },
        {
          move: 'Bh5+',
          fen: 'rnbqk2r/ppp1n1pp/8/2b4B/8/2P5/PP3PPP/R2nK2R b KQkq - 2 8',
        },
        {
          move: 'f3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P2P2/PP2B1PP/R2nK2R b KQkq - 0 8',
        },
        {
          move: 'f4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/5P2/2P5/PP2B1PP/R2nK2R b KQkq f3 0 8',
        },
        {
          move: 'g3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P3P1/PP2BP1P/R2nK2R b KQkq - 0 8',
        },
        {
          move: 'g4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/6P1/2P5/PP2BP1P/R2nK2R b KQkq g3 0 8',
        },
        {
          move: 'h3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P4P/PP2BPP1/R2nK2R b KQkq - 0 8',
        },
        {
          move: 'h4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/7P/2P5/PP2BPP1/R2nK2R b KQkq h3 0 8',
        },
        {
          move: 'c4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/2P5/8/PP2BPPP/R2nK2R b KQkq - 0 8',
        },
      ],
    },
    {
      start: {
        fen: 'r1N1k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R b KQkq - 1 8',
        description: "Can't castle through opposing piece.",
      },
      expected: [
        {
          move: 'c5',
          fen: 'r1N1k2r/pp2bppp/8/2p5/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'a6',
          fen: 'r1N1k2r/1p2bppp/p1p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'a5',
          fen: 'r1N1k2r/1p2bppp/2p5/p7/2B5/8/PPP1N1PP/RNBQK2R w KQkq a6 0 9',
        },
        {
          move: 'b6',
          fen: 'r1N1k2r/p3bppp/1pp5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'b5',
          fen: 'r1N1k2r/p3bppp/2p5/1p6/2B5/8/PPP1N1PP/RNBQK2R w KQkq b6 0 9',
        },
        {
          move: 'Bd6',
          fen: 'r1N1k2r/pp3ppp/2pb4/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bc5',
          fen: 'r1N1k2r/pp3ppp/2p5/2b5/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bb4+',
          fen: 'r1N1k2r/pp3ppp/2p5/8/1bB5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Ba3',
          fen: 'r1N1k2r/pp3ppp/2p5/8/2B5/b7/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bf6',
          fen: 'r1N1k2r/pp3ppp/2p2b2/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bg5',
          fen: 'r1N1k2r/pp3ppp/2p5/6b1/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bh4+',
          fen: 'r1N1k2r/pp3ppp/2p5/8/2B4b/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bd8',
          fen: 'r1Nbk2r/pp3ppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bf8',
          fen: 'r1N1kb1r/pp3ppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'f6',
          fen: 'r1N1k2r/pp2b1pp/2p2p2/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'f5',
          fen: 'r1N1k2r/pp2b1pp/2p5/5p2/2B5/8/PPP1N1PP/RNBQK2R w KQkq f6 0 9',
        },
        {
          move: 'g6',
          fen: 'r1N1k2r/pp2bp1p/2p3p1/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'g5',
          fen: 'r1N1k2r/pp2bp1p/2p5/6p1/2B5/8/PPP1N1PP/RNBQK2R w KQkq g6 0 9',
        },
        {
          move: 'h6',
          fen: 'r1N1k2r/pp2bpp1/2p4p/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'h5',
          fen: 'r1N1k2r/pp2bpp1/2p5/7p/2B5/8/PPP1N1PP/RNBQK2R w KQkq h6 0 9',
        },
        {
          move: 'Rb8',
          fen: '1rN1k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQk - 2 9',
        },
        {
          move: 'Rxc8',
          fen: '2r1k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQk - 0 9',
        },
        {
          move: 'Kf8',
          fen: 'r1N2k1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'O-O',
          fen: 'r1N2rk1/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Rg8',
          fen: 'r1N1k1r1/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQq - 2 9',
        },
        {
          move: 'Rf8',
          fen: 'r1N1kr2/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQq - 2 9',
        },
      ],
    },
    {
      description:
        'Transpose of r1N1k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R b KQkq - 1 8',
      start: {
        fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R1n1K2R w KQkq - 1 8',
        description: "Can't castle through opposing piece.",
      },
      expected: [
        {
          move: 'Rb1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/1Rn1K2R b Kkq - 2 8',
        },
        {
          move: 'Rxc1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/2R1K2R b Kkq - 0 8',
        },
        {
          move: 'Kf1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R1n2K1R b kq - 2 8',
        },
        {
          move: 'O-O',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R1n2RK1 b kq - 2 8',
        },
        {
          move: 'Rg1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R1n1K1R1 b Qkq - 2 8',
        },
        {
          move: 'Rf1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R1n1KR2 b Qkq - 2 8',
        },
        {
          move: 'a3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/P1P5/1P2BPPP/R1n1K2R b KQkq - 0 8',
        },
        {
          move: 'a4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/P7/2P5/1P2BPPP/R1n1K2R b KQkq a3 0 8',
        },
        {
          move: 'b3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/1PP5/P3BPPP/R1n1K2R b KQkq - 0 8',
        },
        {
          move: 'b4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/1P6/2P5/P3BPPP/R1n1K2R b KQkq b3 0 8',
        },
        {
          move: 'Bd1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP3PPP/R1nBK2R b KQkq - 2 8',
        },
        {
          move: 'Bf1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP3PPP/R1n1KB1R b KQkq - 2 8',
        },
        {
          move: 'Bd3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2PB4/PP3PPP/R1n1K2R b KQkq - 2 8',
        },
        {
          move: 'Bc4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/2B5/2P5/PP3PPP/R1n1K2R b KQkq - 2 8',
        },
        {
          move: 'Bb5+',
          fen: 'rnbqk2r/ppp1n1pp/8/1Bb5/8/2P5/PP3PPP/R1n1K2R b KQkq - 2 8',
        },
        {
          move: 'Ba6',
          fen: 'rnbqk2r/ppp1n1pp/B7/2b5/8/2P5/PP3PPP/R1n1K2R b KQkq - 2 8',
        },
        {
          move: 'Bf3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P2B2/PP3PPP/R1n1K2R b KQkq - 2 8',
        },
        {
          move: 'Bg4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/6B1/2P5/PP3PPP/R1n1K2R b KQkq - 2 8',
        },
        {
          move: 'Bh5+',
          fen: 'rnbqk2r/ppp1n1pp/8/2b4B/8/2P5/PP3PPP/R1n1K2R b KQkq - 2 8',
        },
        {
          move: 'f3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P2P2/PP2B1PP/R1n1K2R b KQkq - 0 8',
        },
        {
          move: 'f4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/5P2/2P5/PP2B1PP/R1n1K2R b KQkq f3 0 8',
        },
        {
          move: 'g3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P3P1/PP2BP1P/R1n1K2R b KQkq - 0 8',
        },
        {
          move: 'g4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/6P1/2P5/PP2BP1P/R1n1K2R b KQkq g3 0 8',
        },
        {
          move: 'h3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P4P/PP2BPP1/R1n1K2R b KQkq - 0 8',
        },
        {
          move: 'h4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/7P/2P5/PP2BPP1/R1n1K2R b KQkq h3 0 8',
        },
        {
          move: 'c4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/2P5/8/PP2BPPP/R1n1K2R b KQkq - 0 8',
        },
      ],
    },
    {
      start: {
        fen: 'rN2k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R b KQkq - 1 8',
        description: "Can't castle through opposing piece.",
      },
      expected: [
        {
          move: 'c5',
          fen: 'rN2k2r/pp2bppp/8/2p5/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'a6',
          fen: 'rN2k2r/1p2bppp/p1p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'a5',
          fen: 'rN2k2r/1p2bppp/2p5/p7/2B5/8/PPP1N1PP/RNBQK2R w KQkq a6 0 9',
        },
        {
          move: 'b6',
          fen: 'rN2k2r/p3bppp/1pp5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'b5',
          fen: 'rN2k2r/p3bppp/2p5/1p6/2B5/8/PPP1N1PP/RNBQK2R w KQkq b6 0 9',
        },
        {
          move: 'Bd6',
          fen: 'rN2k2r/pp3ppp/2pb4/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bc5',
          fen: 'rN2k2r/pp3ppp/2p5/2b5/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bb4+',
          fen: 'rN2k2r/pp3ppp/2p5/8/1bB5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Ba3',
          fen: 'rN2k2r/pp3ppp/2p5/8/2B5/b7/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bf6',
          fen: 'rN2k2r/pp3ppp/2p2b2/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bg5',
          fen: 'rN2k2r/pp3ppp/2p5/6b1/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bh4+',
          fen: 'rN2k2r/pp3ppp/2p5/8/2B4b/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bd8',
          fen: 'rN1bk2r/pp3ppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'Bf8',
          fen: 'rN2kb1r/pp3ppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 2 9',
        },
        {
          move: 'f6',
          fen: 'rN2k2r/pp2b1pp/2p2p2/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'f5',
          fen: 'rN2k2r/pp2b1pp/2p5/5p2/2B5/8/PPP1N1PP/RNBQK2R w KQkq f6 0 9',
        },
        {
          move: 'g6',
          fen: 'rN2k2r/pp2bp1p/2p3p1/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'g5',
          fen: 'rN2k2r/pp2bp1p/2p5/6p1/2B5/8/PPP1N1PP/RNBQK2R w KQkq g6 0 9',
        },
        {
          move: 'h6',
          fen: 'rN2k2r/pp2bpp1/2p4p/8/2B5/8/PPP1N1PP/RNBQK2R w KQkq - 0 9',
        },
        {
          move: 'h5',
          fen: 'rN2k2r/pp2bpp1/2p5/7p/2B5/8/PPP1N1PP/RNBQK2R w KQkq h6 0 9',
        },
        {
          move: 'Rxb8',
          fen: '1r2k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQk - 0 9',
        },
        {
          move: 'Kf8',
          fen: 'rN3k1r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'O-O',
          fen: 'rN3rk1/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Rg8',
          fen: 'rN2k1r1/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQq - 2 9',
        },
        {
          move: 'Rf8',
          fen: 'rN2kr2/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R w KQq - 2 9',
        },
      ],
    },
    {
      description:
        'Transpose of rN2k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2R b KQkq - 1 8',
      start: {
        fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/Rn2K2R w KQkq - 1 8',
        description: "Can't castle through opposing piece.",
      },
      expected: [
        {
          move: 'Rxb1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/1R2K2R b Kkq - 0 8',
        },
        {
          move: 'Kf1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/Rn3K1R b kq - 2 8',
        },
        {
          move: 'O-O',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/Rn3RK1 b kq - 2 8',
        },
        {
          move: 'Rg1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/Rn2K1R1 b Qkq - 2 8',
        },
        {
          move: 'Rf1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/Rn2KR2 b Qkq - 2 8',
        },
        {
          move: 'a3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/P1P5/1P2BPPP/Rn2K2R b KQkq - 0 8',
        },
        {
          move: 'a4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/P7/2P5/1P2BPPP/Rn2K2R b KQkq a3 0 8',
        },
        {
          move: 'b3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/1PP5/P3BPPP/Rn2K2R b KQkq - 0 8',
        },
        {
          move: 'b4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/1P6/2P5/P3BPPP/Rn2K2R b KQkq b3 0 8',
        },
        {
          move: 'Bd1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP3PPP/Rn1BK2R b KQkq - 2 8',
        },
        {
          move: 'Bf1',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P5/PP3PPP/Rn2KB1R b KQkq - 2 8',
        },
        {
          move: 'Bd3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2PB4/PP3PPP/Rn2K2R b KQkq - 2 8',
        },
        {
          move: 'Bc4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/2B5/2P5/PP3PPP/Rn2K2R b KQkq - 2 8',
        },
        {
          move: 'Bb5+',
          fen: 'rnbqk2r/ppp1n1pp/8/1Bb5/8/2P5/PP3PPP/Rn2K2R b KQkq - 2 8',
        },
        {
          move: 'Ba6',
          fen: 'rnbqk2r/ppp1n1pp/B7/2b5/8/2P5/PP3PPP/Rn2K2R b KQkq - 2 8',
        },
        {
          move: 'Bf3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P2B2/PP3PPP/Rn2K2R b KQkq - 2 8',
        },
        {
          move: 'Bg4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/6B1/2P5/PP3PPP/Rn2K2R b KQkq - 2 8',
        },
        {
          move: 'Bh5+',
          fen: 'rnbqk2r/ppp1n1pp/8/2b4B/8/2P5/PP3PPP/Rn2K2R b KQkq - 2 8',
        },
        {
          move: 'f3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P2P2/PP2B1PP/Rn2K2R b KQkq - 0 8',
        },
        {
          move: 'f4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/5P2/2P5/PP2B1PP/Rn2K2R b KQkq f3 0 8',
        },
        {
          move: 'g3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P3P1/PP2BP1P/Rn2K2R b KQkq - 0 8',
        },
        {
          move: 'g4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/6P1/2P5/PP2BP1P/Rn2K2R b KQkq g3 0 8',
        },
        {
          move: 'h3',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/8/2P4P/PP2BPP1/Rn2K2R b KQkq - 0 8',
        },
        {
          move: 'h4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/7P/2P5/PP2BPP1/Rn2K2R b KQkq h3 0 8',
        },
        {
          move: 'c4',
          fen: 'rnbqk2r/ppp1n1pp/8/2b5/2P5/8/PP2BPPP/Rn2K2R b KQkq - 0 8',
        },
      ],
    },
    {
      start: {
        fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/Rn2K2R w KQkq - 1 8',
        description: "Can't castle through opposing piece.",
      },
      expected: [
        {
          move: 'Rxb1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/1R2K2R b Kkq - 0 8',
        },
        {
          move: 'Kd1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/Rn1K3R b kq - 2 8',
        },
        {
          move: 'Kf1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/Rn3K1R b kq - 2 8',
        },
        {
          move: 'Kf2',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1NKPP/Rn5R b kq - 2 8',
        },
        {
          move: 'O-O',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/Rn3RK1 b kq - 2 8',
        },
        {
          move: 'Rg1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/Rn2K1R1 b Qkq - 2 8',
        },
        {
          move: 'Rf1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/Rn2KR2 b Qkq - 2 8',
        },
        {
          move: 'a3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/P7/1PP1N1PP/Rn2K2R b KQkq - 0 8',
        },
        {
          move: 'a4',
          fen: 'r3k2r/pp2bppp/2p5/8/P1B5/8/1PP1N1PP/Rn2K2R b KQkq a3 0 8',
        },
        {
          move: 'b3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/1P6/P1P1N1PP/Rn2K2R b KQkq - 0 8',
        },
        {
          move: 'b4',
          fen: 'r3k2r/pp2bppp/2p5/8/1PB5/8/P1P1N1PP/Rn2K2R b KQkq b3 0 8',
        },
        {
          move: 'c3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/2P5/PP2N1PP/Rn2K2R b KQkq - 0 8',
        },
        {
          move: 'Nc1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP3PP/RnN1K2R b KQkq - 2 8',
        },
        {
          move: 'Ng1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP3PP/Rn2K1NR b KQkq - 2 8',
        },
        {
          move: 'Nc3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/2N5/PPP3PP/Rn2K2R b KQkq - 2 8',
        },
        {
          move: 'Ng3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/6N1/PPP3PP/Rn2K2R b KQkq - 2 8',
        },
        {
          move: 'Nd4',
          fen: 'r3k2r/pp2bppp/2p5/8/2BN4/8/PPP3PP/Rn2K2R b KQkq - 2 8',
        },
        {
          move: 'Nf4',
          fen: 'r3k2r/pp2bppp/2p5/8/2B2N2/8/PPP3PP/Rn2K2R b KQkq - 2 8',
        },
        {
          move: 'g3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/6P1/PPP1N2P/Rn2K2R b KQkq - 0 8',
        },
        {
          move: 'g4',
          fen: 'r3k2r/pp2bppp/2p5/8/2B3P1/8/PPP1N2P/Rn2K2R b KQkq g3 0 8',
        },
        {
          move: 'h3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/7P/PPP1N1P1/Rn2K2R b KQkq - 0 8',
        },
        {
          move: 'h4',
          fen: 'r3k2r/pp2bppp/2p5/8/2B4P/8/PPP1N1P1/Rn2K2R b KQkq h3 0 8',
        },
        {
          move: 'Bb3',
          fen: 'r3k2r/pp2bppp/2p5/8/8/1B6/PPP1N1PP/Rn2K2R b KQkq - 2 8',
        },
        {
          move: 'Bd3',
          fen: 'r3k2r/pp2bppp/2p5/8/8/3B4/PPP1N1PP/Rn2K2R b KQkq - 2 8',
        },
        {
          move: 'Bb5',
          fen: 'r3k2r/pp2bppp/2p5/1B6/8/8/PPP1N1PP/Rn2K2R b KQkq - 2 8',
        },
        {
          move: 'Ba6',
          fen: 'r3k2r/pp2bppp/B1p5/8/8/8/PPP1N1PP/Rn2K2R b KQkq - 2 8',
        },
        {
          move: 'Bd5',
          fen: 'r3k2r/pp2bppp/2p5/3B4/8/8/PPP1N1PP/Rn2K2R b KQkq - 2 8',
        },
        {
          move: 'Be6',
          fen: 'r3k2r/pp2bppp/2p1B3/8/8/8/PPP1N1PP/Rn2K2R b KQkq - 2 8',
        },
        {
          move: 'Bxf7+',
          fen: 'r3k2r/pp2bBpp/2p5/8/8/8/PPP1N1PP/Rn2K2R b KQkq - 0 8',
        },
      ],
    },
    {
      description:
        'Transpose of r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/Rn2K2R w KQkq - 1 8',
      start: {
        fen: 'rN2k2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R b KQkq - 1 8',
        description: "Can't castle through opposing piece.",
      },
      expected: [
        {
          move: 'Bb4',
          fen: 'rN2k2r/ppp1n1pp/8/8/1b6/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Ba3',
          fen: 'rN2k2r/ppp1n1pp/8/8/8/b1P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Bd4',
          fen: 'rN2k2r/ppp1n1pp/8/8/3b4/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Be3',
          fen: 'rN2k2r/ppp1n1pp/8/8/8/2P1b3/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Bxf2+',
          fen: 'rN2k2r/ppp1n1pp/8/8/8/2P5/PP2BbPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'Bb6',
          fen: 'rN2k2r/ppp1n1pp/1b6/8/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Bd6',
          fen: 'rN2k2r/ppp1n1pp/3b4/8/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'a6',
          fen: 'rN2k2r/1pp1n1pp/p7/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'a5',
          fen: 'rN2k2r/1pp1n1pp/8/p1b5/8/2P5/PP2BPPP/R3K2R w KQkq a6 0 9',
        },
        {
          move: 'b6',
          fen: 'rN2k2r/p1p1n1pp/1p6/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'b5',
          fen: 'rN2k2r/p1p1n1pp/8/1pb5/8/2P5/PP2BPPP/R3K2R w KQkq b6 0 9',
        },
        {
          move: 'c6',
          fen: 'rN2k2r/pp2n1pp/2p5/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'Nd5',
          fen: 'rN2k2r/ppp3pp/8/2bn4/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Nf5',
          fen: 'rN2k2r/ppp3pp/8/2b2n2/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Nc6',
          fen: 'rN2k2r/ppp3pp/2n5/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Ng6',
          fen: 'rN2k2r/ppp3pp/6n1/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Nc8',
          fen: 'rNn1k2r/ppp3pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Ng8',
          fen: 'rN2k1nr/ppp3pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'g6',
          fen: 'rN2k2r/ppp1n2p/6p1/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'g5',
          fen: 'rN2k2r/ppp1n2p/8/2b3p1/8/2P5/PP2BPPP/R3K2R w KQkq g6 0 9',
        },
        {
          move: 'h6',
          fen: 'rN2k2r/ppp1n1p1/7p/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'h5',
          fen: 'rN2k2r/ppp1n1p1/8/2b4p/8/2P5/PP2BPPP/R3K2R w KQkq h6 0 9',
        },
        {
          move: 'Rxb8',
          fen: '1r2k2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQk - 0 9',
        },
        {
          move: 'Kf7',
          fen: 'rN5r/ppp1nkpp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQ - 2 9',
        },
        {
          move: 'Kd8',
          fen: 'rN1k3r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQ - 2 9',
        },
        {
          move: 'Kf8',
          fen: 'rN3k1r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQ - 2 9',
        },
        {
          move: 'O-O',
          fen: 'rN3rk1/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQ - 2 9',
        },
        {
          move: 'Rg8',
          fen: 'rN2k1r1/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQq - 2 9',
        },
        {
          move: 'Rf8',
          fen: 'rN2kr2/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQq - 2 9',
        },
      ],
    },
    {
      start: {
        fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/R1n1K2R w KQkq - 1 8',
        description: "Can't castle through opposing piece.",
      },
      expected: [
        {
          move: 'Rb1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/1Rn1K2R b Kkq - 2 8',
        },
        {
          move: 'Rxc1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/2R1K2R b Kkq - 0 8',
        },
        {
          move: 'Kd1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/R1nK3R b kq - 2 8',
        },
        {
          move: 'Kf1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/R1n2K1R b kq - 2 8',
        },
        {
          move: 'Kd2',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPPKN1PP/R1n4R b kq - 2 8',
        },
        {
          move: 'Kf2',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1NKPP/R1n4R b kq - 2 8',
        },
        {
          move: 'O-O',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/R1n2RK1 b kq - 2 8',
        },
        {
          move: 'Rg1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/R1n1K1R1 b Qkq - 2 8',
        },
        {
          move: 'Rf1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/R1n1KR2 b Qkq - 2 8',
        },
        {
          move: 'a3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/P7/1PP1N1PP/R1n1K2R b KQkq - 0 8',
        },
        {
          move: 'a4',
          fen: 'r3k2r/pp2bppp/2p5/8/P1B5/8/1PP1N1PP/R1n1K2R b KQkq a3 0 8',
        },
        {
          move: 'b3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/1P6/P1P1N1PP/R1n1K2R b KQkq - 0 8',
        },
        {
          move: 'b4',
          fen: 'r3k2r/pp2bppp/2p5/8/1PB5/8/P1P1N1PP/R1n1K2R b KQkq b3 0 8',
        },
        {
          move: 'c3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/2P5/PP2N1PP/R1n1K2R b KQkq - 0 8',
        },
        {
          move: 'Nxc1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP3PP/R1N1K2R b KQkq - 0 8',
        },
        {
          move: 'Ng1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP3PP/R1n1K1NR b KQkq - 2 8',
        },
        {
          move: 'Nc3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/2N5/PPP3PP/R1n1K2R b KQkq - 2 8',
        },
        {
          move: 'Ng3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/6N1/PPP3PP/R1n1K2R b KQkq - 2 8',
        },
        {
          move: 'Nd4',
          fen: 'r3k2r/pp2bppp/2p5/8/2BN4/8/PPP3PP/R1n1K2R b KQkq - 2 8',
        },
        {
          move: 'Nf4',
          fen: 'r3k2r/pp2bppp/2p5/8/2B2N2/8/PPP3PP/R1n1K2R b KQkq - 2 8',
        },
        {
          move: 'g3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/6P1/PPP1N2P/R1n1K2R b KQkq - 0 8',
        },
        {
          move: 'g4',
          fen: 'r3k2r/pp2bppp/2p5/8/2B3P1/8/PPP1N2P/R1n1K2R b KQkq g3 0 8',
        },
        {
          move: 'h3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/7P/PPP1N1P1/R1n1K2R b KQkq - 0 8',
        },
        {
          move: 'h4',
          fen: 'r3k2r/pp2bppp/2p5/8/2B4P/8/PPP1N1P1/R1n1K2R b KQkq h3 0 8',
        },
        {
          move: 'Bb3',
          fen: 'r3k2r/pp2bppp/2p5/8/8/1B6/PPP1N1PP/R1n1K2R b KQkq - 2 8',
        },
        {
          move: 'Bd3',
          fen: 'r3k2r/pp2bppp/2p5/8/8/3B4/PPP1N1PP/R1n1K2R b KQkq - 2 8',
        },
        {
          move: 'Bb5',
          fen: 'r3k2r/pp2bppp/2p5/1B6/8/8/PPP1N1PP/R1n1K2R b KQkq - 2 8',
        },
        {
          move: 'Ba6',
          fen: 'r3k2r/pp2bppp/B1p5/8/8/8/PPP1N1PP/R1n1K2R b KQkq - 2 8',
        },
        {
          move: 'Bd5',
          fen: 'r3k2r/pp2bppp/2p5/3B4/8/8/PPP1N1PP/R1n1K2R b KQkq - 2 8',
        },
        {
          move: 'Be6',
          fen: 'r3k2r/pp2bppp/2p1B3/8/8/8/PPP1N1PP/R1n1K2R b KQkq - 2 8',
        },
        {
          move: 'Bxf7+',
          fen: 'r3k2r/pp2bBpp/2p5/8/8/8/PPP1N1PP/R1n1K2R b KQkq - 0 8',
        },
      ],
    },
    {
      description:
        'Transpose of r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/R1n1K2R w KQkq - 1 8',
      start: {
        fen: 'r1N1k2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R b KQkq - 1 8',
        description: "Can't castle through opposing piece.",
      },
      expected: [
        {
          move: 'Bb4',
          fen: 'r1N1k2r/ppp1n1pp/8/8/1b6/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Ba3',
          fen: 'r1N1k2r/ppp1n1pp/8/8/8/b1P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Bd4',
          fen: 'r1N1k2r/ppp1n1pp/8/8/3b4/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Be3',
          fen: 'r1N1k2r/ppp1n1pp/8/8/8/2P1b3/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Bxf2+',
          fen: 'r1N1k2r/ppp1n1pp/8/8/8/2P5/PP2BbPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'Bb6',
          fen: 'r1N1k2r/ppp1n1pp/1b6/8/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Bd6',
          fen: 'r1N1k2r/ppp1n1pp/3b4/8/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'a6',
          fen: 'r1N1k2r/1pp1n1pp/p7/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'a5',
          fen: 'r1N1k2r/1pp1n1pp/8/p1b5/8/2P5/PP2BPPP/R3K2R w KQkq a6 0 9',
        },
        {
          move: 'b6',
          fen: 'r1N1k2r/p1p1n1pp/1p6/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'b5',
          fen: 'r1N1k2r/p1p1n1pp/8/1pb5/8/2P5/PP2BPPP/R3K2R w KQkq b6 0 9',
        },
        {
          move: 'c6',
          fen: 'r1N1k2r/pp2n1pp/2p5/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'Nd5',
          fen: 'r1N1k2r/ppp3pp/8/2bn4/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Nf5',
          fen: 'r1N1k2r/ppp3pp/8/2b2n2/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Nc6',
          fen: 'r1N1k2r/ppp3pp/2n5/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Ng6',
          fen: 'r1N1k2r/ppp3pp/6n1/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Nxc8',
          fen: 'r1n1k2r/ppp3pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'Ng8',
          fen: 'r1N1k1nr/ppp3pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'g6',
          fen: 'r1N1k2r/ppp1n2p/6p1/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'g5',
          fen: 'r1N1k2r/ppp1n2p/8/2b3p1/8/2P5/PP2BPPP/R3K2R w KQkq g6 0 9',
        },
        {
          move: 'h6',
          fen: 'r1N1k2r/ppp1n1p1/7p/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'h5',
          fen: 'r1N1k2r/ppp1n1p1/8/2b4p/8/2P5/PP2BPPP/R3K2R w KQkq h6 0 9',
        },
        {
          move: 'Rb8',
          fen: '1rN1k2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQk - 2 9',
        },
        {
          move: 'Rxc8',
          fen: '2r1k2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQk - 0 9',
        },
        {
          move: 'Kd7',
          fen: 'r1N4r/pppkn1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQ - 2 9',
        },
        {
          move: 'Kf7',
          fen: 'r1N4r/ppp1nkpp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQ - 2 9',
        },
        {
          move: 'Kd8',
          fen: 'r1Nk3r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQ - 2 9',
        },
        {
          move: 'Kf8',
          fen: 'r1N2k1r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQ - 2 9',
        },
        {
          move: 'O-O',
          fen: 'r1N2rk1/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQ - 2 9',
        },
        {
          move: 'Rg8',
          fen: 'r1N1k1r1/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQq - 2 9',
        },
        {
          move: 'Rf8',
          fen: 'r1N1kr2/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQq - 2 9',
        },
      ],
    },
    {
      start: {
        fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/R2nK2R w KQkq - 1 8',
        description: "Can't castle through opposing piece.",
      },
      expected: [
        {
          move: 'Rb1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/1R1nK2R b Kkq - 2 8',
        },
        {
          move: 'Rc1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/2RnK2R b Kkq - 2 8',
        },
        {
          move: 'Rxd1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/3RK2R b Kkq - 0 8',
        },
        {
          move: 'Kxd1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/R2K3R b kq - 0 8',
        },
        {
          move: 'Kf1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/R2n1K1R b kq - 2 8',
        },
        {
          move: 'Kd2',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPPKN1PP/R2n3R b kq - 2 8',
        },
        {
          move: 'O-O',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/R2n1RK1 b kq - 2 8',
        },
        {
          move: 'Rg1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/R2nK1R1 b Qkq - 2 8',
        },
        {
          move: 'Rf1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/R2nKR2 b Qkq - 2 8',
        },
        {
          move: 'a3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/P7/1PP1N1PP/R2nK2R b KQkq - 0 8',
        },
        {
          move: 'a4',
          fen: 'r3k2r/pp2bppp/2p5/8/P1B5/8/1PP1N1PP/R2nK2R b KQkq a3 0 8',
        },
        {
          move: 'b3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/1P6/P1P1N1PP/R2nK2R b KQkq - 0 8',
        },
        {
          move: 'b4',
          fen: 'r3k2r/pp2bppp/2p5/8/1PB5/8/P1P1N1PP/R2nK2R b KQkq b3 0 8',
        },
        {
          move: 'c3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/2P5/PP2N1PP/R2nK2R b KQkq - 0 8',
        },
        {
          move: 'Nc1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP3PP/R1NnK2R b KQkq - 2 8',
        },
        {
          move: 'Ng1',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/8/PPP3PP/R2nK1NR b KQkq - 2 8',
        },
        {
          move: 'Nc3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/2N5/PPP3PP/R2nK2R b KQkq - 2 8',
        },
        {
          move: 'Ng3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/6N1/PPP3PP/R2nK2R b KQkq - 2 8',
        },
        {
          move: 'Nd4',
          fen: 'r3k2r/pp2bppp/2p5/8/2BN4/8/PPP3PP/R2nK2R b KQkq - 2 8',
        },
        {
          move: 'Nf4',
          fen: 'r3k2r/pp2bppp/2p5/8/2B2N2/8/PPP3PP/R2nK2R b KQkq - 2 8',
        },
        {
          move: 'g3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/6P1/PPP1N2P/R2nK2R b KQkq - 0 8',
        },
        {
          move: 'g4',
          fen: 'r3k2r/pp2bppp/2p5/8/2B3P1/8/PPP1N2P/R2nK2R b KQkq g3 0 8',
        },
        {
          move: 'h3',
          fen: 'r3k2r/pp2bppp/2p5/8/2B5/7P/PPP1N1P1/R2nK2R b KQkq - 0 8',
        },
        {
          move: 'h4',
          fen: 'r3k2r/pp2bppp/2p5/8/2B4P/8/PPP1N1P1/R2nK2R b KQkq h3 0 8',
        },
        {
          move: 'Bb3',
          fen: 'r3k2r/pp2bppp/2p5/8/8/1B6/PPP1N1PP/R2nK2R b KQkq - 2 8',
        },
        {
          move: 'Bd3',
          fen: 'r3k2r/pp2bppp/2p5/8/8/3B4/PPP1N1PP/R2nK2R b KQkq - 2 8',
        },
        {
          move: 'Bb5',
          fen: 'r3k2r/pp2bppp/2p5/1B6/8/8/PPP1N1PP/R2nK2R b KQkq - 2 8',
        },
        {
          move: 'Ba6',
          fen: 'r3k2r/pp2bppp/B1p5/8/8/8/PPP1N1PP/R2nK2R b KQkq - 2 8',
        },
        {
          move: 'Bd5',
          fen: 'r3k2r/pp2bppp/2p5/3B4/8/8/PPP1N1PP/R2nK2R b KQkq - 2 8',
        },
        {
          move: 'Be6',
          fen: 'r3k2r/pp2bppp/2p1B3/8/8/8/PPP1N1PP/R2nK2R b KQkq - 2 8',
        },
        {
          move: 'Bxf7+',
          fen: 'r3k2r/pp2bBpp/2p5/8/8/8/PPP1N1PP/R2nK2R b KQkq - 0 8',
        },
      ],
    },
    {
      description:
        'Transpose of r3k2r/pp2bppp/2p5/8/2B5/8/PPP1N1PP/R2nK2R w KQkq - 1 8',
      start: {
        fen: 'r2Nk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R b KQkq - 1 8',
        description: "Can't castle through opposing piece.",
      },
      expected: [
        {
          move: 'Bb4',
          fen: 'r2Nk2r/ppp1n1pp/8/8/1b6/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Ba3',
          fen: 'r2Nk2r/ppp1n1pp/8/8/8/b1P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Bd4',
          fen: 'r2Nk2r/ppp1n1pp/8/8/3b4/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Be3',
          fen: 'r2Nk2r/ppp1n1pp/8/8/8/2P1b3/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Bxf2+',
          fen: 'r2Nk2r/ppp1n1pp/8/8/8/2P5/PP2BbPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'Bb6',
          fen: 'r2Nk2r/ppp1n1pp/1b6/8/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Bd6',
          fen: 'r2Nk2r/ppp1n1pp/3b4/8/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'a6',
          fen: 'r2Nk2r/1pp1n1pp/p7/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'a5',
          fen: 'r2Nk2r/1pp1n1pp/8/p1b5/8/2P5/PP2BPPP/R3K2R w KQkq a6 0 9',
        },
        {
          move: 'b6',
          fen: 'r2Nk2r/p1p1n1pp/1p6/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'b5',
          fen: 'r2Nk2r/p1p1n1pp/8/1pb5/8/2P5/PP2BPPP/R3K2R w KQkq b6 0 9',
        },
        {
          move: 'c6',
          fen: 'r2Nk2r/pp2n1pp/2p5/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'Nd5',
          fen: 'r2Nk2r/ppp3pp/8/2bn4/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Nf5',
          fen: 'r2Nk2r/ppp3pp/8/2b2n2/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Nc6',
          fen: 'r2Nk2r/ppp3pp/2n5/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Ng6',
          fen: 'r2Nk2r/ppp3pp/6n1/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Nc8',
          fen: 'r1nNk2r/ppp3pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'Ng8',
          fen: 'r2Nk1nr/ppp3pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 2 9',
        },
        {
          move: 'g6',
          fen: 'r2Nk2r/ppp1n2p/6p1/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'g5',
          fen: 'r2Nk2r/ppp1n2p/8/2b3p1/8/2P5/PP2BPPP/R3K2R w KQkq g6 0 9',
        },
        {
          move: 'h6',
          fen: 'r2Nk2r/ppp1n1p1/7p/2b5/8/2P5/PP2BPPP/R3K2R w KQkq - 0 9',
        },
        {
          move: 'h5',
          fen: 'r2Nk2r/ppp1n1p1/8/2b4p/8/2P5/PP2BPPP/R3K2R w KQkq h6 0 9',
        },
        {
          move: 'Rb8',
          fen: '1r1Nk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQk - 2 9',
        },
        {
          move: 'Rc8',
          fen: '2rNk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQk - 2 9',
        },
        {
          move: 'Rxd8',
          fen: '3rk2r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQk - 0 9',
        },
        {
          move: 'Kd7',
          fen: 'r2N3r/pppkn1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQ - 2 9',
        },
        {
          move: 'Kxd8',
          fen: 'r2k3r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQ - 0 9',
        },
        {
          move: 'Kf8',
          fen: 'r2N1k1r/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQ - 2 9',
        },
        {
          move: 'O-O',
          fen: 'r2N1rk1/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQ - 2 9',
        },
        {
          move: 'Rg8',
          fen: 'r2Nk1r1/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQq - 2 9',
        },
        {
          move: 'Rf8',
          fen: 'r2Nkr2/ppp1n1pp/8/2b5/8/2P5/PP2BPPP/R3K2R w KQq - 2 9',
        },
      ],
    },
    {
      start: {
        fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R b KQ - 1 8',
        description:
          'From https://www.youtube.com/watch?v=U4ogK0MIzqk&ab_channel=SebastianLague&t=10m10s',
      },
      expected: [
        {
          move: 'Nxd1',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1N1PP/RNBnK2R w KQ - 0 9',
        },
        {
          move: 'Nxh1',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1N1PP/RNBQK2n w Q - 0 9',
        },
        {
          move: 'Nd3+',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/3n4/PPP1N1PP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Nh3',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B5/7n/PPP1N1PP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Ne4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B1n3/8/PPP1N1PP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Ng4',
          fen: 'rnbq1k1r/pp1Pbppp/2p5/8/2B3n1/8/PPP1N1PP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'c5',
          fen: 'rnbq1k1r/pp1Pbppp/8/2p5/2B5/8/PPP1NnPP/RNBQK2R w KQ - 0 9',
        },
        {
          move: 'a6',
          fen: 'rnbq1k1r/1p1Pbppp/p1p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 0 9',
        },
        {
          move: 'a5',
          fen: 'rnbq1k1r/1p1Pbppp/2p5/p7/2B5/8/PPP1NnPP/RNBQK2R w KQ a6 0 9',
        },
        {
          move: 'b6',
          fen: 'rnbq1k1r/p2Pbppp/1pp5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 0 9',
        },
        {
          move: 'b5',
          fen: 'rnbq1k1r/p2Pbppp/2p5/1p6/2B5/8/PPP1NnPP/RNBQK2R w KQ b6 0 9',
        },
        {
          move: 'Bd6',
          fen: 'rnbq1k1r/pp1P1ppp/2pb4/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Bc5',
          fen: 'rnbq1k1r/pp1P1ppp/2p5/2b5/2B5/8/PPP1NnPP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Bb4+',
          fen: 'rnbq1k1r/pp1P1ppp/2p5/8/1bB5/8/PPP1NnPP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Ba3',
          fen: 'rnbq1k1r/pp1P1ppp/2p5/8/2B5/b7/PPP1NnPP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Bf6',
          fen: 'rnbq1k1r/pp1P1ppp/2p2b2/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Bg5',
          fen: 'rnbq1k1r/pp1P1ppp/2p5/6b1/2B5/8/PPP1NnPP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Bh4',
          fen: 'rnbq1k1r/pp1P1ppp/2p5/8/2B4b/8/PPP1NnPP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'f6',
          fen: 'rnbq1k1r/pp1Pb1pp/2p2p2/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 0 9',
        },
        {
          move: 'f5',
          fen: 'rnbq1k1r/pp1Pb1pp/2p5/5p2/2B5/8/PPP1NnPP/RNBQK2R w KQ f6 0 9',
        },
        {
          move: 'g6',
          fen: 'rnbq1k1r/pp1Pbp1p/2p3p1/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 0 9',
        },
        {
          move: 'g5',
          fen: 'rnbq1k1r/pp1Pbp1p/2p5/6p1/2B5/8/PPP1NnPP/RNBQK2R w KQ g6 0 9',
        },
        {
          move: 'h6',
          fen: 'rnbq1k1r/pp1Pbpp1/2p4p/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 0 9',
        },
        {
          move: 'h5',
          fen: 'rnbq1k1r/pp1Pbpp1/2p5/7p/2B5/8/PPP1NnPP/RNBQK2R w KQ h6 0 9',
        },
        {
          move: 'Na6',
          fen: 'r1bq1k1r/pp1Pbppp/n1p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Nxd7',
          fen: 'r1bq1k1r/pp1nbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 0 9',
        },
        {
          move: 'Bxd7',
          fen: 'rn1q1k1r/pp1bbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 0 9',
        },
        {
          move: 'Qc7',
          fen: 'rnb2k1r/ppqPbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Qb6',
          fen: 'rnb2k1r/pp1Pbppp/1qp5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Qa5+',
          fen: 'rnb2k1r/pp1Pbppp/2p5/q7/2B5/8/PPP1NnPP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Qxd7',
          fen: 'rnb2k1r/pp1qbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 0 9',
        },
        {
          move: 'Qe8',
          fen: 'rnb1qk1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Kg8',
          fen: 'rnbq2kr/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 2 9',
        },
        {
          move: 'Rg8',
          fen: 'rnbq1kr1/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 2 9',
        },
      ],
    },
    {
      description:
        'Transpose of rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R b KQ - 1 8',
      start: {
        fen: 'rnbqk2r/ppp1nNpp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R w kq - 1 8',
        description:
          'From https://www.youtube.com/watch?v=U4ogK0MIzqk&ab_channel=SebastianLague&t=10m10s',
      },
      expected: [
        {
          move: 'Nxd2',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/8/2P5/PP1NBPPP/R1BQ1K1R b kq - 0 8',
        },
        {
          move: 'Na3',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/8/N1P5/PP1pBPPP/R1BQ1K1R b kq - 2 8',
        },
        {
          move: 'Bxd2',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/8/2P5/PP1BBPPP/RN1Q1K1R b kq - 0 8',
        },
        {
          move: 'Qe1',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/8/2P5/PP1pBPPP/RNB1QK1R b kq - 2 8',
        },
        {
          move: 'Qc2',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/8/2P5/PPQpBPPP/RNB2K1R b kq - 2 8',
        },
        {
          move: 'Qb3',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/8/1QP5/PP1pBPPP/RNB2K1R b kq - 2 8',
        },
        {
          move: 'Qa4+',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/Q7/2P5/PP1pBPPP/RNB2K1R b kq - 2 8',
        },
        {
          move: 'Qxd2',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/8/2P5/PP1QBPPP/RNB2K1R b kq - 0 8',
        },
        {
          move: 'Kg1',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/8/2P5/PP1pBPPP/RNBQ2KR b kq - 2 8',
        },
        {
          move: 'Rg1',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/8/2P5/PP1pBPPP/RNBQ1KR1 b kq - 2 8',
        },
        {
          move: 'a3',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/8/P1P5/1P1pBPPP/RNBQ1K1R b kq - 0 8',
        },
        {
          move: 'a4',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/P7/2P5/1P1pBPPP/RNBQ1K1R b kq a3 0 8',
        },
        {
          move: 'b3',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/8/1PP5/P2pBPPP/RNBQ1K1R b kq - 0 8',
        },
        {
          move: 'b4',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/1P6/2P5/P2pBPPP/RNBQ1K1R b kq b3 0 8',
        },
        {
          move: 'Bd3',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/8/2PB4/PP1p1PPP/RNBQ1K1R b kq - 2 8',
        },
        {
          move: 'Bc4',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/2B5/2P5/PP1p1PPP/RNBQ1K1R b kq - 2 8',
        },
        {
          move: 'Bb5+',
          fen: 'rnbqk2r/ppp1nNpp/8/1Bb5/8/2P5/PP1p1PPP/RNBQ1K1R b kq - 2 8',
        },
        {
          move: 'Ba6',
          fen: 'rnbqk2r/ppp1nNpp/B7/2b5/8/2P5/PP1p1PPP/RNBQ1K1R b kq - 2 8',
        },
        {
          move: 'Bf3',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/8/2P2B2/PP1p1PPP/RNBQ1K1R b kq - 2 8',
        },
        {
          move: 'Bg4',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/6B1/2P5/PP1p1PPP/RNBQ1K1R b kq - 2 8',
        },
        {
          move: 'Bh5',
          fen: 'rnbqk2r/ppp1nNpp/8/2b4B/8/2P5/PP1p1PPP/RNBQ1K1R b kq - 2 8',
        },
        {
          move: 'f3',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/8/2P2P2/PP1pB1PP/RNBQ1K1R b kq - 0 8',
        },
        {
          move: 'f4',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/5P2/2P5/PP1pB1PP/RNBQ1K1R b kq f3 0 8',
        },
        {
          move: 'g3',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/8/2P3P1/PP1pBP1P/RNBQ1K1R b kq - 0 8',
        },
        {
          move: 'g4',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/6P1/2P5/PP1pBP1P/RNBQ1K1R b kq g3 0 8',
        },
        {
          move: 'h3',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/8/2P4P/PP1pBPP1/RNBQ1K1R b kq - 0 8',
        },
        {
          move: 'h4',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/7P/2P5/PP1pBPP1/RNBQ1K1R b kq h3 0 8',
        },
        {
          move: 'c4',
          fen: 'rnbqk2r/ppp1nNpp/8/2b5/2P5/8/PP1pBPPP/RNBQ1K1R b kq - 0 8',
        },
        {
          move: 'Ne5',
          fen: 'rnbqk2r/ppp1n1pp/8/2b1N3/8/2P5/PP1pBPPP/RNBQ1K1R b kq - 2 8',
        },
        {
          move: 'Ng5',
          fen: 'rnbqk2r/ppp1n1pp/8/2b3N1/8/2P5/PP1pBPPP/RNBQ1K1R b kq - 2 8',
        },
        {
          move: 'Nd6+',
          fen: 'rnbqk2r/ppp1n1pp/3N4/2b5/8/2P5/PP1pBPPP/RNBQ1K1R b kq - 2 8',
        },
        {
          move: 'Nh6',
          fen: 'rnbqk2r/ppp1n1pp/7N/2b5/8/2P5/PP1pBPPP/RNBQ1K1R b kq - 2 8',
        },
        {
          move: 'Nxd8',
          fen: 'rnbNk2r/ppp1n1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R b kq - 0 8',
        },
        {
          move: 'Nxh8',
          fen: 'rnbqk2N/ppp1n1pp/8/2b5/8/2P5/PP1pBPPP/RNBQ1K1R b q - 0 8',
        },
      ],
    },
  ],
};
