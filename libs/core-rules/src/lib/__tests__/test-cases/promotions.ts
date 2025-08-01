import { TestCases } from './TestCases';

export const promotionsTestCases: TestCases = {
  description: 'Test cases involving pawn promotions.',
  testCases: [
    {
      start: {
        fen: '1k6/5P2/8/8/8/8/8/4K3 w - - 20 1',
        description:
          'A simple promotion, with some chances to check opposing king.',
      },
      expected: [
        {
          move: 'Kd1',
          fen: '1k6/5P2/8/8/8/8/8/3K4 b - - 21 1',
        },
        {
          move: 'Kf1',
          fen: '1k6/5P2/8/8/8/8/8/5K2 b - - 21 1',
        },
        {
          move: 'Kd2',
          fen: '1k6/5P2/8/8/8/8/3K4/8 b - - 21 1',
        },
        {
          move: 'Ke2',
          fen: '1k6/5P2/8/8/8/8/4K3/8 b - - 21 1',
        },
        {
          move: 'Kf2',
          fen: '1k6/5P2/8/8/8/8/5K2/8 b - - 21 1',
        },
        {
          move: 'f8=Q+',
          fen: '1k3Q2/8/8/8/8/8/8/4K3 b - - 0 1',
        },
        {
          move: 'f8=R+',
          fen: '1k3R2/8/8/8/8/8/8/4K3 b - - 0 1',
        },
        {
          move: 'f8=N',
          fen: '1k3N2/8/8/8/8/8/8/4K3 b - - 0 1',
        },
        {
          move: 'f8=B',
          fen: '1k3B2/8/8/8/8/8/8/4K3 b - - 0 1',
        },
      ],
    },
    {
      description: 'Transpose of 1k6/5P2/8/8/8/8/8/4K3 w - - 20 1',
      start: {
        fen: '4k3/8/8/8/8/8/5p2/1K6 b - - 20 1',
        description:
          'A simple promotion, with some chances to check opposing king.',
      },
      expected: [
        {
          move: 'f1=Q+',
          fen: '4k3/8/8/8/8/8/8/1K3q2 w - - 0 2',
        },
        {
          move: 'f1=R+',
          fen: '4k3/8/8/8/8/8/8/1K3r2 w - - 0 2',
        },
        {
          move: 'f1=N',
          fen: '4k3/8/8/8/8/8/8/1K3n2 w - - 0 2',
        },
        {
          move: 'f1=B',
          fen: '4k3/8/8/8/8/8/8/1K3b2 w - - 0 2',
        },
        {
          move: 'Kd7',
          fen: '8/3k4/8/8/8/8/5p2/1K6 w - - 21 2',
        },
        {
          move: 'Ke7',
          fen: '8/4k3/8/8/8/8/5p2/1K6 w - - 21 2',
        },
        {
          move: 'Kf7',
          fen: '8/5k2/8/8/8/8/5p2/1K6 w - - 21 2',
        },
        {
          move: 'Kd8',
          fen: '3k4/8/8/8/8/8/5p2/1K6 w - - 21 2',
        },
        {
          move: 'Kf8',
          fen: '5k2/8/8/8/8/8/5p2/1K6 w - - 21 2',
        },
      ],
    },
    {
      start: {
        fen: '3k4/8/1K6/8/8/8/pppppppp/RRRRRRRR b - - 0 1',
        description: 'Eight black pawns all promoting via capture.',
      },
      expected: [
        {
          move: 'axb1=Q',
          fen: '3k4/8/1K6/8/8/8/1ppppppp/RqRRRRRR w - - 0 2',
        },
        {
          move: 'axb1=R',
          fen: '3k4/8/1K6/8/8/8/1ppppppp/RrRRRRRR w - - 0 2',
        },
        {
          move: 'axb1=N',
          fen: '3k4/8/1K6/8/8/8/1ppppppp/RnRRRRRR w - - 0 2',
        },
        {
          move: 'axb1=B',
          fen: '3k4/8/1K6/8/8/8/1ppppppp/RbRRRRRR w - - 0 2',
        },
        {
          move: 'bxa1=Q',
          fen: '3k4/8/1K6/8/8/8/p1pppppp/qRRRRRRR w - - 0 2',
        },
        {
          move: 'bxa1=R',
          fen: '3k4/8/1K6/8/8/8/p1pppppp/rRRRRRRR w - - 0 2',
        },
        {
          move: 'bxa1=N',
          fen: '3k4/8/1K6/8/8/8/p1pppppp/nRRRRRRR w - - 0 2',
        },
        {
          move: 'bxa1=B',
          fen: '3k4/8/1K6/8/8/8/p1pppppp/bRRRRRRR w - - 0 2',
        },
        {
          move: 'bxc1=Q',
          fen: '3k4/8/1K6/8/8/8/p1pppppp/RRqRRRRR w - - 0 2',
        },
        {
          move: 'bxc1=R',
          fen: '3k4/8/1K6/8/8/8/p1pppppp/RRrRRRRR w - - 0 2',
        },
        {
          move: 'bxc1=N',
          fen: '3k4/8/1K6/8/8/8/p1pppppp/RRnRRRRR w - - 0 2',
        },
        {
          move: 'bxc1=B',
          fen: '3k4/8/1K6/8/8/8/p1pppppp/RRbRRRRR w - - 0 2',
        },
        {
          move: 'cxb1=Q',
          fen: '3k4/8/1K6/8/8/8/pp1ppppp/RqRRRRRR w - - 0 2',
        },
        {
          move: 'cxb1=R',
          fen: '3k4/8/1K6/8/8/8/pp1ppppp/RrRRRRRR w - - 0 2',
        },
        {
          move: 'cxb1=N',
          fen: '3k4/8/1K6/8/8/8/pp1ppppp/RnRRRRRR w - - 0 2',
        },
        {
          move: 'cxb1=B',
          fen: '3k4/8/1K6/8/8/8/pp1ppppp/RbRRRRRR w - - 0 2',
        },
        {
          move: 'cxd1=Q',
          fen: '3k4/8/1K6/8/8/8/pp1ppppp/RRRqRRRR w - - 0 2',
        },
        {
          move: 'cxd1=R',
          fen: '3k4/8/1K6/8/8/8/pp1ppppp/RRRrRRRR w - - 0 2',
        },
        {
          move: 'cxd1=N',
          fen: '3k4/8/1K6/8/8/8/pp1ppppp/RRRnRRRR w - - 0 2',
        },
        {
          move: 'cxd1=B',
          fen: '3k4/8/1K6/8/8/8/pp1ppppp/RRRbRRRR w - - 0 2',
        },
        {
          move: 'exd1=Q',
          fen: '3k4/8/1K6/8/8/8/pppp1ppp/RRRqRRRR w - - 0 2',
        },
        {
          move: 'exd1=R',
          fen: '3k4/8/1K6/8/8/8/pppp1ppp/RRRrRRRR w - - 0 2',
        },
        {
          move: 'exd1=N',
          fen: '3k4/8/1K6/8/8/8/pppp1ppp/RRRnRRRR w - - 0 2',
        },
        {
          move: 'exd1=B',
          fen: '3k4/8/1K6/8/8/8/pppp1ppp/RRRbRRRR w - - 0 2',
        },
        {
          move: 'exf1=Q',
          fen: '3k4/8/1K6/8/8/8/pppp1ppp/RRRRRqRR w - - 0 2',
        },
        {
          move: 'exf1=R',
          fen: '3k4/8/1K6/8/8/8/pppp1ppp/RRRRRrRR w - - 0 2',
        },
        {
          move: 'exf1=N',
          fen: '3k4/8/1K6/8/8/8/pppp1ppp/RRRRRnRR w - - 0 2',
        },
        {
          move: 'exf1=B',
          fen: '3k4/8/1K6/8/8/8/pppp1ppp/RRRRRbRR w - - 0 2',
        },
        {
          move: 'fxe1=Q',
          fen: '3k4/8/1K6/8/8/8/ppppp1pp/RRRRqRRR w - - 0 2',
        },
        {
          move: 'fxe1=R',
          fen: '3k4/8/1K6/8/8/8/ppppp1pp/RRRRrRRR w - - 0 2',
        },
        {
          move: 'fxe1=N',
          fen: '3k4/8/1K6/8/8/8/ppppp1pp/RRRRnRRR w - - 0 2',
        },
        {
          move: 'fxe1=B',
          fen: '3k4/8/1K6/8/8/8/ppppp1pp/RRRRbRRR w - - 0 2',
        },
        {
          move: 'fxg1=Q+',
          fen: '3k4/8/1K6/8/8/8/ppppp1pp/RRRRRRqR w - - 0 2',
        },
        {
          move: 'fxg1=R',
          fen: '3k4/8/1K6/8/8/8/ppppp1pp/RRRRRRrR w - - 0 2',
        },
        {
          move: 'fxg1=N',
          fen: '3k4/8/1K6/8/8/8/ppppp1pp/RRRRRRnR w - - 0 2',
        },
        {
          move: 'fxg1=B+',
          fen: '3k4/8/1K6/8/8/8/ppppp1pp/RRRRRRbR w - - 0 2',
        },
        {
          move: 'gxf1=Q',
          fen: '3k4/8/1K6/8/8/8/pppppp1p/RRRRRqRR w - - 0 2',
        },
        {
          move: 'gxf1=R',
          fen: '3k4/8/1K6/8/8/8/pppppp1p/RRRRRrRR w - - 0 2',
        },
        {
          move: 'gxf1=N',
          fen: '3k4/8/1K6/8/8/8/pppppp1p/RRRRRnRR w - - 0 2',
        },
        {
          move: 'gxf1=B',
          fen: '3k4/8/1K6/8/8/8/pppppp1p/RRRRRbRR w - - 0 2',
        },
        {
          move: 'gxh1=Q',
          fen: '3k4/8/1K6/8/8/8/pppppp1p/RRRRRRRq w - - 0 2',
        },
        {
          move: 'gxh1=R',
          fen: '3k4/8/1K6/8/8/8/pppppp1p/RRRRRRRr w - - 0 2',
        },
        {
          move: 'gxh1=N',
          fen: '3k4/8/1K6/8/8/8/pppppp1p/RRRRRRRn w - - 0 2',
        },
        {
          move: 'gxh1=B',
          fen: '3k4/8/1K6/8/8/8/pppppp1p/RRRRRRRb w - - 0 2',
        },
        {
          move: 'hxg1=Q',
          fen: '3k4/8/1K6/8/8/8/ppppppp1/RRRRRRqR w - - 0 2',
        },
        {
          move: 'hxg1=R',
          fen: '3k4/8/1K6/8/8/8/ppppppp1/RRRRRRrR w - - 0 2',
        },
        {
          move: 'hxg1=N',
          fen: '3k4/8/1K6/8/8/8/ppppppp1/RRRRRRnR w - - 0 2',
        },
        {
          move: 'hxg1=B',
          fen: '3k4/8/1K6/8/8/8/ppppppp1/RRRRRRbR w - - 0 2',
        },
        {
          move: 'Kd7',
          fen: '8/3k4/1K6/8/8/8/pppppppp/RRRRRRRR w - - 1 2',
        },
        {
          move: 'Ke7',
          fen: '8/4k3/1K6/8/8/8/pppppppp/RRRRRRRR w - - 1 2',
        },
        {
          move: 'Kc8',
          fen: '2k5/8/1K6/8/8/8/pppppppp/RRRRRRRR w - - 1 2',
        },
        {
          move: 'Ke8',
          fen: '4k3/8/1K6/8/8/8/pppppppp/RRRRRRRR w - - 1 2',
        },
      ],
    },
    {
      description: 'Transpose of 3k4/8/1K6/8/8/8/pppppppp/RRRRRRRR b - - 0 1',
      start: {
        fen: 'rrrrrrrr/PPPPPPPP/8/8/8/1k6/8/3K4 w - - 0 1',
        description: 'Eight white pawns all promoting via capture.',
      },
      expected: [
        {
          move: 'Kc1',
          fen: 'rrrrrrrr/PPPPPPPP/8/8/8/1k6/8/2K5 b - - 1 1',
        },
        {
          move: 'Ke1',
          fen: 'rrrrrrrr/PPPPPPPP/8/8/8/1k6/8/4K3 b - - 1 1',
        },
        {
          move: 'Kd2',
          fen: 'rrrrrrrr/PPPPPPPP/8/8/8/1k6/3K4/8 b - - 1 1',
        },
        {
          move: 'Ke2',
          fen: 'rrrrrrrr/PPPPPPPP/8/8/8/1k6/4K3/8 b - - 1 1',
        },
        {
          move: 'axb8=Q',
          fen: 'rQrrrrrr/1PPPPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'axb8=R',
          fen: 'rRrrrrrr/1PPPPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'axb8=N',
          fen: 'rNrrrrrr/1PPPPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'axb8=B',
          fen: 'rBrrrrrr/1PPPPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'bxa8=Q',
          fen: 'Qrrrrrrr/P1PPPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'bxa8=R',
          fen: 'Rrrrrrrr/P1PPPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'bxa8=N',
          fen: 'Nrrrrrrr/P1PPPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'bxa8=B',
          fen: 'Brrrrrrr/P1PPPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'bxc8=Q',
          fen: 'rrQrrrrr/P1PPPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'bxc8=R',
          fen: 'rrRrrrrr/P1PPPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'bxc8=N',
          fen: 'rrNrrrrr/P1PPPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'bxc8=B',
          fen: 'rrBrrrrr/P1PPPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'cxb8=Q',
          fen: 'rQrrrrrr/PP1PPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'cxb8=R',
          fen: 'rRrrrrrr/PP1PPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'cxb8=N',
          fen: 'rNrrrrrr/PP1PPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'cxb8=B',
          fen: 'rBrrrrrr/PP1PPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'cxd8=Q',
          fen: 'rrrQrrrr/PP1PPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'cxd8=R',
          fen: 'rrrRrrrr/PP1PPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'cxd8=N',
          fen: 'rrrNrrrr/PP1PPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'cxd8=B',
          fen: 'rrrBrrrr/PP1PPPPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'exd8=Q',
          fen: 'rrrQrrrr/PPPP1PPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'exd8=R',
          fen: 'rrrRrrrr/PPPP1PPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'exd8=N',
          fen: 'rrrNrrrr/PPPP1PPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'exd8=B',
          fen: 'rrrBrrrr/PPPP1PPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'exf8=Q',
          fen: 'rrrrrQrr/PPPP1PPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'exf8=R',
          fen: 'rrrrrRrr/PPPP1PPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'exf8=N',
          fen: 'rrrrrNrr/PPPP1PPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'exf8=B',
          fen: 'rrrrrBrr/PPPP1PPP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'fxe8=Q',
          fen: 'rrrrQrrr/PPPPP1PP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'fxe8=R',
          fen: 'rrrrRrrr/PPPPP1PP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'fxe8=N',
          fen: 'rrrrNrrr/PPPPP1PP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'fxe8=B',
          fen: 'rrrrBrrr/PPPPP1PP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'fxg8=Q+',
          fen: 'rrrrrrQr/PPPPP1PP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'fxg8=R',
          fen: 'rrrrrrRr/PPPPP1PP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'fxg8=N',
          fen: 'rrrrrrNr/PPPPP1PP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'fxg8=B+',
          fen: 'rrrrrrBr/PPPPP1PP/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'gxf8=Q',
          fen: 'rrrrrQrr/PPPPPP1P/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'gxf8=R',
          fen: 'rrrrrRrr/PPPPPP1P/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'gxf8=N',
          fen: 'rrrrrNrr/PPPPPP1P/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'gxf8=B',
          fen: 'rrrrrBrr/PPPPPP1P/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'gxh8=Q',
          fen: 'rrrrrrrQ/PPPPPP1P/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'gxh8=R',
          fen: 'rrrrrrrR/PPPPPP1P/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'gxh8=N',
          fen: 'rrrrrrrN/PPPPPP1P/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'gxh8=B',
          fen: 'rrrrrrrB/PPPPPP1P/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'hxg8=Q',
          fen: 'rrrrrrQr/PPPPPPP1/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'hxg8=R',
          fen: 'rrrrrrRr/PPPPPPP1/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'hxg8=N',
          fen: 'rrrrrrNr/PPPPPPP1/8/8/8/1k6/8/3K4 b - - 0 1',
        },
        {
          move: 'hxg8=B',
          fen: 'rrrrrrBr/PPPPPPP1/8/8/8/1k6/8/3K4 b - - 0 1',
        },
      ],
    },
    {
      start: {
        fen: 'nnnnnnnn/PPPPPPPP/8/8/8/8/8/K6k w - - 0 1',
        description: 'Eight white pawns all capable of promoting via capture.',
      },
      expected: [
        {
          move: 'Kb1',
          fen: 'nnnnnnnn/PPPPPPPP/8/8/8/8/8/1K5k b - - 1 1',
        },
        {
          move: 'Ka2',
          fen: 'nnnnnnnn/PPPPPPPP/8/8/8/8/K7/7k b - - 1 1',
        },
        {
          move: 'Kb2',
          fen: 'nnnnnnnn/PPPPPPPP/8/8/8/8/1K6/7k b - - 1 1',
        },
        {
          move: 'axb8=Q',
          fen: 'nQnnnnnn/1PPPPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'axb8=R',
          fen: 'nRnnnnnn/1PPPPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'axb8=N',
          fen: 'nNnnnnnn/1PPPPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'axb8=B',
          fen: 'nBnnnnnn/1PPPPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'bxa8=Q+',
          fen: 'Qnnnnnnn/P1PPPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'bxa8=R',
          fen: 'Rnnnnnnn/P1PPPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'bxa8=N',
          fen: 'Nnnnnnnn/P1PPPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'bxa8=B+',
          fen: 'Bnnnnnnn/P1PPPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'bxc8=Q',
          fen: 'nnQnnnnn/P1PPPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'bxc8=R',
          fen: 'nnRnnnnn/P1PPPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'bxc8=N',
          fen: 'nnNnnnnn/P1PPPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'bxc8=B',
          fen: 'nnBnnnnn/P1PPPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'cxb8=Q',
          fen: 'nQnnnnnn/PP1PPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'cxb8=R',
          fen: 'nRnnnnnn/PP1PPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'cxb8=N',
          fen: 'nNnnnnnn/PP1PPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'cxb8=B',
          fen: 'nBnnnnnn/PP1PPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'cxd8=Q',
          fen: 'nnnQnnnn/PP1PPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'cxd8=R',
          fen: 'nnnRnnnn/PP1PPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'cxd8=N',
          fen: 'nnnNnnnn/PP1PPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'cxd8=B',
          fen: 'nnnBnnnn/PP1PPPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'dxc8=Q',
          fen: 'nnQnnnnn/PPP1PPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'dxc8=R',
          fen: 'nnRnnnnn/PPP1PPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'dxc8=N',
          fen: 'nnNnnnnn/PPP1PPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'dxc8=B',
          fen: 'nnBnnnnn/PPP1PPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'dxe8=Q',
          fen: 'nnnnQnnn/PPP1PPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'dxe8=R',
          fen: 'nnnnRnnn/PPP1PPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'dxe8=N',
          fen: 'nnnnNnnn/PPP1PPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'dxe8=B',
          fen: 'nnnnBnnn/PPP1PPPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'exd8=Q',
          fen: 'nnnQnnnn/PPPP1PPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'exd8=R',
          fen: 'nnnRnnnn/PPPP1PPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'exd8=N',
          fen: 'nnnNnnnn/PPPP1PPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'exd8=B',
          fen: 'nnnBnnnn/PPPP1PPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'exf8=Q',
          fen: 'nnnnnQnn/PPPP1PPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'exf8=R',
          fen: 'nnnnnRnn/PPPP1PPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'exf8=N',
          fen: 'nnnnnNnn/PPPP1PPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'exf8=B',
          fen: 'nnnnnBnn/PPPP1PPP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'fxe8=Q',
          fen: 'nnnnQnnn/PPPPP1PP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'fxe8=R',
          fen: 'nnnnRnnn/PPPPP1PP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'fxe8=N',
          fen: 'nnnnNnnn/PPPPP1PP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'fxe8=B',
          fen: 'nnnnBnnn/PPPPP1PP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'fxg8=Q',
          fen: 'nnnnnnQn/PPPPP1PP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'fxg8=R',
          fen: 'nnnnnnRn/PPPPP1PP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'fxg8=N',
          fen: 'nnnnnnNn/PPPPP1PP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'fxg8=B',
          fen: 'nnnnnnBn/PPPPP1PP/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'gxf8=Q',
          fen: 'nnnnnQnn/PPPPPP1P/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'gxf8=R',
          fen: 'nnnnnRnn/PPPPPP1P/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'gxf8=N',
          fen: 'nnnnnNnn/PPPPPP1P/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'gxf8=B',
          fen: 'nnnnnBnn/PPPPPP1P/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'gxh8=Q',
          fen: 'nnnnnnnQ/PPPPPP1P/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'gxh8=R',
          fen: 'nnnnnnnR/PPPPPP1P/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'gxh8=N',
          fen: 'nnnnnnnN/PPPPPP1P/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'gxh8=B',
          fen: 'nnnnnnnB/PPPPPP1P/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'hxg8=Q',
          fen: 'nnnnnnQn/PPPPPPP1/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'hxg8=R',
          fen: 'nnnnnnRn/PPPPPPP1/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'hxg8=N',
          fen: 'nnnnnnNn/PPPPPPP1/8/8/8/8/8/K6k b - - 0 1',
        },
        {
          move: 'hxg8=B',
          fen: 'nnnnnnBn/PPPPPPP1/8/8/8/8/8/K6k b - - 0 1',
        },
      ],
    },
    {
      description: 'Transpose of nnnnnnnn/PPPPPPPP/8/8/8/8/8/K6k w - - 0 1',
      start: {
        fen: 'k6K/8/8/8/8/8/pppppppp/NNNNNNNN b - - 0 1',
        description: 'Eight black pawns all capable of promoting via capture.',
      },
      expected: [
        {
          move: 'axb1=Q',
          fen: 'k6K/8/8/8/8/8/1ppppppp/NqNNNNNN w - - 0 2',
        },
        {
          move: 'axb1=R',
          fen: 'k6K/8/8/8/8/8/1ppppppp/NrNNNNNN w - - 0 2',
        },
        {
          move: 'axb1=N',
          fen: 'k6K/8/8/8/8/8/1ppppppp/NnNNNNNN w - - 0 2',
        },
        {
          move: 'axb1=B',
          fen: 'k6K/8/8/8/8/8/1ppppppp/NbNNNNNN w - - 0 2',
        },
        {
          move: 'bxa1=Q+',
          fen: 'k6K/8/8/8/8/8/p1pppppp/qNNNNNNN w - - 0 2',
        },
        {
          move: 'bxa1=R',
          fen: 'k6K/8/8/8/8/8/p1pppppp/rNNNNNNN w - - 0 2',
        },
        {
          move: 'bxa1=N',
          fen: 'k6K/8/8/8/8/8/p1pppppp/nNNNNNNN w - - 0 2',
        },
        {
          move: 'bxa1=B+',
          fen: 'k6K/8/8/8/8/8/p1pppppp/bNNNNNNN w - - 0 2',
        },
        {
          move: 'bxc1=Q',
          fen: 'k6K/8/8/8/8/8/p1pppppp/NNqNNNNN w - - 0 2',
        },
        {
          move: 'bxc1=R',
          fen: 'k6K/8/8/8/8/8/p1pppppp/NNrNNNNN w - - 0 2',
        },
        {
          move: 'bxc1=N',
          fen: 'k6K/8/8/8/8/8/p1pppppp/NNnNNNNN w - - 0 2',
        },
        {
          move: 'bxc1=B',
          fen: 'k6K/8/8/8/8/8/p1pppppp/NNbNNNNN w - - 0 2',
        },
        {
          move: 'cxb1=Q',
          fen: 'k6K/8/8/8/8/8/pp1ppppp/NqNNNNNN w - - 0 2',
        },
        {
          move: 'cxb1=R',
          fen: 'k6K/8/8/8/8/8/pp1ppppp/NrNNNNNN w - - 0 2',
        },
        {
          move: 'cxb1=N',
          fen: 'k6K/8/8/8/8/8/pp1ppppp/NnNNNNNN w - - 0 2',
        },
        {
          move: 'cxb1=B',
          fen: 'k6K/8/8/8/8/8/pp1ppppp/NbNNNNNN w - - 0 2',
        },
        {
          move: 'cxd1=Q',
          fen: 'k6K/8/8/8/8/8/pp1ppppp/NNNqNNNN w - - 0 2',
        },
        {
          move: 'cxd1=R',
          fen: 'k6K/8/8/8/8/8/pp1ppppp/NNNrNNNN w - - 0 2',
        },
        {
          move: 'cxd1=N',
          fen: 'k6K/8/8/8/8/8/pp1ppppp/NNNnNNNN w - - 0 2',
        },
        {
          move: 'cxd1=B',
          fen: 'k6K/8/8/8/8/8/pp1ppppp/NNNbNNNN w - - 0 2',
        },
        {
          move: 'dxc1=Q',
          fen: 'k6K/8/8/8/8/8/ppp1pppp/NNqNNNNN w - - 0 2',
        },
        {
          move: 'dxc1=R',
          fen: 'k6K/8/8/8/8/8/ppp1pppp/NNrNNNNN w - - 0 2',
        },
        {
          move: 'dxc1=N',
          fen: 'k6K/8/8/8/8/8/ppp1pppp/NNnNNNNN w - - 0 2',
        },
        {
          move: 'dxc1=B',
          fen: 'k6K/8/8/8/8/8/ppp1pppp/NNbNNNNN w - - 0 2',
        },
        {
          move: 'dxe1=Q',
          fen: 'k6K/8/8/8/8/8/ppp1pppp/NNNNqNNN w - - 0 2',
        },
        {
          move: 'dxe1=R',
          fen: 'k6K/8/8/8/8/8/ppp1pppp/NNNNrNNN w - - 0 2',
        },
        {
          move: 'dxe1=N',
          fen: 'k6K/8/8/8/8/8/ppp1pppp/NNNNnNNN w - - 0 2',
        },
        {
          move: 'dxe1=B',
          fen: 'k6K/8/8/8/8/8/ppp1pppp/NNNNbNNN w - - 0 2',
        },
        {
          move: 'exd1=Q',
          fen: 'k6K/8/8/8/8/8/pppp1ppp/NNNqNNNN w - - 0 2',
        },
        {
          move: 'exd1=R',
          fen: 'k6K/8/8/8/8/8/pppp1ppp/NNNrNNNN w - - 0 2',
        },
        {
          move: 'exd1=N',
          fen: 'k6K/8/8/8/8/8/pppp1ppp/NNNnNNNN w - - 0 2',
        },
        {
          move: 'exd1=B',
          fen: 'k6K/8/8/8/8/8/pppp1ppp/NNNbNNNN w - - 0 2',
        },
        {
          move: 'exf1=Q',
          fen: 'k6K/8/8/8/8/8/pppp1ppp/NNNNNqNN w - - 0 2',
        },
        {
          move: 'exf1=R',
          fen: 'k6K/8/8/8/8/8/pppp1ppp/NNNNNrNN w - - 0 2',
        },
        {
          move: 'exf1=N',
          fen: 'k6K/8/8/8/8/8/pppp1ppp/NNNNNnNN w - - 0 2',
        },
        {
          move: 'exf1=B',
          fen: 'k6K/8/8/8/8/8/pppp1ppp/NNNNNbNN w - - 0 2',
        },
        {
          move: 'fxe1=Q',
          fen: 'k6K/8/8/8/8/8/ppppp1pp/NNNNqNNN w - - 0 2',
        },
        {
          move: 'fxe1=R',
          fen: 'k6K/8/8/8/8/8/ppppp1pp/NNNNrNNN w - - 0 2',
        },
        {
          move: 'fxe1=N',
          fen: 'k6K/8/8/8/8/8/ppppp1pp/NNNNnNNN w - - 0 2',
        },
        {
          move: 'fxe1=B',
          fen: 'k6K/8/8/8/8/8/ppppp1pp/NNNNbNNN w - - 0 2',
        },
        {
          move: 'fxg1=Q',
          fen: 'k6K/8/8/8/8/8/ppppp1pp/NNNNNNqN w - - 0 2',
        },
        {
          move: 'fxg1=R',
          fen: 'k6K/8/8/8/8/8/ppppp1pp/NNNNNNrN w - - 0 2',
        },
        {
          move: 'fxg1=N',
          fen: 'k6K/8/8/8/8/8/ppppp1pp/NNNNNNnN w - - 0 2',
        },
        {
          move: 'fxg1=B',
          fen: 'k6K/8/8/8/8/8/ppppp1pp/NNNNNNbN w - - 0 2',
        },
        {
          move: 'gxf1=Q',
          fen: 'k6K/8/8/8/8/8/pppppp1p/NNNNNqNN w - - 0 2',
        },
        {
          move: 'gxf1=R',
          fen: 'k6K/8/8/8/8/8/pppppp1p/NNNNNrNN w - - 0 2',
        },
        {
          move: 'gxf1=N',
          fen: 'k6K/8/8/8/8/8/pppppp1p/NNNNNnNN w - - 0 2',
        },
        {
          move: 'gxf1=B',
          fen: 'k6K/8/8/8/8/8/pppppp1p/NNNNNbNN w - - 0 2',
        },
        {
          move: 'gxh1=Q',
          fen: 'k6K/8/8/8/8/8/pppppp1p/NNNNNNNq w - - 0 2',
        },
        {
          move: 'gxh1=R',
          fen: 'k6K/8/8/8/8/8/pppppp1p/NNNNNNNr w - - 0 2',
        },
        {
          move: 'gxh1=N',
          fen: 'k6K/8/8/8/8/8/pppppp1p/NNNNNNNn w - - 0 2',
        },
        {
          move: 'gxh1=B',
          fen: 'k6K/8/8/8/8/8/pppppp1p/NNNNNNNb w - - 0 2',
        },
        {
          move: 'hxg1=Q',
          fen: 'k6K/8/8/8/8/8/ppppppp1/NNNNNNqN w - - 0 2',
        },
        {
          move: 'hxg1=R',
          fen: 'k6K/8/8/8/8/8/ppppppp1/NNNNNNrN w - - 0 2',
        },
        {
          move: 'hxg1=N',
          fen: 'k6K/8/8/8/8/8/ppppppp1/NNNNNNnN w - - 0 2',
        },
        {
          move: 'hxg1=B',
          fen: 'k6K/8/8/8/8/8/ppppppp1/NNNNNNbN w - - 0 2',
        },
        {
          move: 'Ka7',
          fen: '7K/k7/8/8/8/8/pppppppp/NNNNNNNN w - - 1 2',
        },
        {
          move: 'Kb7',
          fen: '7K/1k6/8/8/8/8/pppppppp/NNNNNNNN w - - 1 2',
        },
        {
          move: 'Kb8',
          fen: '1k5K/8/8/8/8/8/pppppppp/NNNNNNNN w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '8/ppp3p1/8/8/3p4/8/1ppp2K1/brk2Q1n b - - 12 7',
        description: 'Black must block check by promotion.',
      },
      expected: [
        {
          move: 'd1=Q',
          fen: '8/ppp3p1/8/8/3p4/8/1pp3K1/brkq1Q1n w - - 0 8',
        },
        {
          move: 'd1=R',
          fen: '8/ppp3p1/8/8/3p4/8/1pp3K1/brkr1Q1n w - - 0 8',
        },
        {
          move: 'd1=N',
          fen: '8/ppp3p1/8/8/3p4/8/1pp3K1/brkn1Q1n w - - 0 8',
        },
        {
          move: 'd1=B',
          fen: '8/ppp3p1/8/8/3p4/8/1pp3K1/brkb1Q1n w - - 0 8',
        },
      ],
    },
    {
      description: 'Transpose of 8/ppp3p1/8/8/3p4/8/1ppp2K1/brk2Q1n b - - 12 7',
      start: {
        fen: 'BRK2q1N/1PPP2k1/8/3P4/8/8/PPP3P1/8 w - - 12 7',
        description: 'White must block check by promotion.',
      },
      expected: [
        {
          move: 'd8=Q',
          fen: 'BRKQ1q1N/1PP3k1/8/3P4/8/8/PPP3P1/8 b - - 0 7',
        },
        {
          move: 'd8=R',
          fen: 'BRKR1q1N/1PP3k1/8/3P4/8/8/PPP3P1/8 b - - 0 7',
        },
        {
          move: 'd8=N',
          fen: 'BRKN1q1N/1PP3k1/8/3P4/8/8/PPP3P1/8 b - - 0 7',
        },
        {
          move: 'd8=B',
          fen: 'BRKB1q1N/1PP3k1/8/3P4/8/8/PPP3P1/8 b - - 0 7',
        },
      ],
    },
    {
      start: {
        fen: '5N1N/4k1P1/8/8/8/8/8/K7 w - - 0 1',
        description:
          'White can promote and check black king if promoting to knight.',
      },
      expected: [
        {
          move: 'Kb1',
          fen: '5N1N/4k1P1/8/8/8/8/8/1K6 b - - 1 1',
        },
        {
          move: 'Ka2',
          fen: '5N1N/4k1P1/8/8/8/8/K7/8 b - - 1 1',
        },
        {
          move: 'Kb2',
          fen: '5N1N/4k1P1/8/8/8/8/1K6/8 b - - 1 1',
        },
        {
          move: 'g8=Q',
          fen: '5NQN/4k3/8/8/8/8/8/K7 b - - 0 1',
        },
        {
          move: 'g8=R',
          fen: '5NRN/4k3/8/8/8/8/8/K7 b - - 0 1',
        },
        {
          move: 'g8=N+',
          fen: '5NNN/4k3/8/8/8/8/8/K7 b - - 0 1',
        },
        {
          move: 'g8=B',
          fen: '5NBN/4k3/8/8/8/8/8/K7 b - - 0 1',
        },
        {
          move: 'Ne6',
          fen: '7N/4k1P1/4N3/8/8/8/8/K7 b - - 1 1',
        },
        {
          move: 'Nfg6+',
          fen: '7N/4k1P1/6N1/8/8/8/8/K7 b - - 1 1',
        },
        {
          move: 'Nd7',
          fen: '7N/3Nk1P1/8/8/8/8/8/K7 b - - 1 1',
        },
        {
          move: 'Nh7',
          fen: '7N/4k1PN/8/8/8/8/8/K7 b - - 1 1',
        },
        {
          move: 'Nhg6+',
          fen: '5N2/4k1P1/6N1/8/8/8/8/K7 b - - 1 1',
        },
        {
          move: 'Nf7',
          fen: '5N2/4kNP1/8/8/8/8/8/K7 b - - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of 5N1N/4k1P1/8/8/8/8/8/K7 w - - 0 1',
      start: {
        fen: 'k7/8/8/8/8/8/4K1p1/5n1n b - - 0 1',
        description:
          'Black can promote and check white king if promoting to knight.',
      },
      expected: [
        {
          move: 'Nd2',
          fen: 'k7/8/8/8/8/8/3nK1p1/7n w - - 1 2',
        },
        {
          move: 'Nh2',
          fen: 'k7/8/8/8/8/8/4K1pn/7n w - - 1 2',
        },
        {
          move: 'Ne3',
          fen: 'k7/8/8/8/8/4n3/4K1p1/7n w - - 1 2',
        },
        {
          move: 'Nfg3+',
          fen: 'k7/8/8/8/8/6n1/4K1p1/7n w - - 1 2',
        },
        {
          move: 'Nf2',
          fen: 'k7/8/8/8/8/8/4Knp1/5n2 w - - 1 2',
        },
        {
          move: 'Nhg3+',
          fen: 'k7/8/8/8/8/6n1/4K1p1/5n2 w - - 1 2',
        },
        {
          move: 'g1=Q',
          fen: 'k7/8/8/8/8/8/4K3/5nqn w - - 0 2',
        },
        {
          move: 'g1=R',
          fen: 'k7/8/8/8/8/8/4K3/5nrn w - - 0 2',
        },
        {
          move: 'g1=N+',
          fen: 'k7/8/8/8/8/8/4K3/5nnn w - - 0 2',
        },
        {
          move: 'g1=B',
          fen: 'k7/8/8/8/8/8/4K3/5nbn w - - 0 2',
        },
        {
          move: 'Ka7',
          fen: '8/k7/8/8/8/8/4K1p1/5n1n w - - 1 2',
        },
        {
          move: 'Kb7',
          fen: '8/1k6/8/8/8/8/4K1p1/5n1n w - - 1 2',
        },
        {
          move: 'Kb8',
          fen: '1k6/8/8/8/8/8/4K1p1/5n1n w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: 'NBQKRBRN/PPPPPPPP/8/8/8/8/3k4/8 w - - 0 1',
        description: 'White has eight pawns ready to promote, but none can.',
      },
      expected: [
        {
          move: 'Nb6',
          fen: '1BQKRBRN/PPPPPPPP/1N6/8/8/8/3k4/8 b - - 1 1',
        },
        {
          move: 'Ng6',
          fen: 'NBQKRBR1/PPPPPPPP/6N1/8/8/8/3k4/8 b - - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of NBQKRBRN/PPPPPPPP/8/8/8/8/3k4/8 w - - 0 1',
      start: {
        fen: '8/3K4/8/8/8/8/pppppppp/nbqkrbrn b - - 0 1',
        description: 'Black has eight pawns ready to promote, but none can.',
      },
      expected: [
        {
          move: 'Nb3',
          fen: '8/3K4/8/8/8/1n6/pppppppp/1bqkrbrn w - - 1 2',
        },
        {
          move: 'Ng3',
          fen: '8/3K4/8/8/8/6n1/pppppppp/nbqkrbr1 w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '3K3r/2PPP3/8/2k5/8/8/8/8 w - - 0 1',
        description: 'White must promote to escape check.',
      },
      expected: [
        {
          move: 'e8=Q',
          fen: '3KQ2r/2PP4/8/2k5/8/8/8/8 b - - 0 1',
        },
        {
          move: 'e8=R',
          fen: '3KR2r/2PP4/8/2k5/8/8/8/8 b - - 0 1',
        },
        {
          move: 'e8=N',
          fen: '3KN2r/2PP4/8/2k5/8/8/8/8 b - - 0 1',
        },
        {
          move: 'e8=B',
          fen: '3KB2r/2PP4/8/2k5/8/8/8/8 b - - 0 1',
        },
      ],
    },
    {
      description: 'Transpose of 3K3r/2PPP3/8/2k5/8/8/8/8 w - - 0 1',
      start: {
        fen: '8/8/8/8/2K5/8/2ppp3/3k3R b - - 0 1',
        description: 'Black must promote to escape check.',
      },
      expected: [
        {
          move: 'e1=Q',
          fen: '8/8/8/8/2K5/8/2pp4/3kq2R w - - 0 2',
        },
        {
          move: 'e1=R',
          fen: '8/8/8/8/2K5/8/2pp4/3kr2R w - - 0 2',
        },
        {
          move: 'e1=N',
          fen: '8/8/8/8/2K5/8/2pp4/3kn2R w - - 0 2',
        },
        {
          move: 'e1=B',
          fen: '8/8/8/8/2K5/8/2pp4/3kb2R w - - 0 2',
        },
      ],
    },
    {
      start: {
        fen: 'q7/1PPPPPPP/8/8/8/K1k5/8/8 w - - 0 1',
        description: 'White must capture and promote to escape mate.',
      },
      expected: [
        {
          move: 'bxa8=Q',
          fen: 'Q7/2PPPPPP/8/8/8/K1k5/8/8 b - - 0 1',
        },
        {
          move: 'bxa8=R',
          fen: 'R7/2PPPPPP/8/8/8/K1k5/8/8 b - - 0 1',
        },
        {
          move: 'bxa8=N',
          fen: 'N7/2PPPPPP/8/8/8/K1k5/8/8 b - - 0 1',
        },
        {
          move: 'bxa8=B',
          fen: 'B7/2PPPPPP/8/8/8/K1k5/8/8 b - - 0 1',
        },
      ],
    },
    {
      description: 'Transpose of q7/1PPPPPPP/8/8/8/K1k5/8/8 w - - 0 1',
      start: {
        fen: '8/8/k1K5/8/8/8/1ppppppp/Q7 b - - 0 1',
        description: 'Black must capture and promote to escape mate.',
      },
      expected: [
        {
          move: 'bxa1=Q',
          fen: '8/8/k1K5/8/8/8/2pppppp/q7 w - - 0 2',
        },
        {
          move: 'bxa1=R',
          fen: '8/8/k1K5/8/8/8/2pppppp/r7 w - - 0 2',
        },
        {
          move: 'bxa1=N',
          fen: '8/8/k1K5/8/8/8/2pppppp/n7 w - - 0 2',
        },
        {
          move: 'bxa1=B',
          fen: '8/8/k1K5/8/8/8/2pppppp/b7 w - - 0 2',
        },
      ],
    },
  ],
};
