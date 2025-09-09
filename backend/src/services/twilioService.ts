import twilio from 'twilio';
import { logger } from '@/utils/logger';
import { AppError } from '@/middleware/errorHandler';

class TwilioService {
  private client: twilio.Twilio;
  private fromNumber: string;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !phoneNumber) {
      throw new AppError('Twilio credentials are not configured', 500, 'TWILIO_CONFIG_ERROR');
    }

    this.client = twilio(accountSid, authToken);
    this.fromNumber = phoneNumber;
  }

  /**
   * 发送SMS验证码
   */
  async sendVerificationCode(params: {
    to: string;
    code: string;
    language?: 'en' | 'zh' | 'es';
  }): Promise<string> {
    try {
      const message = this.getVerificationMessage(params.code, params.language || 'en');
      
      const result = await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: params.to,
      });

      logger.info('SMS verification code sent:', { 
        to: params.to, 
        sid: result.sid,
        language: params.language 
      });

      return result.sid;
    } catch (error) {
      logger.error('Failed to send SMS verification code:', error);
      throw new AppError('Failed to send verification code', 500, 'SMS_SEND_FAILED');
    }
  }

  /**
   * 发送预约确认短信
   */
  async sendBookingConfirmation(params: {
    to: string;
    bookingDetails: {
      businessName: string;
      serviceName: string;
      employeeName?: string;
      dateTime: string;
      address: string;
    };
    language?: 'en' | 'zh' | 'es';
  }): Promise<string> {
    try {
      const message = this.getBookingConfirmationMessage(params.bookingDetails, params.language || 'en');
      
      const result = await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: params.to,
      });

      logger.info('Booking confirmation SMS sent:', { 
        to: params.to, 
        sid: result.sid,
        business: params.bookingDetails.businessName 
      });

      return result.sid;
    } catch (error) {
      logger.error('Failed to send booking confirmation SMS:', error);
      throw new AppError('Failed to send booking confirmation', 500, 'SMS_SEND_FAILED');
    }
  }

  /**
   * 发送预约提醒短信
   */
  async sendBookingReminder(params: {
    to: string;
    bookingDetails: {
      businessName: string;
      serviceName: string;
      dateTime: string;
      address: string;
    };
    language?: 'en' | 'zh' | 'es';
  }): Promise<string> {
    try {
      const message = this.getBookingReminderMessage(params.bookingDetails, params.language || 'en');
      
      const result = await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: params.to,
      });

      logger.info('Booking reminder SMS sent:', { 
        to: params.to, 
        sid: result.sid,
        business: params.bookingDetails.businessName 
      });

      return result.sid;
    } catch (error) {
      logger.error('Failed to send booking reminder SMS:', error);
      throw new AppError('Failed to send booking reminder', 500, 'SMS_SEND_FAILED');
    }
  }

  /**
   * 发送取消通知短信
   */
  async sendCancellationNotification(params: {
    to: string;
    bookingDetails: {
      businessName: string;
      serviceName: string;
      dateTime: string;
    };
    language?: 'en' | 'zh' | 'es';
  }): Promise<string> {
    try {
      const message = this.getCancellationMessage(params.bookingDetails, params.language || 'en');
      
      const result = await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: params.to,
      });

      logger.info('Cancellation notification SMS sent:', { 
        to: params.to, 
        sid: result.sid,
        business: params.bookingDetails.businessName 
      });

      return result.sid;
    } catch (error) {
      logger.error('Failed to send cancellation notification SMS:', error);
      throw new AppError('Failed to send cancellation notification', 500, 'SMS_SEND_FAILED');
    }
  }

  /**
   * 验证电话号码格式
   */
  validatePhoneNumber(phoneNumber: string): boolean {
    // 美国电话号码格式验证
    const phoneRegex = /^\+1\d{10}$/;
    return phoneRegex.test(phoneNumber);
  }

  /**
   * 格式化电话号码
   */
  formatPhoneNumber(phoneNumber: string): string {
    // 移除所有非数字字符
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // 如果是10位数字，添加+1前缀
    if (cleaned.length === 10) {
      return `+1${cleaned}`;
    }
    
    // 如果是11位数字且以1开头，添加+前缀
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+${cleaned}`;
    }
    
    // 如果已经有+前缀，直接返回
    if (phoneNumber.startsWith('+')) {
      return phoneNumber;
    }
    
    throw new AppError('Invalid phone number format', 400, 'INVALID_PHONE');
  }

  /**
   * 获取验证码短信内容
   */
  private getVerificationMessage(code: string, language: 'en' | 'zh' | 'es'): string {
    const messages = {
      en: `Your BookMee verification code is: ${code}. This code will expire in 5 minutes.`,
      zh: `您的BookMee验证码是：${code}。此验证码将在5分钟后过期。`,
      es: `Su código de verificación de BookMee es: ${code}. Este código expirará en 5 minutos.`
    };

    return messages[language];
  }

  /**
   * 获取预约确认短信内容
   */
  private getBookingConfirmationMessage(
    details: {
      businessName: string;
      serviceName: string;
      employeeName?: string;
      dateTime: string;
      address: string;
    }, 
    language: 'en' | 'zh' | 'es'
  ): string {
    const employeeText = details.employeeName ? 
      (language === 'en' ? ` with ${details.employeeName}` :
       language === 'zh' ? ` - 服务员工：${details.employeeName}` :
       ` con ${details.employeeName}`) : '';

    const messages = {
      en: `Booking confirmed! ${details.serviceName}${employeeText} at ${details.businessName} on ${details.dateTime}. Address: ${details.address}`,
      zh: `预约确认！${details.businessName} - ${details.serviceName}${employeeText}，时间：${details.dateTime}。地址：${details.address}`,
      es: `¡Reserva confirmada! ${details.serviceName}${employeeText} en ${details.businessName} el ${details.dateTime}. Dirección: ${details.address}`
    };

    return messages[language];
  }

  /**
   * 获取预约提醒短信内容
   */
  private getBookingReminderMessage(
    details: {
      businessName: string;
      serviceName: string;
      dateTime: string;
      address: string;
    }, 
    language: 'en' | 'zh' | 'es'
  ): string {
    const messages = {
      en: `Reminder: Your ${details.serviceName} appointment at ${details.businessName} is scheduled for ${details.dateTime}. Address: ${details.address}`,
      zh: `提醒：您在${details.businessName}的${details.serviceName}预约时间为${details.dateTime}。地址：${details.address}`,
      es: `Recordatorio: Su cita de ${details.serviceName} en ${details.businessName} está programada para ${details.dateTime}. Dirección: ${details.address}`
    };

    return messages[language];
  }

  /**
   * 获取取消通知短信内容
   */
  private getCancellationMessage(
    details: {
      businessName: string;
      serviceName: string;
      dateTime: string;
    }, 
    language: 'en' | 'zh' | 'es'
  ): string {
    const messages = {
      en: `Your ${details.serviceName} appointment at ${details.businessName} scheduled for ${details.dateTime} has been cancelled.`,
      zh: `您在${details.businessName}预订的${details.serviceName}（时间：${details.dateTime}）已被取消。`,
      es: `Su cita de ${details.serviceName} en ${details.businessName} programada para ${details.dateTime} ha sido cancelada.`
    };

    return messages[language];
  }
}

export const twilioService = new TwilioService();