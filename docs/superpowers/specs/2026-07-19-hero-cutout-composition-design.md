# Hero Cutout Composition Design

## Goal

Use a transparent, complete portrait on the homepage so the background remains a single theme color and the person is visibly complete rather than cropped.

## Confirmed Design

- Keep the existing homepage copy, navigation, theme controls, and page routes unchanged.
- Use `src/assets/hero-portrait-cutout-preview.png` as a new portrait asset; it has a transparent background and keeps the full head, shoulders, and upper torso.
- On desktop, center the portrait in the available hero canvas with a slight leftward bias so it reads as part of the composition rather than as a right-edge crop.
- On mobile, preserve the full head and shoulders inside the viewport and avoid any crop at the right edge.
- Keep `bg-paper` as the only homepage background surface. Do not add gradients, rays, reveal layers, or mouse-light effects.

## Validation

- `Hero` tests assert that the cutout asset is used and that its responsive layout classes retain the complete portrait.
- Run focused Hero tests, the full test suite, a production build, and visual checks at desktop and 390px widths.
