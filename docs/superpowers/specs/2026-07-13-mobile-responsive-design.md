# Mobile responsive portfolio design

## Goal

Make the portfolio comfortable to read and operate on 360–430px phones while
preserving the established desktop visual language and all current content.

## Navigation

- Below the existing `md` desktop breakpoint, keep a compact header with the
  menu icon and an independent music icon.
- The menu opens as a translucent glass panel below the header. It contains the
  five section links, resume PDF download, and phone/email/WeChat contact
  details with existing copy affordances.
- Each menu action closes the panel; the mobile resume link downloads the same
  existing PDF.

## Responsive layout

- Hero: use mobile-specific title scale and content width; retain the portrait
  composition while keeping biography clear of the portrait.
- Work and words: one-column cards with reduced padding and minimum heights;
  project role content flows below the title rather than preserving desktop
  empty space.
- NOW: stack number, date/city, content and arrow in reading order. Keep
  pagination controls at accessible tap sizes.
- Contact: keep the existing single-column order, prevent long email/copy rows
  from overflowing, and make the QR code responsive.
- Fixed assistant: show icon plus `AI 助手` on phones, retain its glass style,
  and keep it clear of the safe bottom edge. Its panel remains full available
  width with the current side margin.

## Boundaries

- Preserve desktop layout from the `md` breakpoint upward.
- Do not change portfolio data, navigation destinations, contact values,
  deployment, DNS, or audio behavior.
- No new third-party dependency.

## Verification

- Add component tests for mobile-only controls and the compact assistant label.
- Run complete tests and the production build.
- Verify at 375px and 430px viewports that no horizontal overflow occurs and
  navigation, resume access, and assistant controls remain reachable.
