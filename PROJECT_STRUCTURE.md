# BookMee 项目架构概览

## 📁 完整项目结构

```
bookmee/
├── 📄 README.md                    # 项目说明文档
├── 📄 PROJECT_STRUCTURE.md         # 项目结构说明（本文件）
├── 📄 PRD-Complete.md              # 产品需求文档
├── 📄 package.json                 # 根目录依赖配置
├── 📄 .env.example                 # 环境变量示例
├── 📄 .gitignore                   # Git忽略配置
├── 📄 .eslintrc.json              # ESLint配置
├── 📄 .prettierrc.json            # Prettier配置
├── 📄 commitlint.config.js        # Commitlint配置
├── 📄 .lintstagedrc.json          # lint-staged配置
├── 📄 docker-compose.yml          # Docker Compose配置
├── 📄 vercel.json                 # Vercel部署配置
├── 📄 .dockerignore               # Docker忽略配置
├── 📄 schema.prisma               # Prisma数据库架构
│
├── 📁 .husky/                      # Git hooks
│   ├── 📄 pre-commit              # 提交前检查
│   └── 📄 commit-msg              # 提交信息检查
│
├── 📁 frontend/                    # Next.js 前端应用
│   ├── 📄 package.json            # 前端依赖
│   ├── 📄 tsconfig.json           # TypeScript配置
│   ├── 📄 next.config.js          # Next.js配置
│   ├── 📄 tailwind.config.js      # Tailwind CSS配置
│   ├── 📄 postcss.config.js       # PostCSS配置
│   ├── 📄 Dockerfile              # 前端Docker配置
│   │
│   ├── 📁 src/
│   │   ├── 📁 app/                # App Router (Next.js 13+)
│   │   │   ├── 📄 layout.tsx      # 根布局组件
│   │   │   ├── 📄 page.tsx        # 首页组件
│   │   │   ├── 📄 providers.tsx   # 全局提供者
│   │   │   └── 📄 globals.css     # 全局样式
│   │   │
│   │   ├── 📁 components/         # React组件
│   │   │   ├── 📁 ui/            # 通用UI组件
│   │   │   │   ├── 📄 Button.tsx
│   │   │   │   ├── 📄 Input.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   ├── 📁 auth/          # 认证相关组件
│   │   │   ├── 📁 booking/       # 预约相关组件
│   │   │   ├── 📁 business/      # 商家相关组件
│   │   │   └── 📁 dashboard/     # 仪表板组件
│   │   │
│   │   ├── 📁 lib/               # 工具库
│   │   │   ├── 📄 i18n.ts        # 国际化配置
│   │   │   └── 📄 utils.ts       # 通用工具函数
│   │   │
│   │   ├── 📁 hooks/             # 自定义React Hooks
│   │   ├── 📁 store/             # 状态管理
│   │   └── 📁 types/             # TypeScript类型定义
│   │
│   ├── 📁 public/                # 静态资源
│   │
│   └── 📁 locales/               # 国际化文件
│       ├── 📁 en/
│       │   └── 📄 common.json    # 英文翻译
│       ├── 📁 zh/
│       │   └── 📄 common.json    # 中文翻译
│       └── 📁 es/
│           └── 📄 common.json    # 西班牙语翻译
│
├── 📁 backend/                    # Express.js 后端API
│   ├── 📄 package.json           # 后端依赖
│   ├── 📄 tsconfig.json          # TypeScript配置
│   ├── 📄 Dockerfile             # 后端Docker配置
│   │
│   ├── 📁 src/
│   │   ├── 📄 index.ts           # 应用入口文件
│   │   │
│   │   ├── 📁 routes/            # API路由
│   │   │   ├── 📄 auth.ts        # 认证路由
│   │   │   ├── 📄 bookings.ts    # 预约路由
│   │   │   ├── 📄 businesses.ts  # 商家路由
│   │   │   ├── 📄 services.ts    # 服务路由
│   │   │   ├── 📄 payments.ts    # 支付路由
│   │   │   ├── 📄 checkin.ts     # 签到路由
│   │   │   └── 📄 users.ts       # 用户路由
│   │   │
│   │   ├── 📁 controllers/       # 控制器
│   │   │   ├── 📄 authController.ts
│   │   │   ├── 📄 bookingController.ts
│   │   │   ├── 📄 businessController.ts
│   │   │   ├── 📄 serviceController.ts
│   │   │   ├── 📄 paymentController.ts
│   │   │   ├── 📄 checkinController.ts
│   │   │   └── 📄 userController.ts
│   │   │
│   │   ├── 📁 services/          # 业务逻辑服务
│   │   │   ├── 📄 stripeService.ts    # Stripe支付服务
│   │   │   └── 📄 twilioService.ts    # Twilio短信服务
│   │   │
│   │   ├── 📁 middleware/        # 中间件
│   │   │   ├── 📄 errorHandler.ts     # 错误处理
│   │   │   ├── 📄 notFoundHandler.ts  # 404处理
│   │   │   └── 📄 auth.ts             # 认证中间件
│   │   │
│   │   ├── 📁 utils/             # 工具函数
│   │   │   ├── 📄 logger.ts      # 日志工具
│   │   │   └── 📄 db.ts          # 数据库连接
│   │   │
│   │   └── 📁 types/             # TypeScript类型
│   │
│   ├── 📁 prisma/                # Prisma配置
│   │   ├── 📄 schema.prisma      # 数据库模式
│   │   └── 📄 seed.ts           # 数据种子
│   │
│   └── 📁 tests/                 # 测试文件
│
├── 📁 shared/                     # 共享代码
│   ├── 📁 types/                 # 共享类型定义
│   └── 📁 utils/                 # 共享工具函数
│
└── 📁 docs/                       # 项目文档
    ├── 📄 DEVELOPMENT.md         # 开发指南
    ├── 📄 API.md                 # API文档
    ├── 📄 DEPLOYMENT.md          # 部署指南
    └── 📄 CONTRIBUTING.md        # 贡献指南
```

## 🚀 技术栈概览

### 前端技术栈
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **HTTP客户端**: Axios + React Query
- **国际化**: i18next
- **表单**: React Hook Form + Zod
- **认证**: NextAuth.js
- **支付**: Stripe React Components

### 后端技术栈
- **运行时**: Node.js
- **框架**: Express.js
- **语言**: TypeScript
- **ORM**: Prisma
- **数据库**: PostgreSQL
- **缓存**: Redis
- **认证**: JWT
- **支付**: Stripe API
- **短信**: Twilio API
- **日志**: Winston

### 开发工具
- **代码检查**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **提交规范**: Commitlint
- **测试**: Jest + Supertest
- **容器化**: Docker + Docker Compose
- **部署**: Vercel (前端) + Railway/Render (后端)

## 📋 核心功能模块

### 1. 用户认证系统 (`/auth`)
- 用户注册/登录
- 手机验证
- 密码重置
- JWT令牌管理

### 2. 商家管理系统 (`/businesses`)
- 商家信息管理
- 多位置支持
- 员工管理
- 营业时间设置

### 3. 服务管理系统 (`/services`)
- 服务项目配置
- 价格和时长设置
- 员工服务关联
- 服务分类管理

### 4. 预约系统 (`/bookings`)
- 在线预约创建
- 可用时间查询
- 预约状态管理
- 自动确认机制

### 5. 签到系统 (`/checkin`)
- 二维码签到
- SMS验证签到
- 员工手动签到
- 签到状态追踪

### 6. 支付系统 (`/payments`)
- Stripe支付集成
- 定金+尾款模式
- 小费功能
- 退款处理
- 多种支付方式

### 7. 报表分析 (`/reports`)
- 预约统计
- 收入分析
- 客户分析
- 员工绩效

## 🌍 国际化支持

支持三种语言：
- **English (EN)**: 默认语言
- **中文简体 (ZH)**: 面向华人市场
- **Español (ES)**: 面向西班牙语市场

## 🔒 安全特性

- JWT身份认证
- 请求速率限制
- 输入验证和清理
- SQL注入防护
- XSS攻击防护
- CORS配置
- Helmet安全头

## 📱 响应式设计

- 移动端优先设计
- 平板和桌面端适配
- 触摸友好界面
- 无障碍访问支持

## 🚀 部署架构

### 开发环境
- 前端: `http://localhost:3000`
- 后端: `http://localhost:3001`
- 数据库: `localhost:5432`

### 生产环境
- 前端: Vercel托管
- 后端: Railway/Render托管
- 数据库: 云PostgreSQL
- 缓存: Redis云服务

## 📊 性能优化

- 代码分割和懒加载
- 图片优化
- API响应缓存
- 数据库查询优化
- CDN静态资源分发

## 🔧 开发工作流

1. **功能开发**: 创建feature分支
2. **代码提交**: 遵循conventional commits
3. **代码审查**: Pull Request流程
4. **自动化测试**: CI/CD流程
5. **部署**: 自动化部署到生产环境

## 📈 监控和日志

- 错误追踪: Sentry集成
- 性能监控: Web Vitals
- 访问日志: Winston日志系统
- 数据库监控: Prisma日志

## 🎯 下一步开发建议

1. **实现核心控制器逻辑**: 完成所有API端点的业务逻辑
2. **前端页面开发**: 创建认证、预约、支付等核心页面
3. **集成测试**: 编写端到端测试用例
4. **性能优化**: 优化数据库查询和前端性能
5. **部署配置**: 配置生产环境部署流程
6. **监控设置**: 集成错误追踪和性能监控
7. **文档完善**: 完善API文档和用户手册

---

*此项目架构文档由 Open Media Inc 技术团队维护*