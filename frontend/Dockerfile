# Base
FROM node:20-alpine AS base
ARG FRONTEND_ENV_FILE

WORKDIR /opt/padkell
# See: https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat
RUN corepack enable pnpm

# Deps
FROM base AS deps

COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY apps/frontend/package.json apps/frontend/
COPY apps/api/package.json apps/api/

RUN pnpm install --frozen-lockfile --filter next-app-template

# Builder
FROM base AS builder

WORKDIR /opt/padkell

COPY --from=deps /opt/padkell/node_modules ./node_modules
COPY --from=deps /opt/padkell/apps/frontend/node_modules ./apps/frontend/node_modules
COPY . .

WORKDIR /opt/padkell/apps/frontend

RUN echo -e "${FRONTEND_ENV_FILE}" > .env
RUN pnpm api:generate && pnpm build

# Runner
FROM base AS runner
WORKDIR /opt/padkell

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /opt/padkell/apps/frontend/.next/standalone ./
COPY --from=builder /opt/padkell/apps/frontend/public ./apps/frontend/public
COPY --from=builder --chown=nextjs:nodejs /opt/padkell/apps/frontend/.next/static ./apps/frontend/.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "apps/frontend/server.js"]