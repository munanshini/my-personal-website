import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { workItems } from '../data/portfolio'
import { ProjectGrid } from './ProjectGrid'

describe('ProjectGrid', () => {
  it('renders work in newest-to-oldest directory rows', () => {
    render(<ProjectGrid projects={workItems} />)
    const rows = screen.getAllByTestId('work-row')
    expect(rows).toHaveLength(3)
    expect(within(rows[0]).getByText('华为')).toBeInTheDocument()
    expect(within(rows[1]).getByText('深圳市顺丰丰链科技有限责任公司')).toBeInTheDocument()
    expect(within(rows[2]).getByText('深圳市明源云科技有限公司')).toBeInTheDocument()
  })

  it('does not create a project link without a real detailHref', () => {
    render(<ProjectGrid projects={workItems} />)
    expect(screen.queryByRole('link', { name: /查看项目详情/ })).not.toBeInTheDocument()
  })

  it('uses one subtle divider contract for every company', () => {
    render(<ProjectGrid projects={workItems} />)
    screen.getAllByTestId('work-row').forEach((row) => {
      expect(row).toHaveClass('border-line/15')
    })
  })
})
