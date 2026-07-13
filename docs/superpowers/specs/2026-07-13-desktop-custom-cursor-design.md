# Desktop Custom Cursor Design

## Goal

Add a desktop-only custom cursor matching the supplied reference: a compact black arrow with a white edge and a soft blue glow. Mobile and other touch-first devices keep their native interaction and show no custom cursor.

## Scope

- Enable only when the primary pointer is fine and hover is supported.
- Apply across the entire portfolio, including navigation, project cards, links, buttons, the hero portrait reveal, and the AI assistant.
- Do not change page content, layout, existing hover effects, or mobile behavior.

## Chosen Approach

Use a fixed, pointer-transparent React overlay rendered once at the application root. The overlay contains an inline SVG arrow plus CSS glow layers and follows pointer coordinates using `transform: translate3d(...)`.

This approach is preferred over a CSS image cursor because browser cursor-image size limits can crop or weaken the glow. It is preferred over a native cursor plus separate halo because the supplied visual should appear as one coherent pointer.

## Interaction

- Hide the native cursor only while the desktop custom cursor is active.
- Position the SVG hotspot at the arrow tip so clicks remain visually accurate.
- Show after the first mouse movement and hide on pointer leave, window blur, or unsupported pointer environments.
- Increase glow and scale slightly over interactive elements such as links, buttons, form controls, and elements with pointer semantics.
- Add a short press response on mouse down, then return on mouse up.
- The cursor uses `pointer-events: none` and never blocks clicking, hovering, scrolling, selection, or the hero reveal.
- Disable follow animation for users requesting reduced motion while keeping the static custom cursor position responsive.

## Mobile and Touch

- Do not mount or display the custom cursor when `(hover: hover) and (pointer: fine)` does not match.
- Do not add tap ripples, touch-follow markers, or menu controls for this feature.
- Do not hide the native cursor through global CSS on unsupported devices.

## Component Boundary

Create one focused `CustomCursor` component with its own stylesheet. `App` renders it once. The component owns pointer capability detection, visibility, coordinates, interactive-target state, and pressed state. No existing section component needs cursor-specific logic.

## Visual Parameters

- Arrow: black fill, white outline, approximately 28–32 px.
- Glow: blue-white, soft-edged, compact enough not to obscure text.
- Interactive state: a modest increase in glow and scale, without changing cursor shape.
- Layering: above site content and overlays while remaining non-interactive.

## Verification

- Component tests cover desktop capability activation, mobile suppression, pointer movement, interactive-target state, and pointer transparency.
- Existing hero reveal and navigation tests must remain green.
- Full test suite and production build must pass.
- Manual desktop verification checks normal text, navigation, buttons, cards, the hero face reveal, assistant overlay, pointer leave, and window blur.
- Mobile verification confirms no custom cursor DOM is visible and native touch behavior is unchanged.

## Completion Criteria

The feature is complete when the desktop cursor visually matches the supplied black-arrow/blue-glow reference, its hotspot tracks clicks accurately, all existing interactions remain functional, and no custom cursor appears on mobile or touch-first devices.
