import { TestCases } from './TestCases';

export const stalematesTestCases: TestCases = {
  testCases: [
    {
      start: {
        fen: 'k7/1R6/2K5/8/8/8/8/8 b - - 0 1',
      },
      expected: [],
    },
    {
      description: 'Transpose of k7/1R6/2K5/8/8/8/8/8 b - - 0 1',
      start: {
        fen: '8/8/8/8/8/2k5/1r6/K7 w - - 0 1',
      },
      expected: [],
    },
    {
      start: {
        fen: 'k7/8/2N5/8/8/2K5/1R6/8 b - - 0 1',
      },
      expected: [],
    },
    {
      description: 'Transpose of k7/8/2N5/8/8/2K5/1R6/8 b - - 0 1',
      start: {
        fen: '8/1r6/2k5/8/8/2n5/8/K7 w - - 0 1',
      },
      expected: [],
    },
    {
      start: {
        fen: 'k7/2Q5/8/8/8/2K5/8/8 b - - 0 1',
      },
      expected: [],
    },
    {
      description: 'Transpose of k7/2Q5/8/8/8/2K5/8/8 b - - 0 1',
      start: {
        fen: '8/8/2k5/8/8/8/2q5/K7 w - - 0 1',
      },
      expected: [],
    },
    {
      start: {
        fen: '8/8/5R2/4k1P1/3R4/2K5/8/8 b - - 0 1',
        description: '',
      },
      expected: [],
    },
    {
      description: 'Transpose of 8/8/5R2/4k1P1/3R4/2K5/8/8 b - - 0 1',
      start: {
        fen: '8/8/2k5/3r4/4K1p1/5r2/8/8 w - - 0 1',
        description: '',
      },
      expected: [],
    },
    {
      start: {
        fen: '5bnr/4p1pq/4Qpkr/7p/7P/4P3/PPPP1PP1/RNB1KBNR b KQ - 2 10',
        description:
          'The shortest stalemate possible from the opening position.',
      },
      expected: [],
    },
    {
      description:
        'Transpose of 5bnr/4p1pq/4Qpkr/7p/7P/4P3/PPPP1PP1/RNB1KBNR b KQ - 2 10',
      start: {
        fen: 'rnb1kbnr/pppp1pp1/4p3/7p/7P/4qPKR/4P1PQ/5BNR w kq - 2 10',
        description:
          'The shortest stalemate possible from the opening position.',
      },
      expected: [],
    },
    {
      start: {
        fen: '8/8/R7/4k3/4Pp2/2P2P2/7B/1K6 b - e3 0 1',
        description: '',
      },
      expected: [],
    },
    {
      description: 'Transpose of 8/8/R7/4k3/4Pp2/2P2P2/7B/1K6 b - e3 0 1',
      start: {
        fen: '1k6/7b/2p2p2/4pP2/4K3/r7/8/8 w - e6 0 1',
      },
      expected: [],
    },
  ],
};
