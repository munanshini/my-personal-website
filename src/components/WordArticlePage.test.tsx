import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WordArticleRoute } from './WordArticlePage'

describe('WordArticlePage', () => {
  it('renders the article title, source, and structured reading sections', () => {
    render(
      <MemoryRouter initialEntries={['/words/openai-designers-ai-era/']}>
        <Routes>
          <Route path="/words/:slug/" element={<WordArticleRoute />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'OpenAI 设计总监：设计师是科技行业最惨的人' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '查看公众号原文' })).toHaveAttribute('href', 'https://mp.weixin.qq.com/s/wL7k-NCyeIl6dbrCRbrcsQ')
    expect(screen.getByRole('heading', { name: '设计师的焦虑不是个例' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '我的产品经理视角' })).toBeInTheDocument()
  })
})
