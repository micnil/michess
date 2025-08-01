import { TestCases } from './TestCases';

export const checkmatesTestCases: TestCases = {
  testCases: [
    {
      start: {
        fen: '1R3k2/2R5/8/8/8/1K6/8/8 b - - 0 1',
        description: 'Black has been ladder-mated.',
      },
      expected: [],
    },
    {
      description: 'Transpose of 1R3k2/2R5/8/8/8/1K6/8/8 b - - 0 1',
      start: {
        fen: '8/8/1k6/8/8/8/2r5/1r3K2 w - - 0 1',
        description: 'White has been ladder-mated.',
      },
      expected: [],
    },
    {
      start: {
        fen: '8/6N1/3R4/6k1/5Pp1/1K2P3/8/4B1R1 b - f3 0 1',
        description: "Black can't capture en passant so is mated.",
      },
      expected: [],
    },
    {
      description: 'Transpose of 8/6N1/3R4/6k1/5Pp1/1K2P3/8/4B1R1 b - f3 0 1',
      start: {
        fen: '4b1r1/8/1k2p3/5pP1/6K1/3r4/6n1/8 w - f6 0 1',
        description: "White can't capture en passant so is mated.",
      },
      expected: [],
    },
    {
      start: {
        fen: 'kr6/ppN5/8/8/8/8/2K5/8 b - - 0 1',
        description: 'Black has been smother mated.',
      },
      expected: [],
    },
    {
      description: 'Transpose of kr6/ppN5/8/8/8/8/2K5/8 b - - 0 1',
      start: {
        fen: '8/2k5/8/8/8/8/PPn5/KR6 w - - 0 1',
        description: 'White has been smother mated.',
      },
      expected: [],
    },
    {
      start: {
        fen: 'k1K5/p1N5/8/8/8/8/8/8 b - - 0 1',
        description: 'A little-known mate with minimal pieces.',
      },
      expected: [],
    },
    {
      description: 'Transpose of k1K5/p1N5/8/8/8/8/8/8 b - - 0 1',
      start: {
        fen: '8/8/8/8/8/8/P1n5/K1k5 w - - 0 1',
        description: 'A little-known mate with minimal pieces.',
      },
      expected: [],
    },
  ],
};
