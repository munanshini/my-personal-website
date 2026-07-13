# Glass controls and hero refinement

## Goal

Strengthen the hero hierarchy, use the user-supplied introduction with compact
readable line breaks, further soften Huawei dividers, and give the principal
controls a consistent light-mist glass treatment.

## Scope

1. Hero typography and copy
   - Use the highest available Inter heading weight and a slight negative
     tracking adjustment without changing the three-line `AI / Product / Mgr.`
     hierarchy or obscuring the portrait.
   - Render this lightly edited copy in two small readable paragraphs:
     "你好，我是张楠，一个画过图、懂交互、有审美，写 PROMPT 比写 PRD 多的 AI 产品经理。"
     "我们相信好工具优雅、好用，并经得起反复打磨；也坚持通过规划、协调、推进与落实，让想法最终被完美实现。"
2. Huawei card
   - Halve its existing Huawei-only line and border alpha values again. These
     lines are intentionally only subtle layout guides.
3. Light-mist glass controls
   - Apply only to desktop navigation, Open to Work, music, and fixed AI
     assistant controls.
   - Use translucent navy surfaces, `backdrop-filter: blur(...)`, a stable
     light outline, and the existing Spotlight hover effect.
   - Do not apply the treatment to every button or alter the dropdown/card
     content controls.
   - The outline is always present; it no longer depends on active section.
4. Music
   - Keep the icon-only control, first-user-interaction browser policy, pause
     behavior, cleanup, and original Web Audio only.
   - Replace the current loop with a distinct low-frequency electric-piano
     phrase plus an understated ambient pad.

## Boundaries

- Do not change portfolio data, layout structure, navigation behavior, contact
  details, deployment, or DNS.
- No external or copyrighted music assets.

## Verification

- Add focused tests for the new hero copy, persistent glass-control class, and
  reduced Huawei alpha marker where feasible.
- Run the complete test suite and production build.
- Inspect local preview where permitted: glass treatment retains text contrast
  on light and dark sections, heading remains readable, and music toggles.
