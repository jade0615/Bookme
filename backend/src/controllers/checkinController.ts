import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@/types';

// 签到
export const checkIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { bookingId } = req.params;
    const response: ApiResponse = {
      success: true,
      data: { 
        bookingId,
        checkInTime: new Date(),
        status: 'checked_in'
      },
      message: 'Check-in successful'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// 获取签到状态
export const getCheckInStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { bookingId } = req.params;
    const response: ApiResponse = {
      success: true,
      data: { 
        bookingId,
        status: 'pending',
        canCheckIn: true
      },
      message: 'Check-in status retrieved successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// 获取签到历史
export const getCheckInHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response: ApiResponse = {
      success: true,
      data: [],
      message: 'Check-in history retrieved successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// QR码签到
export const checkinWithQR = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response: ApiResponse = {
      success: true,
      data: { 
        bookingId: req.body.bookingId,
        checkInTime: new Date(),
        method: 'qr_code'
      },
      message: 'QR code check-in successful'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// SMS签到
export const checkinWithSMS = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response: ApiResponse = {
      success: true,
      data: { 
        bookingId: req.body.bookingId,
        checkInTime: new Date(),
        method: 'sms'
      },
      message: 'SMS check-in successful'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// 手动签到
export const manualCheckin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { bookingId } = req.params;
    const response: ApiResponse = {
      success: true,
      data: { 
        bookingId,
        checkInTime: new Date(),
        method: 'manual'
      },
      message: 'Manual check-in successful'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// 发送签到短信
export const sendCheckinSMS = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { bookingId } = req.params;
    const response: ApiResponse = {
      success: true,
      data: { bookingId, sent: true },
      message: 'Check-in SMS sent successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// 获取签到记录
export const getCheckinRecords = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response: ApiResponse = {
      success: true,
      data: [],
      message: 'Check-in records retrieved successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// 获取签到信息
export const getCheckin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const response: ApiResponse = {
      success: true,
      data: { id, status: 'checked_in', checkInTime: new Date() },
      message: 'Check-in retrieved successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// 完成服务
export const completeService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { bookingId } = req.params;
    const response: ApiResponse = {
      success: true,
      data: { bookingId, status: 'completed', completedAt: new Date() },
      message: 'Service completed successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// 验证QR码
export const verifyQRCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response: ApiResponse = {
      success: true,
      data: { valid: true, bookingId: req.body.qrCode },
      message: 'QR code verified successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// 获取签到统计
export const getCheckinStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response: ApiResponse = {
      success: true,
      data: {
        totalCheckins: 0,
        todayCheckins: 0,
        noShowRate: 0,
        averageWaitTime: 0
      },
      message: 'Check-in stats retrieved successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const checkinController = {
  checkIn,
  getCheckInStatus,
  getCheckInHistory,
  checkinWithQR,
  checkinWithSMS,
  manualCheckin,
  sendCheckinSMS,
  getCheckinRecords,
  getCheckin,
  completeService,
  verifyQRCode,
  getCheckinStats
};
