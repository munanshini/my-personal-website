# Work Minimal Opening Design

## Goal

Make the Work opening feel like a focused project gallery, with the work itself—not supporting labels—carrying the first impression.

## Scope

- Replace the reusable `SectionHeading` in `ProjectGrid` with a Work-specific opening.
- Keep only the existing main statement: `AI 不止能生成，还要进入真实工作流。`
- Remove the section index, eyebrow, descriptive paragraph, and opening divider.
- Preserve all project cards, their data, spacing, interaction, and responsive behavior.

## Layout

- The title sits at the left edge of the existing canvas and uses the current display type scale.
- The opening has generous bottom spacing before the first project card.
- On mobile, the title remains within the content width and the spacing compresses without introducing horizontal overflow.

## Verification

- Component test confirms the Work opening has no `SELECTED WORK` label or descriptive copy.
- Full test suite and production build pass.
- Desktop and 390px mobile visual checks confirm that the first card follows the title cleanly with no clipped content.
