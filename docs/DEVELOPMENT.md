# BookMee 开发指南

## 开发环境设置

### 前置要求

- Node.js >= 18.17.0
- PostgreSQL >= 14
- Redis >= 6 (可选)
- Git

### 快速开始

1. **克隆项目**
```bash
git clone <repository-url>
cd bookmee
```

2. **安装依赖**
```bash
npm install
```

3. **环境配置**
```bash
cp .env.example .env
# 编辑 .env 文件，填入必要的环境变量
```

4. **数据库设置**
```bash
# 生成 Prisma 客户端
npm run db:generate

# 运行数据库迁移
npm run db:migrate

# 数据种子（可选）
npm run db:seed
```

5. **启动开发服务器**
```bash
# 同时启动前后端
npm run dev

# 或分别启动
npm run dev:frontend  # 前端: http://localhost:3000
npm run dev:backend   # 后端: http://localhost:3001
```

## 项目结构

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

## 开发规范

### Git 提交规范

使用 Conventional Commits 格式：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

类型说明：
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式化
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试
- `chore`: 构建工具或辅助工具变动

示例：
```bash
git commit -m "feat(auth): add user registration endpoint"
git commit -m "fix(booking): resolve timezone calculation issue"
git commit -m "docs: update API documentation"
```

### 代码规范

- 使用 TypeScript 严格模式
- 使用 ESLint + Prettier 进行代码格式化
- 组件使用 PascalCase 命名
- 函数使用 camelCase 命名
- 常量使用 UPPER_SNAKE_CASE 命名

### 目录规范

- 组件文件使用 PascalCase：`UserProfile.tsx`
- 工具函数使用 camelCase：`dateUtils.ts`
- 页面文件使用 kebab-case：`user-profile.tsx`

## API 开发

### 路由结构

```
/api
├── /auth          # 认证相关
├── /users         # 用户管理
├── /businesses    # 商家管理
├── /services      # 服务管理
├── /bookings      # 预约管理
├── /payments      # 支付管理
└── /checkin       # 签到管理
```

### 响应格式

成功响应：
```json
{
  "success": true,
  "message": "操作成功",
  "data": {
    // 响应数据
  }
}
```

错误响应：
```json
{
  "success": false,
  "error": {
    "message": "错误信息",
    "code": "ERROR_CODE",
    "statusCode": 400
  }
}
```

### 分页格式

```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

## 数据库

### Prisma 操作

```bash
# 生成客户端
npx prisma generate

# 创建迁移
npx prisma migrate dev --name migration_name

# 重置数据库
npx prisma migrate reset

# 查看数据库
npx prisma studio
```

### 数据种子

运行数据种子脚本：
```bash
npm run db:seed
```

## 测试

### 运行测试

```bash
# 所有测试
npm test

# 监听模式
npm run test:watch

# 测试覆盖率
npm run test:coverage
```

### 测试结构

```
tests/
├── unit/           # 单元测试
├── integration/    # 集成测试
└── e2e/           # 端到端测试
```

## 部署

### 本地Docker部署

```bash
# 构建并启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### Vercel 部署

1. 连接GitHub仓库到Vercel
2. 设置环境变量
3. 部署前端应用

### 环境变量

必需的环境变量：
- `DATABASE_URL`: PostgreSQL连接字符串
- `JWT_SECRET`: JWT密钥
- `STRIPE_SECRET_KEY`: Stripe密钥
- `TWILIO_ACCOUNT_SID`: Twilio账户SID
- `TWILIO_AUTH_TOKEN`: Twilio认证令牌

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查PostgreSQL是否运行
   - 验证DATABASE_URL配置

2. **Prisma客户端错误**
   - 运行 `npx prisma generate`
   - 检查schema.prisma文件

3. **端口占用**
   - 前端默认端口：3000
   - 后端默认端口：3001
   - 使用 `lsof -i :端口号` 查看占用情况

4. **依赖安装失败**
   - 清除node_modules：`rm -rf node_modules package-lock.json`
   - 重新安装：`npm install`

## 性能优化

### 前端优化

- 使用Next.js Image组件
- 实施代码分割
- 启用Gzip压缩
- 优化Bundle大小

### 后端优化

- 数据库查询优化
- 启用Redis缓存
- API响应压缩
- 连接池配置

## 安全考虑

- 输入验证和清理
- SQL注入防护
- XSS攻击防护
- CSRF保护
- 速率限制
- 身份认证和授权

## 监控和日志

### 日志级别

- `error`: 错误信息
- `warn`: 警告信息
- `info`: 一般信息
- `debug`: 调试信息

### 监控工具

- 错误追踪：Sentry
- 性能监控：DataDog
- 应用监控：New Relic

## 联系方式

- 技术团队：tech@bookmee.com
- 项目维护：Open Media Inc
- 文档更新：请提交PR到docs目录