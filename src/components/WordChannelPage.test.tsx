import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { wordChannels } from '../data/portfolio'
import { WordChannelPage } from './WordChannelPage'

describe('WordChannelPage', () => {
  it('renders the article list as a second-level page with a third-level article link', () => {
    render(<MemoryRouter initialEntries={['/words/articles/']}><WordChannelPage channel={wordChannels[0]} /></MemoryRouter>)

    expect(screen.getByRole('heading', { name: 'AI 产品文章' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /OpenAI 设计总监/ })).toHaveAttribute('href', '../../words/articles/openai-designers-ai-era/')
    expect(screen.getByRole('link', { name: '返回内容入口' })).toHaveAttribute('href', '../../words/')
  })

  it('shows an empty state for a channel without published entries', () => {
    render(<MemoryRouter initialEntries={['/words/videos/']}><WordChannelPage channel={wordChannels[1]} /></MemoryRouter>)

    expect(screen.getByRole('heading', { name: '视频与公开表达' })).toBeInTheDocument()
    expect(screen.getByText('内容正在整理中，新的公开表达会先出现在这里。')).toBeInTheDocument()
  })
})
