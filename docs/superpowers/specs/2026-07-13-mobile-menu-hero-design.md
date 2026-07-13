# Mobile menu and hero composition refinement

## Goal

Reduce mobile header density, keep music accessible without a persistent top
button, and reposition the hero portrait so the face remains visible on phone
screens.

## Design

- Mobile header shows only the logo and menu trigger.
- The opened menu uses a glass panel with a dedicated music row, then the five
  primary section links in a vertically spaced list with separators.
- Remove phone, email, and WeChat rows from the mobile menu; those remain in the
  Contact section and desktop utility panel.
- Keep only the resume PDF download as the final menu action, separated from
  navigation by a larger top margin.
- On phone widths, set the hero portrait background position around `58% center`
  and slightly increase its visual scale so the face sits in the right half of
  the frame. Keep the desktop background positioning unchanged.
- Preserve the existing mobile assistant, desktop menu, contact values, and
  audio behavior.

## Verification

- Add tests that mobile menu has one music control, five section links, a resume
  link, and no duplicate contact values.
- Add a hero test for the mobile portrait positioning class/style marker.
- Run complete tests and production build; inspect at 375px and 430px widths.
