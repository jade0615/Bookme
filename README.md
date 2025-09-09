# BookMee 预约+签到系统

BookMee是一个多行业、多语言的预约+签到一体化平台，支持美容、餐饮、医疗、法律等全行业，面向美国市场，支持英文/中文/西班牙语。

## 🚀 技术栈

### 前端
- **Next.js 14** - React全栈框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 原子化CSS框架
- **i18next** - 国际化支持（英文/中文/西班牙语）
- **NextAuth.js** - 身份认证
- **React Hook Form** - 表单管理
- **Zustand** - 状态管理

### 后端
- **Node.js** - 运行时环境
- **Express.js** - Web框架
- **Prisma ORM** - 数据库ORM
- **PostgreSQL** - 主数据库
- **Redis** - 缓存和会话存储

### 集成服务
- **Stripe** - 支付处理
- **Twilio** - SMS服务
- **AWS S3** - 文件存储
- **Vercel** - 前端部署
- **Railway/Render** - 后端部署

### 开发工具
- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **Husky** - Git hooks
- **Jest** - 单元测试
- **Docker** - 容器化

## 📁 项目结构

```
bookmee/
├── frontend/           # Next.js 前端应用
│   ├── src/
│   │   ├── app/       # App Router 路由
│   │   ├── components/ # 共享组件
│   │   ├── lib/       # 工具库
│   │   ├── hooks/     # 自定义 Hooks
│   │   ├── store/     # 状态管理
│   │   └── types/     # TypeScript 类型
│   ├── public/        # 静态资源
│   └── locales/       # 国际化文件
├── backend/           # Express.js 后端 API
│   ├── src/
│   │   ├── routes/    # API 路由
│   │   ├── controllers/ # 控制器
│   │   ├── services/  # 业务逻辑
│   │   ├── middleware/ # 中间件
│   │   ├── utils/     # 工具函数
│   │   └── types/     # TypeScript 类型
│   ├── prisma/        # Prisma 配置
│   └── tests/         # 测试文件
├── shared/            # 共享类型和工具
└── docs/              # 项目文档
```

## 🛠️ 安装和运行

### 环境要求
- Node.js >= 18.17.0
- PostgreSQL >= 14
- Redis >= 6 (可选)

### 1. 克隆项目
```bash
git clone <repository-url>
cd bookmee
```

### 2. 安装依赖
```bash
npm install
```

### 3. 环境配置
```bash
cp .env.example .env
# 编辑 .env 文件，填入必要的环境变量
```

### 4. 数据库设置
```bash
# 生成 Prisma 客户端
npm run db:generate

# 运行数据库迁移
npm run db:migrate

# (可选) 打开 Prisma Studio
npm run db:studio
```

### 5. 启动开发服务器
```bash
# 同时启动前后端
npm run dev

# 或分别启动
npm run dev:frontend  # 前端: http://localhost:3000
npm run dev:backend   # 后端: http://localhost:3001
```

## 🌐 国际化支持

系统支持三种语言：
- **English (EN)** - 默认语言
- **中文简体 (ZH)** - 中文支持
- **Español (ES)** - 西班牙语支持

## 📱 核心功能

### 预约系统
- 20%预付定金，服务完成后收取尾款
- 服务项目和员工选择
- 美国4大时区支持
- 智能时间调度

### 签到系统
- 一次性二维码签到
- SMS验证码验证
- 员工代为签到
- 状态实时追踪

### 支付系统
- 支持 Visa、Mastercard、Amex
- Apple Pay、Google Pay
- Klarna、Affirm分期付款
- 小费功能
- 自动税务计算

### 报表分析
- 预约转化率分析
- 收入分析（预付+尾款+小费）
- 客户留存分析
- 员工绩效报告

## 🔐 安全和合规

- **CCPA/CPRA** - 加州隐私法合规
- **ADA** - WCAG 2.1 AA级无障碍访问
- **PCI DSS** - 支付数据安全标准
- **数据本土化** - 数据存储美国境内

## 🚀 部署

### 前端部署 (Vercel)
```bash
npm run build:frontend
# 通过 Vercel CLI 或 GitHub 集成部署
```

### 后端部署 (Railway/Render)
```bash
npm run build:backend
# 设置环境变量并部署
```

### Docker 部署
```bash
docker-compose up -d
```

## 🧪 测试

```bash
# 运行所有测试
npm test

# 分别运行测试
npm run test:frontend
npm run test:backend
```

## 📝 开发规范

### Git 提交规范
使用 Conventional Commits:
```bash
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式化
refactor: 重构
test: 测试
chore: 构建工具或辅助工具的变动
```

### 代码规范
- 使用 ESLint + Prettier 进行代码格式化
- 通过 Husky 进行 Git hooks 检查
- TypeScript 严格模式

## 📞 联系方式

- **开发团队**: Open Media Inc
- **技术支持**: support@bookmee.com
- **项目文档**: [查看文档](./docs)

## 📄 许可证

此项目为商业项目，版权归 Open Media Inc 所有。