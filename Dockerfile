# syntax=docker/dockerfile:1.4

# Base stage for installing dependencies and building the repo
FROM node:18-alpine AS base
LABEL maintainer="Applied Innovation Corporation"

# Set working directory and install corepack/pnpm
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY turbo.json ./
COPY tsconfig.base.json ./
COPY .npmrc .npmrc

# Copy project files
COPY apps ./apps
COPY packages ./packages
COPY tools ./tools
COPY config ./config
COPY scripts ./scripts

# Install all dependencies (cached layer)
RUN pnpm install --frozen-lockfile

# Build all apps/packages
RUN pnpm build

# Clean up unnecessary dev dependencies
FROM node:18-alpine AS runtime
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only built output and runtime dependencies
COPY --from=base /app .

# Optional: prune dev dependencies (if needed for runtime)
# RUN pnpm prune --prod

# Default command — override via docker-compose or entrypoint
CMD ["node", "apps/api/dist/index.js"]
