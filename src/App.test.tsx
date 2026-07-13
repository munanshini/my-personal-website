import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

afterEach(() => vi.unstubAllGlobals())

describe('App', () => {
  it('renders the AI product manager identity', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /AI PRODUCT MGR/i }),
    ).toBeInTheDocument()
  })

  it('links the Now navigation to the Now section', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /NOW 现在/i })).toHaveAttribute('href', '#now')
    expect(document.getElementById('now')).not.toBeNull()
  })

  it('keeps one global assistant trigger and uses the Chinese name in the header', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: '问我的 AI 助手' })).toBeInTheDocument()
    expect(screen.getByText('张楠 · Nan Zhang')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '查看精选案例' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '查看经历' })).not.toBeInTheDocument()
  })

  it('wraps the fixed assistant trigger in a glass spotlight card', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: '问我的 AI 助手' }).parentElement?.className).toContain('spotlight-card--glass')
  })

  it('shows the compact mobile assistant label in the fixed trigger', () => {
    render(<App />)

    expect(screen.getByText('AI 助手')).toBeInTheDocument()
  })

  it('mounts one global desktop custom cursor', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    render(<App />)

    expect(screen.getAllByTestId('custom-cursor')).toHaveLength(1)
  })
})
