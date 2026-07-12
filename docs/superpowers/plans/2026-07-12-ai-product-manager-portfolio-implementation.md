# AI 产品经理个人网站 1.0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a PC-first, single-page AI product manager portfolio that makes the candidate's AI product identity, three enterprise cases, and contact path clear in one visit.

**Architecture:** React + TypeScript + Vite renders data-driven page sections; pure hero-motion helpers keep pointer easing and grid offsets testable. The Hero owns the pointer reveal canvas, while content sections consume typed content in `src/data/portfolio.ts`. The 1.0 assistant is a local UI state machine with preset answers only.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, lucide-react, @supabase/supabase-js (installed but unused in 1.0), Vitest, Testing Library.

## Global Constraints

- Use React 18, TypeScript, Vite and Tailwind CSS.
- Runtime dependencies are `react`, `react-dom`, `lucide-react` and `@supabase/supabase-js`; do not add UI or animation libraries.
- `src/index.css` contains the requested Inter import, Tailwind directives and global Inter selector verbatim.
- Hero grid uses a 48px SVG pattern; its pointer reveal uses a canvas radial mask with a 260px radius.
- Use the two supplied remote Hero URLs as temporary CSS background URLs; do not download them.
- Use no product-selling copy from the Reveal Hero reference; the Hero must lead with AI product manager identity.
- Keep internal enterprise information abstracted: no code, internal screen, architecture, secret or unapproved metric may be displayed.
- Desktop content width targets 1700px; mobile must remain readable without horizontal overflow.
- The AI assistant is local, preset-answer UI only; it makes no network/model/Supabase request.

---

### Task 1: Scaffold the Vite and Tailwind application

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/index.css`
- Create: `src/App.tsx`
- Create: `src/vite-env.d.ts`

**Interfaces:**
- Produces: `App` as the root React component in `src/App.tsx`.
- Produces: `npm run dev`, `npm run build`, `npm run test` scripts.

- [ ] **Step 1: Create the initial render test**

```tsx
// src/App.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the AI product manager identity', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /AI APPLICATION PRODUCT MANAGER/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- src/App.test.tsx`

Expected: FAIL because the Vite application and `App` module do not exist.

- [ ] **Step 3: Add application configuration and the minimal App**

Use the following scripts in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest run"
  }
}
```

Create `src/index.css` exactly as required:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  font-family: 'Inter', sans-serif;
}
```

Implement `App` with the required root wrapper and heading:

```tsx
export default function App() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      <h1 className="sr-only">AI APPLICATION PRODUCT MANAGER</h1>
    </div>
  )
}
```

- [ ] **Step 4: Run the test and production build**

Run: `npm run test -- src/App.test.tsx && npm run build`

Expected: test passes and Vite writes `dist/` without TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add package.json vite.config.ts tsconfig.json tailwind.config.ts postcss.config.js index.html src
git commit -m "feat: scaffold portfolio application"
```

### Task 2: Implement testable Hero motion utilities

**Files:**
- Create: `src/lib/heroMotion.ts`
- Create: `src/lib/heroMotion.test.ts`

**Interfaces:**
- Produces: `SPOTLIGHT_R = 260`, `GRID_CELL = 48`.
- Produces: `easeToward(current: number, target: number, factor: number): number`.
- Produces: `getGridTarget(pointerX, pointerY, rect): { x: number; y: number }`.
- Consumed by: `src/components/Hero.tsx`.

- [ ] **Step 1: Write failing motion utility tests**

```ts
import { describe, expect, it } from 'vitest'
import { GRID_CELL, SPOTLIGHT_R, easeToward, getGridTarget } from './heroMotion'

describe('hero motion helpers', () => {
  it('exports the confirmed grid and spotlight constants', () => {
    expect(GRID_CELL).toBe(48)
    expect(SPOTLIGHT_R).toBe(260)
  })

  it('eases only part of the distance to a target', () => {
    expect(easeToward(0, 100, 0.1)).toBe(10)
  })

  it('maps the right bottom corner to positive grid movement', () => {
    expect(getGridTarget(100, 100, { left: 0, top: 0, width: 100, height: 100 })).toEqual({ x: 8, y: 8 })
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- src/lib/heroMotion.test.ts`

Expected: FAIL because `heroMotion.ts` does not exist.

- [ ] **Step 3: Implement only the tested helpers**

```ts
export const SPOTLIGHT_R = 260
export const GRID_CELL = 48

export function easeToward(current: number, target: number, factor: number) {
  return current + (target - current) * factor
}

export function getGridTarget(pointerX: number, pointerY: number, rect: { left: number; top: number; width: number; height: number }) {
  const cx = (pointerX - rect.left) / rect.width - 0.5
  const cy = (pointerY - rect.top) / rect.height - 0.5
  return { x: cx * 16, y: cy * 16 }
}
```

- [ ] **Step 4: Run the test suite**

Run: `npm run test -- src/lib/heroMotion.test.ts`

Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/heroMotion.ts src/lib/heroMotion.test.ts
git commit -m "feat: add hero motion helpers"
```

### Task 3: Build the reusable navigation, Hero and reveal layers

**Files:**
- Create: `src/components/TopNav.tsx`
- Create: `src/components/RevealLayer.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/Hero.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `SPOTLIGHT_R`, `GRID_CELL`, `easeToward`, `getGridTarget` from `src/lib/heroMotion.ts`.
- Produces: anchor ids `work`, `experience`, `words`, `now`, `contact` used by navigation.
- Produces: `onOpenAssistant(): void` callback from `Hero` to `App`.

- [ ] **Step 1: Write the failing Hero interaction test**

```tsx
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Hero } from './Hero'

describe('Hero', () => {
  it('opens the assistant from its visible action', () => {
    const onOpenAssistant = vi.fn()
    render(<Hero onOpenAssistant={onOpenAssistant} />)
    fireEvent.click(screen.getByRole('button', { name: '问我的 AI 助手' }))
    expect(onOpenAssistant).toHaveBeenCalledOnce()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- src/components/Hero.test.tsx`

Expected: FAIL because `Hero` does not exist.

- [ ] **Step 3: Implement the Hero contract**

Implement a 100vh section with these requirements:

- An inline SVG `<pattern id="grid">` at 48px, opacity 0.1, with path `M 48 0 L 0 0 0 48` and `stroke="#64748b"`.
- `BG_IMAGE_1` and `BG_IMAGE_2` exactly match the URLs supplied in the approved prompt and are only used as CSS `backgroundImage` values.
- `RevealLayer` owns an off-screen canvas; on animation frames it draws the approved six-stop radial gradient and applies `canvas.toDataURL()` as the `maskImage` and `WebkitMaskImage` of the `BG_IMAGE_2` layer.
- Pointer motion uses refs and one `requestAnimationFrame` loop; raw pointer moves toward the rendered pointer at 0.1, and grid offsets move at 0.06.
- Hero copy is `AI APPLICATION PRODUCT MANAGER.`, `有用户体验思维和产品审美，懂 AI 落地的 AI 产品经理。`, buttons `查看精选案例`, `下载简历`, and `问我的 AI 助手`.
- `TopNav` uses the supplied inline SVG logo; desktop navigation is a dark pill and mobile navigation uses `Menu` and `X` from lucide-react.

- [ ] **Step 4: Run focused tests and inspect the Hero**

Run: `npm run test -- src/components/Hero.test.tsx && npm run build`

Expected: test passes and production build completes.

Run: `npm run dev -- --host 127.0.0.1`

Expected: Hero shows a light grid, product-manager title, pointer reveal and readable buttons at desktop width.

- [ ] **Step 5: Commit**

```bash
git add src/components/TopNav.tsx src/components/RevealLayer.tsx src/components/Hero.tsx src/components/Hero.test.tsx src/App.tsx
git commit -m "feat: add interactive portfolio hero"
```

### Task 4: Add typed portfolio data and case/experience modules

**Files:**
- Create: `src/data/portfolio.ts`
- Create: `src/components/SectionHeading.tsx`
- Create: `src/components/ProjectGrid.tsx`
- Create: `src/components/Experience.tsx`
- Create: `src/components/ProjectGrid.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `projects: Project[]` and `experiences: Experience[]` from `src/data/portfolio.ts`.
- Produces: `ProjectGrid({ projects }: { projects: Project[] })`.
- Consumed by: `App` and future project detail pages.

- [ ] **Step 1: Write the failing project-data test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { projects } from '../data/portfolio'
import { ProjectGrid } from './ProjectGrid'

describe('ProjectGrid', () => {
  it('shows the three confirmed cases and the first project result', () => {
    render(<ProjectGrid projects={projects} />)
    expect(screen.getByText('AI 创意工场')).toBeInTheDocument()
    expect(screen.getByText('智能仓储调度')).toBeInTheDocument()
    expect(screen.getByText('AI IDE 研发助手')).toBeInTheDocument()
    expect(screen.getByText(/效率约提升 200%/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- src/components/ProjectGrid.test.tsx`

Expected: FAIL because portfolio data and grid components do not exist.

- [ ] **Step 3: Implement data and modules**

Create `Project` with `number`, `title`, `year`, `summary`, `role`, `results`, `tags`, and `tone` fields. Encode only the approved, public or abstracted content from the design specification.

Render project cards as indexed editorial cards with:

- Case number and topic tag at the top.
- Large project name and scenario summary.
- Roles and results as readable content; first case exposes `效率约提升 200%`.
- Local blue/ink grid overlays inspired by Nimbus Grid, not copied source media.

Render the three company roles as an accessible timeline in `Experience` and include the four approved capability labels.

- [ ] **Step 4: Run focused tests and build**

Run: `npm run test -- src/components/ProjectGrid.test.tsx && npm run build`

Expected: test passes and build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/data/portfolio.ts src/components/SectionHeading.tsx src/components/ProjectGrid.tsx src/components/Experience.tsx src/components/ProjectGrid.test.tsx src/App.tsx
git commit -m "feat: add portfolio cases and experience"
```

### Task 5: Add content, Now, local assistant and contact modules

**Files:**
- Create: `src/components/ContentFeed.tsx`
- Create: `src/components/NowSection.tsx`
- Create: `src/components/AssistantPanel.tsx`
- Create: `src/components/Contact.tsx`
- Create: `src/components/AssistantPanel.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `AssistantPanel({ open, onClose }: { open: boolean; onClose(): void })`.
- Consumes: `openAssistant: boolean` state in `App`.

- [ ] **Step 1: Write the failing preset-answer test**

```tsx
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AssistantPanel } from './AssistantPanel'

describe('AssistantPanel', () => {
  it('renders a local preset answer without an external request', () => {
    render(<AssistantPanel open onClose={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: '你做过哪些 AI 项目？' }))
    expect(screen.getByText(/AI 创意工场、智能仓储调度和 AI IDE/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- src/components/AssistantPanel.test.tsx`

Expected: FAIL because `AssistantPanel` does not exist.

- [ ] **Step 3: Implement the local interaction modules**

Implement `AssistantPanel` as an accessible fixed side panel with close control, the approved welcome text, and these preset questions:

```ts
const answers = {
  '你做过哪些 AI 项目？': '我做过 AI 创意工场、智能仓储调度和 AI IDE 研发助手，分别覆盖营销 AIGC、供应链智能协同和开发者智能编码工作流。',
  '你在 AI IDE 中负责什么？': '我负责核心智能编码场景的产品定义与落地，主导需求设计、模型效果评估与研发协同，并推动 MVP 到正式上线。',
  '如何联系你？': '可通过页面底部的联系入口、简历下载和内容平台与我交流。'
}
```

Implement `ContentFeed` with content themes and platform labels only, `NowSection` with current-topic/creative/life entries, and `Contact` with replaceable placeholder values and no real submission form.

- [ ] **Step 4: Run focused tests and build**

Run: `npm run test -- src/components/AssistantPanel.test.tsx && npm run build`

Expected: test passes and build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/ContentFeed.tsx src/components/NowSection.tsx src/components/AssistantPanel.tsx src/components/Contact.tsx src/components/AssistantPanel.test.tsx src/App.tsx
git commit -m "feat: add content contact and local assistant"
```

### Task 6: Perform visual QA and document replacement points

**Files:**
- Create: `README.md`
- Modify: `src/App.tsx`
- Modify: `src/data/portfolio.ts`

**Interfaces:**
- Consumes: all sections from Tasks 1–5.
- Produces: documented local run/build instructions and explicit replacement locations for profile data, contacts, social URLs and temporary Hero images.

- [ ] **Step 1: Write the failing navigation test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('portfolio navigation', () => {
  it('links work navigation to the work section', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /WORK 案例/i })).toHaveAttribute('href', '#work')
    expect(document.getElementById('work')).not.toBeNull()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- src/App.test.tsx`

Expected: FAIL until the navigation link and target id are wired together.

- [ ] **Step 3: Wire anchors and add the README**

Ensure every navigation item links to a real section id. In `README.md`, include:

```md
# AI 产品经理个人网站

## Commands

- `npm install`
- `npm run dev`
- `npm run test`
- `npm run build`

## Replace before publishing

- `src/data/portfolio.ts`: personal name, email, social URLs and case content.
- `src/components/Hero.tsx`: temporary remote Hero image URLs with licensed personal or original assets.
- `public/resume.pdf`: add the real resume file before enabling the download link.
```

- [ ] **Step 4: Run full automated and visual verification**

Run: `npm run test && npm run build`

Expected: all tests pass and production build succeeds.

Run the local Vite server, inspect at 1440px and 390px widths, and verify:

- Hero title, buttons and navigation remain visible.
- No section causes horizontal scroll.
- Case metrics are legible and the project ordering is correct.
- Assistant opens, answers a preset question and closes.
- No internal-project screens, private data or unapproved information appear.

- [ ] **Step 5: Commit**

```bash
git add README.md src/App.tsx src/data/portfolio.ts src/App.test.tsx
git commit -m "docs: add portfolio run and replacement guide"
```
