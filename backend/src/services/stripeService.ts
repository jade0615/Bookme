import Stripe from 'stripe';
import { logger } from '@/utils/logger';
import { AppError } from '@/middleware/errorHandler';

class StripeService {
  private stripe: Stripe;

  constructor() {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new AppError('Stripe secret key is not configured', 500, 'STRIPE_CONFIG_ERROR');
    }

    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
      typescript: true,
    });
  }

  /**
   * 创建支付意图（用于定金支付）
   */
  async createPaymentIntent(params: {
    amount: number; // 金额（分为单位）
    currency: string;
    customerId?: string;
    metadata?: Record<string, string>;
    paymentMethodTypes?: string[];
  }): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(params.amount * 100), // 转换为分
        currency: params.currency || 'usd',
        customer: params.customerId,
        metadata: params.metadata || {},
        payment_method_types: params.paymentMethodTypes || ['card'],
        automatic_payment_methods: {
          enabled: true,
        },
        capture_method: 'manual', // 手动确认，便于后续处理
      });

      logger.info('Payment intent created:', { id: paymentIntent.id, amount: params.amount });
      return paymentIntent;
    } catch (error) {
      logger.error('Failed to create payment intent:', error);
      throw new AppError('Failed to create payment intent', 400, 'PAYMENT_INTENT_FAILED');
    }
  }

  /**
   * 确认支付意图
   */
  async confirmPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.capture(paymentIntentId);
      logger.info('Payment intent confirmed:', { id: paymentIntentId });
      return paymentIntent;
    } catch (error) {
      logger.error('Failed to confirm payment intent:', error);
      throw new AppError('Failed to confirm payment', 400, 'PAYMENT_CONFIRM_FAILED');
    }
  }

  /**
   * 创建或获取客户
   */
  async getOrCreateCustomer(params: {
    email: string;
    name?: string;
    phone?: string;
    metadata?: Record<string, string>;
  }): Promise<Stripe.Customer> {
    try {
      // 首先查找现有客户
      const existingCustomers = await this.stripe.customers.list({
        email: params.email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        return existingCustomers.data[0]!;
      }

      // 创建新客户
      const customer = await this.stripe.customers.create({
        email: params.email,
        name: params.name,
        phone: params.phone,
        metadata: params.metadata || {},
      });

      logger.info('New Stripe customer created:', { id: customer.id, email: params.email });
      return customer;
    } catch (error) {
      logger.error('Failed to get or create customer:', error);
      throw new AppError('Failed to process customer', 400, 'CUSTOMER_ERROR');
    }
  }

  /**
   * 创建退款
   */
  async createRefund(params: {
    paymentIntentId: string;
    amount?: number; // 可选，不提供则全额退款
    reason?: Stripe.RefundCreateParams.Reason;
    metadata?: Record<string, string>;
  }): Promise<Stripe.Refund> {
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: params.paymentIntentId,
        amount: params.amount ? Math.round(params.amount * 100) : undefined,
        reason: params.reason || 'requested_by_customer',
        metadata: params.metadata || {},
      });

      logger.info('Refund created:', { 
        id: refund.id, 
        paymentIntentId: params.paymentIntentId,
        amount: params.amount 
      });
      return refund;
    } catch (error) {
      logger.error('Failed to create refund:', error);
      throw new AppError('Failed to process refund', 400, 'REFUND_FAILED');
    }
  }

  /**
   * 获取支付方法
   */
  async getPaymentMethods(customerId: string): Promise<Stripe.PaymentMethod[]> {
    try {
      const paymentMethods = await this.stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
      });

      return paymentMethods.data;
    } catch (error) {
      logger.error('Failed to get payment methods:', error);
      throw new AppError('Failed to get payment methods', 400, 'PAYMENT_METHODS_ERROR');
    }
  }

  /**
   * 计算美国各州税率
   */
  calculateStateTax(amount: number, state: string): number {
    // 美国各州销售税率表（简化版）
    const stateTaxRates: Record<string, number> = {
      'AL': 0.04,    // Alabama
      'AK': 0.00,    // Alaska
      'AZ': 0.056,   // Arizona
      'AR': 0.065,   // Arkansas
      'CA': 0.0725,  // California
      'CO': 0.029,   // Colorado
      'CT': 0.0635,  // Connecticut
      'DE': 0.00,    // Delaware
      'FL': 0.06,    // Florida
      'GA': 0.04,    // Georgia
      'HI': 0.04,    // Hawaii
      'ID': 0.06,    // Idaho
      'IL': 0.0625,  // Illinois
      'IN': 0.07,    // Indiana
      'IA': 0.06,    // Iowa
      'KS': 0.065,   // Kansas
      'KY': 0.06,    // Kentucky
      'LA': 0.045,   // Louisiana
      'ME': 0.055,   // Maine
      'MD': 0.06,    // Maryland
      'MA': 0.0625,  // Massachusetts
      'MI': 0.06,    // Michigan
      'MN': 0.06875, // Minnesota
      'MS': 0.07,    // Mississippi
      'MO': 0.04225, // Missouri
      'MT': 0.00,    // Montana
      'NE': 0.055,   // Nebraska
      'NV': 0.0685,  // Nevada
      'NH': 0.00,    // New Hampshire
      'NJ': 0.06625, // New Jersey
      'NM': 0.05125, // New Mexico
      'NY': 0.08,    // New York
      'NC': 0.0475,  // North Carolina
      'ND': 0.05,    // North Dakota
      'OH': 0.0575,  // Ohio
      'OK': 0.045,   // Oklahoma
      'OR': 0.00,    // Oregon
      'PA': 0.06,    // Pennsylvania
      'RI': 0.07,    // Rhode Island
      'SC': 0.06,    // South Carolina
      'SD': 0.045,   // South Dakota
      'TN': 0.07,    // Tennessee
      'TX': 0.0625,  // Texas
      'UT': 0.0485,  // Utah
      'VT': 0.06,    // Vermont
      'VA': 0.053,   // Virginia
      'WA': 0.065,   // Washington
      'WV': 0.06,    // West Virginia
      'WI': 0.05,    // Wisconsin
      'WY': 0.04,    // Wyoming
    };

    const taxRate = stateTaxRates[state.toUpperCase()] || 0;
    return Math.round(amount * taxRate * 100) / 100; // 保留两位小数
  }

  /**
   * 验证Webhook签名
   */
  verifyWebhookSignature(payload: string, signature: string): Stripe.Event {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new AppError('Stripe webhook secret is not configured', 500, 'WEBHOOK_CONFIG_ERROR');
    }

    try {
      return this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (error) {
      logger.error('Webhook signature verification failed:', error);
      throw new AppError('Invalid webhook signature', 400, 'INVALID_SIGNATURE');
    }
  }
}

export const stripeService = new StripeService();