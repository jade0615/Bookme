import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { errorHandler } from '@/middleware/errorHandler';
import { notFoundHandler } from '@/middleware/notFoundHandler';
import { authRoutes } from '@/routes/auth';
import { bookingRoutes } from '@/routes/bookings';
import { businessRoutes } from '@/routes/businesses';
import { serviceRoutes } from '@/routes/services';
import { paymentRoutes } from '@/routes/payments';
import { checkinRoutes } from '@/routes/checkin';
import { userRoutes } from '@/routes/users';
import { logger } from '@/utils/logger';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 请求限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 每个IP最多100次请求
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
});

// 中间件
app.use(helmet()); // 安全头
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(compression()); // Gzip压缩
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } })); // 日志
app.use(limiter); // 请求限制
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 健康检查
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// API路由
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/checkin', checkinRoutes);
app.use('/api/users', userRoutes);

// 404处理
app.use(notFoundHandler);

// 错误处理
app.use(errorHandler);

// 启动服务器
app.listen(PORT, () => {
  logger.info(`🚀 BookMee Backend Server running on port ${PORT}`);
  logger.info(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🔗 Health check: http://localhost:${PORT}/health`);
});

export default app;