import { TestCases } from './TestCases';

export const taxingTestCases: TestCases = {
  description:
    'Particularly taxing situations involving move and piece counts.  Only positions that can be reached in a standard game of chess are included.',
  testCases: [
    {
      start: {
        fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 w - - 0 1',
        description:
          'A position generating a very large number of possible moves.',
      },
      expected: [
        {
          move: 'Bxa2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/Bp1Q4/k1NN1KB1 b - - 0 1',
        },
        {
          move: 'Bc2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/ppBQ4/k1NN1KB1 b - - 1 1',
        },
        {
          move: 'Bd3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q2B1Q2/pp1Q4/k1NN1KB1 b - - 1 1',
        },
        {
          move: 'Be4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q1B2Q/Q4Q2/pp1Q4/k1NN1KB1 b - - 1 1',
        },
        {
          move: 'Bf5',
          fen: 'R6R/3Q4/1Q4Q1/4QB2/2Q4Q/Q4Q2/pp1Q4/k1NN1KB1 b - - 1 1',
        },
        {
          move: 'Nxa2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/Np1Q4/kB1N1KB1 b - - 0 1',
        },
        {
          move: 'Ne2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1QN3/kB1N1KB1 b - - 1 1',
        },
        {
          move: 'Nb3#',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/QN3Q2/pp1Q4/kB1N1KB1 b - - 1 1',
        },
        {
          move: 'Nd3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q2N1Q2/pp1Q4/kB1N1KB1 b - - 1 1',
        },
        {
          move: 'Nxb2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pN1Q4/kBN2KB1 b - - 0 1',
        },
        {
          move: 'Nf2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q1N2/kBN2KB1 b - - 1 1',
        },
        {
          move: 'Nc3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q1N2Q2/pp1Q4/kBN2KB1 b - - 1 1',
        },
        {
          move: 'Ne3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q3NQ2/pp1Q4/kBN2KB1 b - - 1 1',
        },
        {
          move: 'Ke1',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNNK1B1 b - - 1 1',
        },
        {
          move: 'Ke2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1QK3/kBNN2B1 b - - 1 1',
        },
        {
          move: 'Kf2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q1K2/kBNN2B1 b - - 1 1',
        },
        {
          move: 'Kg2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q2K1/kBNN2B1 b - - 1 1',
        },
        {
          move: 'Bf2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q1B2/kBNN1K2 b - - 1 1',
        },
        {
          move: 'Be3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q3BQ2/pp1Q4/kBNN1K2 b - - 1 1',
        },
        {
          move: 'Bd4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2QB3Q/Q4Q2/pp1Q4/kBNN1K2 b - - 1 1',
        },
        {
          move: 'Bc5',
          fen: 'R6R/3Q4/1Q4Q1/2B1Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1K2 b - - 1 1',
        },
        {
          move: 'Bh2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q3B/kBNN1K2 b - - 1 1',
        },
        {
          move: 'Qde1',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp6/kBNNQKB1 b - - 1 1',
        },
        {
          move: 'Qdc2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/ppQ5/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdxb2#',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pQ6/kBNN1KB1 b - - 0 1',
        },
        {
          move: 'Qde2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp2Q3/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdf2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp3Q2/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdg2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp4Q1/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdh2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp5Q/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdc3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q1Q2Q2/pp6/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdb4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/1QQ4Q/Q4Q2/pp6/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qda5',
          fen: 'R6R/3Q4/1Q4Q1/Q3Q3/2Q4Q/Q4Q2/pp6/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Q2d3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q2Q1Q2/pp6/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Q2d4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2QQ3Q/Q4Q2/pp6/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Q2d5',
          fen: 'R6R/3Q4/1Q4Q1/3QQ3/2Q4Q/Q4Q2/pp6/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Q2d6',
          fen: 'R6R/3Q4/1Q1Q2Q1/4Q3/2Q4Q/Q4Q2/pp6/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qde3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q3QQ2/pp6/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdf4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q2Q1Q/Q4Q2/pp6/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdg5',
          fen: 'R6R/3Q4/1Q4Q1/4Q1Q1/2Q4Q/Q4Q2/pp6/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdh6',
          fen: 'R6R/3Q4/1Q4QQ/4Q3/2Q4Q/Q4Q2/pp6/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qaxa2#',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/5Q2/Qp1Q4/kBNN1KB1 b - - 0 1',
        },
        {
          move: 'Qaxb2#',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/5Q2/pQ1Q4/kBNN1KB1 b - - 0 1',
        },
        {
          move: 'Qab3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/1Q3Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qac3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/2Q2Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qad3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/3Q1Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qae3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/4QQ2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qaa4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/Q1Q4Q/5Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qaa5',
          fen: 'R6R/3Q4/1Q4Q1/Q3Q3/2Q4Q/5Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qaa6',
          fen: 'R6R/3Q4/QQ4Q1/4Q3/2Q4Q/5Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qaa7',
          fen: 'R6R/Q2Q4/1Q4Q1/4Q3/2Q4Q/5Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qab4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/1QQ4Q/5Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qac5',
          fen: 'R6R/3Q4/1Q4Q1/2Q1Q3/2Q4Q/5Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qad6',
          fen: 'R6R/3Q4/1Q1Q2Q1/4Q3/2Q4Q/5Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qae7',
          fen: 'R6R/3QQ3/1Q4Q1/4Q3/2Q4Q/5Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qaf8',
          fen: 'R4Q1R/3Q4/1Q4Q1/4Q3/2Q4Q/5Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qfe2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q7/pp1QQ3/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qff2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q7/pp1Q1Q2/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qfg2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q7/pp1Q2Q1/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qfh1',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q7/pp1Q4/kBNN1KBQ b - - 1 1',
        },
        {
          move: 'Qfe3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q3Q3/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qfd3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q2Q4/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qfc3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q1Q5/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qfb3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/QQ6/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qfg3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q5Q1/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qfh3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q6Q/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qfe4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q1Q2Q/Q7/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qfd5',
          fen: 'R6R/3Q4/1Q4Q1/3QQ3/2Q4Q/Q7/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qfc6',
          fen: 'R6R/3Q4/1QQ3Q1/4Q3/2Q4Q/Q7/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qfb7',
          fen: 'R6R/1Q1Q4/1Q4Q1/4Q3/2Q4Q/Q7/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qff4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q2Q1Q/Q7/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qff5',
          fen: 'R6R/3Q4/1Q4Q1/4QQ2/2Q4Q/Q7/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qff6',
          fen: 'R6R/3Q4/1Q3QQ1/4Q3/2Q4Q/Q7/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qff7',
          fen: 'R6R/3Q1Q2/1Q4Q1/4Q3/2Q4Q/Q7/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qff8',
          fen: 'R4Q1R/3Q4/1Q4Q1/4Q3/2Q4Q/Q7/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qfg4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q3QQ/Q7/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qfh5',
          fen: 'R6R/3Q4/1Q4Q1/4Q2Q/2Q4Q/Q7/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qcb3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/7Q/QQ3Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qcxa2#',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/7Q/Q4Q2/Qp1Q4/kBNN1KB1 b - - 0 1',
        },
        {
          move: 'Qcc3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/7Q/Q1Q2Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qcc2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/7Q/Q4Q2/ppQQ4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qcd3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/7Q/Q2Q1Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qce2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/7Q/Q4Q2/pp1QQ3/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qcb4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/1Q5Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qca4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/Q6Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qcd4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/3Q3Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qce4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/4Q2Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qcf4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/5Q1Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qcg4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/6QQ/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qcb5',
          fen: 'R6R/3Q4/1Q4Q1/1Q2Q3/7Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qca6',
          fen: 'R6R/3Q4/QQ4Q1/4Q3/7Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qcc5',
          fen: 'R6R/3Q4/1Q4Q1/2Q1Q3/7Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qcc6',
          fen: 'R6R/3Q4/1QQ3Q1/4Q3/7Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qcc7',
          fen: 'R6R/2QQ4/1Q4Q1/4Q3/7Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qcc8',
          fen: 'R1Q4R/3Q4/1Q4Q1/4Q3/7Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qcd5',
          fen: 'R6R/3Q4/1Q4Q1/3QQ3/7Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qce6',
          fen: 'R6R/3Q4/1Q2Q1Q1/4Q3/7Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qcf7',
          fen: 'R6R/3Q1Q2/1Q4Q1/4Q3/7Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qcg8',
          fen: 'R5QR/3Q4/1Q4Q1/4Q3/7Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qhg3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q5/Q4QQ1/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qhf2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q5/Q4Q2/pp1Q1Q2/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qhe1',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q5/Q4Q2/pp1Q4/kBNNQKB1 b - - 1 1',
        },
        {
          move: 'Qhh3',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q5/Q4Q1Q/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qhh2',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q5/Q4Q2/pp1Q3Q/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qhh1',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q5/Q4Q2/pp1Q4/kBNN1KBQ b - - 1 1',
        },
        {
          move: 'Qhg4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q3Q1/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qhf4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q2Q2/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qhe4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2Q1Q3/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qhd4',
          fen: 'R6R/3Q4/1Q4Q1/4Q3/2QQ4/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qhg5',
          fen: 'R6R/3Q4/1Q4Q1/4Q1Q1/2Q5/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qhf6',
          fen: 'R6R/3Q4/1Q3QQ1/4Q3/2Q5/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qhe7',
          fen: 'R6R/3QQ3/1Q4Q1/4Q3/2Q5/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qhd8',
          fen: 'R2Q3R/3Q4/1Q4Q1/4Q3/2Q5/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qhh5',
          fen: 'R6R/3Q4/1Q4Q1/4Q2Q/2Q5/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qhh6',
          fen: 'R6R/3Q4/1Q4QQ/4Q3/2Q5/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qhh7',
          fen: 'R6R/3Q3Q/1Q4Q1/4Q3/2Q5/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qed4',
          fen: 'R6R/3Q4/1Q4Q1/8/2QQ3Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qec3',
          fen: 'R6R/3Q4/1Q4Q1/8/2Q4Q/Q1Q2Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qexb2#',
          fen: 'R6R/3Q4/1Q4Q1/8/2Q4Q/Q4Q2/pQ1Q4/kBNN1KB1 b - - 0 1',
        },
        {
          move: 'Qee4',
          fen: 'R6R/3Q4/1Q4Q1/8/2Q1Q2Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qee3',
          fen: 'R6R/3Q4/1Q4Q1/8/2Q4Q/Q3QQ2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qee2',
          fen: 'R6R/3Q4/1Q4Q1/8/2Q4Q/Q4Q2/pp1QQ3/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qee1',
          fen: 'R6R/3Q4/1Q4Q1/8/2Q4Q/Q4Q2/pp1Q4/kBNNQKB1 b - - 1 1',
        },
        {
          move: 'Qef4',
          fen: 'R6R/3Q4/1Q4Q1/8/2Q2Q1Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qeg3',
          fen: 'R6R/3Q4/1Q4Q1/8/2Q4Q/Q4QQ1/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qeh2',
          fen: 'R6R/3Q4/1Q4Q1/8/2Q4Q/Q4Q2/pp1Q3Q/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qed5',
          fen: 'R6R/3Q4/1Q4Q1/3Q4/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qec5',
          fen: 'R6R/3Q4/1Q4Q1/2Q5/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qeb5',
          fen: 'R6R/3Q4/1Q4Q1/1Q6/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qea5',
          fen: 'R6R/3Q4/1Q4Q1/Q7/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qef5',
          fen: 'R6R/3Q4/1Q4Q1/5Q2/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qeg5',
          fen: 'R6R/3Q4/1Q4Q1/6Q1/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qeh5',
          fen: 'R6R/3Q4/1Q4Q1/7Q/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qed6',
          fen: 'R6R/3Q4/1Q1Q2Q1/8/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qec7',
          fen: 'R6R/2QQ4/1Q4Q1/8/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qeb8',
          fen: 'RQ5R/3Q4/1Q4Q1/8/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qee6',
          fen: 'R6R/3Q4/1Q2Q1Q1/8/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qee7',
          fen: 'R6R/3QQ3/1Q4Q1/8/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qee8',
          fen: 'R3Q2R/3Q4/1Q4Q1/8/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qef6',
          fen: 'R6R/3Q4/1Q3QQ1/8/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qeg7',
          fen: 'R6R/3Q2Q1/1Q4Q1/8/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qba5',
          fen: 'R6R/3Q4/6Q1/Q3Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qbb5',
          fen: 'R6R/3Q4/6Q1/1Q2Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qbb4',
          fen: 'R6R/3Q4/6Q1/4Q3/1QQ4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qbb3',
          fen: 'R6R/3Q4/6Q1/4Q3/2Q4Q/QQ3Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qbxb2#',
          fen: 'R6R/3Q4/6Q1/4Q3/2Q4Q/Q4Q2/pQ1Q4/kBNN1KB1 b - - 0 1',
        },
        {
          move: 'Qbc5',
          fen: 'R6R/3Q4/6Q1/2Q1Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qbd4',
          fen: 'R6R/3Q4/6Q1/4Q3/2QQ3Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qbe3',
          fen: 'R6R/3Q4/6Q1/4Q3/2Q4Q/Q3QQ2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qbf2',
          fen: 'R6R/3Q4/6Q1/4Q3/2Q4Q/Q4Q2/pp1Q1Q2/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qba6',
          fen: 'R6R/3Q4/Q5Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qbc6',
          fen: 'R6R/3Q4/2Q3Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qbd6',
          fen: 'R6R/3Q4/3Q2Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qbe6',
          fen: 'R6R/3Q4/4Q1Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qbf6',
          fen: 'R6R/3Q4/5QQ1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qba7',
          fen: 'R6R/Q2Q4/6Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qbb7',
          fen: 'R6R/1Q1Q4/6Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qbb8',
          fen: 'RQ5R/3Q4/6Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qbc7',
          fen: 'R6R/2QQ4/6Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qbd8',
          fen: 'R2Q3R/3Q4/6Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qgf5',
          fen: 'R6R/3Q4/1Q6/4QQ2/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qge4',
          fen: 'R6R/3Q4/1Q6/4Q3/2Q1Q2Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qgd3',
          fen: 'R6R/3Q4/1Q6/4Q3/2Q4Q/Q2Q1Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qgc2',
          fen: 'R6R/3Q4/1Q6/4Q3/2Q4Q/Q4Q2/ppQQ4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qgg5',
          fen: 'R6R/3Q4/1Q6/4Q1Q1/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qgg4',
          fen: 'R6R/3Q4/1Q6/4Q3/2Q3QQ/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qgg3',
          fen: 'R6R/3Q4/1Q6/4Q3/2Q4Q/Q4QQ1/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qgg2',
          fen: 'R6R/3Q4/1Q6/4Q3/2Q4Q/Q4Q2/pp1Q2Q1/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qgh5',
          fen: 'R6R/3Q4/1Q6/4Q2Q/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qgf6',
          fen: 'R6R/3Q4/1Q3Q2/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qge6',
          fen: 'R6R/3Q4/1Q2Q3/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qgd6',
          fen: 'R6R/3Q4/1Q1Q4/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qgc6',
          fen: 'R6R/3Q4/1QQ5/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qgh6',
          fen: 'R6R/3Q4/1Q5Q/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qgf7',
          fen: 'R6R/3Q1Q2/1Q6/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qge8',
          fen: 'R3Q2R/3Q4/1Q6/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qgg7',
          fen: 'R6R/3Q2Q1/1Q6/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qgg8',
          fen: 'R5QR/3Q4/1Q6/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qgh7',
          fen: 'R6R/3Q3Q/1Q6/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdc6',
          fen: 'R6R/8/1QQ3Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdb5',
          fen: 'R6R/8/1Q4Q1/1Q2Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qda4',
          fen: 'R6R/8/1Q4Q1/4Q3/Q1Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Q7d6',
          fen: 'R6R/8/1Q1Q2Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Q7d5',
          fen: 'R6R/8/1Q4Q1/3QQ3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Q7d4',
          fen: 'R6R/8/1Q4Q1/4Q3/2QQ3Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Q7d3',
          fen: 'R6R/8/1Q4Q1/4Q3/2Q4Q/Q2Q1Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qde6',
          fen: 'R6R/8/1Q2Q1Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdf5',
          fen: 'R6R/8/1Q4Q1/4QQ2/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdg4',
          fen: 'R6R/8/1Q4Q1/4Q3/2Q3QQ/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdh3',
          fen: 'R6R/8/1Q4Q1/4Q3/2Q4Q/Q4Q1Q/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdc7',
          fen: 'R6R/2Q5/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdb7',
          fen: 'R6R/1Q6/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qda7',
          fen: 'R6R/Q7/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qde7',
          fen: 'R6R/4Q3/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdf7',
          fen: 'R6R/5Q2/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdg7',
          fen: 'R6R/6Q1/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdh7',
          fen: 'R6R/7Q/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdc8',
          fen: 'R1Q4R/8/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qdd8',
          fen: 'R2Q3R/8/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Qde8',
          fen: 'R3Q2R/8/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Ra7',
          fen: '7R/R2Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Ra6',
          fen: '7R/3Q4/RQ4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Ra5',
          fen: '7R/3Q4/1Q4Q1/R3Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Ra4',
          fen: '7R/3Q4/1Q4Q1/4Q3/R1Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Rab8',
          fen: '1R5R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Rac8',
          fen: '2R4R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Rad8',
          fen: '3R3R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Rae8',
          fen: '4R2R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Raf8',
          fen: '5R1R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Rag8',
          fen: '6RR/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Rh7',
          fen: 'R7/3Q3R/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Rh6',
          fen: 'R7/3Q4/1Q4QR/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Rh5',
          fen: 'R7/3Q4/1Q4Q1/4Q2R/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Rhg8',
          fen: 'R5R1/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Rhf8',
          fen: 'R4R2/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Rhe8',
          fen: 'R3R3/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Rhd8',
          fen: 'R2R4/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Rhc8',
          fen: 'R1R5/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
        {
          move: 'Rhb8',
          fen: 'RR6/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 b - - 1 1',
        },
      ],
    },
    {
      description:
        'Transpose of R6R/3Q4/1Q4Q1/4Q3/2Q4Q/Q4Q2/pp1Q4/kBNN1KB1 w - - 0 1',
      start: {
        fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/3q4/r6r b - - 0 1',
        description:
          'A position generating a very large number of possible moves.',
      },
      expected: [
        {
          move: 'Rab1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/3q4/1r5r w - - 1 2',
        },
        {
          move: 'Rac1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/3q4/2r4r w - - 1 2',
        },
        {
          move: 'Rad1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/3q4/3r3r w - - 1 2',
        },
        {
          move: 'Rae1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/3q4/4r2r w - - 1 2',
        },
        {
          move: 'Raf1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/3q4/5r1r w - - 1 2',
        },
        {
          move: 'Rag1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/3q4/6rr w - - 1 2',
        },
        {
          move: 'Ra2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/r2q4/7r w - - 1 2',
        },
        {
          move: 'Ra3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/rq4q1/3q4/7r w - - 1 2',
        },
        {
          move: 'Ra4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/r3q3/1q4q1/3q4/7r w - - 1 2',
        },
        {
          move: 'Ra5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/r1q4q/4q3/1q4q1/3q4/7r w - - 1 2',
        },
        {
          move: 'Rhg1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/3q4/r5r1 w - - 1 2',
        },
        {
          move: 'Rhf1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/3q4/r4r2 w - - 1 2',
        },
        {
          move: 'Rhe1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/3q4/r3r3 w - - 1 2',
        },
        {
          move: 'Rhd1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/3q4/r2r4 w - - 1 2',
        },
        {
          move: 'Rhc1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/3q4/r1r5 w - - 1 2',
        },
        {
          move: 'Rhb1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/3q4/rr6 w - - 1 2',
        },
        {
          move: 'Rh2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/3q3r/r7 w - - 1 2',
        },
        {
          move: 'Rh3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4qr/3q4/r7 w - - 1 2',
        },
        {
          move: 'Rh4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q2r/1q4q1/3q4/r7 w - - 1 2',
        },
        {
          move: 'Qdc1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/8/r1q4r w - - 1 2',
        },
        {
          move: 'Qdd1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/8/r2q3r w - - 1 2',
        },
        {
          move: 'Qde1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/8/r3q2r w - - 1 2',
        },
        {
          move: 'Qdc2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/2q5/r6r w - - 1 2',
        },
        {
          move: 'Qdb2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/1q6/r6r w - - 1 2',
        },
        {
          move: 'Qda2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/q7/r6r w - - 1 2',
        },
        {
          move: 'Qde2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/4q3/r6r w - - 1 2',
        },
        {
          move: 'Qdf2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/5q2/r6r w - - 1 2',
        },
        {
          move: 'Qdg2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/6q1/r6r w - - 1 2',
        },
        {
          move: 'Qdh2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q4q1/7q/r6r w - - 1 2',
        },
        {
          move: 'Qdc3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1qq3q1/8/r6r w - - 1 2',
        },
        {
          move: 'Qdb4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/1q2q3/1q4q1/8/r6r w - - 1 2',
        },
        {
          move: 'Qda5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/q1q4q/4q3/1q4q1/8/r6r w - - 1 2',
        },
        {
          move: 'Q2d3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q1q2q1/8/r6r w - - 1 2',
        },
        {
          move: 'Q2d4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/3qq3/1q4q1/8/r6r w - - 1 2',
        },
        {
          move: 'Q2d5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2qq3q/4q3/1q4q1/8/r6r w - - 1 2',
        },
        {
          move: 'Q2d6',
          fen: 'Kbnn1kb1/PP1q4/q2q1q2/2q4q/4q3/1q4q1/8/r6r w - - 1 2',
        },
        {
          move: 'Qde3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q2q1q1/8/r6r w - - 1 2',
        },
        {
          move: 'Qdf4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4qq2/1q4q1/8/r6r w - - 1 2',
        },
        {
          move: 'Qdg5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q3qq/4q3/1q4q1/8/r6r w - - 1 2',
        },
        {
          move: 'Qdh6',
          fen: 'Kbnn1kb1/PP1q4/q4q1q/2q4q/4q3/1q4q1/8/r6r w - - 1 2',
        },
        {
          move: 'Qba2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/6q1/q2q4/r6r w - - 1 2',
        },
        {
          move: 'Qbb2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/6q1/1q1q4/r6r w - - 1 2',
        },
        {
          move: 'Qbb1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/6q1/3q4/rq5r w - - 1 2',
        },
        {
          move: 'Qbc2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/6q1/2qq4/r6r w - - 1 2',
        },
        {
          move: 'Qbd1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/6q1/3q4/r2q3r w - - 1 2',
        },
        {
          move: 'Qba3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/q5q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qbc3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/2q3q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qbd3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/3q2q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qbe3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/4q1q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qbf3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/5qq1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qba4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/q3q3/6q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qbb4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/1q2q3/6q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qbb5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/1qq4q/4q3/6q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qbb6',
          fen: 'Kbnn1kb1/PP1q4/qq3q2/2q4q/4q3/6q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qbxb7#',
          fen: 'Kbnn1kb1/Pq1q4/q4q2/2q4q/4q3/6q1/3q4/r6r w - - 0 2',
        },
        {
          move: 'Qbc4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/2q1q3/6q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qbd5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2qq3q/4q3/6q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qbe6',
          fen: 'Kbnn1kb1/PP1q4/q3qq2/2q4q/4q3/6q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qbf7',
          fen: 'Kbnn1kb1/PP1q1q2/q4q2/2q4q/4q3/6q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qgf2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q6/3q1q2/r6r w - - 1 2',
        },
        {
          move: 'Qge1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q6/3q4/r3q2r w - - 1 2',
        },
        {
          move: 'Qgg2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q6/3q2q1/r6r w - - 1 2',
        },
        {
          move: 'Qgg1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q6/3q4/r5qr w - - 1 2',
        },
        {
          move: 'Qgh2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q6/3q3q/r6r w - - 1 2',
        },
        {
          move: 'Qgf3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q3q2/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qge3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q2q3/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qgd3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q1q4/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qgc3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1qq5/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qgh3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q3/1q5q/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qgf4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4qq2/1q6/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qge5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q1q2q/4q3/1q6/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qgd6',
          fen: 'Kbnn1kb1/PP1q4/q2q1q2/2q4q/4q3/1q6/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qgc7',
          fen: 'Kbnn1kb1/PPqq4/q4q2/2q4q/4q3/1q6/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qgg4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q1q1/1q6/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qgg5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q3qq/4q3/1q6/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qgg6',
          fen: 'Kbnn1kb1/PP1q4/q4qq1/2q4q/4q3/1q6/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qgg7',
          fen: 'Kbnn1kb1/PP1q2q1/q4q2/2q4q/4q3/1q6/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qgh4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/4q2q/1q6/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qed3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/8/1q1q2q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qec2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/8/1q4q1/2qq4/r6r w - - 1 2',
        },
        {
          move: 'Qeb1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/8/1q4q1/3q4/rq5r w - - 1 2',
        },
        {
          move: 'Qee3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/8/1q2q1q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qee2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/8/1q4q1/3qq3/r6r w - - 1 2',
        },
        {
          move: 'Qee1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/8/1q4q1/3q4/r3q2r w - - 1 2',
        },
        {
          move: 'Qef3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/8/1q3qq1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qeg2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/8/1q4q1/3q2q1/r6r w - - 1 2',
        },
        {
          move: 'Qed4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/3q4/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qec4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/2q5/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qeb4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/1q6/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qea4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/q7/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qef4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/5q2/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qeg4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/6q1/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qeh4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q4q/7q/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qed5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2qq3q/8/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qec6',
          fen: 'Kbnn1kb1/PP1q4/q1q2q2/2q4q/8/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qexb7#',
          fen: 'Kbnn1kb1/Pq1q4/q4q2/2q4q/8/1q4q1/3q4/r6r w - - 0 2',
        },
        {
          move: 'Qee5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q1q2q/8/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qee6',
          fen: 'Kbnn1kb1/PP1q4/q3qq2/2q4q/8/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qee7',
          fen: 'Kbnn1kb1/PP1qq3/q4q2/2q4q/8/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qee8',
          fen: 'Kbnnqkb1/PP1q4/q4q2/2q4q/8/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qef5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q2q1q/8/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qeg6',
          fen: 'Kbnn1kb1/PP1q4/q4qq1/2q4q/8/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qeh7',
          fen: 'Kbnn1kb1/PP1q3q/q4q2/2q4q/8/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qcb4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/7q/1q2q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qca3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/7q/4q3/qq4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qcc4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/7q/2q1q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qcc3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/7q/4q3/1qq3q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qcc2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/7q/4q3/1q4q1/2qq4/r6r w - - 1 2',
        },
        {
          move: 'Qcc1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/7q/4q3/1q4q1/3q4/r1q4r w - - 1 2',
        },
        {
          move: 'Qcd4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/7q/3qq3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qce3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/7q/4q3/1q2q1q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qcf2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/7q/4q3/1q4q1/3q1q2/r6r w - - 1 2',
        },
        {
          move: 'Qcg1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/7q/4q3/1q4q1/3q4/r5qr w - - 1 2',
        },
        {
          move: 'Qcb5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/1q5q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qca5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/q6q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qcd5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/3q3q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qce5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/4q2q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qcf5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/5q1q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qcg5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/6qq/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qcb6',
          fen: 'Kbnn1kb1/PP1q4/qq3q2/7q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qcxa7#',
          fen: 'Kbnn1kb1/qP1q4/q4q2/7q/4q3/1q4q1/3q4/r6r w - - 0 2',
        },
        {
          move: 'Qcc6',
          fen: 'Kbnn1kb1/PP1q4/q1q2q2/7q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qcc7',
          fen: 'Kbnn1kb1/PPqq4/q4q2/7q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qcd6',
          fen: 'Kbnn1kb1/PP1q4/q2q1q2/7q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qce7',
          fen: 'Kbnn1kb1/PP1qq3/q4q2/7q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qhg4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q5/4q1q1/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qhf3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q5/4q3/1q3qq1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qhe2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q5/4q3/1q4q1/3qq3/r6r w - - 1 2',
        },
        {
          move: 'Qhd1',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q5/4q3/1q4q1/3q4/r2q3r w - - 1 2',
        },
        {
          move: 'Qhh4',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q5/4q2q/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qhh3',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q5/4q3/1q4qq/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qhh2',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q5/4q3/1q4q1/3q3q/r6r w - - 1 2',
        },
        {
          move: 'Qhg5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q3q1/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qhf5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q2q2/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qhe5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2q1q3/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qhd5',
          fen: 'Kbnn1kb1/PP1q4/q4q2/2qq4/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qhg6',
          fen: 'Kbnn1kb1/PP1q4/q4qq1/2q5/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qhf7',
          fen: 'Kbnn1kb1/PP1q1q2/q4q2/2q5/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qhe8',
          fen: 'Kbnnqkb1/PP1q4/q4q2/2q5/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qhh6',
          fen: 'Kbnn1kb1/PP1q4/q4q1q/2q5/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qhh7',
          fen: 'Kbnn1kb1/PP1q3q/q4q2/2q5/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qhh8',
          fen: 'Kbnn1kbq/PP1q4/q4q2/2q5/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qaa5',
          fen: 'Kbnn1kb1/PP1q4/5q2/q1q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qaa4',
          fen: 'Kbnn1kb1/PP1q4/5q2/2q4q/q3q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qaa3',
          fen: 'Kbnn1kb1/PP1q4/5q2/2q4q/4q3/qq4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qaa2',
          fen: 'Kbnn1kb1/PP1q4/5q2/2q4q/4q3/1q4q1/q2q4/r6r w - - 1 2',
        },
        {
          move: 'Qab5',
          fen: 'Kbnn1kb1/PP1q4/5q2/1qq4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qac4',
          fen: 'Kbnn1kb1/PP1q4/5q2/2q4q/2q1q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qad3',
          fen: 'Kbnn1kb1/PP1q4/5q2/2q4q/4q3/1q1q2q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qae2',
          fen: 'Kbnn1kb1/PP1q4/5q2/2q4q/4q3/1q4q1/3qq3/r6r w - - 1 2',
        },
        {
          move: 'Qaf1',
          fen: 'Kbnn1kb1/PP1q4/5q2/2q4q/4q3/1q4q1/3q4/r4q1r w - - 1 2',
        },
        {
          move: 'Qab6',
          fen: 'Kbnn1kb1/PP1q4/1q3q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qac6',
          fen: 'Kbnn1kb1/PP1q4/2q2q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qad6',
          fen: 'Kbnn1kb1/PP1q4/3q1q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qae6',
          fen: 'Kbnn1kb1/PP1q4/4qq2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qaxa7#',
          fen: 'Kbnn1kb1/qP1q4/5q2/2q4q/4q3/1q4q1/3q4/r6r w - - 0 2',
        },
        {
          move: 'Qaxb7#',
          fen: 'Kbnn1kb1/Pq1q4/5q2/2q4q/4q3/1q4q1/3q4/r6r w - - 0 2',
        },
        {
          move: 'Qfe5',
          fen: 'Kbnn1kb1/PP1q4/q7/2q1q2q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qfd4',
          fen: 'Kbnn1kb1/PP1q4/q7/2q4q/3qq3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qfc3',
          fen: 'Kbnn1kb1/PP1q4/q7/2q4q/4q3/1qq3q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qfb2',
          fen: 'Kbnn1kb1/PP1q4/q7/2q4q/4q3/1q4q1/1q1q4/r6r w - - 1 2',
        },
        {
          move: 'Qff5',
          fen: 'Kbnn1kb1/PP1q4/q7/2q2q1q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qff4',
          fen: 'Kbnn1kb1/PP1q4/q7/2q4q/4qq2/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qff3',
          fen: 'Kbnn1kb1/PP1q4/q7/2q4q/4q3/1q3qq1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qff2',
          fen: 'Kbnn1kb1/PP1q4/q7/2q4q/4q3/1q4q1/3q1q2/r6r w - - 1 2',
        },
        {
          move: 'Qff1',
          fen: 'Kbnn1kb1/PP1q4/q7/2q4q/4q3/1q4q1/3q4/r4q1r w - - 1 2',
        },
        {
          move: 'Qfg5',
          fen: 'Kbnn1kb1/PP1q4/q7/2q3qq/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qfh4',
          fen: 'Kbnn1kb1/PP1q4/q7/2q4q/4q2q/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qfe6',
          fen: 'Kbnn1kb1/PP1q4/q3q3/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qfd6',
          fen: 'Kbnn1kb1/PP1q4/q2q4/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qfc6',
          fen: 'Kbnn1kb1/PP1q4/q1q5/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qfb6',
          fen: 'Kbnn1kb1/PP1q4/qq6/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qfg6',
          fen: 'Kbnn1kb1/PP1q4/q5q1/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qfh6',
          fen: 'Kbnn1kb1/PP1q4/q6q/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qfe7',
          fen: 'Kbnn1kb1/PP1qq3/q7/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qff7',
          fen: 'Kbnn1kb1/PP1q1q2/q7/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qfg7',
          fen: 'Kbnn1kb1/PP1q2q1/q7/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qfh8',
          fen: 'Kbnn1kbq/PP1q4/q7/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qdc6',
          fen: 'Kbnn1kb1/PP6/q1q2q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qdb5',
          fen: 'Kbnn1kb1/PP6/q4q2/1qq4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qda4',
          fen: 'Kbnn1kb1/PP6/q4q2/2q4q/q3q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Q7d6',
          fen: 'Kbnn1kb1/PP6/q2q1q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Q7d5',
          fen: 'Kbnn1kb1/PP6/q4q2/2qq3q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Q7d4',
          fen: 'Kbnn1kb1/PP6/q4q2/2q4q/3qq3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Q7d3',
          fen: 'Kbnn1kb1/PP6/q4q2/2q4q/4q3/1q1q2q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qde6',
          fen: 'Kbnn1kb1/PP6/q3qq2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qdf5',
          fen: 'Kbnn1kb1/PP6/q4q2/2q2q1q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qdg4',
          fen: 'Kbnn1kb1/PP6/q4q2/2q4q/4q1q1/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qdh3',
          fen: 'Kbnn1kb1/PP6/q4q2/2q4q/4q3/1q4qq/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qdc7',
          fen: 'Kbnn1kb1/PPq5/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qdxb7#',
          fen: 'Kbnn1kb1/Pq6/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 0 2',
        },
        {
          move: 'Qde7',
          fen: 'Kbnn1kb1/PP2q3/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qdf7',
          fen: 'Kbnn1kb1/PP3q2/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qdg7',
          fen: 'Kbnn1kb1/PP4q1/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qdh7',
          fen: 'Kbnn1kb1/PP5q/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Qde8',
          fen: 'Kbnnqkb1/PP6/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Bxa7',
          fen: 'K1nn1kb1/bP1q4/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 0 2',
        },
        {
          move: 'Bc7',
          fen: 'K1nn1kb1/PPbq4/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Bd6',
          fen: 'K1nn1kb1/PP1q4/q2b1q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Be5',
          fen: 'K1nn1kb1/PP1q4/q4q2/2q1b2q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Bf4',
          fen: 'K1nn1kb1/PP1q4/q4q2/2q4q/4qb2/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Nb6#',
          fen: 'Kb1n1kb1/PP1q4/qn3q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Nd6',
          fen: 'Kb1n1kb1/PP1q4/q2n1q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Nxa7',
          fen: 'Kb1n1kb1/nP1q4/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 0 2',
        },
        {
          move: 'Ne7',
          fen: 'Kb1n1kb1/PP1qn3/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Nc6',
          fen: 'Kbn2kb1/PP1q4/q1n2q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Ne6',
          fen: 'Kbn2kb1/PP1q4/q3nq2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Nxb7',
          fen: 'Kbn2kb1/Pn1q4/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 0 2',
        },
        {
          move: 'Nf7',
          fen: 'Kbn2kb1/PP1q1n2/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Ke7',
          fen: 'Kbnn2b1/PP1qk3/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Kf7',
          fen: 'Kbnn2b1/PP1q1k2/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Kg7',
          fen: 'Kbnn2b1/PP1q2k1/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Ke8',
          fen: 'Kbnnk1b1/PP1q4/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Bf7',
          fen: 'Kbnn1k2/PP1q1b2/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Be6',
          fen: 'Kbnn1k2/PP1q4/q3bq2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Bd5',
          fen: 'Kbnn1k2/PP1q4/q4q2/2qb3q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Bc4',
          fen: 'Kbnn1k2/PP1q4/q4q2/2q4q/2b1q3/1q4q1/3q4/r6r w - - 1 2',
        },
        {
          move: 'Bh7',
          fen: 'Kbnn1k2/PP1q3b/q4q2/2q4q/4q3/1q4q1/3q4/r6r w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: 'B2k4/1B6/2B5/3B4/4B3/1B3B2/5KB1/6BB w - - 0 1',
        description: 'The maximum number of bishops, mostly white.',
      },
      expected: [
        {
          move: 'Bh2',
          fen: 'B2k4/1B6/2B5/3B4/4B3/1B3B2/5KBB/7B b - - 1 1',
        },
        {
          move: 'Ke1',
          fen: 'B2k4/1B6/2B5/3B4/4B3/1B3B2/6B1/4K1BB b - - 1 1',
        },
        {
          move: 'Kf1',
          fen: 'B2k4/1B6/2B5/3B4/4B3/1B3B2/6B1/5KBB b - - 1 1',
        },
        {
          move: 'Ke2',
          fen: 'B2k4/1B6/2B5/3B4/4B3/1B3B2/4K1B1/6BB b - - 1 1',
        },
        {
          move: 'Ke3',
          fen: 'B2k4/1B6/2B5/3B4/4B3/1B2KB2/6B1/6BB b - - 1 1',
        },
        {
          move: 'Kg3',
          fen: 'B2k4/1B6/2B5/3B4/4B3/1B3BK1/6B1/6BB b - - 1 1',
        },
        {
          move: 'Bf1',
          fen: 'B2k4/1B6/2B5/3B4/4B3/1B3B2/5K2/5BBB b - - 1 1',
        },
        {
          move: 'Bh3',
          fen: 'B2k4/1B6/2B5/3B4/4B3/1B3B1B/5K2/6BB b - - 1 1',
        },
        {
          move: 'Ba2',
          fen: 'B2k4/1B6/2B5/3B4/4B3/5B2/B4KB1/6BB b - - 1 1',
        },
        {
          move: 'Bbc2',
          fen: 'B2k4/1B6/2B5/3B4/4B3/5B2/2B2KB1/6BB b - - 1 1',
        },
        {
          move: 'Bbd1',
          fen: 'B2k4/1B6/2B5/3B4/4B3/5B2/5KB1/3B2BB b - - 1 1',
        },
        {
          move: 'Bba4',
          fen: 'B2k4/1B6/2B5/3B4/B3B3/5B2/5KB1/6BB b - - 1 1',
        },
        {
          move: 'Bbc4',
          fen: 'B2k4/1B6/2B5/3B4/2B1B3/5B2/5KB1/6BB b - - 1 1',
        },
        {
          move: 'Be2',
          fen: 'B2k4/1B6/2B5/3B4/4B3/1B6/4BKB1/6BB b - - 1 1',
        },
        {
          move: 'Bfd1',
          fen: 'B2k4/1B6/2B5/3B4/4B3/1B6/5KB1/3B2BB b - - 1 1',
        },
        {
          move: 'Bg4',
          fen: 'B2k4/1B6/2B5/3B4/4B1B1/1B6/5KB1/6BB b - - 1 1',
        },
        {
          move: 'Bh5',
          fen: 'B2k4/1B6/2B5/3B3B/4B3/1B6/5KB1/6BB b - - 1 1',
        },
        {
          move: 'Bd3',
          fen: 'B2k4/1B6/2B5/3B4/8/1B1B1B2/5KB1/6BB b - - 1 1',
        },
        {
          move: 'Bec2',
          fen: 'B2k4/1B6/2B5/3B4/8/1B3B2/2B2KB1/6BB b - - 1 1',
        },
        {
          move: 'Bb1',
          fen: 'B2k4/1B6/2B5/3B4/8/1B3B2/5KB1/1B4BB b - - 1 1',
        },
        {
          move: 'Bf5',
          fen: 'B2k4/1B6/2B5/3B1B2/8/1B3B2/5KB1/6BB b - - 1 1',
        },
        {
          move: 'Bg6',
          fen: 'B2k4/1B6/2B3B1/3B4/8/1B3B2/5KB1/6BB b - - 1 1',
        },
        {
          move: 'Bh7',
          fen: 'B2k4/1B5B/2B5/3B4/8/1B3B2/5KB1/6BB b - - 1 1',
        },
        {
          move: 'Bdc4',
          fen: 'B2k4/1B6/2B5/8/2B1B3/1B3B2/5KB1/6BB b - - 1 1',
        },
        {
          move: 'Be6',
          fen: 'B2k4/1B6/2B1B3/8/4B3/1B3B2/5KB1/6BB b - - 1 1',
        },
        {
          move: 'Bf7',
          fen: 'B2k4/1B3B2/2B5/8/4B3/1B3B2/5KB1/6BB b - - 1 1',
        },
        {
          move: 'Bg8',
          fen: 'B2k2B1/1B6/2B5/8/4B3/1B3B2/5KB1/6BB b - - 1 1',
        },
        {
          move: 'Bb5',
          fen: 'B2k4/1B6/8/1B1B4/4B3/1B3B2/5KB1/6BB b - - 1 1',
        },
        {
          move: 'Bca4',
          fen: 'B2k4/1B6/8/3B4/B3B3/1B3B2/5KB1/6BB b - - 1 1',
        },
        {
          move: 'Bd7',
          fen: 'B2k4/1B1B4/8/3B4/4B3/1B3B2/5KB1/6BB b - - 1 1',
        },
        {
          move: 'Be8',
          fen: 'B2kB3/1B6/8/3B4/4B3/1B3B2/5KB1/6BB b - - 1 1',
        },
        {
          move: 'Ba6',
          fen: 'B2k4/8/B1B5/3B4/4B3/1B3B2/5KB1/6BB b - - 1 1',
        },
        {
          move: 'Bc8',
          fen: 'B1Bk4/8/2B5/3B4/4B3/1B3B2/5KB1/6BB b - - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of B2k4/1B6/2B5/3B4/4B3/1B3B2/5KB1/6BB w - - 0 1',
      start: {
        fen: '6bb/5kb1/1b3b2/4b3/3b4/2b5/1b6/b2K4 b - - 0 1',
        description: 'The maximum number of bishops, mostly black.',
      },
      expected: [
        {
          move: 'Bc1',
          fen: '6bb/5kb1/1b3b2/4b3/3b4/2b5/8/b1bK4 w - - 1 2',
        },
        {
          move: 'Ba3',
          fen: '6bb/5kb1/1b3b2/4b3/3b4/b1b5/8/b2K4 w - - 1 2',
        },
        {
          move: 'Bd2',
          fen: '6bb/5kb1/1b3b2/4b3/3b4/8/1b1b4/b2K4 w - - 1 2',
        },
        {
          move: 'Be1',
          fen: '6bb/5kb1/1b3b2/4b3/3b4/8/1b6/b2Kb3 w - - 1 2',
        },
        {
          move: 'Bb4',
          fen: '6bb/5kb1/1b3b2/4b3/1b1b4/8/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Bca5',
          fen: '6bb/5kb1/1b3b2/b3b3/3b4/8/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Be3',
          fen: '6bb/5kb1/1b3b2/4b3/8/2b1b3/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Bf2',
          fen: '6bb/5kb1/1b3b2/4b3/8/2b5/1b3b2/b2K4 w - - 1 2',
        },
        {
          move: 'Bg1',
          fen: '6bb/5kb1/1b3b2/4b3/8/2b5/1b6/b2K2b1 w - - 1 2',
        },
        {
          move: 'Bdc5',
          fen: '6bb/5kb1/1b3b2/2b1b3/8/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Bf4',
          fen: '6bb/5kb1/1b3b2/8/3b1b2/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Bg3',
          fen: '6bb/5kb1/1b3b2/8/3b4/2b3b1/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Bh2',
          fen: '6bb/5kb1/1b3b2/8/3b4/2b5/1b5b/b2K4 w - - 1 2',
        },
        {
          move: 'Bd6',
          fen: '6bb/5kb1/1b1b1b2/8/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Bec7',
          fen: '6bb/2b2kb1/1b3b2/8/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Bb8',
          fen: '1b4bb/5kb1/1b3b2/8/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Bba5',
          fen: '6bb/5kb1/5b2/b3b3/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Bbc5',
          fen: '6bb/5kb1/5b2/2b1b3/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Ba7',
          fen: '6bb/b4kb1/5b2/4b3/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Bbc7',
          fen: '6bb/2b2kb1/5b2/4b3/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Bbd8',
          fen: '3b2bb/5kb1/5b2/4b3/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Bg5',
          fen: '6bb/5kb1/1b6/4b1b1/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Bh4',
          fen: '6bb/5kb1/1b6/4b3/3b3b/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Be7',
          fen: '6bb/4bkb1/1b6/4b3/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Bfd8',
          fen: '3b2bb/5kb1/1b6/4b3/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Ke6',
          fen: '6bb/6b1/1b2kb2/4b3/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Kg6',
          fen: '6bb/6b1/1b3bk1/4b3/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Ke7',
          fen: '6bb/4k1b1/1b3b2/4b3/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Ke8',
          fen: '4k1bb/6b1/1b3b2/4b3/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Kf8',
          fen: '5kbb/6b1/1b3b2/4b3/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Bh6',
          fen: '6bb/5k2/1b3b1b/4b3/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Bf8',
          fen: '5bbb/5k2/1b3b2/4b3/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
        {
          move: 'Bh7',
          fen: '7b/5kbb/1b3b2/4b3/3b4/2b5/1b6/b2K4 w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '1Bk5/B1B5/1B1B4/B1B4B/1B6/B7/5K2/8 w - - 0 1',
        description:
          'The maximum number of bishops, mostly black, but not many moves.',
      },
      expected: [
        {
          move: 'Ke1',
          fen: '1Bk5/B1B5/1B1B4/B1B4B/1B6/B7/8/4K3 b - - 1 1',
        },
        {
          move: 'Kf1',
          fen: '1Bk5/B1B5/1B1B4/B1B4B/1B6/B7/8/5K2 b - - 1 1',
        },
        {
          move: 'Kg1',
          fen: '1Bk5/B1B5/1B1B4/B1B4B/1B6/B7/8/6K1 b - - 1 1',
        },
        {
          move: 'Ke2',
          fen: '1Bk5/B1B5/1B1B4/B1B4B/1B6/B7/4K3/8 b - - 1 1',
        },
        {
          move: 'Kg2',
          fen: '1Bk5/B1B5/1B1B4/B1B4B/1B6/B7/6K1/8 b - - 1 1',
        },
        {
          move: 'Ke3',
          fen: '1Bk5/B1B5/1B1B4/B1B4B/1B6/B3K3/8/8 b - - 1 1',
        },
        {
          move: 'Kf3',
          fen: '1Bk5/B1B5/1B1B4/B1B4B/1B6/B4K2/8/8 b - - 1 1',
        },
        {
          move: 'Kg3',
          fen: '1Bk5/B1B5/1B1B4/B1B4B/1B6/B5K1/8/8 b - - 1 1',
        },
        {
          move: 'Bb2',
          fen: '1Bk5/B1B5/1B1B4/B1B4B/1B6/8/1B3K2/8 b - - 1 1',
        },
        {
          move: 'Bc1',
          fen: '1Bk5/B1B5/1B1B4/B1B4B/1B6/8/5K2/2B5 b - - 1 1',
        },
        {
          move: 'Bc3',
          fen: '1Bk5/B1B5/1B1B4/B1B4B/8/B1B5/5K2/8 b - - 1 1',
        },
        {
          move: 'Bd2',
          fen: '1Bk5/B1B5/1B1B4/B1B4B/8/B7/3B1K2/8 b - - 1 1',
        },
        {
          move: 'Be1',
          fen: '1Bk5/B1B5/1B1B4/B1B4B/8/B7/5K2/4B3 b - - 1 1',
        },
        {
          move: 'Bd4',
          fen: '1Bk5/B1B5/1B1B4/B6B/1B1B4/B7/5K2/8 b - - 1 1',
        },
        {
          move: 'Be3',
          fen: '1Bk5/B1B5/1B1B4/B6B/1B6/B3B3/5K2/8 b - - 1 1',
        },
        {
          move: 'Bg4+',
          fen: '1Bk5/B1B5/1B1B4/B1B5/1B4B1/B7/5K2/8 b - - 1 1',
        },
        {
          move: 'Bf3',
          fen: '1Bk5/B1B5/1B1B4/B1B5/1B6/B4B2/5K2/8 b - - 1 1',
        },
        {
          move: 'Be2',
          fen: '1Bk5/B1B5/1B1B4/B1B5/1B6/B7/4BK2/8 b - - 1 1',
        },
        {
          move: 'Bd1',
          fen: '1Bk5/B1B5/1B1B4/B1B5/1B6/B7/5K2/3B4 b - - 1 1',
        },
        {
          move: 'Bg6',
          fen: '1Bk5/B1B5/1B1B2B1/B1B5/1B6/B7/5K2/8 b - - 1 1',
        },
        {
          move: 'Bf7',
          fen: '1Bk5/B1B2B2/1B1B4/B1B5/1B6/B7/5K2/8 b - - 1 1',
        },
        {
          move: 'Be8',
          fen: '1Bk1B3/B1B5/1B1B4/B1B5/1B6/B7/5K2/8 b - - 1 1',
        },
        {
          move: 'Be5',
          fen: '1Bk5/B1B5/1B6/B1B1B2B/1B6/B7/5K2/8 b - - 1 1',
        },
        {
          move: 'Bf4',
          fen: '1Bk5/B1B5/1B6/B1B4B/1B3B2/B7/5K2/8 b - - 1 1',
        },
        {
          move: 'Bg3',
          fen: '1Bk5/B1B5/1B6/B1B4B/1B6/B5B1/5K2/8 b - - 1 1',
        },
        {
          move: 'Bh2',
          fen: '1Bk5/B1B5/1B6/B1B4B/1B6/B7/5K1B/8 b - - 1 1',
        },
        {
          move: 'Be7',
          fen: '1Bk5/B1B1B3/1B6/B1B4B/1B6/B7/5K2/8 b - - 1 1',
        },
        {
          move: 'Bf8',
          fen: '1Bk2B2/B1B5/1B6/B1B4B/1B6/B7/5K2/8 b - - 1 1',
        },
        {
          move: 'Bd8',
          fen: '1BkB4/B7/1B1B4/B1B4B/1B6/B7/5K2/8 b - - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of 1Bk5/B1B5/1B1B4/B1B4B/1B6/B7/5K2/8 w - - 0 1',
      start: {
        fen: '8/5k2/b7/1b6/b1b4b/1b1b4/b1b5/1bK5 b - - 0 1',
        description:
          'The maximum number of bishops, mostly white, but not many moves.',
      },
      expected: [
        {
          move: 'Bd1',
          fen: '8/5k2/b7/1b6/b1b4b/1b1b4/b7/1bKb4 w - - 1 2',
        },
        {
          move: 'Be2',
          fen: '8/5k2/b7/1b6/b1b4b/1b6/b1b1b3/1bK5 w - - 1 2',
        },
        {
          move: 'Bf1',
          fen: '8/5k2/b7/1b6/b1b4b/1b6/b1b5/1bK2b2 w - - 1 2',
        },
        {
          move: 'Be4',
          fen: '8/5k2/b7/1b6/b1b1b2b/1b6/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Bf5',
          fen: '8/5k2/b7/1b3b2/b1b4b/1b6/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Bg6',
          fen: '8/5k2/b5b1/1b6/b1b4b/1b6/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Bh7',
          fen: '8/5k1b/b7/1b6/b1b4b/1b6/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Bd5',
          fen: '8/5k2/b7/1b1b4/b6b/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Be6',
          fen: '8/5k2/b3b3/1b6/b6b/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Bg3',
          fen: '8/5k2/b7/1b6/b1b5/1b1b2b1/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Bf2',
          fen: '8/5k2/b7/1b6/b1b5/1b1b4/b1b2b2/1bK5 w - - 1 2',
        },
        {
          move: 'Be1',
          fen: '8/5k2/b7/1b6/b1b5/1b1b4/b1b5/1bK1b3 w - - 1 2',
        },
        {
          move: 'Bg5+',
          fen: '8/5k2/b7/1b4b1/b1b5/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Bf6',
          fen: '8/5k2/b4b2/1b6/b1b5/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Be7',
          fen: '8/4bk2/b7/1b6/b1b5/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Bd8',
          fen: '3b4/5k2/b7/1b6/b1b5/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Bc6',
          fen: '8/5k2/b1b5/8/b1b4b/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Bd7',
          fen: '8/3b1k2/b7/8/b1b4b/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Be8',
          fen: '4b3/5k2/b7/8/b1b4b/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Bb7',
          fen: '8/1b3k2/8/1b6/b1b4b/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Bc8',
          fen: '2b5/5k2/8/1b6/b1b4b/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Ke6',
          fen: '8/8/b3k3/1b6/b1b4b/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Kf6',
          fen: '8/8/b4k2/1b6/b1b4b/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Kg6',
          fen: '8/8/b5k1/1b6/b1b4b/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Ke7',
          fen: '8/4k3/b7/1b6/b1b4b/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Kg7',
          fen: '8/6k1/b7/1b6/b1b4b/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Ke8',
          fen: '4k3/8/b7/1b6/b1b4b/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Kf8',
          fen: '5k2/8/b7/1b6/b1b4b/1b1b4/b1b5/1bK5 w - - 1 2',
        },
        {
          move: 'Kg8',
          fen: '6k1/8/b7/1b6/b1b4b/1b1b4/b1b5/1bK5 w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: 'BBB5/BBB5/BBB4k/B1K5/8/8/8/8 w - - 0 1',
        description:
          'The maximum number of bishops, mixed color, but few moves.',
      },
      expected: [
        {
          move: 'Bb4',
          fen: 'BBB5/BBB5/BBB4k/2K5/1B6/8/8/8 b - - 1 1',
        },
        {
          move: 'Bc3',
          fen: 'BBB5/BBB5/BBB4k/2K5/8/2B5/8/8 b - - 1 1',
        },
        {
          move: 'Bd2+',
          fen: 'BBB5/BBB5/BBB4k/2K5/8/8/3B4/8 b - - 1 1',
        },
        {
          move: 'Be1',
          fen: 'BBB5/BBB5/BBB4k/2K5/8/8/8/4B3 b - - 1 1',
        },
        {
          move: 'Kb4',
          fen: 'BBB5/BBB5/BBB4k/B7/1K6/8/8/8 b - - 1 1',
        },
        {
          move: 'Kc4',
          fen: 'BBB5/BBB5/BBB4k/B7/2K5/8/8/8 b - - 1 1',
        },
        {
          move: 'Kd4',
          fen: 'BBB5/BBB5/BBB4k/B7/3K4/8/8/8 b - - 1 1',
        },
        {
          move: 'Kb5',
          fen: 'BBB5/BBB5/BBB4k/BK6/8/8/8/8 b - - 1 1',
        },
        {
          move: 'Kd5',
          fen: 'BBB5/BBB5/BBB4k/B2K4/8/8/8/8 b - - 1 1',
        },
        {
          move: 'Kd6',
          fen: 'BBB5/BBB5/BBBK3k/B7/8/8/8/8 b - - 1 1',
        },
        {
          move: 'Bab5',
          fen: 'BBB5/BBB5/1BB4k/BBK5/8/8/8/8 b - - 1 1',
        },
        {
          move: 'Bc4',
          fen: 'BBB5/BBB5/1BB4k/B1K5/2B5/8/8/8 b - - 1 1',
        },
        {
          move: 'Bd3',
          fen: 'BBB5/BBB5/1BB4k/B1K5/8/3B4/8/8 b - - 1 1',
        },
        {
          move: 'Be2',
          fen: 'BBB5/BBB5/1BB4k/B1K5/8/8/4B3/8 b - - 1 1',
        },
        {
          move: 'Bf1',
          fen: 'BBB5/BBB5/1BB4k/B1K5/8/8/8/5B2 b - - 1 1',
        },
        {
          move: 'Bcb5',
          fen: 'BBB5/BBB5/BB5k/BBK5/8/8/8/8 b - - 1 1',
        },
        {
          move: 'Ba4',
          fen: 'BBB5/BBB5/BB5k/B1K5/B7/8/8/8 b - - 1 1',
        },
        {
          move: 'Bd5',
          fen: 'BBB5/BBB5/BB5k/B1KB4/8/8/8/8 b - - 1 1',
        },
        {
          move: 'Be4',
          fen: 'BBB5/BBB5/BB5k/B1K5/4B3/8/8/8 b - - 1 1',
        },
        {
          move: 'Bf3',
          fen: 'BBB5/BBB5/BB5k/B1K5/8/5B2/8/8 b - - 1 1',
        },
        {
          move: 'Bg2',
          fen: 'BBB5/BBB5/BB5k/B1K5/8/8/6B1/8 b - - 1 1',
        },
        {
          move: 'Bh1',
          fen: 'BBB5/BBB5/BB5k/B1K5/8/8/8/7B b - - 1 1',
        },
        {
          move: 'B6d7',
          fen: 'BBB5/BBBB4/BB5k/B1K5/8/8/8/8 b - - 1 1',
        },
        {
          move: 'Be8',
          fen: 'BBB1B3/BBB5/BB5k/B1K5/8/8/8/8 b - - 1 1',
        },
        {
          move: 'Bd6',
          fen: 'BBB5/BB6/BBBB3k/B1K5/8/8/8/8 b - - 1 1',
        },
        {
          move: 'Be5',
          fen: 'BBB5/BB6/BBB4k/B1K1B3/8/8/8/8 b - - 1 1',
        },
        {
          move: 'Bf4+',
          fen: 'BBB5/BB6/BBB4k/B1K5/5B2/8/8/8 b - - 1 1',
        },
        {
          move: 'Bg3',
          fen: 'BBB5/BB6/BBB4k/B1K5/8/6B1/8/8 b - - 1 1',
        },
        {
          move: 'Bh2',
          fen: 'BBB5/BB6/BBB4k/B1K5/8/8/7B/8 b - - 1 1',
        },
        {
          move: 'Bd8',
          fen: 'BBBB4/BB6/BBB4k/B1K5/8/8/8/8 b - - 1 1',
        },
        {
          move: 'B8d7',
          fen: 'BB6/BBBB4/BBB4k/B1K5/8/8/8/8 b - - 1 1',
        },
        {
          move: 'Be6',
          fen: 'BB6/BBB5/BBB1B2k/B1K5/8/8/8/8 b - - 1 1',
        },
        {
          move: 'Bf5',
          fen: 'BB6/BBB5/BBB4k/B1K2B2/8/8/8/8 b - - 1 1',
        },
        {
          move: 'Bg4',
          fen: 'BB6/BBB5/BBB4k/B1K5/6B1/8/8/8 b - - 1 1',
        },
        {
          move: 'Bh3',
          fen: 'BB6/BBB5/BBB4k/B1K5/8/7B/8/8 b - - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of BBB5/BBB5/BBB4k/B1K5/8/8/8/8 w - - 0 1',
      start: {
        fen: '8/8/8/8/b1k5/bbb4K/bbb5/bbb5 b - - 0 1',
        description:
          'The maximum number of bishops, mixed color, but few moves.',
      },
      expected: [
        {
          move: 'B1d2',
          fen: '8/8/8/8/b1k5/bbb4K/bbbb4/bb6 w - - 1 2',
        },
        {
          move: 'Be3',
          fen: '8/8/8/8/b1k5/bbb1b2K/bbb5/bb6 w - - 1 2',
        },
        {
          move: 'Bf4',
          fen: '8/8/8/8/b1k2b2/bbb4K/bbb5/bb6 w - - 1 2',
        },
        {
          move: 'Bg5',
          fen: '8/8/8/6b1/b1k5/bbb4K/bbb5/bb6 w - - 1 2',
        },
        {
          move: 'Bh6',
          fen: '8/8/7b/8/b1k5/bbb4K/bbb5/bb6 w - - 1 2',
        },
        {
          move: 'Bd1',
          fen: '8/8/8/8/b1k5/bbb4K/bb6/bbbb4 w - - 1 2',
        },
        {
          move: 'Bd3',
          fen: '8/8/8/8/b1k5/bbbb3K/bb6/bbb5 w - - 1 2',
        },
        {
          move: 'Be4',
          fen: '8/8/8/8/b1k1b3/bbb4K/bb6/bbb5 w - - 1 2',
        },
        {
          move: 'Bf5+',
          fen: '8/8/8/5b2/b1k5/bbb4K/bb6/bbb5 w - - 1 2',
        },
        {
          move: 'Bg6',
          fen: '8/8/6b1/8/b1k5/bbb4K/bb6/bbb5 w - - 1 2',
        },
        {
          move: 'Bh7',
          fen: '8/7b/8/8/b1k5/bbb4K/bb6/bbb5 w - - 1 2',
        },
        {
          move: 'Bab4',
          fen: '8/8/8/8/bbk5/1bb4K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Bc5',
          fen: '8/8/8/2b5/b1k5/1bb4K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Bd6',
          fen: '8/8/3b4/8/b1k5/1bb4K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Be7',
          fen: '8/4b3/8/8/b1k5/1bb4K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Bf8',
          fen: '5b2/8/8/8/b1k5/1bb4K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'B3d2',
          fen: '8/8/8/8/b1k5/bb5K/bbbb4/bbb5 w - - 1 2',
        },
        {
          move: 'Be1',
          fen: '8/8/8/8/b1k5/bb5K/bbb5/bbb1b3 w - - 1 2',
        },
        {
          move: 'Bcb4',
          fen: '8/8/8/8/bbk5/bb5K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Ba5',
          fen: '8/8/8/b7/b1k5/bb5K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Bd4',
          fen: '8/8/8/8/b1kb4/bb5K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Be5',
          fen: '8/8/8/4b3/b1k5/bb5K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Bf6',
          fen: '8/8/5b2/8/b1k5/bb5K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Bg7',
          fen: '8/6b1/8/8/b1k5/bb5K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Bh8',
          fen: '7b/8/8/8/b1k5/bb5K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Bb5',
          fen: '8/8/8/1b6/2k5/bbb4K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Bc6',
          fen: '8/8/2b5/8/2k5/bbb4K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Bd7+',
          fen: '8/3b4/8/8/2k5/bbb4K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Be8',
          fen: '4b3/8/8/8/2k5/bbb4K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Kd3',
          fen: '8/8/8/8/b7/bbbk3K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Kb4',
          fen: '8/8/8/8/bk6/bbb4K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Kd4',
          fen: '8/8/8/8/b2k4/bbb4K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Kb5',
          fen: '8/8/8/1k6/b7/bbb4K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Kc5',
          fen: '8/8/8/2k5/b7/bbb4K/bbb5/bbb5 w - - 1 2',
        },
        {
          move: 'Kd5',
          fen: '8/8/8/3k4/b7/bbb4K/bbb5/bbb5 w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '4k3/8/8/p1K1Pp1r/Pp5p/6pP/6P1/8 w - f6 0 1',
        description:
          "White can't en passant capture because that would put them into check.",
      },
      expected: [
        {
          move: 'Kc4',
          fen: '4k3/8/8/p3Pp1r/PpK4p/6pP/6P1/8 b - - 1 1',
        },
        {
          move: 'Kd4',
          fen: '4k3/8/8/p3Pp1r/Pp1K3p/6pP/6P1/8 b - - 1 1',
        },
        {
          move: 'Kb5',
          fen: '4k3/8/8/pK2Pp1r/Pp5p/6pP/6P1/8 b - - 1 1',
        },
        {
          move: 'Kd5',
          fen: '4k3/8/8/p2KPp1r/Pp5p/6pP/6P1/8 b - - 1 1',
        },
        {
          move: 'Kb6',
          fen: '4k3/8/1K6/p3Pp1r/Pp5p/6pP/6P1/8 b - - 1 1',
        },
        {
          move: 'Kc6',
          fen: '4k3/8/2K5/p3Pp1r/Pp5p/6pP/6P1/8 b - - 1 1',
        },
        {
          move: 'Kd6',
          fen: '4k3/8/3K4/p3Pp1r/Pp5p/6pP/6P1/8 b - - 1 1',
        },
        {
          move: 'e6',
          fen: '4k3/8/4P3/p1K2p1r/Pp5p/6pP/6P1/8 b - - 0 1',
        },
      ],
    },
    {
      description: 'Transpose of 4k3/8/8/p1K1Pp1r/Pp5p/6pP/6P1/8 w - f6 0 1',
      start: {
        fen: '8/6p1/6Pp/pP5P/P1k1pP1R/8/8/4K3 b - f3 0 1',
        description:
          "Black can't en passant capture because that would put them into check.",
      },
      expected: [
        {
          move: 'Kb3',
          fen: '8/6p1/6Pp/pP5P/P3pP1R/1k6/8/4K3 w - - 1 2',
        },
        {
          move: 'Kc3',
          fen: '8/6p1/6Pp/pP5P/P3pP1R/2k5/8/4K3 w - - 1 2',
        },
        {
          move: 'Kd3',
          fen: '8/6p1/6Pp/pP5P/P3pP1R/3k4/8/4K3 w - - 1 2',
        },
        {
          move: 'Kb4',
          fen: '8/6p1/6Pp/pP5P/Pk2pP1R/8/8/4K3 w - - 1 2',
        },
        {
          move: 'Kd4',
          fen: '8/6p1/6Pp/pP5P/P2kpP1R/8/8/4K3 w - - 1 2',
        },
        {
          move: 'Kc5',
          fen: '8/6p1/6Pp/pPk4P/P3pP1R/8/8/4K3 w - - 1 2',
        },
        {
          move: 'Kd5',
          fen: '8/6p1/6Pp/pP1k3P/P3pP1R/8/8/4K3 w - - 1 2',
        },
        {
          move: 'e3',
          fen: '8/6p1/6Pp/pP5P/P1k2P1R/4p3/8/4K3 w - - 0 2',
        },
      ],
    },
    {
      start: {
        fen: '8/8/8/p7/PR1Ppk1p/6pP/6P1/2K5 b - d3 0 1',
        description:
          "Black can't en passant capture because that would put them into check.",
      },
      expected: [
        {
          move: 'e3',
          fen: '8/8/8/p7/PR1P1k1p/4p1pP/6P1/2K5 w - - 0 2',
        },
        {
          move: 'Ke3',
          fen: '8/8/8/p7/PR1Pp2p/4k1pP/6P1/2K5 w - - 1 2',
        },
        {
          move: 'Kf5',
          fen: '8/8/8/p4k2/PR1Pp2p/6pP/6P1/2K5 w - - 1 2',
        },
        {
          move: 'Kg5',
          fen: '8/8/8/p5k1/PR1Pp2p/6pP/6P1/2K5 w - - 1 2',
        },
        {
          move: 'axb4',
          fen: '8/8/8/8/Pp1Ppk1p/6pP/6P1/2K5 w - - 0 2',
        },
      ],
    },
    {
      description: 'Transpose of 8/8/8/p7/PR1Ppk1p/6pP/6P1/2K5 b - d3 0 1',
      start: {
        fen: '2k5/6p1/6Pp/pr1pPK1P/P7/8/8/8 w - d6 0 1',
        description:
          "White can't en passant capture because that would put them into check.",
      },
      expected: [
        {
          move: 'axb5',
          fen: '2k5/6p1/6Pp/pP1pPK1P/8/8/8/8 b - - 0 1',
        },
        {
          move: 'e6',
          fen: '2k5/6p1/4P1Pp/pr1p1K1P/P7/8/8/8 b - - 0 1',
        },
        {
          move: 'Kf4',
          fen: '2k5/6p1/6Pp/pr1pP2P/P4K2/8/8/8 b - - 1 1',
        },
        {
          move: 'Kg4',
          fen: '2k5/6p1/6Pp/pr1pP2P/P5K1/8/8/8 b - - 1 1',
        },
        {
          move: 'Ke6',
          fen: '2k5/6p1/4K1Pp/pr1pP2P/P7/8/8/8 b - - 1 1',
        },
      ],
    },
    {
      start: {
        fen: 'nnnnnnnn/8/8/8/P2P1k2/8/6P1/n1K4n b - - 0 1',
        description:
          'Black with maximal knights, attacking many off-the-board squares.',
      },
      expected: [
        {
          move: 'Nc2',
          fen: 'nnnnnnnn/8/8/8/P2P1k2/8/2n3P1/2K4n w - - 1 2',
        },
        {
          move: 'Nb3+',
          fen: 'nnnnnnnn/8/8/8/P2P1k2/1n6/6P1/2K4n w - - 1 2',
        },
        {
          move: 'Nf2',
          fen: 'nnnnnnnn/8/8/8/P2P1k2/8/5nP1/n1K5 w - - 1 2',
        },
        {
          move: 'Ng3',
          fen: 'nnnnnnnn/8/8/8/P2P1k2/6n1/6P1/n1K5 w - - 1 2',
        },
        {
          move: 'Ke3',
          fen: 'nnnnnnnn/8/8/8/P2P4/4k3/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Kg3',
          fen: 'nnnnnnnn/8/8/8/P2P4/6k1/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Ke4',
          fen: 'nnnnnnnn/8/8/8/P2Pk3/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Kg4',
          fen: 'nnnnnnnn/8/8/8/P2P2k1/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Kf5',
          fen: 'nnnnnnnn/8/8/5k2/P2P4/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Kg5',
          fen: 'nnnnnnnn/8/8/6k1/P2P4/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Nab6',
          fen: '1nnnnnnn/8/1n6/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Nac7',
          fen: '1nnnnnnn/2n5/8/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Na6',
          fen: 'n1nnnnnn/8/n7/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Nbc6',
          fen: 'n1nnnnnn/8/2n5/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Nbd7',
          fen: 'n1nnnnnn/3n4/8/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Ncb6',
          fen: 'nn1nnnnn/8/1n6/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Ncd6',
          fen: 'nn1nnnnn/8/3n4/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Na7',
          fen: 'nn1nnnnn/n7/8/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Nce7',
          fen: 'nn1nnnnn/4n3/8/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Ndc6',
          fen: 'nnn1nnnn/8/2n5/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Nde6',
          fen: 'nnn1nnnn/8/4n3/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Nb7',
          fen: 'nnn1nnnn/1n6/8/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Ndf7',
          fen: 'nnn1nnnn/5n2/8/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Ned6',
          fen: 'nnnn1nnn/8/3n4/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Nef6',
          fen: 'nnnn1nnn/8/5n2/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Nec7',
          fen: 'nnnn1nnn/2n5/8/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Ng7',
          fen: 'nnnn1nnn/6n1/8/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Nfe6',
          fen: 'nnnnn1nn/8/4n3/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Nfg6',
          fen: 'nnnnn1nn/8/6n1/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Nfd7',
          fen: 'nnnnn1nn/3n4/8/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Nh7',
          fen: 'nnnnn1nn/7n/8/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Ngf6',
          fen: 'nnnnnn1n/8/5n2/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Nh6',
          fen: 'nnnnnn1n/8/7n/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Nge7',
          fen: 'nnnnnn1n/4n3/8/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Nhg6',
          fen: 'nnnnnnn1/8/6n1/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
        {
          move: 'Nhf7',
          fen: 'nnnnnnn1/5n2/8/8/P2P1k2/8/6P1/n1K4n w - - 1 2',
        },
      ],
    },
    {
      description: 'Transpose of nnnnnnnn/8/8/8/P2P1k2/8/6P1/n1K4n b - - 0 1',
      start: {
        fen: 'N1k4N/6p1/8/p2p1K2/8/8/8/NNNNNNNN w - - 0 1',
        description:
          'White with maximal knights, attacking many off-the-board squares.',
      },
      expected: [
        {
          move: 'Nac2',
          fen: 'N1k4N/6p1/8/p2p1K2/8/8/2N5/1NNNNNNN b - - 1 1',
        },
        {
          move: 'Nab3',
          fen: 'N1k4N/6p1/8/p2p1K2/8/1N6/8/1NNNNNNN b - - 1 1',
        },
        {
          move: 'Nbd2',
          fen: 'N1k4N/6p1/8/p2p1K2/8/8/3N4/N1NNNNNN b - - 1 1',
        },
        {
          move: 'Na3',
          fen: 'N1k4N/6p1/8/p2p1K2/8/N7/8/N1NNNNNN b - - 1 1',
        },
        {
          move: 'Nbc3',
          fen: 'N1k4N/6p1/8/p2p1K2/8/2N5/8/N1NNNNNN b - - 1 1',
        },
        {
          move: 'Na2',
          fen: 'N1k4N/6p1/8/p2p1K2/8/8/N7/NN1NNNNN b - - 1 1',
        },
        {
          move: 'Nce2',
          fen: 'N1k4N/6p1/8/p2p1K2/8/8/4N3/NN1NNNNN b - - 1 1',
        },
        {
          move: 'Ncb3',
          fen: 'N1k4N/6p1/8/p2p1K2/8/1N6/8/NN1NNNNN b - - 1 1',
        },
        {
          move: 'Ncd3',
          fen: 'N1k4N/6p1/8/p2p1K2/8/3N4/8/NN1NNNNN b - - 1 1',
        },
        {
          move: 'Nb2',
          fen: 'N1k4N/6p1/8/p2p1K2/8/8/1N6/NNN1NNNN b - - 1 1',
        },
        {
          move: 'Ndf2',
          fen: 'N1k4N/6p1/8/p2p1K2/8/8/5N2/NNN1NNNN b - - 1 1',
        },
        {
          move: 'Ndc3',
          fen: 'N1k4N/6p1/8/p2p1K2/8/2N5/8/NNN1NNNN b - - 1 1',
        },
        {
          move: 'Nde3',
          fen: 'N1k4N/6p1/8/p2p1K2/8/4N3/8/NNN1NNNN b - - 1 1',
        },
        {
          move: 'Nec2',
          fen: 'N1k4N/6p1/8/p2p1K2/8/8/2N5/NNNN1NNN b - - 1 1',
        },
        {
          move: 'Ng2',
          fen: 'N1k4N/6p1/8/p2p1K2/8/8/6N1/NNNN1NNN b - - 1 1',
        },
        {
          move: 'Ned3',
          fen: 'N1k4N/6p1/8/p2p1K2/8/3N4/8/NNNN1NNN b - - 1 1',
        },
        {
          move: 'Nef3',
          fen: 'N1k4N/6p1/8/p2p1K2/8/5N2/8/NNNN1NNN b - - 1 1',
        },
        {
          move: 'Nfd2',
          fen: 'N1k4N/6p1/8/p2p1K2/8/8/3N4/NNNNN1NN b - - 1 1',
        },
        {
          move: 'Nh2',
          fen: 'N1k4N/6p1/8/p2p1K2/8/8/7N/NNNNN1NN b - - 1 1',
        },
        {
          move: 'Nfe3',
          fen: 'N1k4N/6p1/8/p2p1K2/8/4N3/8/NNNNN1NN b - - 1 1',
        },
        {
          move: 'Nfg3',
          fen: 'N1k4N/6p1/8/p2p1K2/8/6N1/8/NNNNN1NN b - - 1 1',
        },
        {
          move: 'Nge2',
          fen: 'N1k4N/6p1/8/p2p1K2/8/8/4N3/NNNNNN1N b - - 1 1',
        },
        {
          move: 'Ngf3',
          fen: 'N1k4N/6p1/8/p2p1K2/8/5N2/8/NNNNNN1N b - - 1 1',
        },
        {
          move: 'Nh3',
          fen: 'N1k4N/6p1/8/p2p1K2/8/7N/8/NNNNNN1N b - - 1 1',
        },
        {
          move: 'Nhf2',
          fen: 'N1k4N/6p1/8/p2p1K2/8/8/5N2/NNNNNNN1 b - - 1 1',
        },
        {
          move: 'Nhg3',
          fen: 'N1k4N/6p1/8/p2p1K2/8/6N1/8/NNNNNNN1 b - - 1 1',
        },
        {
          move: 'Kf4',
          fen: 'N1k4N/6p1/8/p2p4/5K2/8/8/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Kg4',
          fen: 'N1k4N/6p1/8/p2p4/6K1/8/8/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Ke5',
          fen: 'N1k4N/6p1/8/p2pK3/8/8/8/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Kg5',
          fen: 'N1k4N/6p1/8/p2p2K1/8/8/8/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Ke6',
          fen: 'N1k4N/6p1/4K3/p2p4/8/8/8/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Kg6',
          fen: 'N1k4N/6p1/6K1/p2p4/8/8/8/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Nb6+',
          fen: '2k4N/6p1/1N6/p2p1K2/8/8/8/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Nc7',
          fen: '2k4N/2N3p1/8/p2p1K2/8/8/8/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Ng6',
          fen: 'N1k5/6p1/6N1/p2p1K2/8/8/8/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Nf7',
          fen: 'N1k5/5Np1/8/p2p1K2/8/8/8/NNNNNNNN b - - 1 1',
        },
      ],
    },
    {
      start: {
        fen: 'n6n/8/8/8/P1KP1k2/8/6P1/nnnnnnnn b - - 0 1',
        description: 'Another position with maximum knights.',
      },
      expected: [
        {
          move: 'Nac2',
          fen: 'n6n/8/8/8/P1KP1k2/8/2n3P1/1nnnnnnn w - - 1 2',
        },
        {
          move: 'Nab3',
          fen: 'n6n/8/8/8/P1KP1k2/1n6/6P1/1nnnnnnn w - - 1 2',
        },
        {
          move: 'Nbd2+',
          fen: 'n6n/8/8/8/P1KP1k2/8/3n2P1/n1nnnnnn w - - 1 2',
        },
        {
          move: 'Na3+',
          fen: 'n6n/8/8/8/P1KP1k2/n7/6P1/n1nnnnnn w - - 1 2',
        },
        {
          move: 'Nbc3',
          fen: 'n6n/8/8/8/P1KP1k2/2n5/6P1/n1nnnnnn w - - 1 2',
        },
        {
          move: 'Na2',
          fen: 'n6n/8/8/8/P1KP1k2/8/n5P1/nn1nnnnn w - - 1 2',
        },
        {
          move: 'Nce2',
          fen: 'n6n/8/8/8/P1KP1k2/8/4n1P1/nn1nnnnn w - - 1 2',
        },
        {
          move: 'Ncb3',
          fen: 'n6n/8/8/8/P1KP1k2/1n6/6P1/nn1nnnnn w - - 1 2',
        },
        {
          move: 'Ncd3',
          fen: 'n6n/8/8/8/P1KP1k2/3n4/6P1/nn1nnnnn w - - 1 2',
        },
        {
          move: 'Nb2+',
          fen: 'n6n/8/8/8/P1KP1k2/8/1n4P1/nnn1nnnn w - - 1 2',
        },
        {
          move: 'Ndf2',
          fen: 'n6n/8/8/8/P1KP1k2/8/5nP1/nnn1nnnn w - - 1 2',
        },
        {
          move: 'Ndc3',
          fen: 'n6n/8/8/8/P1KP1k2/2n5/6P1/nnn1nnnn w - - 1 2',
        },
        {
          move: 'Nde3+',
          fen: 'n6n/8/8/8/P1KP1k2/4n3/6P1/nnn1nnnn w - - 1 2',
        },
        {
          move: 'Nec2',
          fen: 'n6n/8/8/8/P1KP1k2/8/2n3P1/nnnn1nnn w - - 1 2',
        },
        {
          move: 'Nxg2',
          fen: 'n6n/8/8/8/P1KP1k2/8/6n1/nnnn1nnn w - - 0 2',
        },
        {
          move: 'Ned3',
          fen: 'n6n/8/8/8/P1KP1k2/3n4/6P1/nnnn1nnn w - - 1 2',
        },
        {
          move: 'Nef3',
          fen: 'n6n/8/8/8/P1KP1k2/5n2/6P1/nnnn1nnn w - - 1 2',
        },
        {
          move: 'Nfd2+',
          fen: 'n6n/8/8/8/P1KP1k2/8/3n2P1/nnnnn1nn w - - 1 2',
        },
        {
          move: 'Nh2',
          fen: 'n6n/8/8/8/P1KP1k2/8/6Pn/nnnnn1nn w - - 1 2',
        },
        {
          move: 'Nfe3+',
          fen: 'n6n/8/8/8/P1KP1k2/4n3/6P1/nnnnn1nn w - - 1 2',
        },
        {
          move: 'Nfg3',
          fen: 'n6n/8/8/8/P1KP1k2/6n1/6P1/nnnnn1nn w - - 1 2',
        },
        {
          move: 'Nge2',
          fen: 'n6n/8/8/8/P1KP1k2/8/4n1P1/nnnnnn1n w - - 1 2',
        },
        {
          move: 'Ngf3',
          fen: 'n6n/8/8/8/P1KP1k2/5n2/6P1/nnnnnn1n w - - 1 2',
        },
        {
          move: 'Nh3',
          fen: 'n6n/8/8/8/P1KP1k2/7n/6P1/nnnnnn1n w - - 1 2',
        },
        {
          move: 'Nhf2',
          fen: 'n6n/8/8/8/P1KP1k2/8/5nP1/nnnnnnn1 w - - 1 2',
        },
        {
          move: 'Nhg3',
          fen: 'n6n/8/8/8/P1KP1k2/6n1/6P1/nnnnnnn1 w - - 1 2',
        },
        {
          move: 'Ke3',
          fen: 'n6n/8/8/8/P1KP4/4k3/6P1/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Kg3',
          fen: 'n6n/8/8/8/P1KP4/6k1/6P1/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Ke4',
          fen: 'n6n/8/8/8/P1KPk3/8/6P1/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Kg4',
          fen: 'n6n/8/8/8/P1KP2k1/8/6P1/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Kf5',
          fen: 'n6n/8/8/5k2/P1KP4/8/6P1/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Kg5',
          fen: 'n6n/8/8/6k1/P1KP4/8/6P1/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Nb6+',
          fen: '7n/8/1n6/8/P1KP1k2/8/6P1/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Nc7',
          fen: '7n/2n5/8/8/P1KP1k2/8/6P1/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Ng6',
          fen: 'n7/8/6n1/8/P1KP1k2/8/6P1/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Nf7',
          fen: 'n7/5n2/8/8/P1KP1k2/8/6P1/nnnnnnnn w - - 1 2',
        },
      ],
    },
    {
      description: 'Transpose of n6n/8/8/8/P1KP1k2/8/6P1/nnnnnnnn b - - 0 1',
      start: {
        fen: 'NNNNNNNN/6p1/8/p1kp1K2/8/8/8/N6N w - - 0 1',
        description: 'Another position with maximum knights.',
      },
      expected: [
        {
          move: 'Nc2',
          fen: 'NNNNNNNN/6p1/8/p1kp1K2/8/8/2N5/7N b - - 1 1',
        },
        {
          move: 'Nb3+',
          fen: 'NNNNNNNN/6p1/8/p1kp1K2/8/1N6/8/7N b - - 1 1',
        },
        {
          move: 'Nf2',
          fen: 'NNNNNNNN/6p1/8/p1kp1K2/8/8/5N2/N7 b - - 1 1',
        },
        {
          move: 'Ng3',
          fen: 'NNNNNNNN/6p1/8/p1kp1K2/8/6N1/8/N7 b - - 1 1',
        },
        {
          move: 'Kf4',
          fen: 'NNNNNNNN/6p1/8/p1kp4/5K2/8/8/N6N b - - 1 1',
        },
        {
          move: 'Kg4',
          fen: 'NNNNNNNN/6p1/8/p1kp4/6K1/8/8/N6N b - - 1 1',
        },
        {
          move: 'Ke5',
          fen: 'NNNNNNNN/6p1/8/p1kpK3/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Kg5',
          fen: 'NNNNNNNN/6p1/8/p1kp2K1/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Ke6',
          fen: 'NNNNNNNN/6p1/4K3/p1kp4/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Kg6',
          fen: 'NNNNNNNN/6p1/6K1/p1kp4/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nab6',
          fen: '1NNNNNNN/6p1/1N6/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nac7',
          fen: '1NNNNNNN/2N3p1/8/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Na6+',
          fen: 'N1NNNNNN/6p1/N7/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nbc6',
          fen: 'N1NNNNNN/6p1/2N5/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nbd7+',
          fen: 'N1NNNNNN/3N2p1/8/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Ncb6',
          fen: 'NN1NNNNN/6p1/1N6/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Ncd6',
          fen: 'NN1NNNNN/6p1/3N4/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Na7',
          fen: 'NN1NNNNN/N5p1/8/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nce7',
          fen: 'NN1NNNNN/4N1p1/8/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Ndc6',
          fen: 'NNN1NNNN/6p1/2N5/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nde6+',
          fen: 'NNN1NNNN/6p1/4N3/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nb7+',
          fen: 'NNN1NNNN/1N4p1/8/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Ndf7',
          fen: 'NNN1NNNN/5Np1/8/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Ned6',
          fen: 'NNNN1NNN/6p1/3N4/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nef6',
          fen: 'NNNN1NNN/6p1/5N2/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nec7',
          fen: 'NNNN1NNN/2N3p1/8/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nxg7',
          fen: 'NNNN1NNN/6N1/8/p1kp1K2/8/8/8/N6N b - - 0 1',
        },
        {
          move: 'Nfe6+',
          fen: 'NNNNN1NN/6p1/4N3/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nfg6',
          fen: 'NNNNN1NN/6p1/6N1/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nfd7+',
          fen: 'NNNNN1NN/3N2p1/8/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nh7',
          fen: 'NNNNN1NN/6pN/8/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Ngf6',
          fen: 'NNNNNN1N/6p1/5N2/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nh6',
          fen: 'NNNNNN1N/6p1/7N/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nge7',
          fen: 'NNNNNN1N/4N1p1/8/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nhg6',
          fen: 'NNNNNNN1/6p1/6N1/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nhf7',
          fen: 'NNNNNNN1/5Np1/8/p1kp1K2/8/8/8/N6N b - - 1 1',
        },
      ],
    },
    {
      start: {
        fen: 'NNNNNNNN/8/8/4k3/8/3K4/8/N6N w - - 0 1',
        description: 'White with maximal knights.',
      },
      expected: [
        {
          move: 'Nc2',
          fen: 'NNNNNNNN/8/8/4k3/8/3K4/2N5/7N b - - 1 1',
        },
        {
          move: 'Nb3',
          fen: 'NNNNNNNN/8/8/4k3/8/1N1K4/8/7N b - - 1 1',
        },
        {
          move: 'Nf2',
          fen: 'NNNNNNNN/8/8/4k3/8/3K4/5N2/N7 b - - 1 1',
        },
        {
          move: 'Ng3',
          fen: 'NNNNNNNN/8/8/4k3/8/3K2N1/8/N7 b - - 1 1',
        },
        {
          move: 'Kc2',
          fen: 'NNNNNNNN/8/8/4k3/8/8/2K5/N6N b - - 1 1',
        },
        {
          move: 'Kd2',
          fen: 'NNNNNNNN/8/8/4k3/8/8/3K4/N6N b - - 1 1',
        },
        {
          move: 'Ke2',
          fen: 'NNNNNNNN/8/8/4k3/8/8/4K3/N6N b - - 1 1',
        },
        {
          move: 'Kc3',
          fen: 'NNNNNNNN/8/8/4k3/8/2K5/8/N6N b - - 1 1',
        },
        {
          move: 'Ke3',
          fen: 'NNNNNNNN/8/8/4k3/8/4K3/8/N6N b - - 1 1',
        },
        {
          move: 'Kc4',
          fen: 'NNNNNNNN/8/8/4k3/2K5/8/8/N6N b - - 1 1',
        },
        {
          move: 'Nab6',
          fen: '1NNNNNNN/8/1N6/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Nac7',
          fen: '1NNNNNNN/2N5/8/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Na6',
          fen: 'N1NNNNNN/8/N7/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Nbc6+',
          fen: 'N1NNNNNN/8/2N5/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Nbd7+',
          fen: 'N1NNNNNN/3N4/8/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Ncb6',
          fen: 'NN1NNNNN/8/1N6/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Ncd6',
          fen: 'NN1NNNNN/8/3N4/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Na7',
          fen: 'NN1NNNNN/N7/8/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Nce7',
          fen: 'NN1NNNNN/4N3/8/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Ndc6+',
          fen: 'NNN1NNNN/8/2N5/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Nde6',
          fen: 'NNN1NNNN/8/4N3/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Nb7',
          fen: 'NNN1NNNN/1N6/8/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Ndf7+',
          fen: 'NNN1NNNN/5N2/8/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Ned6',
          fen: 'NNNN1NNN/8/3N4/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Nef6',
          fen: 'NNNN1NNN/8/5N2/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Nec7',
          fen: 'NNNN1NNN/2N5/8/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Ng7',
          fen: 'NNNN1NNN/6N1/8/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Nfe6',
          fen: 'NNNNN1NN/8/4N3/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Nfg6+',
          fen: 'NNNNN1NN/8/6N1/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Nfd7+',
          fen: 'NNNNN1NN/3N4/8/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Nh7',
          fen: 'NNNNN1NN/7N/8/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Ngf6',
          fen: 'NNNNNN1N/8/5N2/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Nh6',
          fen: 'NNNNNN1N/8/7N/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Nge7',
          fen: 'NNNNNN1N/4N3/8/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Nhg6+',
          fen: 'NNNNNNN1/8/6N1/4k3/8/3K4/8/N6N b - - 1 1',
        },
        {
          move: 'Nhf7+',
          fen: 'NNNNNNN1/5N2/8/4k3/8/3K4/8/N6N b - - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of NNNNNNNN/8/8/4k3/8/3K4/8/N6N w - - 0 1',
      start: {
        fen: 'n6n/8/3k4/8/4K3/8/8/nnnnnnnn b - - 0 1',
        description: 'Black with maximal knights.',
      },
      expected: [
        {
          move: 'Nac2',
          fen: 'n6n/8/3k4/8/4K3/8/2n5/1nnnnnnn w - - 1 2',
        },
        {
          move: 'Nab3',
          fen: 'n6n/8/3k4/8/4K3/1n6/8/1nnnnnnn w - - 1 2',
        },
        {
          move: 'Nbd2+',
          fen: 'n6n/8/3k4/8/4K3/8/3n4/n1nnnnnn w - - 1 2',
        },
        {
          move: 'Na3',
          fen: 'n6n/8/3k4/8/4K3/n7/8/n1nnnnnn w - - 1 2',
        },
        {
          move: 'Nbc3+',
          fen: 'n6n/8/3k4/8/4K3/2n5/8/n1nnnnnn w - - 1 2',
        },
        {
          move: 'Na2',
          fen: 'n6n/8/3k4/8/4K3/8/n7/nn1nnnnn w - - 1 2',
        },
        {
          move: 'Nce2',
          fen: 'n6n/8/3k4/8/4K3/8/4n3/nn1nnnnn w - - 1 2',
        },
        {
          move: 'Ncb3',
          fen: 'n6n/8/3k4/8/4K3/1n6/8/nn1nnnnn w - - 1 2',
        },
        {
          move: 'Ncd3',
          fen: 'n6n/8/3k4/8/4K3/3n4/8/nn1nnnnn w - - 1 2',
        },
        {
          move: 'Nb2',
          fen: 'n6n/8/3k4/8/4K3/8/1n6/nnn1nnnn w - - 1 2',
        },
        {
          move: 'Ndf2+',
          fen: 'n6n/8/3k4/8/4K3/8/5n2/nnn1nnnn w - - 1 2',
        },
        {
          move: 'Ndc3+',
          fen: 'n6n/8/3k4/8/4K3/2n5/8/nnn1nnnn w - - 1 2',
        },
        {
          move: 'Nde3',
          fen: 'n6n/8/3k4/8/4K3/4n3/8/nnn1nnnn w - - 1 2',
        },
        {
          move: 'Nec2',
          fen: 'n6n/8/3k4/8/4K3/8/2n5/nnnn1nnn w - - 1 2',
        },
        {
          move: 'Ng2',
          fen: 'n6n/8/3k4/8/4K3/8/6n1/nnnn1nnn w - - 1 2',
        },
        {
          move: 'Ned3',
          fen: 'n6n/8/3k4/8/4K3/3n4/8/nnnn1nnn w - - 1 2',
        },
        {
          move: 'Nef3',
          fen: 'n6n/8/3k4/8/4K3/5n2/8/nnnn1nnn w - - 1 2',
        },
        {
          move: 'Nfd2+',
          fen: 'n6n/8/3k4/8/4K3/8/3n4/nnnnn1nn w - - 1 2',
        },
        {
          move: 'Nh2',
          fen: 'n6n/8/3k4/8/4K3/8/7n/nnnnn1nn w - - 1 2',
        },
        {
          move: 'Nfe3',
          fen: 'n6n/8/3k4/8/4K3/4n3/8/nnnnn1nn w - - 1 2',
        },
        {
          move: 'Nfg3+',
          fen: 'n6n/8/3k4/8/4K3/6n1/8/nnnnn1nn w - - 1 2',
        },
        {
          move: 'Nge2',
          fen: 'n6n/8/3k4/8/4K3/8/4n3/nnnnnn1n w - - 1 2',
        },
        {
          move: 'Ngf3',
          fen: 'n6n/8/3k4/8/4K3/5n2/8/nnnnnn1n w - - 1 2',
        },
        {
          move: 'Nh3',
          fen: 'n6n/8/3k4/8/4K3/7n/8/nnnnnn1n w - - 1 2',
        },
        {
          move: 'Nhf2+',
          fen: 'n6n/8/3k4/8/4K3/8/5n2/nnnnnnn1 w - - 1 2',
        },
        {
          move: 'Nhg3+',
          fen: 'n6n/8/3k4/8/4K3/6n1/8/nnnnnnn1 w - - 1 2',
        },
        {
          move: 'Kc5',
          fen: 'n6n/8/8/2k5/4K3/8/8/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Kc6',
          fen: 'n6n/8/2k5/8/4K3/8/8/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Ke6',
          fen: 'n6n/8/4k3/8/4K3/8/8/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Kc7',
          fen: 'n6n/2k5/8/8/4K3/8/8/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Kd7',
          fen: 'n6n/3k4/8/8/4K3/8/8/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Ke7',
          fen: 'n6n/4k3/8/8/4K3/8/8/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Nb6',
          fen: '7n/8/1n1k4/8/4K3/8/8/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Nc7',
          fen: '7n/2n5/3k4/8/4K3/8/8/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Ng6',
          fen: 'n7/8/3k2n1/8/4K3/8/8/nnnnnnnn w - - 1 2',
        },
        {
          move: 'Nf7',
          fen: 'n7/5n2/3k4/8/4K3/8/8/nnnnnnnn w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: 'N6N/8/8/4k3/8/3K4/8/NNNNNNNN w - - 0 1',
        description: 'Another position with the max number of white knights.',
      },
      expected: [
        {
          move: 'Nac2',
          fen: 'N6N/8/8/4k3/8/3K4/2N5/1NNNNNNN b - - 1 1',
        },
        {
          move: 'Nab3',
          fen: 'N6N/8/8/4k3/8/1N1K4/8/1NNNNNNN b - - 1 1',
        },
        {
          move: 'Nbd2',
          fen: 'N6N/8/8/4k3/8/3K4/3N4/N1NNNNNN b - - 1 1',
        },
        {
          move: 'Na3',
          fen: 'N6N/8/8/4k3/8/N2K4/8/N1NNNNNN b - - 1 1',
        },
        {
          move: 'Nbc3',
          fen: 'N6N/8/8/4k3/8/2NK4/8/N1NNNNNN b - - 1 1',
        },
        {
          move: 'Na2',
          fen: 'N6N/8/8/4k3/8/3K4/N7/NN1NNNNN b - - 1 1',
        },
        {
          move: 'Nce2',
          fen: 'N6N/8/8/4k3/8/3K4/4N3/NN1NNNNN b - - 1 1',
        },
        {
          move: 'Ncb3',
          fen: 'N6N/8/8/4k3/8/1N1K4/8/NN1NNNNN b - - 1 1',
        },
        {
          move: 'Nb2',
          fen: 'N6N/8/8/4k3/8/3K4/1N6/NNN1NNNN b - - 1 1',
        },
        {
          move: 'Ndf2',
          fen: 'N6N/8/8/4k3/8/3K4/5N2/NNN1NNNN b - - 1 1',
        },
        {
          move: 'Ndc3',
          fen: 'N6N/8/8/4k3/8/2NK4/8/NNN1NNNN b - - 1 1',
        },
        {
          move: 'Nde3',
          fen: 'N6N/8/8/4k3/8/3KN3/8/NNN1NNNN b - - 1 1',
        },
        {
          move: 'Nec2',
          fen: 'N6N/8/8/4k3/8/3K4/2N5/NNNN1NNN b - - 1 1',
        },
        {
          move: 'Ng2',
          fen: 'N6N/8/8/4k3/8/3K4/6N1/NNNN1NNN b - - 1 1',
        },
        {
          move: 'Nef3+',
          fen: 'N6N/8/8/4k3/8/3K1N2/8/NNNN1NNN b - - 1 1',
        },
        {
          move: 'Nfd2',
          fen: 'N6N/8/8/4k3/8/3K4/3N4/NNNNN1NN b - - 1 1',
        },
        {
          move: 'Nh2',
          fen: 'N6N/8/8/4k3/8/3K4/7N/NNNNN1NN b - - 1 1',
        },
        {
          move: 'Nfe3',
          fen: 'N6N/8/8/4k3/8/3KN3/8/NNNNN1NN b - - 1 1',
        },
        {
          move: 'Nfg3',
          fen: 'N6N/8/8/4k3/8/3K2N1/8/NNNNN1NN b - - 1 1',
        },
        {
          move: 'Nge2',
          fen: 'N6N/8/8/4k3/8/3K4/4N3/NNNNNN1N b - - 1 1',
        },
        {
          move: 'Ngf3+',
          fen: 'N6N/8/8/4k3/8/3K1N2/8/NNNNNN1N b - - 1 1',
        },
        {
          move: 'Nh3',
          fen: 'N6N/8/8/4k3/8/3K3N/8/NNNNNN1N b - - 1 1',
        },
        {
          move: 'Nhf2',
          fen: 'N6N/8/8/4k3/8/3K4/5N2/NNNNNNN1 b - - 1 1',
        },
        {
          move: 'Nhg3',
          fen: 'N6N/8/8/4k3/8/3K2N1/8/NNNNNNN1 b - - 1 1',
        },
        {
          move: 'Kc2',
          fen: 'N6N/8/8/4k3/8/8/2K5/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Kd2',
          fen: 'N6N/8/8/4k3/8/8/3K4/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Ke2',
          fen: 'N6N/8/8/4k3/8/8/4K3/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Kc3',
          fen: 'N6N/8/8/4k3/8/2K5/8/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Ke3',
          fen: 'N6N/8/8/4k3/8/4K3/8/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Kc4',
          fen: 'N6N/8/8/4k3/2K5/8/8/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Nb6',
          fen: '7N/8/1N6/4k3/8/3K4/8/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Nc7',
          fen: '7N/2N5/8/4k3/8/3K4/8/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Ng6+',
          fen: 'N7/8/6N1/4k3/8/3K4/8/NNNNNNNN b - - 1 1',
        },
        {
          move: 'Nf7+',
          fen: 'N7/5N2/8/4k3/8/3K4/8/NNNNNNNN b - - 1 1',
        },
      ],
    },
    {
      description: 'Transpose of N6N/8/8/4k3/8/3K4/8/NNNNNNNN w - - 0 1',
      start: {
        fen: 'nnnnnnnn/8/3k4/8/4K3/8/8/n6n b - - 0 1',
        description: 'Another position with the max number of black knights.',
      },
      expected: [
        {
          move: 'Nc2',
          fen: 'nnnnnnnn/8/3k4/8/4K3/8/2n5/7n w - - 1 2',
        },
        {
          move: 'Nb3',
          fen: 'nnnnnnnn/8/3k4/8/4K3/1n6/8/7n w - - 1 2',
        },
        {
          move: 'Nf2+',
          fen: 'nnnnnnnn/8/3k4/8/4K3/8/5n2/n7 w - - 1 2',
        },
        {
          move: 'Ng3+',
          fen: 'nnnnnnnn/8/3k4/8/4K3/6n1/8/n7 w - - 1 2',
        },
        {
          move: 'Kc5',
          fen: 'nnnnnnnn/8/8/2k5/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Kc6',
          fen: 'nnnnnnnn/8/2k5/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Ke6',
          fen: 'nnnnnnnn/8/4k3/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Kc7',
          fen: 'nnnnnnnn/2k5/8/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Kd7',
          fen: 'nnnnnnnn/3k4/8/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Ke7',
          fen: 'nnnnnnnn/4k3/8/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Nab6',
          fen: '1nnnnnnn/8/1n1k4/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Nac7',
          fen: '1nnnnnnn/2n5/3k4/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Na6',
          fen: 'n1nnnnnn/8/n2k4/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Nbc6',
          fen: 'n1nnnnnn/8/2nk4/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Nbd7',
          fen: 'n1nnnnnn/3n4/3k4/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Ncb6',
          fen: 'nn1nnnnn/8/1n1k4/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Na7',
          fen: 'nn1nnnnn/n7/3k4/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Nce7',
          fen: 'nn1nnnnn/4n3/3k4/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Ndc6',
          fen: 'nnn1nnnn/8/2nk4/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Nde6',
          fen: 'nnn1nnnn/8/3kn3/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Nb7',
          fen: 'nnn1nnnn/1n6/3k4/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Ndf7',
          fen: 'nnn1nnnn/5n2/3k4/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Nef6+',
          fen: 'nnnn1nnn/8/3k1n2/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Nec7',
          fen: 'nnnn1nnn/2n5/3k4/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Ng7',
          fen: 'nnnn1nnn/6n1/3k4/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Nfe6',
          fen: 'nnnnn1nn/8/3kn3/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Nfg6',
          fen: 'nnnnn1nn/8/3k2n1/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Nfd7',
          fen: 'nnnnn1nn/3n4/3k4/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Nh7',
          fen: 'nnnnn1nn/7n/3k4/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Ngf6+',
          fen: 'nnnnnn1n/8/3k1n2/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Nh6',
          fen: 'nnnnnn1n/8/3k3n/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Nge7',
          fen: 'nnnnnn1n/4n3/3k4/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Nhg6',
          fen: 'nnnnnnn1/8/3k2n1/8/4K3/8/8/n6n w - - 1 2',
        },
        {
          move: 'Nhf7',
          fen: 'nnnnnnn1/5n2/3k4/8/4K3/8/8/n6n w - - 1 2',
        },
      ],
    },
    {
      start: {
        fen: '8/6kR/8/8/8/bq6/1rqqqqqq/K1nqnbrq b - - 0 1',
        description: 'Maximal black queens.',
      },
      expected: [
        {
          move: 'Qcxh7',
          fen: '8/6kq/8/8/8/bq6/1r1qqqqq/K1nqnbrq w - - 0 2',
        },
        {
          move: 'Qhxh7',
          fen: '8/6kq/8/8/8/bq6/1rqqqqq1/K1nqnbrq w - - 0 2',
        },
        {
          move: 'Kf6',
          fen: '8/7R/5k2/8/8/bq6/1rqqqqqq/K1nqnbrq w - - 1 2',
        },
        {
          move: 'Kg6',
          fen: '8/7R/6k1/8/8/bq6/1rqqqqqq/K1nqnbrq w - - 1 2',
        },
        {
          move: 'Kxh7',
          fen: '8/7k/8/8/8/bq6/1rqqqqqq/K1nqnbrq w - - 0 2',
        },
        {
          move: 'Kf8',
          fen: '5k2/7R/8/8/8/bq6/1rqqqqqq/K1nqnbrq w - - 1 2',
        },
        {
          move: 'Kg8',
          fen: '6k1/7R/8/8/8/bq6/1rqqqqqq/K1nqnbrq w - - 1 2',
        },
      ],
    },
    {
      description: 'Transpose of 8/6kR/8/8/8/bq6/1rqqqqqq/K1nqnbrq b - - 0 1',
      start: {
        fen: 'k1NQNBRQ/1RQQQQQQ/BQ6/8/8/8/6Kr/8 w - - 0 1',
        description: 'Maximal white queens.',
      },
      expected: [
        {
          move: 'Kf1',
          fen: 'k1NQNBRQ/1RQQQQQQ/BQ6/8/8/8/7r/5K2 b - - 1 1',
        },
        {
          move: 'Kg1',
          fen: 'k1NQNBRQ/1RQQQQQQ/BQ6/8/8/8/7r/6K1 b - - 1 1',
        },
        {
          move: 'Kxh2',
          fen: 'k1NQNBRQ/1RQQQQQQ/BQ6/8/8/8/7K/8 b - - 0 1',
        },
        {
          move: 'Kf3',
          fen: 'k1NQNBRQ/1RQQQQQQ/BQ6/8/8/5K2/7r/8 b - - 1 1',
        },
        {
          move: 'Kg3',
          fen: 'k1NQNBRQ/1RQQQQQQ/BQ6/8/8/6K1/7r/8 b - - 1 1',
        },
        {
          move: 'Qcxh2',
          fen: 'k1NQNBRQ/1R1QQQQQ/BQ6/8/8/8/6KQ/8 b - - 0 1',
        },
        {
          move: 'Qhxh2',
          fen: 'k1NQNBRQ/1RQQQQQ1/BQ6/8/8/8/6KQ/8 b - - 0 1',
        },
      ],
    },
  ],
};
