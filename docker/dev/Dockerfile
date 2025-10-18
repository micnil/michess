# =================================================================================================
# Development/Tooling Dockerfile
#
# Creates a container with the full development environment for running migrations,
# drizzle-kit commands, and other development tasks.
# =================================================================================================
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install curl for health checks (same as production base)
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# =================================================================================================
# Stage 2: Dependencies
#
# Installs all dependencies (including dev dependencies) for the full workspace.
# This layer is cached when only source code changes, not package.json/pnpm-lock.yaml.
# =================================================================================================
FROM base AS deps

COPY ../../package.json ../../pnpm-lock.yaml ./
COPY ../../patches/ ./patches/
RUN pnpm fetch
RUN pnpm install --frozen-lockfile

# =================================================================================================
# Stage 3: Development Environment with Full Workspace
# =================================================================================================
FROM base AS dev-tools

# Copy installed dependencies from deps stage
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy the entire workspace for full context
COPY ../../ .

# Default command keeps container running for manual access
CMD ["tail", "-f", "/dev/null"]

# =================================================================================================
# Build instructions:
#
# Build: docker build -t chess-dev-tools:latest -f docker/dev/Dockerfile .
# Run:   docker run -d --name chess-dev-tools --env-file apps/node-chess/.env chess-dev-tools:latest
# Exec:  docker exec -it chess-dev-tools bash
#
# Available commands in container:
# - pnpm migration:run
# - pnpm migration:generate
# - pnpm drizzle-studio
# - npx drizzle-kit migrate --config=libs/infra-db/drizzle.config.ts
# - Any other workspace commands
# =================================================================================================
