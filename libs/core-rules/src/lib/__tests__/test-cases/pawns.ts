import { TestCases } from './TestCases';

export const pawnsTestCases: TestCases = {
  description: 'Test cases involving pawns.',
  testCases: [
    {
      start: {
        fen: '7k/8/8/8/pPp5/8/8/7K b - b3 0 1',
        description: 'Two possible en passant capture possibilities.',
      },
      expected: [
        {
          move: 'a3',
          fen: '7k/8/8/8/1Pp5/p7/8/7K w - - 0 2',
        },
        {
          move: 'axb3',
          fen: '7k/8/8/8/2p5/1p6/8/7K w - - 0 2',
        },
        {
          move: 'c3',
          fen: '7k/8/8/8/pP6/2p5/8/7K w - - 0 2',
        },
        {
          move: 'cxb3',
          fen: '7k/8/8/8/p7/1p6/8/7K w - - 0 2',
        },
        {
          move: 'Kg7',
          fen: '8/6k1/8/8/pPp5/8/8/7K w - - 1 2',
        },
        {
          move: 'Kh7',
          fen: '8/7k/8/8/pPp5/8/8/7K w - - 1 2',
        },
        {
          move: 'Kg8',
          fen: '6k1/8/8/8/pPp5/8/8/7K w - - 1 2',
        },
      ],
    },
    {
      description: 'Transpose of 7k/8/8/8/pPp5/8/8/7K b - b3 0 1',
      start: {
        fen: '7k/8/8/PpP5/8/8/8/7K w - b6 0 1',
        description: 'Two possible en passant capture possibilities.',
      },
      expected: [
        {
          move: 'Kg1',
          fen: '7k/8/8/PpP5/8/8/8/6K1 b - - 1 1',
        },
        {
          move: 'Kg2',
          fen: '7k/8/8/PpP5/8/8/6K1/8 b - - 1 1',
        },
        {
          move: 'Kh2',
          fen: '7k/8/8/PpP5/8/8/7K/8 b - - 1 1',
        },
        {
          move: 'a6',
          fen: '7k/8/P7/1pP5/8/8/8/7K b - - 0 1',
        },
        {
          move: 'axb6',
          fen: '7k/8/1P6/2P5/8/8/8/7K b - - 0 1',
        },
        {
          move: 'c6',
          fen: '7k/8/2P5/Pp6/8/8/8/7K b - - 0 1',
        },
        {
          move: 'cxb6',
          fen: '7k/8/1P6/P7/8/8/8/7K b - - 0 1',
        },
      ],
    },
    {
      start: {
        fen: '7k/8/8/8/pPp5/8/8/7K b - - 0 1',
        description:
          'Same position but without the en passant capture possibilities.',
      },
      expected: [
        {
          move: 'a3',
          fen: '7k/8/8/8/1Pp5/p7/8/7K w - - 0 2',
        },
        {
          move: 'c3',
          fen: '7k/8/8/8/pP6/2p5/8/7K w - - 0 2',
        },
        {
          move: 'Kg7',
          fen: '8/6k1/8/8/pPp5/8/8/7K w - - 1 2',
        },
        {
          move: 'Kh7',
          fen: '8/7k/8/8/pPp5/8/8/7K w - - 1 2',
        },
        {
          move: 'Kg8',
          fen: '6k1/8/8/8/pPp5/8/8/7K w - - 1 2',
        },
      ],
    },
    {
      description: 'Transpose of 7k/8/8/8/pPp5/8/8/7K b - - 0 1',
      start: {
        fen: '7k/8/8/PpP5/8/8/8/7K w - - 0 1',
        description:
          'Same position but without the en passant capture possibilities.',
      },
      expected: [
        {
          move: 'Kg1',
          fen: '7k/8/8/PpP5/8/8/8/6K1 b - - 1 1',
        },
        {
          move: 'Kg2',
          fen: '7k/8/8/PpP5/8/8/6K1/8 b - - 1 1',
        },
        {
          move: 'Kh2',
          fen: '7k/8/8/PpP5/8/8/7K/8 b - - 1 1',
        },
        {
          move: 'a6',
          fen: '7k/8/P7/1pP5/8/8/8/7K b - - 0 1',
        },
        {
          move: 'c6',
          fen: '7k/8/2P5/Pp6/8/8/8/7K b - - 0 1',
        },
      ],
    },
    {
      start: {
        fen: '8/4k3/1p1p1p1p/pPpPpPpP/P1P1P1P1/8/5K2/8 w - - 0 1',
        description: 'Full set of pawns but no moves.',
      },
      expected: [
        {
          move: 'Ke1',
          fen: '8/4k3/1p1p1p1p/pPpPpPpP/P1P1P1P1/8/8/4K3 b - - 1 1',
        },
        {
          move: 'Kf1',
          fen: '8/4k3/1p1p1p1p/pPpPpPpP/P1P1P1P1/8/8/5K2 b - - 1 1',
        },
        {
          move: 'Kg1',
          fen: '8/4k3/1p1p1p1p/pPpPpPpP/P1P1P1P1/8/8/6K1 b - - 1 1',
        },
        {
          move: 'Ke2',
          fen: '8/4k3/1p1p1p1p/pPpPpPpP/P1P1P1P1/8/4K3/8 b - - 1 1',
        },
        {
          move: 'Kg2',
          fen: '8/4k3/1p1p1p1p/pPpPpPpP/P1P1P1P1/8/6K1/8 b - - 1 1',
        },
        {
          move: 'Ke3',
          fen: '8/4k3/1p1p1p1p/pPpPpPpP/P1P1P1P1/4K3/8/8 b - - 1 1',
        },
        {
          move: 'Kf3',
          fen: '8/4k3/1p1p1p1p/pPpPpPpP/P1P1P1P1/5K2/8/8 b - - 1 1',
        },
        {
          move: 'Kg3',
          fen: '8/4k3/1p1p1p1p/pPpPpPpP/P1P1P1P1/6K1/8/8 b - - 1 1',
        },
      ],
    },
    {
      description:
        'Transpose of 8/4k3/1p1p1p1p/pPpPpPpP/P1P1P1P1/8/5K2/8 w - - 0 1',
      start: {
        fen: '8/5k2/8/p1p1p1p1/PpPpPpPp/1P1P1P1P/4K3/8 b - - 0 1',
        description: 'Full set of pawns but no moves.',
      },
      expected: [
        {
          move: 'Ke6',
          fen: '8/8/4k3/p1p1p1p1/PpPpPpPp/1P1P1P1P/4K3/8 w - - 1 2',
        },
        {
          move: 'Kf6',
          fen: '8/8/5k2/p1p1p1p1/PpPpPpPp/1P1P1P1P/4K3/8 w - - 1 2',
        },
        {
          move: 'Kg6',
          fen: '8/8/6k1/p1p1p1p1/PpPpPpPp/1P1P1P1P/4K3/8 w - - 1 2',
        },
        {
          move: 'Ke7',
          fen: '8/4k3/8/p1p1p1p1/PpPpPpPp/1P1P1P1P/4K3/8 w - - 1 2',
        },
        {
          move: 'Kg7',
          fen: '8/6k1/8/p1p1p1p1/PpPpPpPp/1P1P1P1P/4K3/8 w - - 1 2',
        },
        {
          move: 'Ke8',
          fen: '4k3/8/8/p1p1p1p1/PpPpPpPp/1P1P1P1P/4K3/8 w - - 1 2',
        },
        {
          move: 'Kf8',
          fen: '5k2/8/8/p1p1p1p1/PpPpPpPp/1P1P1P1P/4K3/8 w - - 1 2',
        },
        {
          move: 'Kg8',
          fen: '6k1/8/8/p1p1p1p1/PpPpPpPp/1P1P1P1P/4K3/8 w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '8/8/4k3/8/2pPp3/8/B7/7K b - d3 0 1',
        description:
          'Black has two en passant possibilities, but only one is legal.',
      },
      expected: [
        {
          move: 'e3',
          fen: '8/8/4k3/8/2pP4/4p3/B7/7K w - - 0 2',
        },
        {
          move: 'exd3',
          fen: '8/8/4k3/8/2p5/3p4/B7/7K w - - 0 2',
        },
        {
          move: 'Kd5',
          fen: '8/8/8/3k4/2pPp3/8/B7/7K w - - 1 2',
        },
        {
          move: 'Kf5',
          fen: '8/8/8/5k2/2pPp3/8/B7/7K w - - 1 2',
        },
        {
          move: 'Kd6',
          fen: '8/8/3k4/8/2pPp3/8/B7/7K w - - 1 2',
        },
        {
          move: 'Kf6',
          fen: '8/8/5k2/8/2pPp3/8/B7/7K w - - 1 2',
        },
        {
          move: 'Kd7',
          fen: '8/3k4/8/8/2pPp3/8/B7/7K w - - 1 2',
        },
        {
          move: 'Ke7',
          fen: '8/4k3/8/8/2pPp3/8/B7/7K w - - 1 2',
        },
        {
          move: 'Kf7',
          fen: '8/5k2/8/8/2pPp3/8/B7/7K w - - 1 2',
        },
      ],
    },
    {
      description: 'Transpose of 8/8/4k3/8/2pPp3/8/B7/7K b - d3 0 1',
      start: {
        fen: '7k/b7/8/2PpP3/8/4K3/8/8 w - d6 0 1',
        description:
          'White has two en passant possibilities, but only one is legal.',
      },
      expected: [
        {
          move: 'Kd2',
          fen: '7k/b7/8/2PpP3/8/8/3K4/8 b - - 1 1',
        },
        {
          move: 'Ke2',
          fen: '7k/b7/8/2PpP3/8/8/4K3/8 b - - 1 1',
        },
        {
          move: 'Kf2',
          fen: '7k/b7/8/2PpP3/8/8/5K2/8 b - - 1 1',
        },
        {
          move: 'Kd3',
          fen: '7k/b7/8/2PpP3/8/3K4/8/8 b - - 1 1',
        },
        {
          move: 'Kf3',
          fen: '7k/b7/8/2PpP3/8/5K2/8/8 b - - 1 1',
        },
        {
          move: 'Kd4',
          fen: '7k/b7/8/2PpP3/3K4/8/8/8 b - - 1 1',
        },
        {
          move: 'Kf4',
          fen: '7k/b7/8/2PpP3/5K2/8/8/8 b - - 1 1',
        },
        {
          move: 'e6',
          fen: '7k/b7/4P3/2Pp4/8/4K3/8/8 b - - 0 1',
        },
        {
          move: 'exd6',
          fen: '7k/b7/3P4/2P5/8/4K3/8/8 b - - 0 1',
        },
      ],
    },
  ],
};
