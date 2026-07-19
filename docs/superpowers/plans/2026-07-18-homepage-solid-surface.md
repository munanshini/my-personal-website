# Homepage Solid Surface Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove interactive and gradient-based decoration from the homepage while adding a stable outline-only hover state to inactive desktop navigation items.

**Architecture:** Simplify `Hero` to a static theme-color section with a right-anchored portrait layer. Keep theme tokens, page routing, portrait assets, and all mobile menu behavior unchanged. Implement desktop navigation feedback entirely in `GooeyNav.css` with an inset outline so the pill dimensions and active-pill motion remain stable.

**Tech Stack:** React, TypeScript, Tailwind utility classes, CSS, Vitest, Testing Library, Vite.

## Global Constraints

- Use `bg-paper` as the homepage surface in both themes; no hero linear, radial, or canvas-generated gradients.
- Keep the existing portrait image and right-weighted mobile composition; do not create or replace assets.
- Preserve desktop active-pill route behavior and leave mobile navigation unchanged.
- Do not modify copy, custom cursor, Open to Work, AI assistant, or any secondary page.
- Validate with focused tests, the full test suite, a production build, and visual checks at desktop and 390px mobile widths.

---

### Task 1: Simplify the static Hero surface

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Hero.test.tsx`

**Interfaces:**
- Consumes: existing `heroPortrait` asset and theme utility class `bg-paper`.
- Produces: a static `Hero` without `RevealLayer`, `SideRays`, mouse movement state, or gradient overlays.

- [ ] **Step 1: Write failing Hero tests**

Add these assertions to `src/components/Hero.test.tsx`:

```tsx
it('renders a static portrait without an interactive reveal or light rays', () => {
  const { container } = render(<Hero />)

  expect(screen.queryByTestId('hero-portrait-reveal')).not.toBeInTheDocument()
  expect(container.querySelector('.side-rays-container')).toBeNull()
})

it('uses a plain portrait image instead of hero gradients', () => {
  render(<Hero />)

  const portraitStyle = screen.getByTestId('hero-portrait').getAttribute('style') ?? ''
  expect(portraitStyle).toContain("url('")
  expect(portraitStyle).not.toContain('gradient')
})
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `npm test -- --run src/components/Hero.test.tsx`

Expected: the new test fails because the reveal layer and SideRays still render, and the portrait style still includes a gradient.

- [ ] **Step 3: Implement the minimal static Hero**

In `src/components/Hero.tsx`:

```tsx
import heroPortrait from '../assets/hero-portrait.png'

const portraitComposition = 'bg-[length:auto_100%] bg-[position:58%_center] md:bg-cover md:bg-center'

export function Hero() {
  return (
    <section id="index" className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-paper sm:min-h-[720px] md:h-screen">
      <div
        data-testid="hero-portrait"
        className={`absolute inset-y-0 right-0 z-10 w-[78%] bg-no-repeat opacity-[0.78] sm:w-[68%] ${portraitComposition}`}
        style={{ backgroundImage: `url('${heroPortrait}')` }}
        aria-hidden="true"
      />
      {/* keep the existing copy and metadata blocks; remove SideRays, RevealLayer and the gradient overlay */}
    </section>
  )
}
```

Remove the `useEffect`, `useRef`, `useState`, `heroPortraitNatural`, `easeToward`, `RevealLayer`, and `SideRays` imports and all associated code.

- [ ] **Step 4: Run the focused test and confirm GREEN**

Run: `npm test -- --run src/components/Hero.test.tsx`

Expected: all Hero tests pass, including the two new static-surface checks.

- [ ] **Step 5: Commit the Hero change**

```bash
git add src/components/Hero.tsx src/components/Hero.test.tsx
git commit -m "fix: simplify hero surface"
```

### Task 2: Add stable outline hover feedback to inactive desktop navigation items

**Files:**
- Modify: `src/components/GooeyNav.css`
- Modify: `src/components/TopNav.test.tsx`

**Interfaces:**
- Consumes: `active` class emitted by `GooeyNav` for the selected route.
- Produces: an inset outline on inactive navigation anchors during hover and keyboard focus, without altering element dimensions.

- [ ] **Step 1: Write a failing navigation-style test**

At the top of `src/components/TopNav.test.tsx`, load the CSS source using the same Node `readFileSync` pattern as `src/App.test.tsx`, then add:

```tsx
it('gives inactive desktop navigation items an inset outline on hover', () => {
  expect(gooeyNavStyles).toMatch(/a:not\(\.active\):hover/)
  expect(gooeyNavStyles).toMatch(/box-shadow:\s*inset 0 0 0 1px/)
  expect(gooeyNavStyles).toMatch(/a:not\(\.active\):focus-visible/)
})
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `npm test -- --run src/components/TopNav.test.tsx`

Expected: the new test fails because inactive items have no outline rule.

- [ ] **Step 3: Add the outline-only hover and focus style**

Append this rule to `src/components/GooeyNav.css`:

```css
.gooey-nav-items a:not(.active):hover,
.gooey-nav-items a:not(.active):focus-visible {
  color: rgb(var(--color-text));
  box-shadow: inset 0 0 0 1px rgb(var(--color-text) / .56);
}
```

Use `box-shadow`, rather than `border`, so the hover state has the same pill size and cannot shift neighboring navigation items.

- [ ] **Step 4: Run the focused test and confirm GREEN**

Run: `npm test -- --run src/components/TopNav.test.tsx`

Expected: all TopNav tests pass and the CSS source contains the inactive-only hover and focus rule.

- [ ] **Step 5: Commit the navigation change**

```bash
git add src/components/GooeyNav.css src/components/TopNav.test.tsx
git commit -m "feat: outline inactive navigation hover"
```

### Task 3: Verify homepage behavior and responsive layout

**Files:**
- Modify: no production files

**Interfaces:**
- Consumes: completed Hero and GooeyNav changes.
- Produces: evidence that the static hero and navigation feedback preserve route, theme, and responsive behavior.

- [ ] **Step 1: Run the complete test suite**

Run: `npm test -- --run`

Expected: every test file passes with zero failures.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: TypeScript compilation and Vite build both exit successfully.

- [ ] **Step 3: Run whitespace validation**

Run: `git diff --check HEAD~2..HEAD`

Expected: no output and exit code 0.

- [ ] **Step 4: Verify the local homepage at desktop width**

Open `http://127.0.0.1:5174/#index` and confirm:

```text
- Hero has a pure theme-color surface on the left, with no light rays or overlay gradient.
- Moving the pointer across the hero does not create a local portrait reveal or light spot.
- Hovering an inactive desktop nav item shows only an outline; clicking it still changes the active pill.
```

- [ ] **Step 5: Verify the local homepage at 390px width**

Confirm:

```text
- Hero remains full width and portrait stays right weighted.
- No interactive light spot or gradients appear.
- Mobile menu behavior and its current navigation state remain unchanged.
```

- [ ] **Step 6: Commit verification-only changes if any exist**

Run: `git status --short`

Expected: no intended unstaged files remain. Do not add pre-existing untracked `.superpowers/` or older plan files.
