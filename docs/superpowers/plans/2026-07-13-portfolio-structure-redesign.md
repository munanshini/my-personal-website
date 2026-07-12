# Portfolio Structure Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize the portfolio into a clear INDEX / WORK / WORDS / NOW / CONTACT story with downloadable resume and contact utility.

**Architecture:** Keep the single-page React app and replace the current independent Experience section with company-project data rendered by Work. Add small data-driven content entries for Words and Now, and use a controlled Header utility popover for resume/contact details. Reuse the existing portrait and add the provided PDF/QR as local assets.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Vitest, Vite.

## Global Constraints

- Resume PDF is a downloadable attachment only; do not import resume text into website copy.
- Remove BorderGlow from both CTA buttons in this iteration.
- Preserve the existing AI Product Manager positioning and three-card visual language.
- Keep contact information explicit: 1576797855, zn525347603@gmail.com, 15767978588.

---

### Task 1: Add approved assets and content model

**Files:**
- Create: `public/张楠-AI产品经理2026简历初版.pdf`
- Create: `src/assets/wechat-qr.jpg`
- Modify: `src/data/portfolio.ts`

- [ ] Copy the provided PDF and QR image into the paths above.
- [ ] Add `WorkItem`, `WordItem`, and `NowItem` data while preserving existing project facts.
- [ ] Co-locate company and project fields for the three Work cards.
- [ ] Run `npm run build` to verify asset imports and data types.

### Task 2: Restructure Header and Hero

**Files:**
- Modify: `src/components/TopNav.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/TopNav.test.tsx`
- Modify: `src/components/Hero.test.tsx`

- [ ] Add failing tests for five nav items (remove EXPERIENCE), three-line Hero title, approved intro copy, and no BorderGlow CTA wrappers.
- [ ] Update nav items to INDEX / WORK / WORDS / NOW / CONTACT.
- [ ] Replace the Hero title sizing and remove Hero bottom duplicate CTA buttons.
- [ ] Add the approved intro to Hero.
- [ ] Replace `OPEN TO WORK` navigation with a hover/click utility panel containing resume download, phone, email, WeChat ID, and QR image.
- [ ] Remove BorderGlow imports/usages from both CTA locations.

### Task 3: Merge Work and Experience

**Files:**
- Modify: `src/components/ProjectGrid.tsx`
- Modify: `src/components/ProjectGrid.test.tsx`
- Remove or stop rendering: `src/components/Experience.tsx`

- [ ] Add a failing test asserting each Work card includes both company and project.
- [ ] Render the three company-project cards with period, role, AI scene, outcomes, and a future detail-page link affordance.
- [ ] Keep the existing warm / blue / dark three-card treatment.
- [ ] Remove the standalone Experience render from `App.tsx`.

### Task 4: Differentiate Words, Now, and Contact

**Files:**
- Modify: `src/components/ContentFeed.tsx`
- Modify: `src/components/NowSection.tsx`
- Modify: `src/components/Contact.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

- [ ] Add tests for the three Words formats, dated city-tagged Now entries, Contact intro/details, and QR image alt text.
- [ ] Render Words as AI articles, video/public expression, and Vibe Coding/build logs.
- [ ] Add date and city fields to every Now entry.
- [ ] Rebuild Contact as a compact portrait-backed information card with intro, phone, email, WeChat, QR, and links.
- [ ] Keep Contact as the final page section and maintain `#contact` navigation.

### Task 5: Verify and preview

- [ ] Run `npm test`.
- [ ] Run `npm run build`.
- [ ] Confirm no `BorderGlow` references remain in `TopNav.tsx` or `App.tsx`.
- [ ] Confirm the PDF and QR assets are present and linked.
- [ ] Refresh the local preview and inspect desktop/mobile layout.
