import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { WordArticleRoute } from './WordArticlePage'

describe('WordArticlePage', () => {
  it('tracks the chapter reached by scrolling and links back to the article list', async () => {
    let offset = 0
    const bounds = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      const index = Number(this.id.replace('word-section-', '')) || 0
      return { top: index * 500 - offset } as DOMRect
    })
    try {
      render(<MemoryRouter initialEntries={['/words/articles/ai-pm-agent-nine-step-design/']}>
        <Routes><Route path="/words/articles/:slug/" element={<WordArticleRoute />} /></Routes>
      </MemoryRouter>)
      const directory = within(screen.getByRole('navigation', { name: '文章章节导航' }))
      await waitFor(() => expect(directory.getByRole('link', { name: '该不该做成 agent' })).toHaveAttribute('aria-current', 'location'))
      offset = 1250
      fireEvent.scroll(window)
      await waitFor(() => expect(directory.getByRole('link', { name: '设计工具集（能力）' })).toHaveAttribute('aria-current', 'location'))
      expect(directory.getByRole('link', { name: '该不该做成 agent' })).not.toHaveAttribute('aria-current')
      const href = screen.getByRole('link', { name: '返回文章列表' }).getAttribute('href')!
      expect(new URL(href, 'https://zhangnanai.com/words/articles/ai-pm-agent-nine-step-design/').pathname).toBe('/words/articles/')
    } finally {
      bounds.mockRestore()
    }
  })
  it('renders the article title, source, and structured reading sections', () => {
    render(
        <MemoryRouter initialEntries={['/words/articles/openai-designers-ai-era/']}>
          <Routes>
            <Route path="/words/articles/:slug/" element={<WordArticleRoute />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'OpenAI 设计总监：设计师是科技行业最惨的人' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '查看公众号原文' })).toHaveAttribute('href', 'https://mp.weixin.qq.com/s/wL7k-NCyeIl6dbrCRbrcsQ')
    expect(screen.getByRole('heading', { name: '设计师的焦虑不是个例' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '我的产品经理视角' })).toBeInTheDocument()
  })

  it('renders an internal handbook without invented external source links', () => {
    render(
      <MemoryRouter initialEntries={['/words/articles/ai-pm-agent-nine-step-design/']}>
        <Routes>
          <Route path="/words/articles/:slug/" element={<WordArticleRoute />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'AI PM 的 Agent 九步设计流程' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '设计工具集（能力）' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '查看公众号原文' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '查看公开转载页' })).not.toBeInTheDocument()
  })
})
