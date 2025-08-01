import { TestCases } from './TestCases';

export const famousTestCases: TestCases = {
  description:
    "Some positions involving famous moves, that you wouldn't want your move generator to miss!",
  testCases: [
    {
      start: {
        description:
          "From 'The Game of the Century' (Bobby Fischer v. Donald Byrne).",
        fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/Q1n2N2/P4PPP/3R1K1R w - - 4 18',
      },
      expected: [
        {
          move: 'Rc1',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/Q1n2N2/P4PPP/2R2K1R b - - 5 18',
        },
        {
          move: 'Rb1',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/Q1n2N2/P4PPP/1R3K1R b - - 5 18',
        },
        {
          move: 'Ra1',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/Q1n2N2/P4PPP/R4K1R b - - 5 18',
        },
        {
          move: 'Re1',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/Q1n2N2/P4PPP/4RK1R b - - 5 18',
        },
        {
          move: 'Rd2',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/Q1n2N2/P2R1PPP/5K1R b - - 5 18',
        },
        {
          move: 'Rd3',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/Q1nR1N2/P4PPP/5K1R b - - 5 18',
        },
        {
          move: 'Ke1',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/Q1n2N2/P4PPP/3RK2R b - - 5 18',
        },
        {
          move: 'Kg1',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/Q1n2N2/P4PPP/3R2KR b - - 5 18',
        },
        {
          move: 'Rg1',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/Q1n2N2/P4PPP/3R1KR1 b - - 5 18',
        },
        {
          move: 'g3',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/Q1n2NP1/P4P1P/3R1K1R b - - 0 18',
        },
        {
          move: 'g4',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP2P1/Q1n2N2/P4P1P/3R1K1R b - g3 0 18',
        },
        {
          move: 'h3',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/Q1n2N1P/P4PP1/3R1K1R b - - 0 18',
        },
        {
          move: 'h4',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP3P/Q1n2N2/P4PP1/3R1K1R b - h3 0 18',
        },
        {
          move: 'Qb2',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/2n2N2/PQ3PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Qc1',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/2n2N2/P4PPP/2QR1K1R b - - 5 18',
        },
        {
          move: 'Qb3',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/1Qn2N2/P4PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Qxc3',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/2Q2N2/P4PPP/3R1K1R b - - 0 18',
        },
        {
          move: 'Qa4',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/Q1BP4/2n2N2/P4PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Qa5',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/Q1B5/2BP4/2n2N2/P4PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Qa6',
          fen: 'r3r1k1/pp3pbp/Qqp1b1p1/2B5/2BP4/2n2N2/P4PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Qxa7',
          fen: 'r3r1k1/Qp3pbp/1qp1b1p1/2B5/2BP4/2n2N2/P4PPP/3R1K1R b - - 0 18',
        },
        {
          move: 'Qb4',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/1QBP4/2n2N2/P4PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Ne1',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/Q1n5/P4PPP/3RNK1R b - - 5 18',
        },
        {
          move: 'Ng1',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/Q1n5/P4PPP/3R1KNR b - - 5 18',
        },
        {
          move: 'Nd2',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP4/Q1n5/P2N1PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Nh4',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/2BP3N/Q1n5/P4PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Ne5',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B1N3/2BP4/Q1n5/P4PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Ng5',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B3N1/2BP4/Q1n5/P4PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Bb3',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/3P4/QBn2N2/P4PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Bd3',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/3P4/Q1nB1N2/P4PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Be2',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2B5/3P4/Q1n2N2/P3BPPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Bb5',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/1BB5/3P4/Q1n2N2/P4PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Ba6',
          fen: 'r3r1k1/pp3pbp/Bqp1b1p1/2B5/3P4/Q1n2N2/P4PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Bd5',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2BB4/3P4/Q1n2N2/P4PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Bxe6',
          fen: 'r3r1k1/pp3pbp/1qp1B1p1/2B5/3P4/Q1n2N2/P4PPP/3R1K1R b - - 0 18',
        },
        {
          move: 'd5',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/2BP4/2B5/Q1n2N2/P4PPP/3R1K1R b - - 0 18',
        },
        {
          move: 'Bb4',
          fen: 'r3r1k1/pp3pbp/1qp1b1p1/8/1BBP4/Q1n2N2/P4PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Bxb6',
          fen: 'r3r1k1/pp3pbp/1Bp1b1p1/8/2BP4/Q1n2N2/P4PPP/3R1K1R b - - 0 18',
        },
        {
          move: 'Bd6',
          fen: 'r3r1k1/pp3pbp/1qpBb1p1/8/2BP4/Q1n2N2/P4PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Be7',
          fen: 'r3r1k1/pp2Bpbp/1qp1b1p1/8/2BP4/Q1n2N2/P4PPP/3R1K1R b - - 5 18',
        },
        {
          move: 'Bf8',
          fen: 'r3rBk1/pp3pbp/1qp1b1p1/8/2BP4/Q1n2N2/P4PPP/3R1K1R b - - 5 18',
        },
      ],
    },
    {
      start: {
        fen: '5rk1/pp4pp/4p3/2R3Q1/3n4/2q4r/P1P2PPP/5RK1 b - - 0 1',
        description:
          'The Gold Coins Game.  Position before the Gold Coins move!',
      },
      expected: [
        {
          move: 'Qb2',
          fen: '5rk1/pp4pp/4p3/2R3Q1/3n4/7r/PqP2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Qa1',
          fen: '5rk1/pp4pp/4p3/2R3Q1/3n4/7r/P1P2PPP/q4RK1 w - - 1 2',
        },
        {
          move: 'Qxc2',
          fen: '5rk1/pp4pp/4p3/2R3Q1/3n4/7r/P1q2PPP/5RK1 w - - 0 2',
        },
        {
          move: 'Qd2',
          fen: '5rk1/pp4pp/4p3/2R3Q1/3n4/7r/P1Pq1PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Qe1',
          fen: '5rk1/pp4pp/4p3/2R3Q1/3n4/7r/P1P2PPP/4qRK1 w - - 1 2',
        },
        {
          move: 'Qb3',
          fen: '5rk1/pp4pp/4p3/2R3Q1/3n4/1q5r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Qa3',
          fen: '5rk1/pp4pp/4p3/2R3Q1/3n4/q6r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Qd3',
          fen: '5rk1/pp4pp/4p3/2R3Q1/3n4/3q3r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Qe3',
          fen: '5rk1/pp4pp/4p3/2R3Q1/3n4/4q2r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Qf3',
          fen: '5rk1/pp4pp/4p3/2R3Q1/3n4/5q1r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Qg3',
          fen: '5rk1/pp4pp/4p3/2R3Q1/3n4/6qr/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Qb4',
          fen: '5rk1/pp4pp/4p3/2R3Q1/1q1n4/7r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Qa5',
          fen: '5rk1/pp4pp/4p3/q1R3Q1/3n4/7r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Qc4',
          fen: '5rk1/pp4pp/4p3/2R3Q1/2qn4/7r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Qxc5',
          fen: '5rk1/pp4pp/4p3/2q3Q1/3n4/7r/P1P2PPP/5RK1 w - - 0 2',
        },
        {
          move: 'Rxh2',
          fen: '5rk1/pp4pp/4p3/2R3Q1/3n4/2q5/P1P2PPr/5RK1 w - - 0 2',
        },
        {
          move: 'Rg3',
          fen: '5rk1/pp4pp/4p3/2R3Q1/3n4/2q3r1/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Rhf3',
          fen: '5rk1/pp4pp/4p3/2R3Q1/3n4/2q2r2/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Re3',
          fen: '5rk1/pp4pp/4p3/2R3Q1/3n4/2q1r3/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Rd3',
          fen: '5rk1/pp4pp/4p3/2R3Q1/3n4/2qr4/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Rh4',
          fen: '5rk1/pp4pp/4p3/2R3Q1/3n3r/2q5/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Rh5',
          fen: '5rk1/pp4pp/4p3/2R3Qr/3n4/2q5/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Rh6',
          fen: '5rk1/pp4pp/4p2r/2R3Q1/3n4/2q5/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Nxc2',
          fen: '5rk1/pp4pp/4p3/2R3Q1/8/2q4r/P1n2PPP/5RK1 w - - 0 2',
        },
        {
          move: 'Ne2+',
          fen: '5rk1/pp4pp/4p3/2R3Q1/8/2q4r/P1P1nPPP/5RK1 w - - 1 2',
        },
        {
          move: 'Nb3',
          fen: '5rk1/pp4pp/4p3/2R3Q1/8/1nq4r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Nf3+',
          fen: '5rk1/pp4pp/4p3/2R3Q1/8/2q2n1r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Nb5',
          fen: '5rk1/pp4pp/4p3/1nR3Q1/8/2q4r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Nf5',
          fen: '5rk1/pp4pp/4p3/2R2nQ1/8/2q4r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Nc6',
          fen: '5rk1/pp4pp/2n1p3/2R3Q1/8/2q4r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'e5',
          fen: '5rk1/pp4pp/8/2R1p1Q1/3n4/2q4r/P1P2PPP/5RK1 w - - 0 2',
        },
        {
          move: 'a6',
          fen: '5rk1/1p4pp/p3p3/2R3Q1/3n4/2q4r/P1P2PPP/5RK1 w - - 0 2',
        },
        {
          move: 'a5',
          fen: '5rk1/1p4pp/4p3/p1R3Q1/3n4/2q4r/P1P2PPP/5RK1 w - a6 0 2',
        },
        {
          move: 'b6',
          fen: '5rk1/p5pp/1p2p3/2R3Q1/3n4/2q4r/P1P2PPP/5RK1 w - - 0 2',
        },
        {
          move: 'b5',
          fen: '5rk1/p5pp/4p3/1pR3Q1/3n4/2q4r/P1P2PPP/5RK1 w - b6 0 2',
        },
        {
          move: 'g6',
          fen: '5rk1/pp5p/4p1p1/2R3Q1/3n4/2q4r/P1P2PPP/5RK1 w - - 0 2',
        },
        {
          move: 'h6',
          fen: '5rk1/pp4p1/4p2p/2R3Q1/3n4/2q4r/P1P2PPP/5RK1 w - - 0 2',
        },
        {
          move: 'h5',
          fen: '5rk1/pp4p1/4p3/2R3Qp/3n4/2q4r/P1P2PPP/5RK1 w - h6 0 2',
        },
        {
          move: 'Rf7',
          fen: '6k1/pp3rpp/4p3/2R3Q1/3n4/2q4r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Rf6',
          fen: '6k1/pp4pp/4pr2/2R3Q1/3n4/2q4r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Rf5',
          fen: '6k1/pp4pp/4p3/2R2rQ1/3n4/2q4r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Rf4',
          fen: '6k1/pp4pp/4p3/2R3Q1/3n1r2/2q4r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Rff3',
          fen: '6k1/pp4pp/4p3/2R3Q1/3n4/2q2r1r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Rxf2',
          fen: '6k1/pp4pp/4p3/2R3Q1/3n4/2q4r/P1P2rPP/5RK1 w - - 0 2',
        },
        {
          move: 'Re8',
          fen: '4r1k1/pp4pp/4p3/2R3Q1/3n4/2q4r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Rd8',
          fen: '3r2k1/pp4pp/4p3/2R3Q1/3n4/2q4r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Rc8',
          fen: '2r3k1/pp4pp/4p3/2R3Q1/3n4/2q4r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Rb8',
          fen: '1r4k1/pp4pp/4p3/2R3Q1/3n4/2q4r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Ra8',
          fen: 'r5k1/pp4pp/4p3/2R3Q1/3n4/2q4r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Kf7',
          fen: '5r2/pp3kpp/4p3/2R3Q1/3n4/2q4r/P1P2PPP/5RK1 w - - 1 2',
        },
        {
          move: 'Kh8',
          fen: '5r1k/pp4pp/4p3/2R3Q1/3n4/2q4r/P1P2PPP/5RK1 w - - 1 2',
        },
      ],
    },
  ],
};
