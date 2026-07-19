# Work Minimal Opening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Work opening with a title-only project-gallery introduction while preserving every project card.

**Architecture:** `ProjectGrid` will own its opening layout instead of using the shared `SectionHeading`. The section will render one display heading followed by the existing project-card grid, so no data model or project interaction needs to change.

**Tech Stack:** React, TypeScript, Tailwind CSS, Vitest, Testing Library, Vite.

## Global Constraints

- Change only `ProjectGrid` and its focused test.
- Remove the Work opening index, eyebrow, description, and divider.
- Keep the three project cards and their responsive gallery behavior unchanged.
- Do not add dependencies or project-detail links.

---

### Task 1: Simplify the Work opening

**Files:**
- Modify: `src/components/ProjectGrid.test.tsx`
- Modify: `src/components/ProjectGrid.tsx`

**Interfaces:**
- Consumes: `ProjectGrid({ projects }: { projects: WorkItem[] })`
- Produces: the same component API with a title-only Work opening.

- [x] **Step 1: Write the failing test**

```tsx
it('uses a title-only project gallery opening', () => {
  render(<ProjectGrid projects={workItems} />)

  expect(screen.getByRole('heading', { name: /AI 不止能生成/ })).toBeInTheDocument()
  expect(screen.queryByText('SELECTED WORK')).not.toBeInTheDocument()
  expect(screen.queryByText(/三个企业级场景/)).not.toBeInTheDocument()
})
```

- [x] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- --run src/components/ProjectGrid.test.tsx`

Expected: the `SELECTED WORK` assertion fails because the shared `SectionHeading` is still rendered.

- [x] **Step 3: Write the minimal implementation**

```tsx
<div className="max-w-5xl pb-10 sm:pb-14 md:pb-20">
  <h2 className="text-[clamp(3.25rem,7vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
    AI 不止能生成，<br />还要进入真实工作流。
  </h2>
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
