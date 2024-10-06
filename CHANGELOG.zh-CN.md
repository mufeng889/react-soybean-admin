# Changelog

## [v1.0.0](https://github.com/mufeng889/react-soybean-admin/compare/v0.3.2...v1.0.0) (2024-10-06)

### 🚀 功能特性

- **packages**：
  - @sa/hooks 添加 `useRequest` &nbsp;-&nbsp; 作者 **wang** [<samp>(e5cdc)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/e5cdcc9)
  - hooks：添加 `use-array` & 示例 &nbsp;-&nbsp; 作者 **wang** [<samp>(02483)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/02483b5)
- **projects**：
  - 添加菜单功能 &nbsp;-&nbsp; 作者 **wang** [<samp>(0b14d)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/0b14deb)
  - 支持添加路由时动态添加父级 &nbsp;-&nbsp; 作者 **wang** [<samp>(084bf)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/084bf89)
  - 支持动态添加路由并优化代码 &nbsp;-&nbsp; 作者 **DESKTOP-31IBRMI\Administrator** [<samp>(6f3ad)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/6f3adca)
  - 添加前置守卫 &nbsp;-&nbsp; 作者 **DESKTOP-31IBRMI\Administrator** [<samp>(13b0c)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/13b0cab)
  - @sa/axios：成功时将响应添加到 `flatRequest` &nbsp;-&nbsp; 作者 **DESKTOP-31IBRMI\Administrator** [<samp>(92e3c)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/92e3cec)
  - 配置是否支持自动更新 &nbsp;-&nbsp; 作者 **DESKTOP-31IBRMI\Administrator** [<samp>(fb758)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/fb7583a)
  - 为数据路由详情页添加加载器展示 &nbsp;-&nbsp; 作者 **wang** [<samp>(7928b)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/7928bd6)
  - 添加主题配置复制功能 &nbsp;-&nbsp; 作者 **wang** [<samp>(e3d7a)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/e3d7a99)
  - 添加动画效果 &nbsp;-&nbsp; 作者 **wang** [<samp>(ea5d7)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/ea5d7c6)
  - 添加 `useMeta` &nbsp;-&nbsp; 作者 **wang** [<samp>(d0c6a)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/d0c6a37)
  - 添加 `keep-alive` 功能 &nbsp;-&nbsp; 作者 **wang** [<samp>(ed7e7)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/ed7e793)
  - 登录支持无障碍操作 &nbsp;-&nbsp; 作者 **wang** [<samp>(d2dae)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/d2dae2d)

### 🐞 Bug 修复

- **packages**：
  - 修复移动端 `eix` 选项卡无法点击 &nbsp;-&nbsp; 作者 **wang** [<samp>(e0141)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/e01410a)
  - 支持传递状态并修复跳转前的判断问题 &nbsp;-&nbsp; 作者 **wang** [<samp>(34935)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/3493583)
  - 修复 `useRouter` 类型 &nbsp;-&nbsp; 作者 **DESKTOP-31IBRMI\Administrator** [<samp>(32628)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/32628df)
  - 快速新增某些情况下不返回结果，导致未初始化问题。修复 #8 &nbsp;-&nbsp; 作者 **DESKTOP-31IBRMI\Administrator** 在 https://github.com/mufeng889/react-soybean-admin/issues/8 [<samp>(cfe46)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/cfe46ea)
- **projects**：
  - 修复顶部菜单异常 &nbsp;-&nbsp; 作者 **wang** [<samp>(5e1f7)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/5e1f789)
  - 修复动态切换大小菜单显示异常 &nbsp;-&nbsp; 作者 **wang** [<samp>(79c1a)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/79c1ae1)
  - 修复 `eslint` 错误 &nbsp;-&nbsp; 作者 **DESKTOP-31IBRMI\Administrator** [<samp>(fec80)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/fec80a1)
  - 修复点击标签页左侧菜单 `openKeys` 不变的问题 &nbsp;-&nbsp; 作者 **DESKTOP-31IBRMI\Administrator** [<samp>(f3f57)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/f3f570b)
  - 修复路由类型并移除 `startTransition` &nbsp;-&nbsp; 作者 **wang** [<samp>(fac36)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/fac368b)
  - 修复切换角色时的重定向及初始化标签页无缓存问题 &nbsp;-&nbsp; 作者 **DESKTOP-31IBRMI\Administrator** [<samp>(58d1f)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/58d1feb)
  - 修复多请求时刷新令牌的问题 &nbsp;-&nbsp; 作者 **DESKTOP-31IBRMI\Administrator** [<samp>(fbe7d)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/fbe7ddb)
  - 大屏幕下显示滚动条 &nbsp;-&nbsp; 作者 **wang** [<samp>(cb942)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/cb94245)
  - 修复菜单展开后子菜单未打开的问题 &nbsp;-&nbsp; 作者 **wang** [<samp>(c96c9)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/c96c964)
  - 修复混合模式下的缩小混乱问题 &nbsp;-&nbsp; 作者 **wang** [<samp>(0c6fb)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/0c6fba6)
  - 修复 `global-tab` 与右键菜单冲突的问题 &nbsp;-&nbsp; 作者 **DESKTOP-31IBRMI\Administrator** [<samp>(a32f5)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/a32f507)
  - 修复缩小时子菜单的打开问题 &nbsp;-&nbsp; 作者 **DESKTOP-31IBRMI\Administrator** [<samp>(77f2b)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/77f2b6a)
  - 修复在移动端和 PC 端切换时自动展开侧边栏的问题 &nbsp;-&nbsp; 作者 **wang** [<samp>(0abdd)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/0abdd0c)
  - 修复切换侧边栏语言失败问题 &nbsp;-&nbsp; 作者 **wang** [<samp>(75307)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/753079f)
  - 重现环境下可以缓存主题配置 &nbsp;-&nbsp; 作者 **wang** [<samp>(50932)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/50932b7)

### 🛠


## [v1.0.0-beta.1](https://github.com/mufeng889/react-soybean-admin/compare/v0.3.2...v1.0.0-beta.1) (2024-09-14)

### 🚀 功能

- **packages**：
  - @sa/hooks 添加 `useRequest` &nbsp;-&nbsp; 作者：**wang** [<samp>(e5cdc)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/e5cdcc9)
- **projects**：
  - 添加菜单功能 &nbsp;-&nbsp; 作者：**wang** [<samp>(0b14d)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/0b14deb)
  - 支持添加路由时添加父级 &nbsp;-&nbsp; 作者：**wang** [<samp>(084bf)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/084bf89)
  - 支持动态添加路由 & 优化代码 &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(6f3ad)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/6f3adca)
  - 添加前置守卫 &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(13b0c)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/13b0cab)
  - @sa/axios：成功时为 `flatRequest` 添加响应 &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(92e3c)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/92e3cec)
  - 配置是否支持自动更新 &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(fb758)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/fb7583a)

### 🐞 Bug 修复

- **packages**：
  - 修复移动端无法点击标签问题 &nbsp;-&nbsp; 作者：**wang** [<samp>(e0141)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/e01410a)
  - 支持传递状态并修复跳转前的判断问题 &nbsp;-&nbsp; 作者：**wang** [<samp>(34935)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/3493583)
  - 修复 `useRouter` 类型 &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(32628)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/32628df)
  - 某些快速新建场景下未返回导致初始化失败，关闭 #8 &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(cfe46)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/cfe46ea)
- **projects**：
  - 修复顶部菜单异常 &nbsp;-&nbsp; 作者：**wang** [<samp>(5e1f7)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/5e1f789)
  - 修复动态切换尺寸菜单显示异常 &nbsp;-&nbsp; 作者：**wang** [<samp>(79c1a)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/79c1ae1)
  - 修复 ESLint 错误 &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(fec80)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/fec80a1)
  - 点击标签时左侧菜单 `openKeys` 不变化 &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(f3f57)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/f3f570b)
  - 修复路由类型 & 移除 `startTransition` &nbsp;-&nbsp; 作者：**wang** [<samp>(fac36)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/fac368b)
  - 修复切换角色时的重定向 & 初始化标签不缓存 &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(58d1f)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/58d1feb)
  - 修复多请求时刷新 token 问题 &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(fbe7d)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/fbe7ddb)
  - 大屏幕时显示滚动条 &nbsp;-&nbsp; 作者：**wang** [<samp>(cb942)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/cb94245)

### 🛠 优化

- **packages**：
  - 优化代码 &nbsp;-&nbsp; 作者：**wang** [<samp>(5f78e)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/5f78e52)
- **projects**：
  - 优化代码 &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(85b64)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/85b6483)
  - 优化代码 &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(21d28)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/21d28b0)
  - 优化代码 &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(b29bc)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/b29bceb)

### 💅 重构

- **packages**：
  - 更新路由 &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(8795b)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/8795b2f)
  - @sa/hooks：为 `axios` 使用 `useRequest` &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(3dbe7)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/3dbe701)
  - @sa/simple-router：稳定的 `useRoute` &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(6cf09)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/6cf09f9)
- **projects**：
  - 添加注销路由 &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(df689)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/df689df)
  - 重构 `simple-router` &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(d7861)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/d78613c)
  - 合并主题 Token 和主题设置 &nbsp;-&nbsp; 作者：**wang** [<samp>(8d703)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/8d703d9)
  - 移除暗黑侧边栏配置 &nbsp;-&nbsp; 作者：**wang** [<samp>(f9582)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/f958280)

### 📖 文档

- **projects**：更新 CHANGELOG &nbsp;-&nbsp; 作者：**DESKTOP-31IBRMI\Administrator** [<samp>(a13a7)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/a13a70d)

### 🏡 杂项

- **依赖**：
  - 更新依赖 &nbsp;-&nbsp; 作者：**wang** [<samp>(1dad4)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/1dad


## [v0.3.2](https://github.com/mufeng889/react-soybean-admin/compare/v0.3.0...v0.3.2) (2024-09-07)

### 🚀 新功能

- **依赖**：
  - 添加 `typewriter` &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(0651b)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/0651b64)
- **包**：
  - 添加移除路由功能 & 如果跳转的路由是当前路由，则不进行跳转 &nbsp;-&nbsp; by **wang** [<samp>(a75c2)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/a75c25e)
  - 同步 `soybean` 的 `useRouterPush` &nbsp;-&nbsp; by **wang** [<samp>(04577)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/04577cd)
- **项目**：
  - 路由和布局错误边界的合并 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(7de3c)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/7de3c59)
- **项目**：
  - 修改文档地址 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(7ced8)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/7ced849)
  - 同步 `soybean` 的 `axios` 更新 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(6401f)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/6401f0b)
  - 添加常用国际化配置 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(a702d)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/a702d5c)
  - 可以在命令行创建路由信息文件 &nbsp;-&nbsp; by **wang** [<samp>(6e77e)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/6e77edc)
  - 更新 `elegant-route` &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(d4a65)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/d4a655f)
  - 为 `iframe` 添加骨架屏 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(e21af)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/e21afb8)
  - 添加组件自动导入功能 &nbsp;-&nbsp; by **wang** [<samp>(b60f2)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/b60f2ea)
  - 添加 `antd` 自动导入 & 关闭路由日志信息 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(5879f)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/5879fd1)
  - 添加全屏水印 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(103b6)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/103b643)
  - 优化代码风格 & 异常页面添加按钮点击事件 &nbsp;-&nbsp; by **wang** [<samp>(f1dcd)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/f1dcd68)
  - 同步 `soybean` 的 `useRouterPush` &nbsp;-&nbsp; by **wang** [<samp>(308df)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/308dfdd)
  - 添加版本更新通知 &nbsp;-&nbsp; by **wang** [<samp>(3f25b)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/3f25b19)
  - 使用 `json5` 解析环境变量 `VITE_OTHER_SERVICE_BASE_URL` & 修复代理启用问题 & 更新国际化语言 &nbsp;-&nbsp; by **wang** [<samp>(15769)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/1576922)
  - 添加颜色渐变模式 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(10b2a)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/10b2a65)
- **项目**：
  - 修改 `useRouter` 声明类型 &nbsp;-&nbsp; by **wang** [<samp>(f27d4)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/f27d4c3)

### 🐞 Bug 修复

- **包**：
  - 支持跳转到带参数的路由 & 处理 404 路由 &nbsp;-&nbsp; by **wang** [<samp>(6241a)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/6241a81)
- **项目**：
  - 修复窗口宽度变化时表格不显示滚动条的问题 & 关闭 #5 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** in https://github.com/mufeng889/react-soybean-admin/issues/5 [<samp>(bc673)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/bc67301)
  - 修复标签页无法修改的问题 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(0d3ca)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/0d3cae0)
  - 更新重定向功能 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(dc18c)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/dc18c38)
  - 修复左侧菜单混合模式收缩菜单的问题 &nbsp;-&nbsp; by **wang** [<samp>(77dac)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/77dacbd)
- **类型**：
  - 修复 `TableApiFn` 的类型问题 &nbsp;-&nbsp; by **wang** [<samp>(b8daf)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/b8daf7c)

### 🛠 优化

- 优化代码 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(00bdc)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/00bdccb)
- **包**：
  - 优化代码 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(4f6a2)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/4f6a2e1)
- **项目**：
  - 优化代码 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(a9854)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/a98549a)
  - 优化代码 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(aa3bc)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/aa3bc09)
  - 优化代码 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(b407e)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/b407ec4)
  - 优化代码 &nbsp;-&nbsp; by **wang** [<samp>(6ce4f)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/6ce4f26)
  - 优化代码 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(8f9a8)</samp>](https

://github.com/mufeng889/react-soybean-admin/commit/8f9a86c)
  - 优化代码 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(0402b)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/0402b46)

### 💅 重构

- **包**：
  - 重构 `useRoute` &nbsp;-&nbsp; by **wang** [<samp>(b9b55)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/b9b55d3)
- **项目**：
  - 将 CSS 变量挂载到根节点 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(c59ed)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/c59edf6)
  - 重构部分菜单代码 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(d19aa)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/d19aa0b)
  - 完成垂直混合重构 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(dab53)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/dab5333)
  - 重构菜单部分代码 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(1f1ef)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/1f1efbb)
  - 重构 `useMenu` &nbsp;-&nbsp; by **wang** [<samp>(185ff)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/185ff72)
  - 重构全局菜单 & 支持反转的水平混合菜单 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(132fa)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/132fa6f)

### 📦 构建

- **依赖**：添加 `vite-plugin-checker` 依赖 &nbsp;-&nbsp; by **wang** [<samp>(24454)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/2445424)

### 🏡 杂项

- **README**：
  - 更新 `README` &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(e9ebe)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/e9ebeb2)
  - 更新 `README` &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(a084d)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/a084d21)
- **依赖**：
  - 更新依赖 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(f63e7)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/f63e71e)
  - 更新依赖 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(ce564)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/ce564ce)
  - 移除 `lodash-es` &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(d487c)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/d487c9b)
  - 添加 `simple-git-hooks` 和 `lint-staged` &nbsp;-&nbsp; by **wang** [<samp>(9c977)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/9c977fd)
- **其他**：
  - 在控制台打印项目信息 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(d9cf8)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/d9cf87a)
- **项目**：
  - 添加 `vscode` 配置 & 添加 `vite preload` &nbsp;-&nbsp; by **wang** [<samp>(48cd0)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/48cd07e)

### 🎨 样式

- **项目**：
  - 优化代码格式 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(e2c03)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/e2c0391)
- **项目**：
  - 优化代码风格 &nbsp;-&nbsp; by **wang** [<samp>(f5fed)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/f5fed34)
  - 修改组件分类 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(e41a9)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/e41a925)
  - 优化代码风格 &nbsp;-&nbsp; by **wang** [<samp>(0eded)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/0eded8d)
  - 优化代码风格 &nbsp;-&nbsp; by **wang** [<samp>(95243)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/95243a0)
  - 优化代码 &nbsp;-&nbsp; by **wang** [<samp>(28d68)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/28d68fc)
  - 减少头部按钮的内边距 &nbsp;-&nbsp; by **DESKTOP-31IBRMI\Administrator** [<samp>(1a343)</samp>](https://github.com/mufeng889/react-soybean-admin/commit/1a34371)

### ❤️ 贡献者

[wang](mailto:1509326266@qq.com)


