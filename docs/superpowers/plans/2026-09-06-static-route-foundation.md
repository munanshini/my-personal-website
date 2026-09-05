# 静态路由与 SEO 基础改造 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将当前 hash 单页作品集交付为可直接访问、可预渲染、可索引的主站静态页面，同时生成 noindex 的 GitHub Pages 备用站；详情页保持内容门控，不在第一批发布。

**Architecture:** 使用 `react-router-dom` 和 `vite-react-ssg` 取代 hash 路由。所有公共路径和导航标签从 `src/lib/siteRoute.ts` 的 route manifest 读取；SSG 以 nested directory 输出实体 HTML，Vite 的 `onFinished` 只为主站构建写入 sitemap 与 robots。页面 head 使用 `vite-react-ssg` 的 `Head` 在预渲染阶段输出，GitHub Pages 构建由模式标识注入 noindex。

**Tech Stack:** React 18、TypeScript、Vite 5、React Router v6、vite-react-ssg 0.8.9、Vitest、Testing Library、Tailwind CSS。

**Spec:** `docs/superpowers/specs/2026-09-06-project-detail-pages-design.md`

## Global Constraints

- 保持现有配色、字体、动效、首页布局，以及 `SpotlightCard`、`SectionHeading`、`BorderGlow` 设计语言。
- 规范 URL 使用尾斜杠：`/work/`、`/words/`、`/now/`、`/contact/`；首页为 `/`。
- 旧 hash 必须在浏览器端自动替换为真实路径，例如 `/#work` -> `/work/`。
- 第一批只构建 `/`、`/work/`、`/words/`、`/now/`、`/contact/`；任何项目详情都不能生成 HTML、sitemap 条目或可点击卡片链接。
- `build:aliyun` 使用 `base: '/'`，生成 sitemap 与 robots；`build:pages` 使用 `base: '/my-personal-website/'`，每页含 `noindex` 且不生成 sitemap。
- canonical、Open Graph URL 和 `og:image` 必须使用 `https://zhangnanai.com` 的绝对 URL。
- 不配置 SPA fallback；生产环境以 OSS 的子目录默认首页和 CDN 的无斜杠到尾斜杠 301 处理真实路径。
- 移除网站中的手机号、`tel:`、微信手机号；简历公开文件名为 `resume.pdf`。
- 不新增 UI 库；删除未使用的 `@supabase/supabase-js`。

---

## File Structure

- `src/lib/siteRoute.ts` — 路由 manifest、一级导航、规范路径、legacy hash 映射、主站公开路径选择。
- `src/lib/siteMeta.ts` — 每个第一批页面的 title、description、canonical 与结构化数据来源。
- `src/hooks/useHashRoute.ts` — 删除；由 React Router 负责导航。
- `src/components/LegacyHashRedirect.tsx` — 客户端兼容旧 hash，运行一次后 `replace` 到规范路径。
- `src/components/PageMeta.tsx` — 用 SSG `Head` 输出 head、JSON-LD 和备用站 noindex。
- `src/components/SiteLayout.tsx` — 共享 TopNav、页面过渡、助手入口、legacy redirect 与 `Outlet`。
- `src/App.tsx` — 导出 `vite-react-ssg` 所需的第一批 React Router route records。
- `src/main.tsx` — 用 `ViteReactSSG` 初始化应用，并将 Vite `BASE_URL` 传给 router。
- `src/components/TopNav.tsx` — 使用真实路径链接与 React Router 导航，保留 `siteNavItems` 数据源；移除公开手机号和旧简历 URL。
- `src/components/Contact.tsx` — 移除电话/微信手机号与复制入口，保留邮箱和二维码。
- `src/components/Hero.tsx` — 人称从“我们”改为“我”。
- `src/components/PageTransition.tsx` — 接受稳定的路径 key，继续保留现有过渡。
- `src/components/ProjectGrid.tsx` — 第一批显式保持非链接项目卡片，预留基于 publish gate 的后续链接渲染点。
- `src/data/portfolio.ts` — 第一批补齐 `slug`、`detail` 和 `detail.isReady=false`，不暴露详情页。
- `src/assets/social-cover-source.*`、`public/social-cover.png` — 1200×630 分享主视觉和公开绝对 URL 资源。
- `vite.config.ts` — 根据 mode 选择 `base`、nested SSG 输出、已发布路由、sitemap/robots 文件生成。
- `package.json`、`package-lock.json` — SSG/router 依赖、双构建脚本，移除 Supabase。
- `.github/workflows/deploy-pages.yml` — 备用站运行 `npm run build:pages`。
- `public/resume.pdf` — 唯一公开简历文件；旧两份中文命名 PDF 删除。
- `src/**/*.test.tsx` 与 `src/**/*.test.ts` — 路由、metadata、清理、SSG manifest 和导航行为测试。

## Task 1: 建立真实路径 manifest 与回归测试

**Files:**
- Modify: `src/lib/siteRoute.ts`
- Delete: `src/hooks/useHashRoute.ts`
- Delete: `src/hooks/useHashRoute.test.tsx`
- Modify: `src/lib/siteRoute.test.ts`
- Create: `src/lib/siteMeta.ts`
- Create: `src/lib/siteMeta.test.ts`

**Interfaces:**
- Produces `SitePage`, `SiteRoute`, `siteNavItems`, `sitePath(page)`, `sitePageFromPath(pathname)`, `legacyHashPath(hash)`, `publicSitePaths()`.
- Produces `getPageMeta(page, deploymentTarget): PageMeta` and `personJsonLd` for `PageMeta` consumers.
- `siteNavItems` has exactly `{ page, label, path }` for `index`, `work`, `words`, `now`, `contact`.

- [ ] **Step 1: Write the failing route tests**

```ts
import { legacyHashPath, publicSitePaths, sitePath } from './siteRoute'

it.each([
  ['index', '/'], ['work', '/work/'], ['words', '/words/'], ['now', '/now/'], ['contact', '/contact/'],
] as const)('returns a trailing-slash path for %s', (page, path) => {
  expect(sitePath(page)).toBe(path)
})

it('maps legacy hashes to the matching real path', () => {
  expect(legacyHashPath('#work')).toBe('/work/')
  expect(legacyHashPath('#unknown')).toBeNull()
})

it('only exposes the five first-batch paths', () => {
  expect(publicSitePaths()).toEqual(['/', '/work/', '/words/', '/now/', '/contact/'])
})
```

- [ ] **Step 2: Run the focused test and confirm the old hash API cannot satisfy it**

Run: `npm test -- --run src/lib/siteRoute.test.ts`

Expected: FAIL because `sitePath`, `legacyHashPath`, and `publicSitePaths` do not exist.

- [ ] **Step 3: Implement the route manifest**

```ts
export const siteNavItems = [
  { page: 'index', label: 'INDEX 首页', path: '/' },
  { page: 'work', label: 'WORK 工作', path: '/work/' },
  { page: 'words', label: 'WORDS 内容', path: '/words/' },
  { page: 'now', label: 'NOW 现在', path: '/now/' },
  { page: 'contact', label: 'CONTACT 联系', path: '/contact/' },
] as const

export function legacyHashPath(hash: string) {
  const page = hash.replace(/^#/, '').split('/')[0]
  return siteNavItems.find((item) => item.page === page)?.path ?? null
}
```

Normalize valid pathnames to the manifest’s canonical tail-slash path; return `index` for an unknown pathname so the app has a stable fallback without adding an SPA rewrite.

- [ ] **Step 4: Write metadata tests before metadata implementation**

```ts
it('uses an absolute main-domain canonical and sharing image', () => {
  const meta = getPageMeta('work', 'aliyun')
  expect(meta.canonical).toBe('https://zhangnanai.com/work/')
  expect(meta.ogImage).toBe('https://zhangnanai.com/social-cover.png')
})

it('marks only the backup deployment as noindex', () => {
  expect(getPageMeta('index', 'pages').robots).toBe('noindex')
  expect(getPageMeta('index', 'aliyun').robots).toBeUndefined()
})
```

- [ ] **Step 5: Implement the metadata source**

```ts
export type DeploymentTarget = 'aliyun' | 'pages'

export function getPageMeta(page: SitePage, target: DeploymentTarget): PageMeta {
  const canonical = `https://zhangnanai.com${sitePath(page)}`
  return { ...pageMeta[page], canonical, ogImage: 'https://zhangnanai.com/social-cover.png', robots: target === 'pages' ? 'noindex' : undefined }
}
```

Define non-empty unique `title` and 80–120-character Chinese description strings for all five first-batch pages. Define a `Person` JSON-LD object with name `张楠`, job title `AI 产品经理`, skills, main-domain URL, GitHub profile and public email.

- [ ] **Step 6: Run focused tests**

Run: `npm test -- --run src/lib/siteRoute.test.ts src/lib/siteMeta.test.ts`

Expected: PASS.

- [ ] **Step 7: Commit the route and metadata foundation**

```bash
git add src/lib/siteRoute.ts src/lib/siteRoute.test.ts src/lib/siteMeta.ts src/lib/siteMeta.test.ts src/hooks/useHashRoute.ts src/hooks/useHashRoute.test.tsx
git commit -m "feat: define real path route manifest"
```

## Task 2: 迁移应用壳到 React Router 与 SSG

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`
- Create: `src/components/SiteLayout.tsx`
- Create: `src/components/LegacyHashRedirect.tsx`
- Create: `src/components/LegacyHashRedirect.test.tsx`
- Modify: `src/components/PageTransition.tsx`
- Modify: `src/components/PageTransition.test.tsx`
- Modify: `src/App.test.tsx`

**Interfaces:**
- `App.tsx` exports `routes: RouteRecord[]` for `ViteReactSSG`.
- `SiteLayout` renders `<TopNav />`, `<PageTransition pageKey={location.pathname}>`, assistant UI and `<Outlet />`.
- `LegacyHashRedirect` performs `navigate(legacyHashPath(window.location.hash), { replace: true })` only on the client.

- [ ] **Step 1: Write failing compatibility tests**

```tsx
it('replaces a legacy work hash with its real path', async () => {
  window.history.replaceState(null, '', '/#work')
  render(<RouterProvider router={router} />)
  await waitFor(() => expect(window.location.pathname).toBe('/work/'))
  expect(window.location.hash).toBe('')
})

it('renders the work page from a direct real path', () => {
  window.history.replaceState(null, '', '/work/')
  render(<RouterProvider router={router} />)
  expect(screen.getByRole('heading', { name: /AI 不止能生成/ })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run the focused tests and confirm they fail**

Run: `npm test -- --run src/App.test.tsx src/components/LegacyHashRedirect.test.tsx`

Expected: FAIL because the project has no real-path Router or legacy redirect component.

- [ ] **Step 3: Install only the required routing and SSG dependencies**

Run: `npm install react-router-dom@6 && npm install --save-dev vite-react-ssg@0.8.9 @types/node && npm uninstall @supabase/supabase-js`

Expected: `react-router-dom` is in runtime dependencies, `vite-react-ssg` is in development dependencies, and `@supabase/supabase-js` is absent.

- [ ] **Step 4: Implement the SSG route records and app shell**

```tsx
export const routes: RouteRecord[] = [{
  path: '/',
  element: <SiteLayout />,
  children: [
    { index: true, element: <Hero /> },
    { path: 'work/', element: <ProjectGrid projects={workItems} /> },
    { path: 'words/', element: <ContentFeed items={words} /> },
    { path: 'now/', element: <NowSection items={nowItems} /> },
    { path: 'contact/', element: <Contact /> },
  ],
}]

export const createRoot = ViteReactSSG({ routes, basename: import.meta.env.BASE_URL })
```

`SiteLayout` must derive the active `SitePage` from `useLocation().pathname`, use React Router’s `useNavigate`, and keep `CustomCursor`, `AssistantPanel`, and the assistant trigger in their current relative order. Update `PageTransition` to accept `pageKey: string` so it can keep its existing animation for all real paths without weakening its reduced-motion behavior.

- [ ] **Step 5: Implement client-only legacy hash replacement**

```tsx
export function LegacyHashRedirect() {
  const navigate = useNavigate()
  useEffect(() => {
    const target = legacyHashPath(window.location.hash)
    if (target) navigate(target, { replace: true })
  }, [navigate])
  return null
}
```

Render it once inside `SiteLayout`; do not add a hashchange listener or server fallback.

- [ ] **Step 6: Run app, redirect, transition and theme tests**

Run: `npm test -- --run src/App.test.tsx src/components/LegacyHashRedirect.test.tsx src/components/PageTransition.test.tsx src/theme/ThemeProvider.test.tsx`

Expected: PASS.

- [ ] **Step 7: Commit the real-path application shell**

```bash
git add package.json package-lock.json src/main.tsx src/App.tsx src/components/SiteLayout.tsx src/components/LegacyHashRedirect.tsx src/components/LegacyHashRedirect.test.tsx src/components/PageTransition.tsx src/components/PageTransition.test.tsx src/App.test.tsx
git commit -m "feat: migrate portfolio navigation to real paths"
```

## Task 3: 让导航与全局链接使用真实路径并移除公开电话

**Files:**
- Modify: `src/components/TopNav.tsx`
- Modify: `src/components/TopNav.test.tsx`
- Modify: `src/components/Contact.tsx`
- Modify: `src/components/Contact.test.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Hero.test.tsx`

**Interfaces:**
- `TopNav` consumes `currentPage: SitePage` and `onNavigate(page: SitePage)` from `SiteLayout`; every href comes from `siteNavItems.path`.
- Desktop and mobile resume anchors point to `/resume.pdf` and retain `download`.
- Contact renders only email copy, QR guidance, and verified social links.

- [ ] **Step 1: Write failing privacy and link tests**

```tsx
it('uses real paths and resume.pdf in all navigation download actions', () => {
  renderNav()
  expect(screen.getByRole('link', { name: 'INDEX 首页' })).toHaveAttribute('href', '/')
  fireEvent.click(screen.getByRole('button', { name: /open to work/i }))
  expect(screen.getByRole('link', { name: '简历 PDF 下载' })).toHaveAttribute('href', '/resume.pdf')
})

it('does not expose a phone number, tel link, or WeChat number', () => {
  render(<Contact />)
  expect(screen.queryByText(/15767978588/)).not.toBeInTheDocument()
  expect(document.querySelector('a[href^="tel:"]')).toBeNull()
  expect(screen.getByText('扫码添加微信')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run focused tests and confirm they fail**

Run: `npm test -- --run src/components/TopNav.test.tsx src/components/Contact.test.tsx src/components/Hero.test.tsx`

Expected: FAIL because hash links, Chinese PDF URLs, phone details, and “我们相信” still exist.

- [ ] **Step 3: Implement true-path navigation and privacy cleanup**

Use `siteNavItems.map(({ label, path }) => ({ label, href: path }))` for `GooeyNav`; update mobile anchors similarly. Retain the existing click handler so PageTransition is driven by `onNavigate`, but call it with the matching page from `siteNavItems`.

Remove the phone and WeChat-number rows, their `CopyButton` imports, and `tel:` links from `Contact`. Replace the WeChat value with exact copy `扫码添加微信`, keep the QR image with its existing descriptive alt text. In TopNav’s utility panel, retain email and QR image only. Replace the Hero sentence with:

```text
我相信好工具优雅、好用，并经得起反复打磨；也坚持通过规划、协调、推进与落实，让想法最终被完美实现。
```

- [ ] **Step 4: Run focused tests**

Run: `npm test -- --run src/components/TopNav.test.tsx src/components/Contact.test.tsx src/components/Hero.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit navigation and privacy cleanup**

```bash
git add src/components/TopNav.tsx src/components/TopNav.test.tsx src/components/Contact.tsx src/components/Contact.test.tsx src/components/Hero.tsx src/components/Hero.test.tsx
git commit -m "feat: protect contact details and use real paths"
```

## Task 4: 添加页面 metadata、结构化数据与分享图

**Files:**
- Create: `src/components/PageMeta.tsx`
- Create: `src/components/PageMeta.test.tsx`
- Modify: `src/components/SiteLayout.tsx`
- Create: `public/social-cover.png`

**Interfaces:**
- `PageMeta({ page, target }: { page: SitePage; target: DeploymentTarget })` consumes `getPageMeta` and outputs only SSG `Head` elements.
- `PageMeta` emits `title`, description, canonical, Open Graph, Twitter card, conditional robots, and homepage `Person` JSON-LD.

- [ ] **Step 1: Generate a 1200×630 share image from the confirmed site visual**

Use the image-generation workflow to create `public/social-cover.png` at 1200×630. Keep the existing off-white/dark portfolio visual language, a centered or right-weighted portrait treatment, and readable `张楠 · AI 产品经理` typography. It is a social preview asset only and must not change live page layout.

- [ ] **Step 2: Write failing metadata tests**

```tsx
it('emits a unique title, canonical and absolute og image for the work page', () => {
  render(<PageMeta page="work" target="aliyun" />)
  expect(document.title).toContain('工作')
  expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://zhangnanai.com/work/')
  expect(document.head.querySelector('meta[property="og:image"]')).toHaveAttribute('content', 'https://zhangnanai.com/social-cover.png')
})

it('adds noindex only for the GitHub Pages build', () => {
  render(<PageMeta page="index" target="pages" />)
  expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
})
```

- [ ] **Step 3: Run metadata tests and confirm they fail**

Run: `npm test -- --run src/components/PageMeta.test.tsx`

Expected: FAIL because no `PageMeta` component exists.

- [ ] **Step 4: Implement SSG head output**

```tsx
import { Head } from 'vite-react-ssg'

export function PageMeta({ page, target }: Props) {
  const meta = getPageMeta(page, target)
  return <Head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <link rel="canonical" href={meta.canonical} />
    <meta property="og:image" content={meta.ogImage} />
    <meta name="twitter:card" content="summary_large_image" />
    {meta.robots && <meta name="robots" content={meta.robots} />}
    {page === 'index' && <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>}
  </Head>
}
```

Also emit `og:title`、`og:description`、`og:url`、`og:type=website` and inject `PageMeta` once from `SiteLayout`, using `import.meta.env.MODE === 'pages' ? 'pages' : 'aliyun'`.

- [ ] **Step 5: Run metadata tests**

Run: `npm test -- --run src/components/PageMeta.test.tsx src/lib/siteMeta.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit SEO metadata and social preview asset**

```bash
git add src/components/PageMeta.tsx src/components/PageMeta.test.tsx src/components/SiteLayout.tsx src/lib/siteMeta.ts src/lib/siteMeta.test.ts public/social-cover.png
git commit -m "feat: add static page metadata and sharing preview"
```

## Task 5: 配置两种 SSG 构建并生成站点文件

**Files:**
- Modify: `vite.config.ts`
- Modify: `package.json`
- Modify: `.github/workflows/deploy-pages.yml`
- Create: `scripts/verify-static-output.mjs`

**Interfaces:**
- `vite.config.ts` exports a config function that reads `mode` and derives `target: 'aliyun' | 'pages'`.
- `ssgOptions.dirStyle` is `nested`; `includedRoutes` returns `publicSitePaths()` only.
- `onFinished` writes main-site `sitemap.xml` and `robots.txt` only for `aliyun`, and removes any sitemap in `pages` output.
- `npm run verify:static -- aliyun` and `npm run verify:static -- pages` validate generated files without a browser.

- [ ] **Step 1: Write output verifier assertions before build configuration**

```js
assertExists('dist/index.html')
assertExists('dist/work/index.html')
assertExists('dist/words/index.html')
assertMissing('dist/work/ai-ide/index.html')

if (target === 'aliyun') {
  assertText('dist/sitemap.xml', 'https://zhangnanai.com/work/')
  assertExists('dist/robots.txt')
} else {
  assertMissing('dist/sitemap.xml')
  assertText('dist/work/index.html', '<meta name="robots" content="noindex">')
}
```

- [ ] **Step 2: Run the verifier and confirm it fails before the new build exists**

Run: `node scripts/verify-static-output.mjs aliyun`

Expected: FAIL because the verifier and nested SSG files do not yet exist.

- [ ] **Step 3: Implement dual build configuration**

```ts
export default defineConfig(({ mode }) => {
  const target = mode === 'pages' ? 'pages' : 'aliyun'
  return {
    base: target === 'pages' ? '/my-personal-website/' : '/',
    plugins: [react()],
    ssgOptions: {
      dirStyle: 'nested',
      includedRoutes: () => publicSitePaths(),
      onFinished: () => writeSiteFiles({ outDir: resolve(process.cwd(), 'dist'), target, paths: publicSitePaths() }),
    },
  }
})
```

Implement `writeSiteFiles` inside `vite.config.ts` with Node `fs`: for `aliyun`, write canonical tail-slash URLs to `sitemap.xml` and a `robots.txt` containing `Sitemap: https://zhangnanai.com/sitemap.xml`; for `pages`, remove `sitemap.xml` if it exists and write a `robots.txt` that disallows crawl. Add scripts:

```json
{
  "build": "npm run build:aliyun",
  "build:aliyun": "tsc -b && vite-react-ssg build --mode aliyun",
  "build:pages": "tsc -b && vite-react-ssg build --mode pages",
  "verify:static": "node scripts/verify-static-output.mjs"
}
```

Set the Pages workflow build step to `npm run build:pages`.

- [ ] **Step 4: Run both production builds and static verification**

Run: `npm run build:aliyun && npm run verify:static -- aliyun && npm run build:pages && npm run verify:static -- pages`

Expected: PASS; Aliyun output contains only five first-batch pages plus sitemap/robots, Pages output contains no sitemap and each rendered page contains noindex.

- [ ] **Step 5: Commit SSG and deployment build configuration**

```bash
git add vite.config.ts package.json package-lock.json .github/workflows/deploy-pages.yml scripts/verify-static-output.mjs
git commit -m "feat: generate deploy-specific static site output"
```

## Task 6: 清理简历文件、锁定项目详情发布门控并完成回归

**Files:**
- Delete: `public/张楠-AI产品经理2026简历初版.pdf`
- Delete: `public/张楠-ai产品经理.pdf`
- Create: `public/resume.pdf`
- Modify: `src/data/portfolio.ts`
- Modify: `src/components/ProjectGrid.tsx`
- Modify: `src/components/ProjectGrid.test.tsx`
- Modify: `README.md`

**Interfaces:**
- `ProjectDetail` adds `isReady: boolean`; all three first-batch project records set `isReady: false`.
- `ProjectGrid` renders a `<span>` for unpublished cards and renders no detail anchor until a second-batch record has `isReady: true`.
- README documents local `build:aliyun`, `build:pages`, tail-slash policy, OSS/CDN checklist and GitHub Pages backup scope.

- [ ] **Step 1: Write failing content-gate and file-link tests**

```tsx
it('keeps every unpublished project card non-interactive', () => {
  render(<ProjectGrid projects={workItems} />)
  expect(screen.queryByRole('link', { name: '查看项目档案 ↗' })).not.toBeInTheDocument()
  expect(screen.getAllByTestId('work-row')).toHaveLength(3)
})
```

```ts
it('marks all project details as not ready for production', () => {
  expect(workItems.every((item) => item.detail.isReady === false)).toBe(true)
})
```

- [ ] **Step 2: Run focused tests and confirm they fail**

Run: `npm test -- --run src/components/ProjectGrid.test.tsx src/data/portfolio.test.ts`

Expected: FAIL because `detail.isReady` does not exist and old “项目档案 · 即将开放” copy is still present.

- [ ] **Step 3: Implement the release gate and resume cleanup**

Add all `ProjectDetail` fields with complete placeholder strings and `isReady: false`; place `// TODO: 待替换为最终文案` directly above each project’s detail object. Keep the Huawei year exactly `2025.02 — 2026.06` in both `projects` and `experiences`.

Render a non-interactive status element for every `isReady === false` record. Reserve the exact interactive link copy `查看项目档案 ↗` for the second-batch `isReady === true` branch; do not create any `href` until then.

Rename the current active PDF to `public/resume.pdf`, delete the obsolete `初版` PDF, and verify there are no public files with the retired Chinese resume names.

- [ ] **Step 4: Update the README with operator instructions**

Document the two build commands, outputs, first-batch release gate, production tail-slash rule, and this post-deploy checklist:

```text
1. OSS 开启“支持子目录默认首页”。
2. CDN 对无尾斜杠 URL 配置 301 到带尾斜杠 URL。
3. 发布后刷新对应 CDN 缓存。
4. 验证 HTTPS 和实体 HTML 后，在 Google Search Console 提交主站 sitemap。
```

- [ ] **Step 5: Run the full test suite and both builds**

Run: `npm test && npm run build:aliyun && npm run verify:static -- aliyun && npm run build:pages && npm run verify:static -- pages && git diff --check`

Expected: all tests pass, each first-batch HTML contains its visible page content, main sitemap has five URLs, Pages output has no sitemap/noindex, and no whitespace errors exist.

- [ ] **Step 6: Verify public-data removal and output contracts**

Run:

```bash
rg -n '15767978588|tel:|张楠-AI产品经理2026简历初版|张楠-ai产品经理\.pdf|@supabase/supabase-js' src public package.json
find public -maxdepth 1 -type f -name '*简历*.pdf'
```

Expected: `rg` finds no matches and `find` returns no Chinese-named resume file; `public/resume.pdf` exists.

- [ ] **Step 7: Commit first-batch delivery**

```bash
git add README.md public/resume.pdf src/data/portfolio.ts src/components/ProjectGrid.tsx src/components/ProjectGrid.test.tsx
git rm public/张楠-AI产品经理2026简历初版.pdf public/张楠-ai产品经理.pdf
git commit -m "feat: gate project details and complete static route foundation"
```

## Task 7: 本地直达、刷新与响应式验收

**Files:**
- Modify: `README.md` only if an observed serving command differs from documented instructions.

**Interfaces:**
- Consumes the `build:aliyun` static `dist/` directory.
- Produces a manual verification record with no code changes unless documentation is inaccurate.

- [ ] **Step 1: Serve the Aliyun-targeted build without SPA fallback**

Run: `npx --yes serve dist -l 4175`

Expected: a static file server starts and exposes directory `index.html` files directly.

- [ ] **Step 2: Verify direct route and refresh behavior in a browser**

Open `http://127.0.0.1:4175/work/`, refresh it, then open `http://127.0.0.1:4175/words/` and `http://127.0.0.1:4175/#work`.

Expected: Work and Words show their own page bodies after refresh; the legacy hash replaces itself with `/work/`; no route depends on an index fallback.

- [ ] **Step 3: Verify source content and mobile width**

For `/work/` use “View Page Source” and search for `AI 不止能生成`; inspect a 390 px viewport for horizontal overflow.

Expected: static HTML source contains the Work heading and `document.documentElement.scrollWidth === 390`.

- [ ] **Step 4: Stop the temporary server and commit only if README changed**

Run: stop the `serve` process.

If README was changed:

```bash
git add README.md
git commit -m "docs: clarify static route verification"
```

Otherwise: no commit.

## Second-Batch Entry Criteria

Do not create detail route records, static detail HTML, sitemap entries or clickable project cards until the user supplies final project copy and explicitly marks each project ready. At that point, create a separate plan that adds `ProjectDetailPage`, `CreativeWork` JSON-LD, first-result hero metric, decision cards, previous/next navigation, and per-project direct-route/refresh/mobile verification.
