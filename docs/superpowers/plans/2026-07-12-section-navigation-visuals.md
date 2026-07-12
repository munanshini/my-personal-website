# Section Navigation Visuals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio Header highlight the dominant visible section, strengthen section boundaries, add smooth transitions, and remove all grid styling.

**Architecture:** Keep the existing single-page React structure. `TopNav` will observe the page's top-level section anchors and own the active navigation state; section components will receive only visual boundary classes/styles where needed. Hero's grid SVG and motion state will be removed while preserving its image reveal interaction.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Vitest, Testing Library, Vite.

## Global Constraints

- Preserve the current AI Product Manager positioning and existing content.
- Do not add dependencies.
- Keep the active navigation behavior accessible and usable on desktop and mobile.
- Remove grid visuals without removing the existing hero image reveal effect.

---

### Task 1: Lock navigation behavior with tests

**Files:**
- Modify: `src/App.test.tsx`
- Test: `src/components/TopNav.test.tsx`

- [ ] **Step 1: Write the failing test**

Test that the active class starts on `INDEX 首页`, changes to `WORK 案例` when its section is reported dominant, and that the nav uses smooth scrolling behavior.

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `npm test -- src/components/TopNav.test.tsx`
Expected: FAIL because `TopNav` currently hard-codes the first item as active and does not observe sections.

### Task 2: Implement active section tracking and smooth navigation

**Files:**
- Modify: `src/components/TopNav.tsx`
- Modify: `src/index.css`

- [ ] **Step 1: Implement the minimal active-state behavior**

Add a `useState` active href, observe the six section IDs with `IntersectionObserver`, select the entry with the greatest visible intersection ratio, and apply the active classes from state. Add `scroll-behavior: smooth` to the root document.

- [ ] **Step 2: Run focused tests and verify they pass**

Run: `npm test -- src/components/TopNav.test.tsx`
Expected: PASS.

### Task 3: Remove grid styling and strengthen section separation

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/ProjectGrid.tsx`
- Modify: `src/components/Experience.tsx`
- Modify: `src/components/ContentFeed.tsx`
- Modify: `src/components/NowSection.tsx`
- Modify: `src/components/Contact.tsx`

- [ ] **Step 1: Remove Hero grid implementation**

Delete the grid SVG, `GRID_CELL`/`getGridTarget` imports, grid offset state, and animation updates that exist only for the grid. Keep cursor tracking required by `RevealLayer`.

- [ ] **Step 2: Add consistent section boundaries**

Give each primary section a clear top border, intentional vertical spacing, and alternating paper/white surface treatment using existing tokens only. Avoid adding new card systems or changing copy.

- [ ] **Step 3: Verify no grid styling remains**

Run: `rg -n "gridOffset|GRID_CELL|pattern id=\\\"grid\\\"|getGridTarget" src`
Expected: no matches.

### Task 4: Full verification and browser QA

**Files:**
- No additional files.

- [ ] **Step 1: Run all tests**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: TypeScript and Vite build complete successfully.

- [ ] **Step 3: Verify the local preview**

Reload `http://127.0.0.1:5173/`, click each Header tab, confirm the corresponding section is visually separated and the active pill follows the section; scroll manually to confirm active state updates.
