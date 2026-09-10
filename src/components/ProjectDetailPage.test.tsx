import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { workItems } from '../data/portfolio'
import { ProjectDetailPage } from './ProjectDetailPage'

describe('ProjectDetailPage', () => {
  it('renders the project reading order with one title and decision evidence', () => {
    const project = workItems[0]
    render(<ProjectDetailPage project={project} />)

    expect(screen.getByRole('navigation', { name: '项目详情导航' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'AI IDE 研发助手' })).toBeInTheDocument()
    expect(screen.getByLabelText('项目概览')).toHaveTextContent('华为技术有限公司')
    expect(screen.getByLabelText('项目概览')).toHaveTextContent('2025.02 — 2026.06')
    expect(screen.getByRole('heading', { name: '问题背景' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '我的角色' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '关键决策' })).toBeInTheDocument()
    expect(screen.getAllByText('我怎么判断')).toHaveLength(project.detail.decisions.length)
    expect(screen.getAllByText('取舍了什么')).toHaveLength(project.detail.decisions.length)
    expect(screen.getByRole('heading', { name: '结果' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '复盘' })).toBeInTheDocument()
    expect(screen.getByText(/基于个人在职经历整理/)).toBeInTheDocument()
  })

  it('keeps project navigation and contact links inside the local preview flow', () => {
    render(<ProjectDetailPage project={workItems[0]} />)

    expect(screen.getByRole('link', { name: '返回作品列表' })).toHaveAttribute('href', '../../work/')
    expect(screen.getByRole('link', { name: '联系我聊聊' })).toHaveAttribute('href', '../../contact/')
    screen.getAllByRole('link', { name: '关键决策' }).forEach((link) => {
      expect(link).toHaveAttribute('href', '../../work/ai-ide/#project-decisions')
    })
    expect(screen.getByRole('navigation', { name: '项目切换' })).toBeInTheDocument()
  })
})
