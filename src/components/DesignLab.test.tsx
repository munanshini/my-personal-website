import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { designProjects } from '../data/designProjects'
import { publicSitePaths } from '../lib/siteRoute'
import { getDesignPageMeta } from '../lib/siteMeta'
import { DesignLab, DesignProjectPage } from './DesignLab'

describe('interaction design portfolio navigation', () => {
  it('links every project card to a generated detail page with its own canonical URL', () => {
    render(<MemoryRouter initialEntries={['/words/interaction-design/']}><DesignLab /></MemoryRouter>)
    for (const project of designProjects) {
      const path = `/words/interaction-design/${project.slug}/`
      expect(screen.getByRole('link', { name: new RegExp(project.title) })).toHaveAttribute('href', `../..${path}`)
      expect(publicSitePaths()).toContain(path)
      expect(getDesignPageMeta(path)?.canonical).toBe(`https://zhangnanai.com${path}`)
    }
  })

  it('renders source figures with working full-image and return links', () => {
    render(<MemoryRouter initialEntries={['/words/interaction-design/ipad-property/']}><Routes><Route path="/words/interaction-design/:slug/" element={<DesignProjectPage />} /></Routes></MemoryRouter>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('智慧案场 iPad 交互改版')
    expect(screen.getAllByRole('img')).toHaveLength(20)
    expect(screen.getByRole('link', { name: '返回交互设计实验室' })).toHaveAttribute('href', '../../../words/interaction-design/')
    expect(screen.getByRole('link', { name: '查看大图：区域沙盘（新窗口）' })).toHaveAttribute('href', '../../../design-lab/page-57.webp')
    expect(screen.queryByText(/任职公司|发布时间/)).not.toBeInTheDocument()
  })

  it('returns an unknown project to the lab', () => {
    render(<MemoryRouter initialEntries={['/words/interaction-design/missing/']}><Routes><Route path="/words/interaction-design/:slug/" element={<DesignProjectPage />} /><Route path="/words/interaction-design/" element={<DesignLab />} /></Routes></MemoryRouter>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('交互设计实验室')
  })
})
