# Michess

A modern chess gameplay platform built with React, Vite, and TypeScript. Features matchmaking, game lobby, bot opponents, player game history, chess rating, anonymous games (without account), oauth and email login.

## Screenshots

<div style="display:flex; flex-wrap: wrap;">
  <img src="screenshots/home-page.png" width="420" style="margin-right: 100px;"/>
  <img src="screenshots/desktop-view.png" width="300"/>
  <img src="screenshots/mobile-view.png" height="220"/>
</div>

## Development setup

Install dependencies:

```bash
pnpm install
```

### Frontend

1. Start the development server:

   ```bash
   pnpm nx serve web-chess
   ```

2. Open your browser and navigate to `http://localhost:4200`

### Backend

1. Setup docker

   ```bash
   brew install docker docker-compose colima
   colima start
   ```

2. Setup your `apps/node-chess/.env.local` based on the example file `apps/node-chess/.env.example`.

3. Start databases

   `pnpm start:db`

4. Run migrations

   `pnpm migration:run`

5. Start backend service

   `pnpm start:node`

## Project Structure

This is an Nx monorepo with a clean separation between frontend, backend, and shared libraries.

### Applications

- **`apps/web-chess`** - Main web application
  - Vite
  - React
  - Tanstack Router/Query
  - Radix-UI
- **`apps/node-chess`** - Main backend application
  - NodeJS
  - Hono
  - Socket.IO
  - PostgreSQL with Drizzle ORM
  - Redis
  - BullMQ

### Core Libraries

- **`libs/core-board`** - Board representation and move generation
- **`libs/core-game`** - Chess game logic and validation
- **`libs/core-rating`** - Glicko 2 rating system for player rankings

### UI Libraries

- **`libs/react-chessboard`** - Interactive chessboard React component
  - Drag-and-drop piece movement
  - Controlled and uncontrolled usage.
  - Move highlighting
  - Promotion dialog
- **`libs/react-dnd`** - Reusable React drag-and-drop utilities

### Backend Libraries

- **`libs/api-*`** - Main APIs that orchestrates and interacts with all parts of the application.
- **`libs/infra-*`** - Repositories and services that interact with data sources.
- **`libs/be-*`** - Backend specific generic library

### Other

- **`libs/api-schema`** - Validation logic for backend APIs, but also contains the DTOs used on FE-
- **`libs/common-*`** - Any common logic.

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
pnpm typecheck
```
