# Work Minimal Opening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Work opening with a title, supporting description, and project-gallery label while preserving every project card.

**Architecture:** `ProjectGrid` will own its opening layout instead of using the shared `SectionHeading`. The section will render one display heading followed by the existing project-card grid, so no data model or project interaction needs to change.

**Tech Stack:** React, TypeScript, Tailwind CSS, Vitest, Testing Library, Vite.

## Global Constraints

- Change only `ProjectGrid` and its focused test.
- Remove the Work opening index, eyebrow, and divider.
- Keep the supporting description beneath the title and render a small project-gallery label at the upper right on desktop.
- Keep the three project cards and their responsive gallery behavior unchanged.
- Do not add dependencies or project-detail links.

---

### Task 1: Simplify the Work opening

**Files:**
- Modify: `src/components/ProjectGrid.test.tsx`
- Modify: `src/components/ProjectGrid.tsx`

**Interfaces:**
- Consumes: `ProjectGrid({ projects }: { projects: WorkItem[] })`
- Produces: the same component API with a project-gallery Work opening.

- [x] **Step 1: Write the failing test**

```tsx
it('uses a project-gallery opening with the supporting description', () => {
  render(<ProjectGrid projects={workItems} />)

  expect(screen.getByRole('heading', { name: /AI 不止能生成/ })).toBeInTheDocument()
  expect(screen.getByText(/三个企业级场景/)).toBeInTheDocument()
  expect(screen.getByText(/PROJECT GALLERY/)).toBeInTheDocument()
})
```

- [x] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- --run src/components/ProjectGrid.test.tsx`

Expected: the supporting description assertion fails because the opening has not yet been updated.

- [x] **Step 3: Write the minimal implementation**

```tsx
<div className="grid gap-8 pb-10 md:grid-cols-[minmax(0,1fr)_220px] md:pb-20">
  <div className="max-w-5xl">
    <h2>AI 不止能生成，<br />还要进入真实工作流。</h2>
    <p>三个企业级场景，展示我如何从用户问题出发，定义 AI 能力边界，并把产品推进到可使用、可衡量的结果。</p>
  </div>
  <p>PROJECT GALLERY /<br />SELECTED WORK</p>
</div>
```

Remove the `SectionHeading` import and render this title block immediately before the existing card grid. Do not change the card map or its classes.

- [x] **Step 4: Run the focused test to verify it passes**

Run: `npm test -- --run src/components/ProjectGrid.test.tsx`

Expected: PASS.

- [x] **Step 5: Run full verification**

Run: `npm test -- --run && npm run build && git diff --check`

Expected: all tests pass, the production build succeeds, and no whitespace errors are reported.

- [x] **Step 6: Check visual layout**

Open the Work route at desktop width and 390px width. Confirm the title is the only opening content, there is generous space before the first card, and the title/card layout has no horizontal overflow.

- [x] **Step 7: Commit**

```bash
git add src/components/ProjectGrid.tsx src/components/ProjectGrid.test.tsx docs/superpowers/plans/2026-07-19-work-minimal-opening.md
git commit -m "feat: simplify work opening"
```
