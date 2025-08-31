# Michess

A modern chess application built with React, Next.js, and TypeScript. Features a interactive chessboard with move validation and game state management.

## Quick Start

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the development server:

   ```bash
   pnpm nx serve web-chess
   ```

3. Open your browser and navigate to `http://localhost:4200`

## Project Structure

This is an Nx monorepo with the following key libraries:

- `core-game` - Chess game logic and move generation
- `react-chessboard` - React chessboard UI components
- `web-chess` - Main Next.js application

## Development

### Running Tests

```bash
# Test all projects
pnpm test:all

# Test specific library
pnpm nx test <library-name>
```

### Building

```bash
# Build the web application
pnpm nx build web-chess
```

### Type Checking

```bash
pnpm run typecheck
```
