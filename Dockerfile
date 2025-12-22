# Base image - Node LTS
FROM node:lts-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Dependencies stage
FROM base AS dependencies

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Copy Prisma schema so postinstall can run prisma generate during install
COPY prisma ./prisma

# Install dependencies
RUN pnpm install --frozen-lockfile

# Builder stage
FROM base AS builder

# Copy dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy Prisma schema first
COPY prisma ./prisma
COPY package.json ./

# Generate Prisma client
RUN pnpm exec prisma generate

# Copy rest of source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM base AS runner

ENV NODE_ENV=production
ENV PORT=3000

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 tanstack

# Copy necessary files from builder
COPY --from=builder --chown=tanstack:nodejs /app/.output ./.output
COPY --from=builder --chown=tanstack:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=tanstack:nodejs /app/package.json ./package.json
COPY --from=builder --chown=tanstack:nodejs /app/prisma ./prisma

# Switch to non-root user
USER tanstack

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Start the application
CMD ["node", ".output/server/index.mjs"]
