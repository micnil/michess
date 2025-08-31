import { Command } from 'commander';
import { ChessPosition } from '@michess/core-models';
import { FenParser, FenStr } from '@michess/core-models';
import { ChessGame } from '@michess/core-game';

// Default FEN for standard starting position
const DEFAULT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

function formatNumber(num: number): string {
  return num.toLocaleString();
}

function formatTime(ms: number): string {
  if (ms < 1000) {
    return `${ms.toFixed(2)}ms`;
  } else if (ms < 60000) {
    return `${(ms / 1000).toFixed(3)}s`;
  } else {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(3);
    return `${minutes}m ${seconds}s`;
  }
}

interface PerfOptions {
  fen: string;
  depth: number;
}

function main() {
  const program = new Command();

  program
    .name('perft')
    .description('Chess performance test tool - counts nodes at given depth')
    .version('1.0.0')
    .option('-f, --fen <fen>', 'Chess position in FEN notation', DEFAULT_FEN)
    .option(
      '-d, --depth <depth>',
      'Perft search depth',
      (value) => {
        const depth = parseInt(value, 10);
        if (isNaN(depth) || depth < 0) {
          program.error('Error: depth must be a non-negative integer');
        }
        return depth;
      },
      5
    )
    .addHelpText(
      'after',
      `
Examples:
  $ pnpm perft
  $ pnpm perft --depth 6
  $ pnpm perft -f "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1" -d 4

Known test positions:
  Starting position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  Kiwipete test:     "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1"`
    );

  program.parse();
  const options = program.opts<PerfOptions>();

  console.log('Chess Perft Tool');
  console.log('================');
  console.log(`FEN: ${options.fen}`);
  console.log(`Depth: ${options.depth}`);
  console.log('');

  try {
    const chessPosition: ChessPosition = FenParser.toChessPosition(
      options.fen as FenStr
    );

    const chessGame = ChessGame.fromChessPosition(chessPosition);

    console.log('Running perft...');

    const startTime = performance.now();

    const result = chessGame.perft(options.depth);

    const endTime = performance.now();
    const elapsed = endTime - startTime;

    console.log('');
    console.log('Results:');
    console.log('--------');
    console.log(`Nodes: ${formatNumber(result.nodes)}`);
    console.log(`Time: ${formatTime(elapsed)}`);

    if (elapsed > 0) {
      const nps = result.nodes / (elapsed / 1000);
      console.log(`NPS: ${formatNumber(Math.round(nps))} nodes/second`);
    }
  } catch (error) {
    program.error(
      `Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

if (require.main === module) {
  main();
}
