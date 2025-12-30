# 游戏服务管理控制台

这是一个基于 React + TypeScript + Vite 的管理控制台前端应用，用于管理游戏服务的后端服务、网关服务和 Agent 服务的配置，以及用户和系统配置。

## 功能特性

- **服务配置管理**
  - 后端服务配置（YAML）
  - 网关服务配置（TOML）
  - Agent 服务配置（YAML）
  - 配置验证和保存
  - 配置重新加载

- **用户管理**
  - 用户列表（分页、搜索、筛选）
  - 用户详情查看和编辑
  - 用户状态管理（启用/禁用）

- **系统配置管理**
  - 基础配置（时区、语言、主题等）
  - 安全配置（密码策略、IP 白名单、JWT 设置等）
  - 通知配置（邮件、短信、推送）

## 技术栈

- React 18
- TypeScript
- Vite
- Ant Design 5
- React Router v6
- Zustand
- Axios
- Monaco Editor

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 配置

### 环境变量

创建 `.env` 文件：

```env
VITE_API_BASE_URL=/api/v1
```

### API 配置

API 基础 URL 可以通过环境变量 `VITE_API_BASE_URL` 配置，默认为 `/api/v1`。

## 项目结构

```
admin/
├── src/
│   ├── components/      # 组件
│   │   ├── Layout/      # 布局组件
│   │   └── ConfigEditor/ # 配置编辑器
│   ├── config/          # 配置文件
│   ├── hooks/           # 自定义 Hooks
│   ├── pages/           # 页面
│   │   ├── Config/      # 配置管理页面
│   │   ├── User/        # 用户管理页面
│   │   └── System/      # 系统配置页面
│   ├── services/        # API 服务
│   ├── store/           # 状态管理
│   ├── types/           # TypeScript 类型定义
│   └── utils/           # 工具函数
├── public/              # 静态资源
└── package.json
```

## 使用说明

### 登录

使用管理员账号登录系统。登录接口使用 `/api/v1/admin/auth/login`。

### 服务配置管理

1. 导航到"服务配置"菜单
2. 选择要管理的服务（后端服务、网关服务或 Agent 服务）
3. 编辑配置文件内容
4. 点击"验证配置"检查配置格式
5. 点击"保存配置"保存更改
6. 点击"重新加载"重新加载配置（如果服务支持）

### 用户管理

1. 导航到"用户管理"菜单
2. 查看用户列表，支持搜索和筛选
3. 点击"查看详情"查看和编辑用户信息
4. 在列表中直接修改用户状态

### 系统配置管理

1. 导航到"系统配置"菜单
2. 选择配置分类（基础配置、安全配置或通知配置）
3. 修改配置项
4. 点击"保存"保存更改

## 注意事项

1. 配置文件的路径需要在后端服务中正确配置（通过 `PROJECT_ROOT` 环境变量）
2. 配置更新后，某些服务可能需要重启才能生效
3. 敏感信息（如密码、密钥）在保存时会自动备份
4. 管理接口需要管理员权限，请确保用户具有相应权限

## 后端 API

管理控制台需要后端提供以下 API 接口：

- `POST /api/v1/admin/auth/login` - 管理登录
- `GET /api/v1/admin/config/:service` - 获取服务配置
- `PUT /api/v1/admin/config/:service` - 更新服务配置
- `POST /api/v1/admin/config/:service/validate` - 验证配置
- `POST /api/v1/admin/config/:service/reload` - 重新加载配置
- `GET /api/v1/admin/users` - 获取用户列表
- `GET /api/v1/admin/users/:id` - 获取用户详情
- `PUT /api/v1/admin/users/:id` - 更新用户信息
- `PUT /api/v1/admin/users/:id/status` - 更新用户状态
- `GET /api/v1/admin/system/config` - 获取系统配置
- `PUT /api/v1/admin/system/config` - 更新系统配置
- `GET /api/v1/admin/system/config/:category` - 获取分类配置
- `PUT /api/v1/admin/system/config/:category` - 更新分类配置

## License

MIT

