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

CMD ["bun", ".output/server/index.mjs"]