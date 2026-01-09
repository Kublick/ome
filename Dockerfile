FROM oven/bun:latest
WORKDIR /home/bun/app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package files and prisma schema
COPY package.json bun.lockb* ./
COPY prisma ./prisma

# Install dependencies (postinstall will run prisma generate)
RUN bun install

# Copy source and build
COPY . .
RUN bun run build

EXPOSE 3000

# Healthcheck using curl (if available) or wget
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || wget -q -O- http://localhost:3000/api/health || exit 1

RUN echo "Checking environment variables..." && env | grep -E "(DATABASE|BETTER_AUTH|RESEND)" || true


CMD ["bun", ".output/server/index.mjs"]