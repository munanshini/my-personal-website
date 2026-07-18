import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SectionHeading } from './SectionHeading'

describe('SectionHeading', () => {
  it('uses a subtle white divider for inverse headings', () => {
    const { container } = render(<SectionHeading index="04" eyebrow="NOW" title="此刻" inverse />)

    expect(container.firstElementChild).toHaveClass('border-white/15')
    expect(container.firstElementChild).not.toHaveClass('border-line/15')
  })

  it('uses the semantic line divider for regular headings', () => {
    const { container } = render(<SectionHeading index="01" eyebrow="WORK" title="项目" />)

    expect(container.firstElementChild).toHaveClass('border-line/15')
    expect(container.firstElementChild).not.toHaveClass('border-white/15')
  })
})
