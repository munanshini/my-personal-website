# Work Project Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the Work content from the user resume and render it as a responsive project-gallery card list with hover and focus feedback.

**Architecture:** `src/data/portfolio.ts` remains the single content source. `ProjectGrid` gains presentation-only gallery classes and a result highlight block; it does not create detail URLs until real case-study pages exist.

**Tech Stack:** React, TypeScript, Tailwind utility classes, Vitest, Testing Library, Vite.

## Global Constraints

- Keep exactly three Work projects in newest-to-oldest order.
- Use only user-resume facts and stated outcomes.
- Preserve light/dark theme tokens and existing primary navigation.
- Do not create empty project-detail links.

---

### Task 1: Correct Work project source data

**Files:**
- Modify: `src/data/portfolio.ts`
- Modify: `src/components/ProjectGrid.test.tsx`

- [ ] **Step 1: Write failing data assertions**

```tsx
expect(within(rows[0]).getByText('华为技术有限公司')).toBeInTheDocument()
expect(within(rows[0]).getByText('2025.02 — 2026.06')).toBeInTheDocument()
expect(within(rows[1]).getByText('调度响应时间缩短约 30%')).toBeInTheDocument()
expect(within(rows[2]).getByText('10 家房企、100+ 个售楼处')).toBeInTheDocument()
```

- [ ] **Step 2: Run focused tests and confirm failure**

Run: `npm test -- --run src/components/ProjectGrid.test.tsx`

- [ ] **Step 3: Implement resume-accurate data**

Update each `workItems` entry to use the confirmed company, period, project name, responsibilities, and result statements from the approved design.

- [ ] **Step 4: Run focused tests and confirm pass**

Run: `npm test -- --run src/components/ProjectGrid.test.tsx`

### Task 2: Apply project-gallery interaction styling

**Files:**
- Modify: `src/components/ProjectGrid.tsx`
- Modify: `src/components/ProjectGrid.test.tsx`

- [ ] **Step 1: Write failing gallery-card assertions**

```tsx
expect(rows[0]).toHaveClass('hover:-translate-y-1')
expect(rows[0]).toHaveClass('focus-within:border-signal/60')
expect(within(rows[0]).getByTestId('work-result')).toHaveClass('group-hover:text-ink')
```

- [ ] **Step 2: Run focused tests and confirm failure**

Run: `npm test -- --run src/components/ProjectGrid.test.tsx`

- [ ] **Step 3: Implement the minimal gallery treatment**

Apply responsive card surface, signal accent, transition, hover/focus border treatment, and a non-link case affordance to `ProjectGrid`.

- [ ] **Step 4: Run focused tests and confirm pass**

Run: `npm test -- --run src/components/ProjectGrid.test.tsx`

### Task 3: Validate the Work section

- [ ] **Step 1: Run complete checks**

Run: `npm test -- --run && npm run build && git diff --check`

- [ ] **Step 2: Inspect desktop and 390px Work layouts**

Confirm card hierarchy is readable, hover/focus states do not change card dimensions unexpectedly, and no text or result block overflows.
