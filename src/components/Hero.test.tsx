import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders the concise product-manager introduction', () => {
    render(<Hero />)

    expect(screen.getByText(/一个画过图懂交互有审美/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /AI PRODUCT MGR/i }).className).toContain('font-black')
  })

  it('renders the portfolio identity without duplicate hero actions', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { name: /AI PRODUCT MGR/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '查看精选案例' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '查看经历' })).not.toBeInTheDocument()
  })
})
