# Docker Deployment Guide

## Quick Start

1. **Copy environment file:**
   ```bash
   cp .env.docker.example .env
   ```

2. **Update `.env` with your values:**
   - Set a strong `POSTGRES_PASSWORD`
   - Set a secure `BETTER_AUTH_SECRET` (min 32 chars)
   - Update `BETTER_AUTH_URL` and `VITE_BETTER_AUTH_URL` with your domain
   - Add your `RESEND_API_KEY` for emails

3. **Build and run:**
   ```bash
   docker-compose up -d
   ```

4. **Run Prisma migrations:**
   ```bash
   docker-compose exec app pnpm exec prisma migrate deploy
   ```

5. **Access your app:**
   - App: http://localhost:3000
   - Database: localhost:5432

## Coolify Deployment

### Option 1: Using Docker Compose (Recommended)

1. **In Coolify:**
   - Create a new service → Docker Compose
   - Point to your Git repository
   - Coolify will detect `docker-compose.yml`

2. **Set environment variables in Coolify:**
   - Add all variables from `.env.docker.example`
   - Ensure `DATABASE_URL` points to your external database (required)
   - If you are using an external DB, you do NOT need to add an internal DB service

3. **Deploy:**
   - Coolify will build and deploy automatically

### Option 2: Using Dockerfile Only

1. **In Coolify:**
   - Create a new service → Dockerfile
   - Point to your Git repository
   - Set build context to `.`

2. **Set environment variables:**
   - `DATABASE_URL` - PostgreSQL connection string (required)
   - `BETTER_AUTH_SECRET` - Secret key
   - `BETTER_AUTH_URL` - Your domain URL
   - `VITE_BETTER_AUTH_URL` - Your domain URL
   - `RESEND_API_KEY` - Resend API key
   - `PORT=3000`

3. **(Optional) Add PostgreSQL database in Coolify:**
   - Only if you want Coolify to manage the DB. If you already manage your own DB, skip this step.

4. **Deploy:**
   - Coolify will build and deploy

## Useful Commands

### View logs:
```bash
docker-compose logs -f app
```

### Restart app:
```bash
docker-compose restart app
```

### Stop all services:
```bash
docker-compose down
```

### Rebuild and restart:
```bash
docker-compose up -d --build
```

### Run Prisma commands:
```bash
# Generate client
docker-compose exec app pnpm exec prisma generate

# Run migrations
docker-compose exec app pnpm exec prisma migrate deploy

# Seed database
docker-compose exec app pnpm exec prisma db seed

# Open Prisma Studio
docker-compose exec app pnpm exec prisma studio
```

### Shell into container:
```bash
docker-compose exec app sh
```

## Production Checklist

- [ ] Set strong `POSTGRES_PASSWORD`
- [ ] Set secure `BETTER_AUTH_SECRET` (random 32+ chars)
- [ ] Update all URLs to production domain
- [ ] Configure `RESEND_API_KEY` for emails
- [ ] Run database migrations
- [ ] Set up database backups
- [ ] Configure SSL/TLS certificates (Coolify handles this)
- [ ] Set up monitoring and logging
- [ ] Configure health checks
- [ ] Review and set resource limits

## Troubleshooting

### App won't start:
- Check logs: `docker-compose logs app`
- Verify DATABASE_URL is correct
- Ensure Prisma migrations are run

### Database connection errors:
- Verify db service is healthy: `docker-compose ps`
- Check DATABASE_URL format
- Ensure db container is running

### Build fails:
- Clear Docker cache: `docker-compose build --no-cache`
- Check for missing dependencies in package.json
- Verify Prisma schema is valid

## Notes

- The app runs on port 3000 by default
- PostgreSQL data is persisted in a Docker volume
- Health checks are configured for both app and database
- Uses Node LTS (Alpine) for smaller image size
- Multi-stage build for optimized production image
