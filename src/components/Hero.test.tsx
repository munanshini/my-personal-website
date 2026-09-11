import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { ThemeProvider } from '../theme/ThemeProvider'
import { Hero } from './Hero'
import { ThemeToggle } from './ThemeToggle'

function renderHero() {
  return render(<ThemeProvider><Hero /><ThemeToggle /></ThemeProvider>)
}

describe('Hero', () => {
  beforeEach(() => localStorage.clear())

  it('renders the concise product-manager introduction', () => {
    renderHero()

    expect(screen.getByText('你好，我是张楠，一个画过图、懂交互、有审美，写 PROMPT 比写 PRD 多的 AI 产品经理。')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: /AI PRODUCT MGR/i })).toBeInTheDocument()
    expect(document.getElementById('index')).toHaveClass('hero-screen')
    expect(screen.getByTestId('hero-signature')).toHaveTextContent('张楠 / AI 产品经理')
  })

  it('uses first-person language for the personal product philosophy', () => {
    renderHero()

    expect(screen.getByText(/我相信好工具优雅、好用/)).toBeInTheDocument()
    expect(screen.queryByText(/我们相信好工具优雅、好用/)).not.toBeInTheDocument()
  })



  it('renders the portfolio identity without duplicate hero actions', () => {
    renderHero()
    expect(screen.getByRole('heading', { name: /AI PRODUCT MGR/i })).toBeInTheDocument()
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '查看精选案例' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '查看经历' })).not.toBeInTheDocument()
  })

  it('anchors the portrait to the bottom of the composition', () => {
    renderHero()

    expect(screen.getByTestId('hero-portrait')).toHaveClass('bg-bottom')
  })

  it('keeps the mobile portrait from over-zooming', () => {
    renderHero()

    const portrait = screen.getByTestId('hero-portrait')
    expect(portrait).toHaveClass('bg-cover')
    expect(portrait).toHaveClass('bg-bottom')
    expect(portrait.getAttribute('style')).toContain('hero-portrait-dark-poster.jpg')
  })

  it('renders a static portrait without an interactive reveal or light rays', () => {
    const { container } = renderHero()

    expect(screen.queryByTestId('hero-portrait-reveal')).not.toBeInTheDocument()
    expect(container.querySelector('.side-rays-container')).toBeNull()
  })

  it('uses theme-semantic contrast for the portrait veil and copy', () => {
    renderHero()

    expect(screen.getByTestId('hero-portrait').getAttribute('style')).not.toContain('gradient')
    expect(screen.getByText('AI PRODUCT · EXPERIENCE · DELIVERY')).toHaveClass('text-muted')
    expect(screen.getByText('你好，我是张楠，一个画过图、懂交互、有审美，写 PROMPT 比写 PRD 多的 AI 产品经理。')).toHaveClass('text-ink')
    expect(screen.getByText(/Shenzhen · China/i)).toHaveClass('text-muted')
  })

  it('uses the matching portrait video for each color theme', () => {
    renderHero()

    const video = screen.getByTestId('hero-video')
    expect(video).toHaveAttribute('src', expect.stringContaining('hero-portrait-dark.mp4'))

    fireEvent.click(screen.getByRole('button', { name: '切换到浅色模式' }))
    expect(video).toHaveAttribute('src', expect.stringContaining('hero-portrait-light.mp4'))
  })

  it('keeps the static portrait fallback while the silent video loads', () => {
    renderHero()

    expect(screen.getByTestId('hero-portrait').getAttribute('style')).toContain('hero-portrait-dark-poster.jpg')
    expect(screen.getByTestId('hero-video')).toHaveAttribute('preload', 'auto')
    expect(screen.getByTestId('hero-video')).toHaveProperty('muted', true)
  })
})
