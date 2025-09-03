---
applyTo: '**'
---

# Coding conventions

## General

- Avoid early returns
- Immutable constants should be named using SCREAMING_SNAKE_CASE
- Prefer using type aliases instead of interface declarations for type definitions.

## File Organization

### Directory Structure

Should prefer to use the following leaf directories under any feature directories.

```
  components/     # React components
  service/        # Business logic
  model/          # TypeScript definitions and classes
  util/           # Pure utility functions
  constants/      # Application constants
  __tests__/      # test specs
```

Test spec directory is sibling with the module it is testing.

### File Naming

There should only be 1 export per module (except when a type and const are named the same). File should be named the same as the export.

- **Components**: `PascalCase.tsx` (e.g., `ChessBoard.tsx`)
- **Services**: `PascalCaseService.ts` (e.g., `GameManagerService.ts`)
- **Types**: `PascalCase.ts` (e.g., `chess.types.ts`)
- **Utils**: `PascalCaseUtil.ts` or `camelCase.ts` (e.g., `IndexBoardUtil.ts` or `canMoveTo.ts`)
- **Hooks**: `useCamelCase.ts` (e.g. `useMoveOptions.ts`)

## Utility types

- use `Maybe<string>` instead of `string | undefined`
- use named primitive types like `UserId`, `DisplayDateTimeStr`, `RequestCode` when applicable
