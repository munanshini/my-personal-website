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
    expect(screen.queryByRole('link', { name: '查看精选案例' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '查看经历' })).not.toBeInTheDocument()
  })

  it('marks the portrait for right-weighted mobile composition', () => {
    render(<Hero />)

    expect(screen.getByTestId('hero-portrait')).toHaveClass('bg-[position:58%_center]')
  })
})
