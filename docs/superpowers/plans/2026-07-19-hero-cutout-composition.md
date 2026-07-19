# Hero Cutout Composition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage portrait with a transparent cutout and position it without cropping the person.

**Architecture:** `Hero` imports the new transparent PNG and renders it as a background layer over the existing `bg-paper` surface. The layout remains CSS-only; desktop and mobile positions are expressed through responsive utility classes.

**Tech Stack:** React, TypeScript, Tailwind utility classes, Vitest, Testing Library, Vite.

## Global Constraints

- Keep all existing homepage copy, navigation, and theme behavior unchanged.
- Use `bg-paper` as the only hero background; no gradients, rays, or reveal layers.
- Preserve the full head and shoulders at desktop and 390px mobile widths.

---

### Task 1: Render the transparent portrait without cropping

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Hero.test.tsx`
- Consume: `src/assets/hero-portrait-cutout-preview.png`

**Interfaces:**
- Produces: `[data-testid="hero-portrait"]` with the transparent portrait asset and responsive full-subject layout classes.

- [ ] **Step 1: Write the failing test**

```tsx
expect(screen.getByTestId('hero-portrait').getAttribute('style')).toContain('hero-portrait-cutout-preview.png')
expect(screen.getByTestId('hero-portrait')).toHaveClass('bg-contain')
expect(screen.getByTestId('hero-portrait')).toHaveClass('bg-center')
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- --run src/components/Hero.test.tsx`

Expected: FAIL because `Hero` still imports the original portrait and uses a cropped cover layout.

- [ ] **Step 3: Implement the smallest asset and layout change**

```tsx
import heroPortraitCutout from '../assets/hero-portrait-cutout-preview.png'

className="absolute inset-0 z-10 bg-contain bg-center bg-no-repeat"
style={{ backgroundImage: `url('${heroPortraitCutout}')` }}
```

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `npm test -- --run src/components/Hero.test.tsx`

Expected: PASS.

- [ ] **Step 5: Verify the final responsive composition**

Run: `npm test -- --run && npm run build`

Expected: all tests pass and Vite builds the transparent PNG asset.
