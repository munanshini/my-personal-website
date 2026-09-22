import { fireEvent, render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { SitePage } from '../lib/siteRoute'
import { ThemeProvider } from '../theme/ThemeProvider'
import { TopNav } from './TopNav'

declare const process: { cwd: () => string }

const gooeyNavStyles = readFileSync(`${process.cwd()}/src/components/GooeyNav.css`, 'utf8')

function renderNav(currentPage: SitePage = 'index', onNavigate = vi.fn(), currentPath?: string) {
  return render(
    <ThemeProvider>
      <TopNav currentPage={currentPage} onNavigate={onNavigate} currentPath={currentPath} />
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
    const mobileNow = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[href="../now/"]'))
      .find((link) => link !== desktopNow)
    const mobileWork = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[href="../work/"]'))
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

  it('prevents a full document navigation when a desktop navigation item is selected', () => {
    renderNav()
    const workLink = screen.getByRole('link', { name: 'WORK 工作' })
    const click = new MouseEvent('click', { bubbles: true, cancelable: true })

    workLink.dispatchEvent(click)

    expect(click.defaultPrevented).toBe(true)
  })

  it('resolves navigation links from a nested project detail path', () => {
    renderNav('work', vi.fn(), '/work/ai-ide/')

    expect(screen.getByRole('link', { name: '返回首页' })).toHaveAttribute('href', '../../')
    expect(screen.getByRole('link', { name: 'WORK 工作' })).toHaveAttribute('href', '../../work/')
  })

  it('keeps the translucent desktop navigation bar', () => {
    renderNav()

    const navCard = screen.getByRole('link', { name: 'INDEX 首页' }).closest('.spotlight-card--nav')
    expect(navCard).toHaveClass('spotlight-card--glass')
  })

  it('renders the supplied site logo without stretching it', () => {
    renderNav()

    const logo = screen.getByTestId('site-logo')
    expect(logo).toHaveAttribute('src', expect.stringContaining('site-logo'))
    expect(logo).toHaveClass('site-logo', 'h-7', 'w-7', 'object-contain')
  })

  it('gives inactive desktop navigation items an inset outline on hover', () => {
    expect(gooeyNavStyles).toMatch(/a:not\(\.active\):hover/)
    expect(gooeyNavStyles).toMatch(/box-shadow:\s*inset 0 0 0 1px/)
    expect(gooeyNavStyles).toMatch(/a:not\(\.active\):focus-visible/)
  })

  it('keeps the Open to Work panel free from phone and WeChat numbers', () => {
    renderNav()
    fireEvent.click(screen.getByRole('button', { name: /open to work/i }))

    expect(screen.queryByText(/phone-number/)).not.toBeInTheDocument()
    expect(screen.getByText('扫码添加微信')).toBeInTheDocument()
    expect(screen.getByText('zn525347603@gmail.com')).toBeInTheDocument()
  })

  it('removes mobile music and contact rows while keeping an unavailable resume button', () => {
    renderNav()
    fireEvent.click(screen.getByRole('button', { name: '打开菜单' }))

    expect(screen.queryByText('MUSIC 音乐')).not.toBeInTheDocument()
    const resumeButton = screen.getByRole('button', { name: /简历 PDF 下载.*暂未开放/ })
    expect(resumeButton).toBeDisabled()
    expect(resumeButton).not.toHaveAttribute('href')
    expect(screen.queryByText('phone-number')).not.toBeInTheDocument()
    expect(screen.queryByText('zn525347603@gmail.com')).not.toBeInTheDocument()
  })

  it('keeps subtle separators and spacing in the mobile menu', () => {
    renderNav()
    fireEvent.click(screen.getByRole('button', { name: '打开菜单' }))

    expect(screen.queryByText('MUSIC 音乐')).not.toBeInTheDocument()
    const indexLink = screen.getAllByRole('link', { name: 'INDEX 首页' }).find((link) => link.getAttribute('href') === './' && link.className.includes('py-4'))
    expect(indexLink?.className).toContain('border-b')
    expect(indexLink?.className).toContain('py-4')
  })

  it('marks the desktop resume control as temporarily unavailable', () => {
    renderNav()
    fireEvent.click(screen.getByRole('button', { name: /open to work/i }))

    const resumeButton = screen.getByRole('button', { name: /简历 PDF 下载.*暂未开放/ })
    expect(resumeButton).toBeDisabled()
    expect(resumeButton.className).toContain('cursor-not-allowed')
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
    const mobileIndexLink = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[href="./"]'))
      .find((link) => link.textContent === 'INDEX 首页')
    mobileIndexLink?.focus()
    expect(mobileIndexLink).toHaveFocus()
  })

})
