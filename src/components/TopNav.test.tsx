import { fireEvent, render, screen } from '@testing-library/react'
// @ts-expect-error Node's fs types are available in Vitest but not the browser tsconfig.
import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { SitePage } from '../lib/siteRoute'
import { ThemeProvider } from '../theme/ThemeProvider'
import { TopNav } from './TopNav'

declare const process: { cwd: () => string }

const gooeyNavStyles = readFileSync(`${process.cwd()}/src/components/GooeyNav.css`, 'utf8')

function renderNav(currentPage: SitePage = 'index', onNavigate = vi.fn()) {
  return render(
    <ThemeProvider>
      <TopNav currentPage={currentPage} onNavigate={onNavigate} />
    </ThemeProvider>,
  )
}

describe('TopNav', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    document.body.innerHTML = ''
  })

  it('marks the current route without reading section positions', () => {
    const onNavigate = vi.fn()
    const { container } = renderNav('now', onNavigate)
    const desktopNow = screen.getByRole('link', { name: 'NOW 现在' })
    const desktopWork = screen.getByRole('link', { name: 'WORK 工作' })
    expect(desktopNow).toHaveAttribute('aria-current', 'page')
    expect(desktopNow).not.toHaveClass('bg-white')
    expect(desktopWork).not.toHaveAttribute('aria-current')

    fireEvent.click(screen.getByRole('button', { name: '打开菜单' }))
    const mobileNow = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[href="#now"]'))
      .find((link) => link !== desktopNow)
    const mobileWork = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[href="#work"]'))
      .find((link) => link.textContent === 'WORK 工作' && link !== desktopWork)
    expect(mobileNow).toHaveAttribute('aria-current', 'page')
    expect(mobileNow).toHaveClass('text-signal')
    expect(mobileWork).not.toHaveAttribute('aria-current')

    fireEvent.click(desktopWork)
    expect(onNavigate).toHaveBeenCalledWith('work')
  })

  it('does not register a scroll listener', () => {
    const listener = vi.spyOn(window, 'addEventListener')
    renderNav()
    expect(listener).not.toHaveBeenCalledWith('scroll', expect.any(Function), expect.anything())
  })

  it('prevents the native hash jump when a desktop navigation item is selected', () => {
    renderNav()
    const workLink = screen.getByRole('link', { name: 'WORK 工作' })
    const click = new MouseEvent('click', { bubbles: true, cancelable: true })

    workLink.dispatchEvent(click)

    expect(click.defaultPrevented).toBe(true)
  })

  it('keeps the translucent desktop navigation bar', () => {
    renderNav()

    const navCard = screen.getByRole('link', { name: 'INDEX 首页' }).closest('.spotlight-card--nav')
    expect(navCard).toHaveClass('spotlight-card--glass')
  })

  it('gives inactive desktop navigation items an inset outline on hover', () => {
    expect(gooeyNavStyles).toMatch(/a:not\(\.active\):hover/)
    expect(gooeyNavStyles).toMatch(/box-shadow:\s*inset 0 0 0 1px/)
    expect(gooeyNavStyles).toMatch(/a:not\(\.active\):focus-visible/)
  })

  it('shows the corrected phone number in the Open to Work panel', () => {
    renderNav()
    fireEvent.click(screen.getByRole('button', { name: /open to work/i }))

    expect(screen.getAllByText('15767978588')).toHaveLength(2)
    expect(screen.queryByText('1576797855')).not.toBeInTheDocument()
  })

  it('removes mobile music and contact rows while keeping resume access', () => {
    const { container } = renderNav()
    fireEvent.click(screen.getByRole('button', { name: '打开菜单' }))

    expect(screen.queryByText('MUSIC 音乐')).not.toBeInTheDocument()
    const resumeLink = screen.getByRole('link', { name: '简历 PDF 下载' })
    const links = Array.from(container.querySelectorAll('a'))
    expect(resumeLink).toHaveAttribute('download')
    expect(links[links.length - 1]).toBe(resumeLink)
    expect(screen.queryByText('15767978588')).not.toBeInTheDocument()
    expect(screen.queryByText('zn525347603@gmail.com')).not.toBeInTheDocument()
  })

  it('keeps subtle separators and spacing in the mobile menu', () => {
    renderNav()
    fireEvent.click(screen.getByRole('button', { name: '打开菜单' }))

    expect(screen.queryByText('MUSIC 音乐')).not.toBeInTheDocument()
    const indexLink = screen.getAllByRole('link', { name: 'INDEX 首页' }).find((link) => link.getAttribute('href') === '#index' && link.className.includes('py-4'))
    expect(indexLink?.className).toContain('border-b')
    expect(indexLink?.className).toContain('py-4')
  })

  it('adds hover feedback to resume download actions', () => {
    renderNav()
    fireEvent.click(screen.getByRole('button', { name: /open to work/i }))

    expect(screen.getByRole('link', { name: '简历 PDF 下载' }).className).toContain('hover:bg-gray-700')
  })

  it('shows a theme toggle in desktop navigation and the mobile menu', () => {
    renderNav()

    expect(screen.getByRole('button', { name: '切换到深色模式' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '打开菜单' }))
    expect(screen.getAllByRole('button', { name: '切换到深色模式' })).toHaveLength(2)
  })

  it('uses semantic ink text on the glass Open to Work control in both themes', () => {
    renderNav()
    const openToWork = screen.getByRole('button', { name: /open to work/i })

    expect(openToWork).toHaveClass('text-ink')
    expect(openToWork).not.toHaveClass('text-white')

    fireEvent.click(screen.getByRole('button', { name: '切换到深色模式' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(openToWork).toHaveClass('text-ink')
  })

  it('keeps menu controls and links keyboard focusable', () => {
    const { container } = renderNav()
    const menuButton = screen.getByRole('button', { name: '打开菜单' })
    menuButton.focus()
    expect(menuButton).toHaveFocus()

    fireEvent.click(menuButton)
    const mobileIndexLink = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[href="#index"]'))
      .find((link) => link.textContent === 'INDEX 首页')
    mobileIndexLink?.focus()
    expect(mobileIndexLink).toHaveFocus()
  })

})
