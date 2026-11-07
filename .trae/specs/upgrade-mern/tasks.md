# onlineShop-web 全栈升级改造 - 实施计划

## Task 1: 后端目录重构与依赖升级
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - 将 `backend/` 重命名为 `server/`，目录全部小写：`config/`、`controllers/`、`middleware/`、`models/`、`routes/`、`utils/`、`data/`。
  - 升级 package.json：express 5、mongoose 8、jsonwebtoken、bcryptjs、multer、express-async-handler、morgan、dotenv、nodemon、concurrently。
  - 修正所有 import 路径为新目录结构，server.js 挂载各路由，增加错误中间件与 404。
  - 保留商品、用户、订单、上传、联系、PayPal 配置接口。
- **Acceptance Criteria Addressed**: AC-4, AC-5, AC-11
- **Test Requirements**:
  - `rule` TR-1.1: `find server -maxdepth 1 -type d` 含 config/controllers/middleware/models/routes/utils/data，全小写。
  - `rule` TR-1.2: `npm start` 后 `curl http://127.0.0.1:5001/api/products` 返回 200。
- **Notes**: Express 5 移除了某些弃用 API，需测试中间件兼容性。

## Task 2: 前端 Vite 脚手架与目录搭建
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - 将 `frontend/` 重命名为 `client/`。
  - 用 Vite 5 + React 18 初始化，安装 antd 5、@ant-design/icons、react-router 6、axios、zustand、@reduxjs/toolkit（如需）。
  - 配置 `vite.config.js` 与 `jsconfig.json`，`@` → `src`。
  - 建立 `src/router/`、`src/pages/`、`src/components/`、`src/services/`、`src/store/`、`src/utils/`、`src/constants/`、`src/styles/`、`src/layouts/`。
  - 建立 axios 实例与 token 注入。
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3
- **Test Requirements**:
  - `rule` TR-2.1: `find client/src -maxdepth 1 -type d` 含 router/pages/components/services/store/utils/constants/styles/layouts。
  - `rule` TR-2.2: vite.config 与 jsconfig 配置 `@`。
  - `rule` TR-2.3: `npm run build` 成功。
- **Notes**: 用 antd 5 + React 18；保留原有图片资源。

## Task 3: 前端状态管理与服务层
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 2
- **Description**:
  - 使用 Zustand 建立 `authStore`（登录/注册/登出/个人资料）、`cartStore`（购物车增删改、本地持久化）。
  - `services/` 下按模块提取 api 方法：`productService.js`、`userService.js`、`orderService.js`、`uploadService.js`、`contactService.js`、`configService.js`。
  - `utils/` 提供 `request.js`（axios 实例、拦截器）、`format.js`（金额/日期）。
  - `constants/` 存放常量。
- **Acceptance Criteria Addressed**: AC-3, AC-6
- **Test Requirements**:
  - `rule` TR-3.1: `services/` 下各模块文件存在且导出对应方法。
  - `rule` TR-3.2: 业务源码无跨目录 `../` import，均用 `@/`。

## Task 4: 前端布局与通用组件
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3
- **Description**:
  - 使用 antd 5 的 Layout 搭建前台 `MainLayout`（Header + Content + Footer）。
  - 重写 Header（logo、搜索框、导航、登录状态、Admin 下拉），使用 antd Menu/Dropdown/Input/Search。
  - 重写 Footer、Rating、Loader、Message、Paginate、ProductCard、ProductCarousel 组件为 antd 风格。
  - `styles/` 全局样式统一。
- **Acceptance Criteria Addressed**: AC-2, AC-10
- **Test Requirements**:
  - `rule` TR-4.1: 首页渲染 antd 风格 Header/Footer/产品卡片。
  - `rubric` TR-4.2: UI 一致性；scale 1-5；anchors 1/3/5；threshold >=4；evidence 截图。

## Task 5: 前台页面迁移
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 4
- **Description**:
  - 迁移 HomeScreen（商品列表、轮播、搜索、分页）、ProductScreen（详情、评价、加购）、CartScreen、LoginScreen、RegisterScreen、ProfileScreen、ShippingScreen、PaymentScreen、PlaceOrderScreen、OrderScreen、ContactScreen。
  - 全部使用 antd 组件，接入 services 与 store，使用 react-router 6 的 useNavigate/useParams/useSearchParams。
- **Acceptance Criteria Addressed**: AC-1, AC-6, AC-7, AC-9
- **Test Requirements**:
  - `rule` TR-5.1: 每个页面路由可访问且无白屏。
  - `rule` TR-5.2: 登录后可完整走通加购→下单链路。
  - `rule` TR-5.3: 联系表单提交成功。

## Task 6: 后台页面迁移
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 4
- **Description**:
  - 迁移 UserListScreen、UserEditScreen、ProductListScreen、ProductEditScreen（含图片上传）、OrderListScreen。
  - 使用 antd Table、Form、Upload、Button 等。
- **Acceptance Criteria Addressed**: AC-8
- **Test Requirements**:
  - `rule` TR-6.1: 管理员可查看用户/商品/订单列表。
  - `rule` TR-6.2: 商品编辑与删除操作可用。

## Task 7: 路由聚合与入口
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 5, Task 6
- **Description**:
  - `router/index.js` 定义全部路由（含受保护路由 AdminRoute/ProtectedRoute）。
  - `main.jsx` 挂载 BrowserRouter、ConfigProvider（antd 主题）、全局样式。
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `rule` TR-7.1: 所有页面路由正确，刷新不 404。

## Task 8: 清理无用文件并更新 README
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 1-7
- **Description**:
  - 删除旧 `frontend/`、`backend/`、残留 `screens/`、无用图片、`.DS_Store`、旧 package-lock。
  - 重写 README.md（中文）：Git 地址、技术架构、目录结构、页面/接口、启动方式、测试账号。
  - 更新根 `.gitignore`。
- **Acceptance Criteria Addressed**: AC-11, AC-12
- **Test Requirements**:
  - `rule` TR-8.1: 根目录仅剩 `client/`、`server/`、`uploads/`、README、.gitignore、.env。
  - `rule` TR-8.2: README 含 Git 地址与测试账号。

## Task 9: 端到端验证
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1-8
- **Description**:
  - 启动后端（5001）与前端（5173），初始化种子数据。
  - 浏览器验证：登录、加购、下单、后台管理、联系表单。
  - 修复验证中发现的问题。
- **Acceptance Criteria Addressed**: AC-5, AC-6, AC-7, AC-8, AC-9
- **Test Requirements**:
  - `rule` TR-9.1: 核心链路全部通过。
