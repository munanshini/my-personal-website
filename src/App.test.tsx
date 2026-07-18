import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
// @ts-expect-error The app does not ship Node types; Vitest runs this test in Node.
import { readFileSync } from 'node:fs'
import App from './App'
import { ThemeProvider } from './theme/ThemeProvider'

declare const process: { cwd: () => string }
const stylesheet = readFileSync(`${process.cwd()}/src/index.css`, 'utf8')

function renderApp() {
  return render(<ThemeProvider><App /></ThemeProvider>)
}

beforeEach(() => {
  window.history.replaceState(null, '', '#index')
  vi.stubGlobal('scrollTo', vi.fn())
})

afterEach(() => vi.unstubAllGlobals())

describe('App', () => {
  it('renders the AI product manager identity', () => {
    const { container } = renderApp()
    expect(
      screen.getByRole('heading', { name: /AI PRODUCT MGR/i }),
    ).toBeInTheDocument()
    expect(container.firstElementChild).toHaveClass('page-shell')
  })

  it.each([
    ['#index', 'AI PRODUCT MGR'],
    ['#work', 'AI 不止能生成'],
    ['#words', '持续思考'],
    ['#now', '此刻，我在关注什么'],
    ['#contact', "LET'S TALK"],
  ])('renders only the target page for %s', (hash, heading) => {
    window.history.replaceState(null, '', hash)
    renderApp()
    expect(screen.getByRole('heading', { name: new RegExp(heading, 'i') })).toBeInTheDocument()
    expect(screen.getByTestId('page-transition')).toHaveAttribute('data-page', hash.slice(1))
    const primaryPages = ['index', 'work', 'words', 'now', 'contact']
    expect(primaryPages.filter((page) => document.getElementById(page))).toEqual([hash.slice(1)])
  })

  it.each(['#index', '#work', '#words', '#now', '#contact'])('keeps the global assistant available on %s', (hash) => {
    window.history.replaceState(null, '', hash)
    renderApp()
    expect(screen.getByRole('button', { name: '问我的 AI 助手' })).toBeInTheDocument()
  })

  it('keeps WORDS directory content in a vertical flow', () => {
    window.history.replaceState(null, '', '#words')
    renderApp()
    expect(screen.getAllByTestId('content-directory-row')[0]).toHaveClass('flex', 'flex-col')
    const directoryRule = stylesheet.match(/\.content-directory-row\s*{([^}]*)}/)?.[1]
    expect(directoryRule).not.toMatch(/display:\s*grid/)
  })

  it('keeps one global assistant trigger and uses the Chinese name in the header', () => {
    renderApp()
    expect(screen.getByRole('button', { name: '问我的 AI 助手' })).toBeInTheDocument()
    expect(screen.getByText('张楠 · Nan Zhang')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '查看精选案例' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '查看经历' })).not.toBeInTheDocument()
  })

  it('wraps the fixed assistant trigger in a glass spotlight card', () => {
    renderApp()

    expect(screen.getByRole('button', { name: '问我的 AI 助手' }).parentElement?.className).toContain('spotlight-card--glass')
  })

  it('shows the compact mobile assistant label in the fixed trigger', () => {
    renderApp()

    expect(screen.getByText('AI 助手')).toBeInTheDocument()
  })

  it('does not mount a second DOM cursor on desktop', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    renderApp()

    expect(screen.queryByTestId('custom-cursor')).not.toBeInTheDocument()
  })
})
