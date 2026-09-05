# 项目详情页、实体路由与长期托管设计

## 目标与边界

将现有 hash 单页作品集改造成可直接访问、可分享、可预渲染的多路径静态网站。详情页的内容先建立带 `TODO: 待替换为最终文案` 注释的数据结构，但**未就绪的项目不进入生产构建**：不生成其 HTML、不进 sitemap，列表页卡片也不可点击。门控按项目粒度控制，项目文案就绪后可单独上线。保留现有配色、字体、动效、首页布局，以及 `SpotlightCard`、`SectionHeading`、`BorderGlow` 的设计语言。

本次不创建阿里云付费资源、不修改 DNS、不购买 ECS，也不改变首页视觉。

## 托管架构

网站采用静态优先、按需增加后端的长期架构：

```text
zhangnanai.com
  -> 阿里云 CDN
  -> 阿里云 OSS（实体 HTML、素材、PDF）
  -> 未来按需接入云函数 / 托管数据库 / 模型 API

munanshini.github.io/my-personal-website/
  -> GitHub Pages 备用静态站
```

OSS + CDN 是当前主站的目标托管；GitHub Pages 保留为备用入口。两者从同一源码构建，但使用不同 `base`：阿里云为 `/`，GitHub Pages 为 `/my-personal-website/`。URL 统一采用**尾斜杠**形式，例如 `/work/ai-ide/`；阿里云 OSS + CDN 对无尾斜杠的同页地址配置 301 到带尾斜杠地址。canonical 和 Open Graph URL 始终使用正式域名 `https://zhangnanai.com` 且带尾斜杠。

阿里云的 Bucket、CDN 域名、证书、DNS 和可能需要的备案必须在本地构建验收后操作。部署前先确认对应账户中的资源和地域；创建、购买或更改域名解析前要求用户在操作当下确认。

## 路由和静态生成

使用 `react-router-dom` 的真实路径路由，并使用 `vite-react-ssg` 在构建时为每条已知路由输出独立 HTML。选择它的原因是当前项目为 React 18 + Vite，路由数固定、内容静态，SSG 能同时生成正文和页面 head，不需要引入运行时服务器或浏览器驱动预渲染。

路由表：

| 路径 | 页面 |
| --- | --- |
| `/` | 首页 |
| `/work/` | 作品列表 |
| `/work/ai-ide/` | AI IDE 研发助手（内容就绪后生成） |
| `/work/warehouse-scheduling/` | 智能仓储调度系统（内容就绪后生成） |
| `/work/smart-sales-center/` | 房企智慧案场销讲与客户接待系统（内容就绪后生成） |
| `/words/` | 内容 |
| `/now/` | 现在 |
| `/contact/` | 联系 |

`siteNavItems` 继续是一级导航唯一数据源，改为提供路径数据；所有组件从路由工具读取地址，禁止自行硬编码一级路径。详情页属于 `work`，因此一级导航仍高亮 WORK。

根页面保留一个客户端兼容层：当地址含旧 hash（例如 `/#work`）时，加载后使用真实路径替换为 `/work/`；已发出的旧链接继续可用。正常导航、前进后退与刷新全部使用浏览器 History API。

构建产物必须包含：

```text
dist/
├── index.html
├── work/index.html
├── words/index.html
├── now/index.html
├── contact/index.html
├── sitemap.xml
└── robots.txt
```

当某项目的 `detail.isReady` 为 `true` 时，构建额外产生对应的 `work/<slug>/index.html` 并加入主站 sitemap；三条详情文案全部就绪后，主站 sitemap 共含 8 个页面。`build:pages` 不生成 `sitemap.xml`，并为每一个 HTML 输出 `<meta name="robots" content="noindex">`。

不配置 SPA fallback。未知路径可使用独立 `404.html`，但不返回首页 HTML。这样每条已发布项目 URL 在阿里云与 GitHub Pages 都能直接打开、刷新，并在“查看网页源代码”中看到对应正文。

## 数据、页面与导航

`src/data/portfolio.ts` 扩展：

- 新增 `ProjectDecision`、`ProjectOutcome`、`ProjectDetail`。
- `WorkItem` 新增 `slug` 与 `detail`，移除 `detailLabel`；`detail.isReady` 是项目详情发布门控。
- 三条项目使用完整结构的占位详情数据；所有占位字段附近保留 `TODO: 待替换为最终文案` 注释。
- 华为项目的项目年份与经历年份统一为 `2025.02 — 2026.06`。

新增 `ProjectDetailPage`，语义结构为 `main > article > section`：

1. 全局 `TopNav`，以及 `WORK / 项目名` 面包屑和返回作品列表入口。
2. 仅有一个 `h1` 的标题区，包含公司、时间、领域标签、`heroTagline` 和第一条核心结果。
3. 问题背景。
4. 我的角色：与其他章节显著区分的浅底/边框区域，明确职责范围和个人动作。
5. 关键决策：占最大视觉空间。每条决策含问题、判断、取舍三栏；`tradeoff` 与其他两栏同等显著。移动端三栏纵向堆叠。
6. 结果：大字号指标和小字号说明。
7. 复盘。
8. 可选脱敏说明，以次要文字低调出现。
9. 上一个 / 下一个项目，及指向 `/contact` 的联系 CTA。

当项目详情已就绪时，作品列表卡片中的链接文案固定为“查看项目档案 ↗”；未就绪时，卡片保持不可点击并显示非交互状态。保持现有 hover、焦点状态与项目卡片主体排版。详情页加载和返回使用现有 `PageTransition`。

## SEO、社交预览和语义

建立中心化的页面元数据配置：各条路由都有唯一 title、description、canonical 和 Open Graph URL。详情页的 title 和 description 取自 `ProjectDetail`。

通过可 SSR 的 head 管理组件在静态构建阶段输出：

- `title`、`meta[name=description]`、canonical；
- `og:title`、`og:description`、`og:url`、`og:type`、`og:image`；
- `twitter:card=summary_large_image`；
- 首页的 `Person` JSON-LD；详情页的 `CreativeWork` JSON-LD。

增加一张 1200×630 的统一站点主视觉作为详情页兜底分享图，所有图片补充准确 `alt`。`og:image` 必须是完整绝对 URL，例如 `https://zhangnanai.com/social-cover.png`，不能使用相对路径。主站构建脚本仅从已发布路由生成 sitemap 与指向它的 robots；GitHub Pages 备用构建不生成 sitemap。

## 双目标构建与发布

构建脚本：

- `build:aliyun`：根路径 `base=/`，输出用于 OSS 的 `dist/`、主站 robots 和已发布页面 sitemap。
- `build:pages`：子路径 `base=/my-personal-website/`，输出用于 GitHub Pages 的 `dist/`；每页 noindex 且无 sitemap。
- `build` 默认等同于主站构建，方便本地与阿里云发布。

GitHub Actions 继续仅从 `codex/portfolio-v1` 发布备用站，但构建命令改为 `build:pages`。阿里云发布暂不写入凭据；将提供一个明确的上传目标、目录约定和部署检查表。阿里云主站启用后，应在 GitHub Pages 设置中移除 `zhangnanai.com` 的自定义域名占用，仅保留 GitHub 默认备用地址。

主站发布检查表：

1. OSS 开启“支持子目录默认首页”，确保 `/work/ai-ide/` 能返回其目录内 `index.html`。
2. OSS + CDN 为无尾斜杠地址设置到规范尾斜杠 URL 的 301。
3. 每次发布后刷新对应的 CDN 缓存。
4. HTTPS、域名解析和资源路径验证通过后，在 Google Search Console 提交主站 sitemap。

## 同次清理

- 删除公开页面与导航中的手机号、`tel:` 链接和微信手机号文本；保留邮箱和微信二维码，并将微信说明改为扫码添加。
- 删除 `public/张楠-AI产品经理2026简历初版.pdf`；将当前可下载简历重命名为 `public/resume.pdf`，同步替换导航中的下载链接。
- Hero 文案中的“我们相信”改为“我相信”。
- 从 `package.json` 删除未使用的 `@supabase/supabase-js`。

## 分批交付与验证

### 第一批：基础可发布改造

1. 路由和旧 hash 兼容单元测试。
2. 主站页面元数据、JSON-LD、尾斜杠和 noindex 备用站的页面级测试。
3. 六项清理：电话、微信手机号、旧简历、简历改名、人称、未用依赖。
4. `npm test`、`npm run build:aliyun`、`npm run build:pages`。
5. 对两个构建产物检查基础 5 个实体 HTML、不同页面标题/描述、主站 sitemap、备用站 noindex 且无 sitemap。

### 第二批：项目详情页

1. 每个文案就绪项目的数据、链接、详情页语义层级、关键决策和元数据测试。
2. 只检查 `detail.isReady=true` 的项目 HTML 与主站 sitemap 条目；未就绪项目不得生成 HTML 或链接。
3. 以本地静态服务器检查已发布详情页直达与刷新，以及桌面和移动端布局。
4. 发布后检查 `zhangnanai.com/work/<slug>/` 与 GitHub Pages 备用地址；阿里云生产切换须在资源、域名、证书和 DNS 均核对后进行。
