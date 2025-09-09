import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';
import { UserPayload } from '@/types';

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      throw new AppError('Authorization header missing', 401, 'NO_AUTH_HEADER');
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw new AppError('Token missing', 401, 'NO_TOKEN');
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new AppError('JWT secret not configured', 500, 'JWT_CONFIG_ERROR');
    }

    const decoded = jwt.verify(token, jwtSecret) as UserPayload;
    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token', 401, 'INVALID_TOKEN'));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new AppError('Token expired', 401, 'TOKEN_EXPIRED'));
    } else {
      next(error);
    }
  }
};

export const authorize = (...roles: ('USER' | 'BUSINESS_OWNER' | 'ADMIN' | 'MANAGER' | 'STAFF')[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('Authentication required', 401, 'AUTH_REQUIRED');
    }

    if (roles.length > 0 && !roles.includes(req.user.role)) {
      throw new AppError('Insufficient permissions', 403, 'INSUFFICIENT_PERMISSIONS');
    }

    next();
  };
};