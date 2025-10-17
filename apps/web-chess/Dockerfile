# =================================================================================================
# Stage 1: Base Image
#
# Sets up the basic environment with a specific Node.js version and installs pnpm.
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
# Installs all dependencies for the entire monorepo.
# =================================================================================================
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
COPY patches/ ./patches/
RUN pnpm fetch
RUN pnpm install --frozen-lockfile

# =================================================================================================
# Stage 3: Builder
#
# Copies the entire monorepo source code and builds the web-chess application using Nx.
# The result is a static build artifact in the 'dist' directory.
# =================================================================================================
FROM base AS builder

COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules
RUN pnpm nx build web-chess --configuration=production

# =================================================================================================
# Stage 4: Web Server (Final Image)
#
# This is the final, lightweight image that will be deployed.
# Uses Caddy as the web server with reverse proxy configuration for API calls.
# =================================================================================================
FROM caddy:2-alpine AS runner

# Copy the built static files
COPY --from=builder /usr/src/app/dist/apps/web-chess /srv

# Copy Caddy configuration
COPY apps/web-chess/Caddyfile /etc/caddy/Caddyfile

# Create directories for Caddy data and config
RUN mkdir -p /data/caddy /config/caddy

# Set default port
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start Caddy
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]# =================================================================================================
# Build instructions:
#
# Build: docker build -t web-chess:latest -f apps/web-chess/Dockerfile .
# Run:   docker run -p 3000:3000 --env-file apps/web-chess/.env.local web-chess:latest
# =================================================================================================
