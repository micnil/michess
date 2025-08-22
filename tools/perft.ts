import { ChessPosition } from '@michess/core-models';
import { FenParser } from '@michess/core-fen';
import { ChessGame } from '@michess/core-rules';

// Default FEN for standard starting position
const DEFAULT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

function printUsage() {
  console.log('Usage: pnpm perft [OPTIONS]');
  console.log(
    '   or: tsx --tsconfig tools/tsconfig.tools.json tools/perft.ts [OPTIONS]'
  );
  console.log('');
  console.log('Options:');
  console.log('  --fen <fen-string>    Chess position in FEN notation');
  console.log('                        (default: standard starting position)');
  console.log('  --depth <depth>       Perft search depth (default: 5)');
  console.log('  --help, -h            Show this help message');
  console.log('');
  console.log('Examples:');
  console.log('  pnpm perft');
  console.log('  pnpm perft --depth 6');
  console.log(
    '  pnpm perft --fen "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1" --depth 4'
  );
}

function parseArgs(): { fen: string; depth: number; help: boolean } {
  const args = process.argv.slice(2);
  let fen = DEFAULT_FEN;
  let depth = 5;
  let help = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--help':
      case '-h':
        help = true;
        break;

      case '--fen':
        if (i + 1 >= args.length) {
          console.error('Error: --fen requires a FEN string argument');
          process.exit(1);
        }
        fen = args[++i];
        break;

      case '--depth':
        if (i + 1 >= args.length) {
          console.error('Error: --depth requires a numeric argument');
          process.exit(1);
        }
        const depthArg = parseInt(args[++i], 10);
        if (isNaN(depthArg) || depthArg < 0) {
          console.error('Error: --depth must be a non-negative integer');
          process.exit(1);
        }
        depth = depthArg;
        break;

      default:
        console.error(`Error: Unknown argument: ${arg}`);
        printUsage();
        process.exit(1);
    }
  }

  return { fen, depth, help };
}

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

function main() {
  const { fen, depth, help } = parseArgs();

  if (help) {
    printUsage();
    return;
  }

  console.log('Chess Perft Tool');
  console.log('================');
  console.log(`FEN: ${fen}`);
  console.log(`Depth: ${depth}`);
  console.log('');

  try {
    // Parse the FEN string to create a chess position
    const chessPosition: ChessPosition = FenParser.toChessPosition(fen);

    // Create a chess game from the position
    const chessGame = ChessGame.fromChessPosition(chessPosition);

    console.log('Running perft...');

    // Measure execution time
    const startTime = performance.now();

    // Run perft
    const result = chessGame.perft(depth);

    const endTime = performance.now();
    const elapsed = endTime - startTime;

    // Display results
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
    console.error(
      'Error:',
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
