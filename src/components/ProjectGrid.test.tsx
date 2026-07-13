import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { projects, workItems } from '../data/portfolio'
import { ProjectGrid } from './ProjectGrid'

describe('ProjectGrid', () => {
  it('shows the three confirmed cases and the first project result', () => {
    render(<ProjectGrid projects={projects} />)
    expect(screen.getByText('AI 创意工场')).toBeInTheDocument()
    expect(screen.getByText('智能仓储调度')).toBeInTheDocument()
    expect(screen.getByText('AI IDE 研发助手')).toBeInTheDocument()
    expect(screen.getByText(/效率约提升 200%/)).toBeInTheDocument()
  })

  it('marks the Huawei card for reduced-divider styling', () => {
    render(<ProjectGrid projects={workItems} />)

    expect(screen.getByText('华为').closest('article')).toHaveAttribute('data-company', 'huawei')
  })
})
