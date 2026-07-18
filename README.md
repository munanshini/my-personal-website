# AI 产品经理个人网站

一个面向 AI 产品经理求职、合作与长期个人品牌建设的单页作品集。

## Commands

- `npm install`
- `npm run dev`
- `npm run test`
- `npm run build`

## Navigation and theme

- Primary pages use GitHub Pages-safe hashes: `#index`, `#work`, `#words`, `#now`, and `#contact`.
- The first visit follows the operating-system color scheme.
- A manual theme choice is stored under `portfolio-theme` in local storage.

## Content and local resources

- `src/data/portfolio.ts`：个人姓名、项目内容与量化结果。
- `src/assets/hero-portrait.png`：首页与联系页使用的本地人物主视觉。
- `src/assets/hero-portrait-natural.png`：首页悬停揭示使用的本地自然色人物图。
- `src/components/Contact.tsx`：真实邮箱、联系方式和社媒链接。
- `public/张楠-ai产品经理.pdf`：顶部桌面与移动菜单提供下载的简历文件。

## 1.0 assistant boundary

当前 AI 助手仅使用本地预设问题与答案，不调用外部模型、不读取个人数据，也不保存会话。
