
# =================================================================================================
# Stage 1: Base Image
#
# Sets up the base Node.js environment with PNPM package manager.
# =================================================================================================
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app

# =================================================================================================
# Stage 2: Dependencies
#
# Installs all dependencies for the monorepo using PNPM (including
# devDependencies which is needed by nx during build).
# =================================================================================================
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
COPY patches/ ./patches/
RUN pnpm fetch
RUN pnpm install --frozen-lockfile

# =================================================================================================
# Stage 3: Builder
#
# Copies the entire monorepo source code and builds the node-chess application using Nx.
# The result is a self-contained build artifact in the 'dist' directory.
# =================================================================================================
FROM base AS builder

COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules
RUN pnpm nx build node-chess --configuration=production

# =================================================================================================
# Stage 4: Production Dependencies
#
# Creates a clean installation of *only* the production dependencies for the final built app.
# This ensures the final image doesn't contain any devDependencies from the entire monorepo.
# =================================================================================================
FROM base as prod-deps

# The Nx build process generates a package.json for the specific app
COPY --from=builder /usr/src/app/dist/apps/node-chess/package.json ./package.json
RUN pnpm install --prod

# =================================================================================================
# Stage 5: Runner (Final Image)
#
# This is the final, lightweight image that will be deployed.
# It copies the built application from the 'builder' stage and the pruned production
# dependencies from the 'prod-deps' stage. It runs as a non-root user for security.
# =================================================================================================
FROM base AS runner

WORKDIR /usr/src/app


ENV NODE_ENV=production
ENV PORT=5000

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 --gid 1001 nodejs

COPY --from=builder /usr/src/app/dist/apps/node-chess .
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules

# Ensure proper permissions
RUN chown -R nodejs:nodejs /usr/src/app

USER nodejs

EXPOSE $PORT


# The command to start the node-chess application
CMD [ "node", "main.js" ]

# =================================================================================================
# Build instructions:
#
# Build: docker build -t node-chess:latest -f apps/node-chess/Dockerfile .
# Run:   docker run -p 5000:5000 --env-file apps/node-chess/.env.local node-chess:latest
# =================================================================================================
