import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders the concise product-manager introduction', () => {
    render(<Hero />)

    expect(screen.getByText('你好，我是张楠，一个画过图、懂交互、有审美，写 PROMPT 比写 PRD 多的 AI 产品经理。')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /AI PRODUCT MGR/i }).className).toContain('font-black')
  })

  it('uses the highest loaded weight with tighter hero tracking', () => {
    render(<Hero />)

    expect(screen.getByRole('heading', { name: /AI PRODUCT MGR/i }).className).toContain('tracking-[-0.09em]')
  })

  it('keeps the hero at desktop viewport height', () => {
    render(<Hero />)

    expect(screen.getByRole('heading', { name: /AI PRODUCT MGR/i }).closest('section')?.className).toContain('md:h-screen')
  })

  it('renders the portfolio identity without duplicate hero actions', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { name: /AI PRODUCT MGR/i })).toBeInTheDocument()
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '查看精选案例' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '查看经历' })).not.toBeInTheDocument()
  })

  it('marks the portrait for right-weighted mobile composition', () => {
    render(<Hero />)

    expect(screen.getByTestId('hero-portrait')).toHaveClass('bg-[position:58%_center]')
    expect(screen.getByRole('heading', { name: /AI PRODUCT MGR/i }).parentElement).toHaveClass('max-w-[calc(100%-2.5rem)]')
  })

  it('keeps the mobile portrait from over-zooming', () => {
    render(<Hero />)

    const portrait = screen.getByTestId('hero-portrait')
    expect(portrait).toHaveClass('bg-[length:auto_100%]')
    expect(portrait).toHaveClass('w-full')
    expect(portrait).toHaveClass('md:w-[68%]')
  })

  it('renders a static portrait without an interactive reveal or light rays', () => {
    const { container } = render(<Hero />)

    expect(screen.queryByTestId('hero-portrait-reveal')).not.toBeInTheDocument()
    expect(container.querySelector('.side-rays-container')).toBeNull()
  })

  it('uses theme-semantic contrast for the portrait veil and copy', () => {
    render(<Hero />)

    expect(screen.getByTestId('hero-portrait').getAttribute('style')).not.toContain('gradient')
    expect(screen.getByText('AI PRODUCT · EXPERIENCE · DELIVERY')).toHaveClass('text-muted')
    expect(screen.getByText('你好，我是张楠，一个画过图、懂交互、有审美，写 PROMPT 比写 PRD 多的 AI 产品经理。')).toHaveClass('text-ink')
    expect(screen.getByText(/Shenzhen · China/i)).toHaveClass('text-muted')
  })
})
