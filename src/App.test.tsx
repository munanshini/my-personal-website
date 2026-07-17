import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

beforeEach(() => {
  window.history.replaceState(null, '', '#index')
  vi.stubGlobal('scrollTo', vi.fn())
})

afterEach(() => vi.unstubAllGlobals())

describe('App', () => {
  it('renders the AI product manager identity', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /AI PRODUCT MGR/i }),
    ).toBeInTheDocument()
  })

  it('renders only the page selected by the hash', () => {
    window.history.replaceState(null, '', '#words')
    render(<App />)
    expect(document.getElementById('words')).not.toBeNull()
    expect(document.getElementById('work')).toBeNull()
    expect(document.getElementById('now')).toBeNull()
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

  it('does not mount a second DOM cursor on desktop', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    render(<App />)

    expect(screen.queryByTestId('custom-cursor')).not.toBeInTheDocument()
  })
})
