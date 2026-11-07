# onlineShop-web 全栈升级改造 - 产品需求文档

## Overview
- **Summary**: 对现有 onlineShop-web 项目进行前后端分离升级改造，升级到最新技术栈与写法，重构前端（Vite）与后端目录结构，保持商城全部业务功能完整可用。
- **Purpose**: 项目依赖版本陈旧（CRA react-scripts 4 / React 17 / Express 4 / mongoose 5），目录结构不规范，需要统一升级以便维护。
- **Target Users**: 商城普通用户与后台管理员。

## Goals
- 前端迁移到 Vite + React 18 + 最新 Ant Design 组件库，统一 UI 美观。
- 前端目录重构：`src/router/`、`src/pages/`、`src/components/`、`src/services/`、`src/store/`、`src/utils/`、`src/constants/`、`src/styles/`，统一使用 `@/` 别名。
- 后端目录重构：`config/`、`controllers/`、`middleware/`、`models/`、`routes/`、`utils/`、`data/`，升级 Express、Mongoose 等核心依赖。
- 前后端分目录存放（`client/`、`server/`）。
- 保持全部功能：商品浏览/搜索/详情/评价、购物车、登录注册、个人资料与订单、收货地址、支付方式、下单、订单支付与发货、联系表单、后台用户/商品/订单管理、图片上传、PayPal 客户端配置。
- 更新 README（中文，含项目介绍、技术架构、模块/页面/接口、启动方式、测试账号、新 Git 地址）。
- 删除无用文件与目录。

## Non-Goals
- 不改变业务规则（运费、税率、评价逻辑、权限模型）。
- 不引入真实支付网关密钥配置，仅保留 PayPal Client ID 透传接口。
- 不做国际化，界面文案保持英文。

## Background & Context
- 当前目录：`frontend/`（CRA）+ `backend/`（Express 4 + mongoose 5）。
- 后端接口已覆盖商品、用户、订单、上传、联系、PayPal 配置，数据库为 MongoDB（本地 Docker 容器 `healthnest-mongo`，端口 27017）。
- 用户偏好：前端放 `client`、后端放 `server`，页面放 `page`，路由独立，组件拆分，方法提取，`@/` 前缀，Ant Design。

## Functional Requirements
- **FR-1**: 普通用户可浏览商品列表（支持关键词搜索、分页、轮播）、查看详情、评价、加入购物车。
- **FR-2**: 用户可注册、登录、修改个人资料、查看我的订单。
- **FR-3**: 用户可填写收货地址、选择支付方式、确认下单、在订单详情完成支付。
- **FR-4**: 管理员可查看/编辑/删除用户，查看/创建/编辑/删除商品（含图片上传），查看全部订单并标记发货。
- **FR-5**: 联系表单提交后写入数据库。
- **FR-6**: 前后端接口全部联通，鉴权（JWT）正常。
- **FR-7**: 前端使用 Ant Design 组件，布局美观、响应式。
- **FR-8**: README 中文，含 Git 地址 `https://github.com/rick-peng-li/onlineShop-web`。

## Non-Functional Requirements
- **NFR-1**: `npm run build`（前端）与后端启动均无报错。
- **NFR-2**: 前端所有源码 import 使用 `@/` 别名。
- **NFR-3**: 目录结构符合现代前后端规范。
- **NFR-4**: 核心链路（登录→购物车→下单→订单详情）端到端可用。

## Constraints
- **Technical**: Node.js 20，MongoDB 7（Docker），Vite 5，React 18，antd 5，react-router 6，axios，Zustand（状态管理），Express 5，Mongoose 8。
- **Business**: 业务功能不可缺失。
- **Dependencies**: 本地 Docker 已运行 MongoDB，5000 端口被 AirPlay 占用，后端使用 5001。

## Assumptions
- 数据库连接串 `mongodb://127.0.0.1:27017/onlineShop` 可用。
- 保留种子用户：admin@example.com / 123456（管理员）、john@example.com / 123456、jane@example.com / 123456。

## Acceptance Criteria

### AC-1: 前端 Vite 与最新技术栈
- **Type**: `rule`
- **Given**: 进入 `client/` 目录
- **When**: 执行 `npm run build`
- **Then**: 构建成功，无报错
- **Pass Condition**: 退出码 0 且生成 `dist/`
- **Evidence**: 构建命令输出

### AC-2: 前端目录规范
- **Type**: `rule`
- **Given**: `client/src/`
- **When**: 查看目录
- **Then**: 存在 `router/`、`pages/`、`components/`、`services/`、`store/`、`utils/`、`constants/`、`styles/`，无 `screens/`
- **Pass Condition**: 目录存在
- **Evidence**: `find client/src -maxdepth 1 -type d`

### AC-3: `@/` 别名
- **Type**: `rule`
- **Given**: 前端源码
- **When**: 搜索 import 路径
- **Then**: 业务代码 import 使用 `@/` 前缀，vite.config 与 jsconfig 配置 `@` → `src`
- **Pass Condition**: 无相对路径 `../` 跨目录引用（同一目录内相对引用除外）
- **Evidence**: grep 结果与配置文件

### AC-4: 后端目录规范
- **Type**: `rule`
- **Given**: `server/`
- **When**: 查看目录
- **Then**: 存在 `config/`、`controllers/`、`middleware/`、`models/`、`routes/`、`utils/`、`data/`
- **Pass Condition**: 目录存在且全部小写
- **Evidence**: `find server -maxdepth 1 -type d`

### AC-5: 后端升级可启动
- **Type**: `rule`
- **Given**: `server/`
- **When**: 执行 `npm start`
- **Then**: 服务在 5001 端口监听，`GET /api/products` 返回商品列表
- **Pass Condition**: HTTP 200 且包含 products 数组
- **Evidence**: curl 输出

### AC-6: 登录鉴权链路
- **Type**: `rule`
- **Given**: 前端运行
- **When**: 使用 admin@example.com / 123456 登录
- **Then**: 登录成功，显示 Admin 菜单，受保护页面可访问
- **Pass Condition**: 页面出现 Admin 下拉且无 401
- **Evidence**: 浏览器操作

### AC-7: 购物车下单链路
- **Type**: `rule`
- **Given**: 已登录
- **When**: 加入商品→收货地址→支付方式→下单
- **Then**: 订单创建成功并跳转订单详情页
- **Pass Condition**: 订单详情页显示订单号
- **Evidence**: 浏览器操作

### AC-8: 后台管理链路
- **Type**: `rule`
- **Given**: 管理员登录
- **When**: 进入商品列表、用户列表、订单列表
- **Then**: 均可正常加载，商品可编辑/删除
- **Pass Condition**: 三个页面均渲染数据无报错
- **Evidence**: 浏览器操作

### AC-9: 联系表单
- **Type**: `rule`
- **Given**: 联系页面
- **When**: 提交表单
- **Then**: 返回成功提示，数据库新增联系记录
- **Pass Condition**: 页面提示成功
- **Evidence**: 浏览器操作

### AC-10: UI 美观
- **Type**: `rubric`
- **Dimension**: 页面整体视觉与 Ant Design 一致性
- **Scale**: 1-5
- **Anchors**: 1 = 原生 HTML 堆砌、严重错位；3 = 基础 antd 组件可用但排版粗糙；5 = 统一 antd 设计语言、布局整洁、响应式良好
- **Pass Threshold**: >= 4
- **Evidence**: 首页、商品详情、后台列表截图

### AC-11: README 完整
- **Type**: `rule`
- **Given**: README.md
- **When**: 阅读
- **Then**: 中文，含 Git 地址、技术架构、目录结构、页面/接口、启动方式、测试账号，无迭代更新文案
- **Pass Condition**: 关键章节齐全
- **Evidence**: README 内容

### AC-12: 无用文件已清理
- **Type**: `rule`
- **Given**: 项目根
- **When**: 查看
- **Then**: 无旧 `frontend/`、`backend/`、`screens/`、无用图片、`.DS_Store` 等冗余
- **Pass Condition**: 旧目录不存在
- **Evidence**: `ls`

## Open Questions
- 无
