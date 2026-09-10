# Project Detail Local Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为三个未公开项目提供可在本地直接预览的详情页，同时严格保留 `detail.isReady` 的生产构建、sitemap 与列表链接门控。

**Architecture:** 增加一个由 `WorkItem` 驱动的 `ProjectDetailPage`，在开发路由中匹配 `work/:slug/`。详情页从现有 `ProjectDetail` 占位结构读取全部内容；生产 SSG 路由清单继续只从 `detail.isReady === true` 的项目生成，因此三个未就绪项目不会生成物理 HTML 或出现在作品列表链接与 sitemap 中。

**Tech Stack:** React 18、React Router v6、TypeScript、Tailwind CSS、vite-react-ssg、Vitest、Testing Library。

**Spec:** `docs/superpowers/specs/2026-09-06-project-detail-pages-design.md`

## Global Constraints

- 保持现有配色、字体、页面动效、首页和 Work 列表页布局不变；复用 `SpotlightCard`、`SectionHeading` 与既有颜色 token。
- 三个 `detail.isReady` 维持 `false`；本次不能新增生产详情 HTML、sitemap 条目或作品列表可点击链接。
- 详情页使用现有占位文案，并保留数据文件中的 `TODO: 待替换为最终文案` 注释；不编造最终项目履历或量化结果。
- 详情页仅在本地开发环境通过 `/work/<slug>/` 预览；未知 slug 返回 `/work/`。
- 页面使用 `main > article > section`，每页一个 `h1`；移动端关键决策三栏纵向堆叠。

---

### Task 1: 补齐详情页查询和受控路由测试

**Files:**
- Modify: `src/data/portfolio.ts`
- Modify: `src/data/portfolio.test.ts`
- Modify: `src/lib/siteRoute.ts`
- Modify: `src/lib/siteRoute.test.ts`
- Modify: `src/App.test.tsx`

**Interfaces:**
- Produces `workItemBySlug(slug: string): WorkItem | undefined`.
- Produces `publishedProjectPaths(): string[]`, which returns only paths whose `detail.isReady` is true.
- `sitePageFromPath('/work/<slug>/')` returns `'work'`, keeping the primary navigation active in preview.

- [ ] **Step 1: Write focused failing tests**

```ts
expect(workItemBySlug('ai-ide')?.title).toBe('AI IDE 研发助手')
expect(workItemBySlug('missing')).toBeUndefined()
expect(sitePageFromPath('/work/ai-ide/')).toBe('work')
expect(publishedProjectPaths()).toEqual([])
```

- [ ] **Step 2: Run the focused tests to confirm the helpers do not exist yet**

Run: `npm test -- --run src/data/portfolio.test.ts src/lib/siteRoute.test.ts`

Expected: FAIL because the lookup and published-path helper are absent, and detail paths resolve as `index`.

- [ ] **Step 3: Implement the smallest query and routing helpers**

```ts
export function workItemBySlug(slug: string) {
  return workItems.find((item) => item.slug === slug)
}

export function publishedProjectPaths() {
  return workItems
    .filter((item) => item.detail.isReady)
    .map((item) => `/work/${item.slug}/`)
}
```

Normalize `/work/<slug>` and `/work/<slug>/` to primary page `'work'`; leave `publicSitePaths()` unchanged in this task.

- [ ] **Step 4: Run the focused tests to confirm the gate behavior**

Run: `npm test -- --run src/data/portfolio.test.ts src/lib/siteRoute.test.ts`

Expected: PASS.

### Task 2: 建立项目详情页的语义化预览版

**Files:**
- Create: `src/components/ProjectDetailPage.tsx`
- Create: `src/components/ProjectDetailPage.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Interfaces:**
- `ProjectDetailPage({ project }: { project: WorkItem })` renders the project detail article.
- `ProjectDetailRoute()` reads `slug` from `useParams()`, renders `<Navigate to="/work/" replace />` when there is no project, otherwise renders `ProjectDetailPage`.

- [ ] **Step 1: Write focused failing component and route tests**

```tsx
render(<ProjectDetailPage project={workItems[0]} />)
expect(screen.getByRole('heading', { level: 1, name: 'AI IDE 研发助手' })).toBeInTheDocument()
expect(screen.getByRole('navigation', { name: '项目详情导航' })).toBeInTheDocument()
expect(screen.getByRole('heading', { name: '关键决策' })).toBeInTheDocument()
expect(screen.getAllByText('我怎么判断')).toHaveLength(project.detail.decisions.length)

renderApp('/work/ai-ide/')
expect(screen.getByRole('heading', { level: 1, name: 'AI IDE 研发助手' })).toBeInTheDocument()
```

- [ ] **Step 2: Run the focused tests to confirm the preview page is absent**

Run: `npm test -- --run src/components/ProjectDetailPage.test.tsx src/App.test.tsx`

Expected: FAIL because `ProjectDetailPage` and the nested route do not exist.

- [ ] **Step 3: Implement the page in the specified reading order**

Use a single `main` containing one `article`. Render, in order:

1. `nav` labelled `项目详情导航`, with `WORK / 项目名` and a return link to `/work/`.
2. A header containing the only `h1`, company, period, category, tagline and first outcome metric.
3. `section` headings for `问题背景`, `我的角色`, `关键决策`, `结果`, `复盘` and optional `脱敏说明`.
4. A visually distinct role card using `border border-line/15 bg-surface`.
5. One decision card per item, with equally prominent `当时的问题`, `我怎么判断` and `取舍了什么` labels. Use `md:grid-cols-3` so mobile remains vertical.
6. A footer with previous/next project links and a `/contact/` CTA.

All internal anchors must use `publicPath(path, currentDetailPath)` for direct local preview compatibility. Do not add metadata or JSON-LD for this not-yet-public preview.

- [ ] **Step 4: Add the development route without adding it to static output**

```tsx
{ path: 'work/:slug/', element: <ProjectDetailRoute /> }
```

Keep `publicSitePaths()` and the SSG `includedRoutes` independent of this route. The route is available to the Vite development server, but no `detail.isReady === false` record is prerendered.

- [ ] **Step 5: Run component and application route tests**

Run: `npm test -- --run src/components/ProjectDetailPage.test.tsx src/App.test.tsx src/components/ProjectGrid.test.tsx`

Expected: PASS, including the existing assertion that no project archive link is rendered for any of the three pending records.

### Task 3: 验证门控、静态产物与本地预览

**Files:**
- Modify: `vite.config.ts`
- Modify: `scripts/verify-static-output.mjs`
- Modify: `src/lib/siteRoute.ts`
- Modify: `src/lib/siteRoute.test.ts`

**Interfaces:**
- `publicSitePaths()` returns the five primary pages plus `publishedProjectPaths()`.
- `writeSiteFiles()` writes only routes selected by `publicSitePaths()` into sitemap and physical output.

- [ ] **Step 1: Extend static-output assertions before changing the public path selector**

```js
assertMissing('work/ai-ide/index.html')
assertMissing('work/warehouse-scheduling/index.html')
assertMissing('work/smart-sales-center/index.html')
assertNoText('sitemap.xml', 'https://zhangnanai.com/work/ai-ide/')
```

- [ ] **Step 2: Run the static verifier against a Pages build**

Run: `npm run build:pages && npm run verify:static -- pages`

Expected: PASS; all three preview-only routes are absent from the artifact and sitemap.

- [ ] **Step 3: Make the published selector append only ready paths**

```ts
export function publicSitePaths() {
  return [...siteNavItems.map((item) => item.path), ...publishedProjectPaths()]
}
```

With the current data this must remain exactly five paths; the helper creates the future per-project release path without changing this release.

- [ ] **Step 4: Run the full verification suite**

Run: `npm test && npm run build:pages && npm run verify:static -- pages && npm run build:aliyun && npm run verify:static -- aliyun`

Expected: all tests pass; neither build contains a physical detail HTML file or sitemap detail entry.

- [ ] **Step 5: Start Vite locally and inspect all three preview routes**

Run: `npm run dev -- --host 127.0.0.1`

Open `/work/ai-ide/`, `/work/warehouse-scheduling/`, and `/work/smart-sales-center/`; verify the desktop header, decision cards, responsive single-column layout, return link and previous/next navigation. Stop the temporary server after inspection.

- [ ] **Step 6: Commit the local-preview implementation**

```bash
git add src/data/portfolio.ts src/data/portfolio.test.ts src/lib/siteRoute.ts src/lib/siteRoute.test.ts src/components/ProjectDetailPage.tsx src/components/ProjectDetailPage.test.tsx src/App.tsx src/App.test.tsx vite.config.ts scripts/verify-static-output.mjs docs/superpowers/plans/2026-09-08-project-detail-local-preview.md
git commit -m "feat: add gated project detail previews"
```
