import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { workItems } from '../data/portfolio'
import { ProjectGrid } from './ProjectGrid'

describe('ProjectGrid', () => {
  it('uses a left-right Work opening with the supporting description', () => {
    render(<ProjectGrid projects={workItems} />)

    expect(screen.getByRole('heading', { name: /AI 不止能生成/ })).toBeInTheDocument()
    expect(screen.getByText(/三个企业级场景/)).toBeInTheDocument()
    expect(screen.queryByText(/PROJECT GALLERY/)).not.toBeInTheDocument()
    expect(screen.queryByText(/SELECTED WORK/)).not.toBeInTheDocument()
  })

  it('renders work in newest-to-oldest directory rows', () => {
    render(<ProjectGrid projects={workItems} />)
    const rows = screen.getAllByTestId('work-row')
    expect(rows).toHaveLength(3)
    expect(within(rows[0]).getByText('华为技术有限公司')).toBeInTheDocument()
    expect(within(rows[0]).getByText('2025.02 — 2026.06')).toBeInTheDocument()
    expect(within(rows[1]).getByText('深圳丰链科技有限公司')).toBeInTheDocument()
    expect(within(rows[2]).getByText('深圳市明源云科技有限公司')).toBeInTheDocument()
    expect(within(rows[1]).getByText('秒级给出调度建议与推荐依据')).toBeInTheDocument()
    expect(within(rows[2]).getByText('10 家房企、100+ 个售楼处')).toBeInTheDocument()
  })

  it('does not create a project link without a real detailHref', () => {
    render(<ProjectGrid projects={workItems} />)
    expect(screen.queryByRole('link', { name: '查看项目档案 ↗' })).not.toBeInTheDocument()
    screen.getAllByTestId('work-row').forEach((row) => {
      expect(row).not.toHaveAttribute('tabindex')
    })
  })

  it('uses the agreed archive link only after a project is content-ready', () => {
    const [firstProject, ...remainingProjects] = workItems
    render(<ProjectGrid projects={[{ ...firstProject, detail: { ...firstProject.detail, isReady: true } }, ...remainingProjects]} />)

    expect(screen.getByRole('link', { name: '查看项目档案 ↗' })).toHaveAttribute('href', '../work/ai-ide/')
  })

  it('uses one subtle divider contract for every company', () => {
    render(<ProjectGrid projects={workItems} />)
    screen.getAllByTestId('work-row').forEach((row) => {
      expect(row).toHaveClass('border-line/15')
    })
  })

  it('uses an elevated gallery treatment for each project row', () => {
    render(<ProjectGrid projects={workItems} />)
    const [firstRow] = screen.getAllByTestId('work-row')

    expect(firstRow).toHaveClass('hover:-translate-y-1')
    expect(firstRow).toHaveClass('focus:border-signal/60')
    expect(within(firstRow).getByTestId('work-result')).toHaveClass('group-hover:text-ink')
  })
})
