# Portfolio Pages and Dark Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有单页瀑布流改造成五个一级菜单独立切换的作品集，并加入可记忆、可跟随系统的完整深色模式。

**Architecture:** 使用现有哈希地址作为轻量页面路由，不新增路由依赖；`App` 只渲染当前一级页面，`TopNav` 只根据路由状态切换页面。主题由 React Context 和 `data-theme` 驱动，所有页面通过语义化 Tailwind 颜色与 CSS 变量共享浅色 / 深色规则。

**Tech Stack:** React 18、TypeScript、Vite 5、Tailwind CSS 3、Vitest、Testing Library、Lucide React。

## Global Constraints

- 网站第一身份必须保持为“AI 产品经理”，设计与交互背景只作为能力证明。
- 一级菜单固定为 `INDEX`、`WORK`、`WORDS`、`NOW`、`CONTACT`。
- 继续使用 `#index`、`#work`、`#words`、`#now`、`#contact`，不新增路由依赖。
- 页面内部内容超过一屏时允许正常纵向滚动，不做强制全屏轮播。
- 保留现有红色信号色 `#e44832`，不复制参考站的荧光绿色。
- 不恢复网格背景或网格装饰。
- 移动端不显示音乐控制。
- 不创建没有真实内容的项目详情链接。
- 所有行为变更必须先写失败测试，再写最小实现。
- 不修改 `.superpowers/` 和已有未跟踪计划文件，不覆盖用户尚未提交的简历与导航修改。

---

## File Structure

### New files

- `src/lib/siteRoute.ts`：一级页面类型、哈希解析和哈希生成。
- `src/lib/siteRoute.test.ts`：哈希解析与无效地址测试。
- `src/hooks/useHashRoute.ts`：监听哈希变化、规范化地址和页面导航。
- `src/hooks/useHashRoute.test.tsx`：前进 / 后退、无效地址与导航测试。
- `src/theme/ThemeProvider.tsx`：系统主题、用户选择、本地保存和主题 Context。
- `src/theme/ThemeProvider.test.tsx`：主题优先级、切换与保存测试。
- `src/components/ThemeToggle.tsx`：桌面及移动端共用主题按钮。
- `src/components/PageTransition.tsx`：一级页面统一进入动画。
- `src/components/PageTransition.test.tsx`：路由 key 和降低动态效果标识测试。
- `src/components/ContentFeed.test.tsx`：内容类型优先级和链接真实性测试。
- `src/components/NowSection.test.tsx`：五条分页和稳定内容区测试。
- `src/components/Contact.test.tsx`：联系信息、二维码和主题语义表面测试。

### Modified files

- `src/App.tsx`、`src/App.test.tsx`：全局导航、当前页面选择、主题和 AI 助手。
- `src/components/TopNav.tsx`、`src/components/TopNav.test.tsx`：移除滚动监听，改为路由驱动，加入主题切换。
- `src/components/Hero.tsx`、`src/components/Hero.test.tsx`：移除内部导航，保留首页视觉。
- `src/components/ProjectGrid.tsx`、`src/components/ProjectGrid.test.tsx`：从大卡片改为工作目录行。
- `src/components/ContentFeed.tsx`：改为内容类型目录。
- `src/components/NowSection.tsx`：主题语义化并保持五条固定高度。
- `src/components/Contact.tsx`：主题语义化和联系页排版。
- `src/components/SectionHeading.tsx`：统一一级页面页头接口。
- `src/components/SpotlightCard.css`、`src/components/GooeyNav.css`：主题变量与可读描边。
- `src/data/portfolio.ts`：为真实链接增加可选 `detailHref`，不创建空链接。
- `src/index.css`：主题变量、页面切换、语义表面和响应式规则。
- `tailwind.config.ts`：将 `paper`、`ink`、`surface`、`muted`、`line` 映射到主题变量。
- `index.html`：React 启动前应用保存主题，避免深色模式闪白。

---

### Task 1: Implement the hash route contract

**Files:**
- Create: `src/lib/siteRoute.ts`
- Create: `src/lib/siteRoute.test.ts`
- Create: `src/hooks/useHashRoute.ts`
- Create: `src/hooks/useHashRoute.test.tsx`

**Interfaces:**
- Produces: `SitePage`, `siteNavItems`, `parseSitePage(hash)`, `sitePageHash(page)`, `useHashRoute()`。
- `useHashRoute()` returns `{ page: SitePage; navigate(page: SitePage): void }`。

- [ ] **Step 1: Write failing route parser tests**

```ts
import { describe, expect, it } from 'vitest'
import { parseSitePage, sitePageHash } from './siteRoute'

describe('siteRoute', () => {
  it.each(['index', 'work', 'words', 'now', 'contact'] as const)(
    'parses #%s as a valid page',
    (page) => expect(parseSitePage(`#${page}`)).toBe(page),
  )

  it('falls back to index for empty and unknown hashes', () => {
    expect(parseSitePage('')).toBe('index')
    expect(parseSitePage('#unknown')).toBe('index')
  })

  it('creates stable hashes', () => {
    expect(sitePageHash('work')).toBe('#work')
  })
})
```

- [ ] **Step 2: Run the parser test and verify RED**

Run: `npm test -- src/lib/siteRoute.test.ts`

Expected: FAIL because `src/lib/siteRoute.ts` does not exist.

- [ ] **Step 3: Implement the route types and parser**

```ts
export const siteNavItems = [
  { page: 'index', label: 'INDEX 首页' },
  { page: 'work', label: 'WORK 工作' },
  { page: 'words', label: 'WORDS 内容' },
  { page: 'now', label: 'NOW 现在' },
  { page: 'contact', label: 'CONTACT 联系' },
] as const

export type SitePage = (typeof siteNavItems)[number]['page']

const pages = new Set<SitePage>(siteNavItems.map((item) => item.page))

export function parseSitePage(hash: string): SitePage {
  const candidate = hash.replace(/^#/, '').split('/')[0] as SitePage
  return pages.has(candidate) ? candidate : 'index'
}

export function sitePageHash(page: SitePage) {
  return `#${page}` as const
}
```

- [ ] **Step 4: Run the parser test and verify GREEN**

Run: `npm test -- src/lib/siteRoute.test.ts`

Expected: PASS.

- [ ] **Step 5: Write failing hook tests**

```tsx
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useHashRoute } from './useHashRoute'

describe('useHashRoute', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '#index')
    vi.stubGlobal('scrollTo', vi.fn())
  })
  afterEach(() => vi.unstubAllGlobals())

  it('updates after hash navigation', () => {
    const { result } = renderHook(() => useHashRoute())
    act(() => result.current.navigate('work'))
    expect(window.location.hash).toBe('#work')
    expect(result.current.page).toBe('work')
  })

  it('reacts to browser history and repairs invalid hashes', () => {
    const { result } = renderHook(() => useHashRoute())
    act(() => {
      window.history.replaceState(null, '', '#now')
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })
    expect(result.current.page).toBe('now')

    act(() => {
      window.history.replaceState(null, '', '#missing')
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })
    expect(result.current.page).toBe('index')
    expect(window.location.hash).toBe('#index')
  })
})
```

- [ ] **Step 6: Run the hook test and verify RED**

Run: `npm test -- src/hooks/useHashRoute.test.tsx`

Expected: FAIL because `useHashRoute` does not exist.

- [ ] **Step 7: Implement the hook**

```ts
import { useCallback, useEffect, useState } from 'react'
import { parseSitePage, sitePageHash, type SitePage } from '../lib/siteRoute'

export function useHashRoute() {
  const [page, setPage] = useState<SitePage>(() => parseSitePage(window.location.hash))

  useEffect(() => {
    const sync = () => {
      const next = parseSitePage(window.location.hash)
      if (window.location.hash !== sitePageHash(next)) {
        window.history.replaceState(null, '', sitePageHash(next))
      }
      setPage(next)
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const navigate = useCallback((next: SitePage) => {
    const hash = sitePageHash(next)
    if (window.location.hash === hash) {
      setPage(next)
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    setPage(next)
    window.location.hash = hash
  }, [])

  return { page, navigate }
}
```

- [ ] **Step 8: Run both route tests**

Run: `npm test -- src/lib/siteRoute.test.ts src/hooks/useHashRoute.test.tsx`

Expected: PASS with no warnings.

- [ ] **Step 9: Commit route foundation**

```bash
git add src/lib/siteRoute.ts src/lib/siteRoute.test.ts src/hooks/useHashRoute.ts src/hooks/useHashRoute.test.tsx
git commit -m "feat: add hash page routing"
```

---

### Task 2: Make navigation and App route-driven

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/components/TopNav.tsx`
- Modify: `src/components/TopNav.test.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Hero.test.tsx`

**Interfaces:**
- Consumes: `SitePage`, `siteNavItems`, `sitePageHash`, `useHashRoute()` from Task 1.
- Produces: `TopNav({ currentPage, onNavigate })` and one rendered primary page at a time.

- [ ] **Step 1: Replace scroll-state tests with route-state tests**

Add a shared renderer at the top of `TopNav.test.tsx` and replace every direct `<TopNav />` render with it:

```tsx
function renderNav(currentPage: SitePage = 'index', onNavigate = vi.fn()) {
  return render(<TopNav currentPage={currentPage} onNavigate={onNavigate} />)
}
```

```tsx
it('marks the current route without reading section positions', () => {
  const onNavigate = vi.fn()
  renderNav('now', onNavigate)
  expect(screen.getByRole('link', { name: 'NOW 现在' })).toHaveClass('bg-white')
  fireEvent.click(screen.getByRole('link', { name: 'WORK 工作' }))
  expect(onNavigate).toHaveBeenCalledWith('work')
})

it('does not register a scroll listener', () => {
  const listener = vi.spyOn(window, 'addEventListener')
  renderNav()
  expect(listener).not.toHaveBeenCalledWith('scroll', expect.any(Function), expect.anything())
})
```

Update the existing `App` test to assert only one page exists:

```tsx
it('renders only the page selected by the hash', () => {
  window.history.replaceState(null, '', '#words')
  render(<App />)
  expect(document.getElementById('words')).not.toBeNull()
  expect(document.getElementById('work')).toBeNull()
  expect(document.getElementById('now')).toBeNull()
})
```

- [ ] **Step 2: Run focused tests and verify RED**

Run: `npm test -- src/App.test.tsx src/components/TopNav.test.tsx src/components/Hero.test.tsx`

Expected: FAIL because `TopNav` has no route props and `App` renders every section.

- [ ] **Step 3: Refactor `TopNav` to route props**

Use this public interface and delete `navigationLock`, `navigationSettleTimer`, `syncActiveSection`, scroll listeners and dark-section inference:

```tsx
interface TopNavProps {
  currentPage: SitePage
  onNavigate: (page: SitePage) => void
}

export function TopNav({ currentPage, onNavigate }: TopNavProps) {
  const activeIndex = siteNavItems.findIndex((item) => item.page === currentPage)
  const items = siteNavItems.map((item) => ({
    label: item.label,
    href: sitePageHash(item.page),
  }))

  const selectNavigation = (index: number) => {
    const item = siteNavItems[index]
    if (item) onNavigate(item.page)
  }
}
```

Keep the current OPEN TO WORK panel markup byte-for-byte except for theme classes. Pass `items`, `activeIndex`, and `selectNavigation` to `GooeyNav`. Every mobile link keeps a real `href={sitePageHash(item.page)}` and uses this click handler:

```tsx
onClick={(event) => {
  event.preventDefault()
  onNavigate(item.page)
  setMenuOpen(false)
}}
```

- [ ] **Step 4: Move navigation into the global App shell**

```tsx
import type { ReactNode } from 'react'

const pages: Record<SitePage, ReactNode> = {
  index: <Hero />,
  work: <ProjectGrid projects={workItems} />,
  words: <ContentFeed items={words} />,
  now: <NowSection items={nowItems} />,
  contact: <Contact />,
}

export default function App() {
  const [assistantOpen, setAssistantOpen] = useState(false)
  const { page, navigate } = useHashRoute()

  return (
    <div className="min-h-screen bg-paper text-ink">
      <CustomCursor />
      <TopNav currentPage={page} onNavigate={navigate} />
      {pages[page]}
      <SpotlightCard className="spotlight-card--assistant spotlight-card--cta spotlight-card--glass fixed bottom-5 right-5 z-[90]" spotlightColor="rgba(56, 189, 248, .40)">
        <button type="button" onClick={() => setAssistantOpen(true)} aria-label="问我的 AI 助手">
          <Sparkles size={15} />
          <span className="sm:hidden">AI 助手</span>
          <span className="hidden sm:inline">问我的 AI 助手</span>
        </button>
      </SpotlightCard>
      <AssistantPanel open={assistantOpen} onClose={() => setAssistantOpen(false)} />
    </div>
  )
}
```

Remove `<TopNav />` and its import from `Hero.tsx`. Keep the hero `id="index"`.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run: `npm test -- src/App.test.tsx src/components/TopNav.test.tsx src/components/Hero.test.tsx`

Expected: PASS; no scroll-position tests remain.

- [ ] **Step 6: Commit the page-shell refactor**

```bash
git add src/App.tsx src/App.test.tsx src/components/TopNav.tsx src/components/TopNav.test.tsx src/components/Hero.tsx src/components/Hero.test.tsx
git commit -m "feat: switch primary sections by navigation"
```

---

### Task 3: Add the theme engine and no-flash startup

**Files:**
- Create: `src/theme/ThemeProvider.tsx`
- Create: `src/theme/ThemeProvider.test.tsx`
- Create: `src/components/ThemeToggle.tsx`
- Modify: `src/main.tsx`
- Modify: `index.html`
- Modify: `src/index.css`
- Modify: `tailwind.config.ts`

**Interfaces:**
- Produces: `Theme`, `ThemeProvider`, `useTheme()` and `ThemeToggle`.
- `useTheme()` returns `{ theme: 'light' | 'dark'; toggleTheme(): void }`.

- [ ] **Step 1: Write failing theme behavior tests**

```tsx
import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { ThemeProvider, useTheme } from './ThemeProvider'

function ThemeProbe() {
  const { theme, toggleTheme } = useTheme()
  return <button onClick={toggleTheme}>{theme}</button>
}

beforeEach(() => localStorage.clear())
afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

it('uses the saved theme before the system preference', () => {
  localStorage.setItem('portfolio-theme', 'dark')
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
  render(<ThemeProvider><ThemeProbe /></ThemeProvider>)
  expect(screen.getByRole('button')).toHaveTextContent('dark')
  expect(document.documentElement.dataset.theme).toBe('dark')
})

it('follows the system when no user theme is saved and persists toggles', () => {
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
  render(<ThemeProvider><ThemeProbe /></ThemeProvider>)
  expect(screen.getByRole('button')).toHaveTextContent('dark')
  fireEvent.click(screen.getByRole('button'))
  expect(localStorage.getItem('portfolio-theme')).toBe('light')
})

it('still switches when local storage is unavailable', () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked') })
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked') })
  render(<ThemeProvider><ThemeProbe /></ThemeProvider>)
  fireEvent.click(screen.getByRole('button'))
  expect(screen.getByRole('button')).toHaveTextContent('dark')
})
```

- [ ] **Step 2: Run theme tests and verify RED**

Run: `npm test -- src/theme/ThemeProvider.test.tsx`

Expected: FAIL because the theme provider does not exist.

- [ ] **Step 3: Implement `ThemeProvider`**

```tsx
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Theme = 'light' | 'dark'
const STORAGE_KEY = 'portfolio-theme'

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | null>(null)

function savedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Theme switching still works when storage is unavailable.
  }
}

function initialTheme(): Theme {
  const saved = savedTheme()
  if (saved) return saved
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      storeTheme(next)
      return next
    }),
  }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme must be used inside ThemeProvider')
  return value
}
```

- [ ] **Step 4: Add startup theme initialization**

Add this script inside `<head>` in `index.html` before the stylesheet / app entry:

```html
<script>
  try {
    const savedTheme = localStorage.getItem('portfolio-theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.dataset.theme =
      savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : systemDark ? 'dark' : 'light'
  } catch {
    document.documentElement.dataset.theme = 'light'
  }
</script>
```

Wrap `<App />` with `<ThemeProvider>` in `src/main.tsx`.

- [ ] **Step 5: Convert Tailwind colors to semantic variables**

In `tailwind.config.ts`:

```ts
colors: {
  paper: 'rgb(var(--color-page) / <alpha-value>)',
  surface: 'rgb(var(--color-surface) / <alpha-value>)',
  ink: 'rgb(var(--color-text) / <alpha-value>)',
  muted: 'rgb(var(--color-muted) / <alpha-value>)',
  line: 'rgb(var(--color-line) / <alpha-value>)',
  signal: '#e44832',
},
```

At the top of `src/index.css`:

```css
:root,
:root[data-theme='light'] {
  color-scheme: light;
  --color-page: 243 240 233;
  --color-surface: 250 248 243;
  --color-text: 17 20 23;
  --color-muted: 103 105 106;
  --color-line: 17 20 23;
}

:root[data-theme='dark'] {
  color-scheme: dark;
  --color-page: 11 13 15;
  --color-surface: 18 21 25;
  --color-text: 243 240 233;
  --color-muted: 167 165 160;
  --color-line: 243 240 233;
}

html,
body {
  background: rgb(var(--color-page));
  color: rgb(var(--color-text));
}
```

- [ ] **Step 6: Implement `ThemeToggle`**

```tsx
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../theme/ThemeProvider'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? '切换到浅色模式' : '切换到深色模式'}
      className={className}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
```

- [ ] **Step 7: Run theme tests and build**

Run: `npm test -- src/theme/ThemeProvider.test.tsx`

Expected: PASS.

Run: `npm run build`

Expected: TypeScript and Vite build complete successfully.

- [ ] **Step 8: Commit the theme engine**

```bash
git add src/theme/ThemeProvider.tsx src/theme/ThemeProvider.test.tsx src/components/ThemeToggle.tsx src/main.tsx index.html src/index.css tailwind.config.ts
git commit -m "feat: add persistent light and dark themes"
```

---

### Task 4: Add global page transitions and theme-aware navigation

**Files:**
- Create: `src/components/PageTransition.tsx`
- Create: `src/components/PageTransition.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/TopNav.tsx`
- Modify: `src/components/TopNav.test.tsx`
- Modify: `src/components/SpotlightCard.css`
- Modify: `src/components/GooeyNav.css`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: `SitePage` and `ThemeToggle`.
- Produces: `PageTransition({ page, children })`.

- [ ] **Step 1: Write failing transition and navigation tests**

```tsx
import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { ThemeProvider } from '../theme/ThemeProvider'
import { PageTransition } from './PageTransition'
import { TopNav } from './TopNav'

it('keys the transition surface by page', () => {
  const { rerender } = render(<PageTransition page="work"><div>Work</div></PageTransition>)
  const first = screen.getByTestId('page-transition')
  rerender(<PageTransition page="words"><div>Words</div></PageTransition>)
  expect(screen.getByTestId('page-transition')).not.toBe(first)
})

it('shows a theme toggle in desktop navigation and the mobile menu', () => {
  render(
    <ThemeProvider>
      <TopNav currentPage="index" onNavigate={vi.fn()} />
    </ThemeProvider>,
  )
  expect(screen.getByRole('button', { name: '切换到深色模式' })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: '打开菜单' }))
  expect(screen.getAllByRole('button', { name: '切换到深色模式' })).toHaveLength(2)
})
```

- [ ] **Step 2: Run focused tests and verify RED**

Run: `npm test -- src/components/PageTransition.test.tsx src/components/TopNav.test.tsx`

Expected: FAIL because page transitions and theme toggles are absent.

- [ ] **Step 3: Implement the transition wrapper**

```tsx
import type { ReactNode } from 'react'
import type { SitePage } from '../lib/siteRoute'

export function PageTransition({ page, children }: {
  page: SitePage
  children: ReactNode
}) {
  return (
    <div key={page} data-testid="page-transition" data-page={page} className="page-enter">
      {children}
    </div>
  )
}
```

Wrap `pages[page]` in `<PageTransition page={page}>` inside `App.tsx`.

- [ ] **Step 4: Add restrained motion and reduced-motion fallback**

```css
@keyframes page-enter {
  from { opacity: 0; transform: translateY(18px); filter: blur(5px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}

.page-enter {
  animation: page-enter 420ms cubic-bezier(.22, 1, .36, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .page-enter { animation: none; }
}
```

- [ ] **Step 5: Add theme controls to navigation**

Place `<ThemeToggle>` beside OPEN TO WORK on desktop and above the resume button inside the mobile menu. Replace route-context text classes with `text-ink`, use `bg-surface/80`, `border-line/15`, and retain the existing solid AI assistant button.

Update `SpotlightCard.css` and `GooeyNav.css` to use these variables:

```css
.spotlight-card--glass {
  background: rgb(var(--color-surface) / .78);
  color: rgb(var(--color-text));
  outline-color: rgb(var(--color-line) / .2);
}

.gooey-nav-items a { color: rgb(var(--color-text) / .68); }
.gooey-nav-items a.active {
  background: rgb(var(--color-text));
  color: rgb(var(--color-page));
}
```

- [ ] **Step 6: Run focused tests and verify GREEN**

Run: `npm test -- src/components/PageTransition.test.tsx src/components/TopNav.test.tsx src/App.test.tsx`

Expected: PASS.

- [ ] **Step 7: Commit transition and navigation theme work**

```bash
git add src/components/PageTransition.tsx src/components/PageTransition.test.tsx src/App.tsx src/components/TopNav.tsx src/components/TopNav.test.tsx src/components/SpotlightCard.css src/components/GooeyNav.css src/index.css
git commit -m "feat: add themed page transitions"
```

---

### Task 5: Redesign WORK as an editorial project directory

**Files:**
- Modify: `src/data/portfolio.ts`
- Modify: `src/components/ProjectGrid.tsx`
- Modify: `src/components/ProjectGrid.test.tsx`
- Modify: `src/components/SectionHeading.tsx`

**Interfaces:**
- Consumes: `WorkItem[]`.
- Extends: `WorkItem.detailHref?: string`.
- Produces: one chronological directory row per company/project and no dead links.

- [ ] **Step 1: Write failing directory tests**

```tsx
it('renders work in newest-to-oldest directory rows', () => {
  render(<ProjectGrid projects={workItems} />)
  const rows = screen.getAllByTestId('work-row')
  expect(rows).toHaveLength(3)
  expect(within(rows[0]).getByText('华为')).toBeInTheDocument()
  expect(within(rows[1]).getByText('深圳市顺丰丰链科技有限责任公司')).toBeInTheDocument()
  expect(within(rows[2]).getByText('深圳市明源云科技有限公司')).toBeInTheDocument()
})

it('does not create a project link without a real detailHref', () => {
  render(<ProjectGrid projects={workItems} />)
  expect(screen.queryByRole('link', { name: /查看项目详情/ })).not.toBeInTheDocument()
})

it('uses one subtle divider contract for every company', () => {
  render(<ProjectGrid projects={workItems} />)
  screen.getAllByTestId('work-row').forEach((row) => {
    expect(row).toHaveClass('border-line/15')
  })
})
```

- [ ] **Step 2: Run the project test and verify RED**

Run: `npm test -- src/components/ProjectGrid.test.tsx`

Expected: FAIL because the current component renders large cards and has no work-row test id.

- [ ] **Step 3: Add the optional detail interface**

```ts
export interface WorkItem extends Project {
  company: string
  companyPeriod: string
  companyFocus: string
  detailLabel: string
  detailHref?: string
}
```

Do not add `detailHref` to existing data until a real detail page exists.

- [ ] **Step 4: Replace cards with directory rows**

The row structure must be:

```tsx
<article
  data-testid="work-row"
  className="group grid gap-5 border-b border-line/15 py-8 transition-colors hover:bg-surface/70 md:grid-cols-[64px_190px_minmax(0,1fr)_minmax(260px,.7fr)] md:px-4 md:py-10"
>
  <span className="font-mono text-xs text-signal">{project.number}</span>
  <div>
    <p className="text-sm font-semibold">{project.company}</p>
    <p className="mt-2 text-xs text-muted">{project.companyPeriod}</p>
  </div>
  <div>
    <span className="text-[10px] font-semibold uppercase text-signal">{project.category}</span>
    <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">{project.title}</h2>
    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{project.summary}</p>
  </div>
  <div className="border-l border-line/15 pl-5">
    <p className="text-[10px] font-semibold uppercase text-muted">MY ROLE</p>
    <p className="mt-3 text-sm leading-6">{project.role}</p>
    <ul className="mt-5 space-y-2">
      {project.results.map((result) => <li key={result} className="text-sm text-muted">{result}</li>)}
    </ul>
    {project.detailHref ? (
      <a href={project.detailHref} className="mt-5 inline-flex text-sm font-semibold">{project.detailLabel}</a>
    ) : null}
  </div>
</article>
```

Use a single top and bottom border around the directory. Remove `tones`, featured-card spanning, backdrop cards and all Huawei-specific border branches.

- [ ] **Step 5: Run project tests and verify GREEN**

Run: `npm test -- src/components/ProjectGrid.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit WORK redesign**

```bash
git add src/data/portfolio.ts src/components/ProjectGrid.tsx src/components/ProjectGrid.test.tsx src/components/SectionHeading.tsx
git commit -m "feat: redesign work as project directory"
```

---

### Task 6: Redesign WORDS, stabilize NOW, and theme CONTACT

**Files:**
- Modify: `src/components/ContentFeed.tsx`
- Create: `src/components/ContentFeed.test.tsx`
- Modify: `src/components/NowSection.tsx`
- Create: `src/components/NowSection.test.tsx`
- Modify: `src/components/Contact.tsx`
- Create: `src/components/Contact.test.tsx`

**Interfaces:**
- Consumes: `WordItem[]`, `NowItem[]` and existing contact constants.
- Produces: truthful content links, five-row pagination and theme-aware contact surfaces.

- [ ] **Step 1: Write failing WORDS tests**

```tsx
it('makes content type the first label in every entry', () => {
  render(<ContentFeed items={words} />)
  expect(screen.getByText('ARTICLE')).toBeInTheDocument()
  expect(screen.getByText('VIDEO')).toBeInTheDocument()
  expect(screen.getByText('VIBE CODING')).toBeInTheDocument()
})

it('only creates links when href exists', () => {
  const linked = [{ ...words[0], href: 'https://example.com/article' }, words[1]]
  render(<ContentFeed items={linked} />)
  expect(screen.getByRole('link', { name: /AI 产品文章/ })).toHaveAttribute('href', 'https://example.com/article')
  expect(screen.queryByRole('link', { name: /视频与公开表达/ })).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Write failing NOW tests**

```tsx
it('shows at most five items and keeps a fixed list surface', () => {
  render(<NowSection items={nowItems} />)
  expect(screen.getAllByTestId('now-row')).toHaveLength(5)
  expect(screen.getByTestId('now-list')).toHaveClass('min-h-[690px]')
})

it('shows the sixth item on the second page', () => {
  render(<NowSection items={nowItems} />)
  fireEvent.click(screen.getByRole('button', { name: '下一页' }))
  expect(screen.getByText('为个人网站增加可交互的信息入口')).toBeInTheDocument()
})
```

- [ ] **Step 3: Write failing CONTACT tests**

```tsx
it('keeps all copy actions and uses semantic surfaces', () => {
  render(<Contact />)
  expect(screen.getByRole('button', { name: '复制电话' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '复制邮箱' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '复制微信' })).toBeInTheDocument()
  expect(screen.getByAltText('添加张楠微信的二维码')).toBeInTheDocument()
  expect(document.getElementById('contact')).toHaveClass('bg-paper')
})
```

- [ ] **Step 4: Run the three tests and verify RED**

Run: `npm test -- src/components/ContentFeed.test.tsx src/components/NowSection.test.tsx src/components/Contact.test.tsx`

Expected: FAIL on missing test ids, static card structure and fixed contact colors.

- [ ] **Step 5: Implement the WORDS directory**

Render each item through a shared `content` node and conditionally wrap it:

```tsx
const content = (
  <>
    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-signal">{item.type}</span>
    <h2 className="mt-4 text-3xl font-semibold md:text-5xl">{item.title}</h2>
    <p className="mt-4 max-w-xl text-sm leading-7 text-muted">{item.description}</p>
  </>
)

return item.href ? (
  <a href={item.href} className="content-directory-row">{content}<ArrowUpRight /></a>
) : (
  <article className="content-directory-row">{content}</article>
)
```

Use one directory border and three equal entries; remove fixed pastel accent backgrounds from layout decisions while keeping `accent` data untouched for compatibility.

- [ ] **Step 6: Stabilize NOW**

Add `data-testid="now-list"` and `min-h-[690px]` to the list container, add `data-testid="now-row"` to every row, replace `bg-[#111417]` with `bg-paper`, `text-white` with `text-ink`, and all white alpha borders/text with `border-line/15` and `text-muted`. Keep `pageSize = 5` and existing button bounds.

- [ ] **Step 7: Convert CONTACT to semantic theme classes**

Use `bg-paper text-ink` for the page, `bg-surface border-line/15` for the details card, `border-line/15` for rows and platform buttons, and a controlled `bg-ink text-paper` portrait panel. Keep all current contact values, copy buttons, QR image and resume access unchanged.

- [ ] **Step 8: Run the three tests and verify GREEN**

Run: `npm test -- src/components/ContentFeed.test.tsx src/components/NowSection.test.tsx src/components/Contact.test.tsx`

Expected: PASS.

- [ ] **Step 9: Commit content pages**

```bash
git add src/components/ContentFeed.tsx src/components/ContentFeed.test.tsx src/components/NowSection.tsx src/components/NowSection.test.tsx src/components/Contact.tsx src/components/Contact.test.tsx
git commit -m "feat: refine content now and contact pages"
```

---

### Task 7: Finish responsive, accessibility, and full verification

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `src/components/TopNav.test.tsx`
- Modify: `src/components/Hero.test.tsx`
- Modify: `src/index.css`
- Modify: `README.md`

**Interfaces:**
- Consumes: all route, theme and page components from Tasks 1–6.
- Produces: tested desktop/mobile release candidate.

- [ ] **Step 1: Add integration regression tests**

```tsx
it.each([
  ['#index', 'AI PRODUCT MGR'],
  ['#work', 'AI 不止能生成'],
  ['#words', '持续思考'],
  ['#now', '此刻，我在关注什么'],
  ['#contact', "LET'S TALK"],
])('renders only the target page for %s', (hash, heading) => {
  window.history.replaceState(null, '', hash)
  render(<App />)
  expect(screen.getByRole('heading', { name: new RegExp(heading, 'i') })).toBeInTheDocument()
  expect(screen.getByTestId('page-transition')).toHaveAttribute('data-page', hash.slice(1))
})

it('keeps the global assistant available on every page', () => {
  window.history.replaceState(null, '', '#contact')
  render(<App />)
  expect(screen.getByRole('button', { name: '问我的 AI 助手' })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run integration tests and verify RED if any contract is missing**

Run: `npm test -- src/App.test.tsx src/components/TopNav.test.tsx src/components/Hero.test.tsx`

Expected before final fixes: any missing accessible heading or page marker fails with a precise assertion.

- [ ] **Step 3: Add final responsive CSS**

```css
.page-shell {
  width: min(100% - 2.5rem, 1600px);
  margin-inline: auto;
}

.content-directory-row {
  display: grid;
  min-height: 220px;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  padding: 2rem 1rem;
  border-bottom: 1px solid rgb(var(--color-line) / .15);
  transition: background-color 240ms ease, padding 240ms ease;
}

@media (max-width: 767px) {
  .page-shell { width: min(100% - 1.5rem, 1600px); }
  .content-directory-row { min-height: 180px; padding: 1.5rem 0; }
}
```

Ensure the WORK directory removes its left role border below `768px`, mobile menu links retain weak separators and larger spacing, and no page uses `overflow-x: auto` except intentional chip rows.

- [ ] **Step 4: Document the navigation and theme behavior**

Add to `README.md`:

```md
## Navigation and theme

- Primary pages use GitHub Pages-safe hashes: `#index`, `#work`, `#words`, `#now`, and `#contact`.
- The first visit follows the operating-system color scheme.
- A manual theme choice is stored under `portfolio-theme` in local storage.
```

- [ ] **Step 5: Run the entire automated suite**

Run: `npm test`

Expected: all Vitest suites PASS with no unhandled errors.

- [ ] **Step 6: Run production build and formatting checks**

Run: `npm run build`

Expected: TypeScript build and Vite production bundle complete successfully.

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 7: Run local visual verification**

Run: `npm run dev -- --host 127.0.0.1`

Verify in the local preview:

- Desktop: 1440px wide, each menu changes page without scrolling through intermediate content.
- Mobile: 390×844, menu is vertical, music is absent, portrait remains visible, and no horizontal overflow occurs.
- Theme: light → dark → refresh retains dark; dark → light retains light.
- Reduced motion: page content appears immediately with no blur or translation.
- WORK: all three companies use equal subtle dividers.
- WORDS: ARTICLE / VIDEO / VIBE CODING are visible before summaries.
- NOW: five rows on page 1, one row on page 2, list surface height remains stable.
- CONTACT: phone, email and WeChat remain aligned and copyable.

- [ ] **Step 8: Commit release verification changes**

```bash
git add src/App.test.tsx src/components/TopNav.test.tsx src/components/Hero.test.tsx src/index.css README.md
git commit -m "test: verify responsive themed page navigation"
```
