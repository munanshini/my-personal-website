# Work Minimal Opening Design

## Goal

Make the Work opening feel like a focused project gallery, with the work itself—not supporting labels—carrying the first impression.

## Scope

- Replace the reusable `SectionHeading` in `ProjectGrid` with a Work-specific opening.
- Keep the existing main statement: `AI 不止能生成，还要进入真实工作流。`
- Keep the existing supporting description in a right-side column on desktop.
- Remove the section index, eyebrow, and opening divider.
- Preserve all project cards, their data, spacing, interaction, and responsive behavior.

## Layout

- The title sits at the left edge of the existing canvas and uses the current display type scale.
- The supporting description is vertically aligned with the title at the right on desktop and flows below the title on mobile.
- The opening has generous bottom spacing before the first project card.
- On mobile, the title remains within the content width and the spacing compresses without introducing horizontal overflow.

## Verification

- Component test confirms the Work opening renders the title and supporting description without the project-gallery label.
- Full test suite and production build pass.
- Desktop and 390px mobile visual checks confirm that the first card follows the title cleanly with no clipped content.
