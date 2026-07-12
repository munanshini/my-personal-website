# Portfolio visual polish and navigation stability

## Goal

Refine the hero typography and self-introduction, reduce the visual weight of
Huawei work-card dividers, prevent the NOW navigation state from falling back
to INDEX while scrolling, preserve controls on dark sections, and replace the
background loop with an original, restrained ambient composition.

## Scope

1. Hero
   - Render `AI / Product / Mgr.` at weight 900 without changing its three-line
     hierarchy.
   - Replace the introduction with the supplied copy. Keep it smaller than the
     headline, readable at desktop and mobile widths, and clear of the portrait.
2. Navigation state
   - Replace ratio-based section selection with a deterministic scroll-spy: the
     active section is the last section whose top has crossed the fixed-nav
     reference line.
   - During a nav-initiated smooth scroll, retain the selected item until the
     target reaches that reference line or the scroll settles.
3. Dark-section visibility
   - Apply a subtle light outline to the desktop nav shell and fixed AI assistant
     trigger when the active section is dark (`#now` and the dark work card).
   - Preserve the existing spotlight interaction; no new moving border effect.
4. Huawei card
   - Lower the opacity of Huawei-specific dividers and borders by at least half
     relative to their current custom values, without altering other work cards.
5. Music
   - Keep the compact icon-only control.
   - Use an original Web Audio loop: sparse piano-like sine notes, gentle pad,
     low volume, no external or copyrighted audio asset.

## Implementation boundaries

- Changes are limited to the hero, navigation, music toggle, AI assistant
  trigger, and Huawei-specific work-card styles plus their tests.
- No portfolio content, routing, contact information, deployment, or domain
  configuration changes.

## Verification

- Automated tests first demonstrate that a NOW scroll position selects `#now`
  and that a navigation click retains its selected target during the lock.
- Component tests cover the updated hero copy and compact music button.
- Run the complete test suite and production build.
- Manually verify in the local preview: scroll INDEX → NOW and back; inspect
  navigation and assistant contrast on dark sections; inspect Huawei dividers;
  confirm music starts only after browser interaction and toggles pause/play.
