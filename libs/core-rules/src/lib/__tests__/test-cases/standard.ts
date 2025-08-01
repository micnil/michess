import { TestCases } from './TestCases';

export const standardTestCases: TestCases = {
  description: 'Some common positions.',
  testCases: [
    {
      start: {
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        description: 'Standard starting position.',
      },
      expected: [
        {
          move: 'Na3',
          fen: 'rnbqkbnr/pppppppp/8/8/8/N7/PPPPPPPP/R1BQKBNR b KQkq - 1 1',
        },
        {
          move: 'Nc3',
          fen: 'rnbqkbnr/pppppppp/8/8/8/2N5/PPPPPPPP/R1BQKBNR b KQkq - 1 1',
        },
        {
          move: 'Nf3',
          fen: 'rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1',
        },
        {
          move: 'Nh3',
          fen: 'rnbqkbnr/pppppppp/8/8/8/7N/PPPPPPPP/RNBQKB1R b KQkq - 1 1',
        },
        {
          move: 'a3',
          fen: 'rnbqkbnr/pppppppp/8/8/8/P7/1PPPPPPP/RNBQKBNR b KQkq - 0 1',
        },
        {
          move: 'a4',
          fen: 'rnbqkbnr/pppppppp/8/8/P7/8/1PPPPPPP/RNBQKBNR b KQkq a3 0 1',
        },
        {
          move: 'b3',
          fen: 'rnbqkbnr/pppppppp/8/8/8/1P6/P1PPPPPP/RNBQKBNR b KQkq - 0 1',
        },
        {
          move: 'b4',
          fen: 'rnbqkbnr/pppppppp/8/8/1P6/8/P1PPPPPP/RNBQKBNR b KQkq b3 0 1',
        },
        {
          move: 'c3',
          fen: 'rnbqkbnr/pppppppp/8/8/8/2P5/PP1PPPPP/RNBQKBNR b KQkq - 0 1',
        },
        {
          move: 'c4',
          fen: 'rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq c3 0 1',
        },
        {
          move: 'd3',
          fen: 'rnbqkbnr/pppppppp/8/8/8/3P4/PPP1PPPP/RNBQKBNR b KQkq - 0 1',
        },
        {
          move: 'd4',
          fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
        },
        {
          move: 'e3',
          fen: 'rnbqkbnr/pppppppp/8/8/8/4P3/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
        },
        {
          move: 'e4',
          fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
        },
        {
          move: 'f3',
          fen: 'rnbqkbnr/pppppppp/8/8/8/5P2/PPPPP1PP/RNBQKBNR b KQkq - 0 1',
        },
        {
          move: 'f4',
          fen: 'rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq f3 0 1',
        },
        {
          move: 'g3',
          fen: 'rnbqkbnr/pppppppp/8/8/8/6P1/PPPPPP1P/RNBQKBNR b KQkq - 0 1',
        },
        {
          move: 'g4',
          fen: 'rnbqkbnr/pppppppp/8/8/6P1/8/PPPPPP1P/RNBQKBNR b KQkq g3 0 1',
        },
        {
          move: 'h3',
          fen: 'rnbqkbnr/pppppppp/8/8/8/7P/PPPPPPP1/RNBQKBNR b KQkq - 0 1',
        },
        {
          move: 'h4',
          fen: 'rnbqkbnr/pppppppp/8/8/7P/8/PPPPPPP1/RNBQKBNR b KQkq h3 0 1',
        },
      ],
    },
    {
      start: {
        fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b - - 11 7',
        description: 'Ruy Lopez opening.',
      },
      expected: [
        {
          move: 'Nb4',
          fen: 'r1bqkbnr/pppp1ppp/8/1B2p3/1n2P3/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'Nd4',
          fen: 'r1bqkbnr/pppp1ppp/8/1B2p3/3nP3/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'Na5',
          fen: 'r1bqkbnr/pppp1ppp/8/nB2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'Nce7',
          fen: 'r1bqkbnr/ppppnppp/8/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'Nb8',
          fen: 'rnbqkbnr/pppp1ppp/8/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'a6',
          fen: 'r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 0 8',
        },
        {
          move: 'a5',
          fen: 'r1bqkbnr/1ppp1ppp/2n5/pB2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - a6 0 8',
        },
        {
          move: 'b6',
          fen: 'r1bqkbnr/p1pp1ppp/1pn5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 0 8',
        },
        {
          move: 'd6',
          fen: 'r1bqkbnr/ppp2ppp/2np4/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 0 8',
        },
        {
          move: 'd5',
          fen: 'r1bqkbnr/ppp2ppp/2n5/1B1pp3/4P3/5N2/PPPP1PPP/RNBQK2R w - d6 0 8',
        },
        {
          move: 'f6',
          fen: 'r1bqkbnr/pppp2pp/2n2p2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 0 8',
        },
        {
          move: 'f5',
          fen: 'r1bqkbnr/pppp2pp/2n5/1B2pp2/4P3/5N2/PPPP1PPP/RNBQK2R w - f6 0 8',
        },
        {
          move: 'g6',
          fen: 'r1bqkbnr/pppp1p1p/2n3p1/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 0 8',
        },
        {
          move: 'g5',
          fen: 'r1bqkbnr/pppp1p1p/2n5/1B2p1p1/4P3/5N2/PPPP1PPP/RNBQK2R w - g6 0 8',
        },
        {
          move: 'h6',
          fen: 'r1bqkbnr/pppp1pp1/2n4p/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 0 8',
        },
        {
          move: 'h5',
          fen: 'r1bqkbnr/pppp1pp1/2n5/1B2p2p/4P3/5N2/PPPP1PPP/RNBQK2R w - h6 0 8',
        },
        {
          move: 'Rb8',
          fen: '1rbqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'Qe7',
          fen: 'r1b1kbnr/ppppqppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'Qf6',
          fen: 'r1b1kbnr/pppp1ppp/2n2q2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'Qg5',
          fen: 'r1b1kbnr/pppp1ppp/2n5/1B2p1q1/4P3/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'Qh4',
          fen: 'r1b1kbnr/pppp1ppp/2n5/1B2p3/4P2q/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'Ke7',
          fen: 'r1bq1bnr/ppppkppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'Be7',
          fen: 'r1bqk1nr/ppppbppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'Bd6',
          fen: 'r1bqk1nr/pppp1ppp/2nb4/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'Bc5',
          fen: 'r1bqk1nr/pppp1ppp/2n5/1Bb1p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'Bb4',
          fen: 'r1bqk1nr/pppp1ppp/2n5/1B2p3/1b2P3/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'Ba3',
          fen: 'r1bqk1nr/pppp1ppp/2n5/1B2p3/4P3/b4N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'Nf6',
          fen: 'r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'Nh6',
          fen: 'r1bqkb1r/pppp1ppp/2n4n/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
        {
          move: 'Nge7',
          fen: 'r1bqkb1r/ppppnppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w - - 12 8',
        },
      ],
    },
  ],
};
