// 通用类型定义
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    message: string;
    code?: string;
    statusCode: number;
    details?: any;
    stack?: string;
  };
}

export interface PaginationMeta {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

export interface QueryParams {
  page?: string;
  limit?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

// 用户相关类型
export interface UserPayload {
  id: string;
  email: string;
  role: 'USER' | 'BUSINESS_OWNER' | 'ADMIN' | 'MANAGER' | 'STAFF';
  iat?: number;
  exp?: number;
}

// 业务相关类型
export interface BusinessHours {
  monday?: { open: string; close: string; closed?: boolean };
  tuesday?: { open: string; close: string; closed?: boolean };
  wednesday?: { open: string; close: string; closed?: boolean };
  thursday?: { open: string; close: string; closed?: boolean };
  friday?: { open: string; close: string; closed?: boolean };
  saturday?: { open: string; close: string; closed?: boolean };
  sunday?: { open: string; close: string; closed?: boolean };
}

// 预约相关类型
export interface BookingSlot {
  time: string;
  available: boolean;
  serviceId?: string;
  duration?: number;
}

export interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
  bookingId?: string;
}

// 支付相关类型
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret?: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
}

// 通知相关类型
export interface NotificationData {
  type: 'booking_confirmation' | 'booking_reminder' | 'booking_cancelled' | 'payment_success' | 'payment_failed';
  recipient: {
    phone?: string;
    email?: string;
    name?: string;
  };
  data: {
    bookingId?: string;
    businessName?: string;
    serviceName?: string;
    appointmentTime?: Date;
    amount?: number;
    [key: string]: any;
  };
}

// 签到相关类型
export interface CheckInData {
  bookingId: string;
  userId: string;
  businessId: string;
  checkInTime: Date;
  qrCode?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

// 文件上传类型
export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
  filename?: string;
  path?: string;
}

// 地址类型
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

// 联系信息类型
export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

// 验证规则类型
export interface ValidationRule {
  field: string;
  rules: string[];
  message?: string;
}

// 错误类型
export interface ErrorDetails {
  field?: string;
  message: string;
  code?: string;
  value?: any;
}

// Express扩展类型
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
      files?: UploadedFile[];
    }
  }
}

// 导出所有类型
export * from '@prisma/client';