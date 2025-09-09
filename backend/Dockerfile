# Backend Dockerfile
FROM node:18-alpine AS base

# 安装依赖
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 复制package files
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --only=production

# 构建应用
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 生成Prisma client
RUN npx prisma generate

# 构建TypeScript
RUN npm run build

# 运行阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 backend

# 复制构建文件和依赖
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

# 创建日志目录
RUN mkdir -p logs
RUN chown backend:nodejs logs

USER backend

EXPOSE 3001

# 运行数据库迁移并启动应用
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]