# AI 产品经理个人网站

一个面向 AI 产品经理求职、合作与长期个人品牌建设的静态作品集网站。

## Commands

- `npm install`
- `npm run dev`
- `npm run test`
- `npm run build:aliyun`：生成阿里云 OSS + CDN 主站产物（可被收录）。
- `npm run build:pages`：生成 GitHub Pages 备用站产物（全页 `noindex`，不生成 sitemap）。
- `npm run verify:static -- aliyun` 或 `npm run verify:static -- pages`：检查实体 HTML、robots 与 sitemap 产物。

## Routes, navigation and theme

- 主站使用真实路径：`/`、`/work/`、`/words/`、`/now/`、`/contact/`；旧的 `/#work` 等 hash 地址会在浏览器中兼容跳转。
- URL 统一以尾斜杠结尾。阿里云 CDN 需将无尾斜杠形式 301 到对应尾斜杠 URL。
- 详情页按项目粒度受 `detail.isReady` 门控：文案未确认时不生成 HTML、不进 sitemap，作品列表保持不可点击。
- The first visit follows the operating-system color scheme.
- A manual theme choice is stored under `portfolio-theme` in local storage.

## Content and local resources

- `src/data/portfolio.ts`：个人姓名、项目内容与量化结果。
- `src/assets/hero-portrait.png`：首页与联系页使用的本地人物主视觉。
- `src/assets/hero-portrait-natural.png`：首页悬停揭示使用的本地自然色人物图。
- `src/components/Contact.tsx`：真实邮箱、联系方式和社媒链接。
- `public/resume.pdf`：顶部桌面与移动菜单提供下载的简历文件。
- `public/social-cover.png`：站点和未来详情页使用的 1200×630 分享图，页面中的 `og:image` 使用绝对 URL。

## 部署检查表

阿里云 OSS + CDN 为主站，GitHub Pages 仅作为备用地址。发布主站时：

1. 在 OSS 开启「支持子目录默认首页」，确保 `/work/` 等实体目录可直接访问与刷新。
2. 在 CDN 设置无尾斜杠 URL 301 至尾斜杠规范 URL。
3. 上传 `dist/` 后刷新 CDN 缓存。
4. 确认 HTTPS、canonical 与 `sitemap.xml` 正常后，在 Google Search Console 提交 sitemap。

GitHub Pages 工作流只构建备用站：它带 `noindex` 且不生成 `sitemap.xml`，不会与主域名争夺搜索收录。

## 1.0 assistant boundary

当前 AI 助手仅使用本地预设问题与答案，不调用外部模型、不读取个人数据，也不保存会话。
