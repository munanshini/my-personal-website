import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SectionHeading } from './SectionHeading'

describe('SectionHeading', () => {
  it('uses a section-level heading by default', () => {
    render(<SectionHeading index="01" eyebrow="CONTEXT" title="问题背景" />)
    expect(screen.getByRole('heading', { level: 2, name: '问题背景' })).toBeInTheDocument()
  })
  it('supports one page-level title and its description', () => {
    render(<SectionHeading level={1} index="03" eyebrow="WORDS" title="持续思考" description="记录产品实践" />)
    expect(screen.getByRole('heading', { level: 1, name: '持续思考' })).toBeInTheDocument()
    expect(screen.getByText('记录产品实践')).toBeInTheDocument()
  })
})
