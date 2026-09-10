import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { routes } from './App'

declare const process: { cwd: () => string }
const stylesheet = readFileSync(`${process.cwd()}/src/index.css`, 'utf8')

function renderApp(path = '/') {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return render(<HelmetProvider><RouterProvider router={router} /></HelmetProvider>)
}

beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})

afterEach(() => vi.unstubAllGlobals())

describe('App', () => {
  it('restores a directly opened project chapter instead of resetting to the top', async () => {
    const previousScrollIntoView = Element.prototype.scrollIntoView
    const scrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoView
    try {
      renderApp('/work/ai-ide/#project-decisions')
      await waitFor(() => expect(scrollIntoView).toHaveBeenCalled())
      expect(scrollIntoView.mock.instances[0]).toBe(document.getElementById('project-decisions'))
      expect(window.scrollTo).not.toHaveBeenCalled()
    } finally {
      Element.prototype.scrollIntoView = previousScrollIntoView
    }
  })

  it('renders the AI product manager identity', () => {
    const { container } = renderApp()
    expect(
      screen.getByRole('heading', { name: /AI PRODUCT MGR/i }),
    ).toBeInTheDocument()
    expect(container.firstElementChild).toHaveClass('page-shell')
  })

  it('lets the page shell span the full viewport width', () => {
    const pageShellRule = stylesheet.match(/\.page-shell\s*{([^}]*)}/)?.[1]

    expect(pageShellRule).toMatch(/width:\s*100%/)
    expect(pageShellRule).not.toMatch(/width:\s*min/)
    expect(pageShellRule).not.toMatch(/margin-inline/)
  })

  it.each([
    ['/', 'AI PRODUCT MGR', 'index'],
    ['/work/', 'AI 不止能生成', 'work'],
    ['/work/ai-ide/', 'AI IDE 研发助手', 'project-detail'],
    ['/work/warehouse-scheduling/', '智能仓储调度系统', 'project-detail'],
    ['/work/smart-sales-center/', '房企智慧案场销讲与客户接待系统', 'project-detail'],
    ['/words/', '持续思考', 'words'],
    ['/now/', '此刻，我在关注什么', 'now'],
    ['/contact/', "LET'S TALK", 'contact'],
  ])('renders only the target page for %s', (path, heading, page) => {
    renderApp(path)
    expect(screen.getByRole('heading', { name: new RegExp(heading, 'i') })).toBeInTheDocument()
    expect(screen.getByTestId('page-transition')).toHaveAttribute('data-page', path)
    expect(document.getElementById(page)).toBeInTheDocument()
  })

  it.each(['/', '/work/', '/words/', '/now/', '/contact/'])('keeps the global assistant available on %s', (path) => {
    renderApp(path)
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

  it('wraps the assistant trigger in a glass spotlight card', () => {
    renderApp()

    expect(screen.getByRole('button', { name: '问我的 AI 助手' }).parentElement?.className).toContain('spotlight-card--glass')
  })

  it('keeps the mobile assistant in document flow and fixes it on desktop', () => {
    renderApp()
    const assistantCard = screen.getByRole('button', { name: '问我的 AI 助手' }).parentElement

    expect(assistantCard).not.toHaveClass('fixed')
    expect(assistantCard).not.toHaveClass('bottom-5')
    expect(assistantCard).not.toHaveClass('right-5')
    expect(assistantCard).toHaveClass('mx-auto', 'w-fit', 'md:fixed', 'md:bottom-5', 'md:right-5')
  })

  it('shows the compact mobile assistant label in the assistant trigger', () => {
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
