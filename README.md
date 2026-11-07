# sam's accurium 在线商城

项目仓库：<https://github.com/rick-peng-li/onlineShop-web>

一个基于 MERN 技术栈的单店在线商城系统，覆盖从商品浏览、购物车、收货地址、支付、订单管理到后台商品/用户/订单管理的完整流程。前台界面与业务文案保持英文，代码注释与接口返回保持项目原有风格。

## 项目简介

- 前台：商品轮播与列表、关键词搜索、分页、商品详情与评价、购物车、登录注册、个人资料与订单历史、收货地址、支付方式选择、下单、订单详情与在线支付、联系表单。
- 后台：管理员登录后可查看用户列表、编辑用户与管理员权限、查看/创建/编辑/删除商品、查看全部订单、标记订单已发货。
- 鉴权：JWT Bearer Token，密码使用 bcryptjs 加密存储。
- 图片：商品图片支持外链地址，也支持通过 Multer 上传到 `uploads/` 目录并由后端静态托管。

## 技术架构

| 层次 | 技术 |
| --- | --- |
| 前端框架 | React 17、React Router 5、React Bootstrap、Bootstrap 4 |
| 状态管理 | Redux、redux-thunk、redux-devtools-extension |
| 前端请求 | axios（开发环境通过 CRA proxy 转发到后端） |
| 后端框架 | Node.js、Express 4（ES Module） |
| 数据库 | MongoDB、Mongoose 5 |
| 认证 | jsonwebtoken、bcryptjs |
| 文件上传 | multer |
| 开发工具 | nodemon、concurrently、morgan |
| 构建 | Create React App（react-scripts 4） |

开发环境下前端运行在 `3000` 端口，后端运行在 `5001` 端口，前端通过 `frontend/package.json` 中的 `proxy` 将 `/api` 请求转发到后端。生产环境下先构建前端，由 Express 托管 `frontend/build` 静态资源并接管前端路由。

## 目录结构

```text
onlineShop-web
├── backend
│   ├── Config/db.js                 # MongoDB 连接
│   ├── MiddleWare                  # 鉴权与错误处理中间件
│   ├── Models                      # 用户、商品、订单、联系消息模型
│   ├── controllers                 # 各业务控制器
│   ├── Routes                      # REST 路由
│   ├── data                        # 种子数据（用户、商品）
│   ├── utils/generateToken.js      # JWT 签发
│   ├── Seeder.js                   # 数据导入/清除
│   └── server.js                   # 服务入口
├── frontend
│   ├── public                      # 静态资源与页面模板
│   └── src
│       ├── actions                 # Redux 异步动作
│       ├── components              # 通用组件
│       ├── constants               # Redux 常量
│       ├── image                   # 页面图片素材
│       ├── reducers                # Redux reducer
│       ├── screens                 # 页面
│       ├── App.js                  # 路由配置
│       └── Store.js                # Redux store
├── uploads                         # 商品图片上传目录
├── .env                            # 环境变量（本地创建，不提交）
├── .gitignore
└── package.json
```

## 页面与路由

### 商城页面

| 路由 | 页面 | 功能 |
| --- | --- | --- |
| `/` | HomeScreen | 轮播图、商品列表、分页、搜索入口 |
| `/search/:keyword` | HomeScreen | 按关键词搜索商品 |
| `/page/:pageNumber` | HomeScreen | 商品列表分页 |
| `/product/:id` | ProductScreen | 商品详情、库存、数量选择、加入购物车、查看与提交评价 |
| `/cart/:id?` | CartScreen | 购物车列表、修改数量、删除商品、结算入口 |
| `/login` | LoginScreen | 用户/管理员登录，支持登录后跳转 |
| `/register` | RegisterScreen | 用户注册 |
| `/profile` | ProfileScreen | 修改个人资料、查看我的订单 |
| `/shipping` | ShippingScreen | 填写收货地址 |
| `/payment` | PaymentScreen | 选择支付方式（PayPal） |
| `/placeorder` | PlaceOrderScreen | 确认订单商品、地址、金额并下单 |
| `/order/:id` | OrderScreen | 订单详情、支付状态、PayPal 支付、管理员标记发货 |
| `/contact` | ContactScreen | 提交联系表单，消息写入数据库 |

### 后台页面

| 路由 | 页面 | 功能 |
| --- | --- | --- |
| `/admin/userlist` | UserListScreen | 用户列表、删除用户、进入编辑 |
| `/admin/user/:id/edit` | UserEditScreen | 编辑用户资料与管理员权限 |
| `/admin/productlist` | ProductListScreen | 商品列表、新建商品、删除商品 |
| `/admin/productlist/:pageNumber` | ProductListScreen | 商品列表分页 |
| `/admin/product/:id/edit` | ProductEditScreen | 编辑商品信息、上传商品图片 |
| `/admin/orderlist` | OrderListScreen | 全部订单列表与详情入口 |

## 接口设计

统一前缀为 `/api`。除公开接口外，需在请求头携带 `Authorization: Bearer <token>`；标注 Admin 的接口要求 `isAdmin` 为 `true`。

### 商品

| 方法 | 路径 | 权限 | 说明 |
| --- | --- | --- | --- |
| GET | `/api/products` | 公开 | 商品列表，支持 `keyword`、`pageNumber`，每页 10 条 |
| GET | `/api/products/top` | 公开 | 评分最高的 3 个商品 |
| GET | `/api/products/:id` | 公开 | 商品详情 |
| POST | `/api/products` | Admin | 创建一个示例商品 |
| PUT | `/api/products/:id` | Admin | 更新商品 |
| DELETE | `/api/products/:id` | Admin | 删除商品 |
| POST | `/api/products/:id/reviews` | 登录 | 提交商品评价，每个用户只能评价一次 |

### 用户

| 方法 | 路径 | 权限 | 说明 |
| --- | --- | --- | --- |
| POST | `/api/users` | 公开 | 注册 |
| POST | `/api/users/login` | 公开 | 登录并返回 JWT |
| GET | `/api/users/profile` | 登录 | 获取个人资料 |
| PUT | `/api/users/profile` | 登录 | 更新个人资料或密码 |
| GET | `/api/users` | Admin | 全部用户 |
| GET | `/api/users/:id` | Admin | 指定用户 |
| PUT | `/api/users/:id` | Admin | 更新用户与管理员权限 |
| DELETE | `/api/users/:id` | Admin | 删除用户 |

### 订单

| 方法 | 路径 | 权限 | 说明 |
| --- | --- | --- | --- |
| POST | `/api/orders` | 登录 | 创建订单 |
| GET | `/api/orders/myorders` | 登录 | 我的订单 |
| GET | `/api/orders/:id` | 登录 | 订单详情 |
| PUT | `/api/orders/:id/pay` | 登录 | 标记订单已支付并写入支付结果 |
| GET | `/api/orders` | Admin | 全部订单 |
| PUT | `/api/orders/:id/deliver` | Admin | 标记订单已发货 |

### 上传、支付配置与联系表单

| 方法 | 路径 | 权限 | 说明 |
| --- | --- | --- | --- |
| POST | `/api/upload` | 公开 | 上传商品图片（`multipart/form-data`，字段名 `image`） |
| GET | `/api/config/paypal` | 公开 | 返回 PayPal Client ID |
| POST | `/api/contacts` | 公开 | 提交联系表单消息 |
| GET | `/api/contacts` | Admin | 查看联系消息列表 |

## 数据模型

- User：`name`、`email`（唯一）、`password`（bcrypt 加密）、`isAdmin`。
- Product：`name`、`image`、`brand`、`category`、`description`、`price`、`countInStock`、`reviews`、`rating`、`numReviews`，并关联创建者 `user`。
- Order：`user`、`orderItems`、`shippingAddress`、`paymentMethod`、`itemsPrice`、`taxPrice`、`shippingPrice`、`totalPrice`、`isPaid`、`paidAt`、`isDelivered`、`deliveredAt`、`paymentResult`。
- Contact：`name`、`email`、`message`，用于保存联系表单消息。

## 本地启动

### 1. 环境要求

- Node.js 18 及以上（推荐 20）
- npm 9 及以上
- MongoDB 6/7，或使用 Docker 启动 MongoDB

启动 MongoDB（本地已有 MongoDB 可跳过）：

```bash
docker run -d --name onlineShop-mongo -p 27017:27017 mongo:7.0
```

### 2. 安装依赖

在项目根目录安装后端依赖：

```bash
npm install
```

安装前端依赖（React 17 与部分依赖存在 peer 版本差异，需使用 legacy 模式）：

```bash
cd frontend
npm install --legacy-peer-deps
cd ..
```

### 3. 配置环境变量

在项目根目录创建 `.env`：

```bash
NODE_ENV=development
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/onlineShop
JWT_SECRET=onlineShop_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
```

说明：macOS 的 AirPlay Receiver 默认占用 `5000` 端口，因此本项目后端使用 `5001`，前端 `proxy` 已指向 `http://127.0.0.1:5001`。如使用其他端口，需同时修改 `.env` 的 `PORT` 与 `frontend/package.json` 的 `proxy`。

不配置 `PAYPAL_CLIENT_ID` 时，订单详情页不会加载 PayPal 支付按钮，其余功能不受影响。

### 4. 初始化数据

```bash
npm run data:import
```

清除全部业务数据：

```bash
npm run data:destroy
```

### 5. 启动开发环境

```bash
npm run dev
```

该命令会同时启动：

- 后端：<http://127.0.0.1:5001>
- 前端：<http://127.0.0.1:3000>

也可分别启动：

```bash
npm run server   # 仅后端，nodemon 监听改动
npm run client   # 仅前端
```

### 6. 生产模式

```bash
cd frontend
npm run build
cd ..
NODE_ENV=production npm start
```

后端会自动托管 `frontend/build`，访问 <http://127.0.0.1:5001> 即可。

## 测试账号

| 角色 | 邮箱 | 密码 |
| --- | --- | --- |
| 管理员 | admin@example.com | 123456 |
| 普通用户 | john@example.com | 123456 |
| 普通用户 | jane@example.com | 123456 |

管理员登录后，导航栏会出现 `Admin` 下拉菜单，可进入用户、商品和订单管理页面。

## 使用说明

- 未登录用户可以浏览商品、搜索、查看详情和加入购物车；结算下单需要登录。
- 商品评价需要登录，且同一用户对同一商品只能评价一次。
- 运费规则：商品总额超过 100 美元免运费，否则运费 100 美元；税费按商品总额的 15% 计算。
- 后台新建商品会先生成一条示例数据，再进入编辑页补全信息；图片可以通过文件上传或直接填写图片地址。
- 上传的图片保存在 `uploads/`，生产部署时请保证该目录可写并持久化。
