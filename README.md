# AI 产品经理个人网站

一个面向 AI 产品经理求职、合作与长期个人品牌建设的单页作品集。

## Commands

- `npm install`
- `npm run dev`
- `npm run test`
- `npm run build`

## Replace before publishing

- `src/data/portfolio.ts`：个人姓名、项目内容与量化结果。
- `src/components/Hero.tsx`：将临时远程 Hero 图片替换为获授权的个人形象或原创视觉，并在简历就绪后增加下载入口。
- `src/components/Contact.tsx`：真实邮箱、联系方式和社媒链接。
- `public/resume.pdf`：添加真实简历文件后再正式开放下载。

## 1.0 assistant boundary

当前 AI 助手仅使用本地预设问题与答案，不调用外部模型、不读取个人数据，也不保存会话。
