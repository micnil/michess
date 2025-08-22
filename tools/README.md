# Chess Tools

This directory contains command-line tools for the chess engine.

## Perft Tool

The `perft.ts` script is a performance testing tool that counts the total number of moves at a given depth in a chess position. This is commonly used to verify the correctness of a chess engine's move generation.

### Usage

```bash
# Using npm script (recommended)
pnpm perft [OPTIONS]

# Direct execution
npx tsx --tsconfig tools/tsconfig.tools.json tools/perft.ts [OPTIONS]
```

### Options

- `--fen <fen-string>`: Chess position in FEN notation (default: standard starting position)
- `--depth <depth>`: Perft search depth (default: 5)
- `--help, -h`: Show help message

### Examples

```bash
# Run perft on starting position with default depth (5)
pnpm perft

# Run perft with specific depth
pnpm perft --depth 6

# Run perft on a specific position (Kiwipete test position)
pnpm perft --fen "r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1" --depth 4
```

### Known Perft Values

Here are some well-known perft values for testing correctness:

**Starting Position (`rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`)**

- Depth 1: 20 nodes
- Depth 2: 400 nodes
- Depth 3: 8,902 nodes
- Depth 4: 197,281 nodes
- Depth 5: 4,865,609 nodes
- Depth 6: 119,060,324 nodes

**Kiwipete Position (`r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1`)**

- Depth 1: 48 nodes
- Depth 2: 2,039 nodes
- Depth 3: 97,862 nodes
- Depth 4: 4,085,603 nodes
- Depth 5: 193,690,690 nodes

### Output

The tool displays:

- The FEN position being analyzed
- The search depth
- Total number of nodes (move combinations) found
- Execution time
- Nodes per second (NPS) performance metric

This tool is useful for:

- Verifying move generation correctness
- Performance benchmarking
- Debugging chess engine implementations
