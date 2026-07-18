import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { SitePage } from '../lib/siteRoute'
import { ThemeProvider } from '../theme/ThemeProvider'
import { TopNav } from './TopNav'

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
    renderNav('now', onNavigate)
    expect(screen.getByRole('link', { name: 'NOW 现在' })).toHaveClass('bg-white')
    fireEvent.click(screen.getByRole('link', { name: 'WORK 工作' }))
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

  it('shows the corrected phone number in the Open to Work panel', () => {
    renderNav()
    fireEvent.click(screen.getByRole('button', { name: /open to work/i }))

    expect(screen.getAllByText('15767978588')).toHaveLength(2)
    expect(screen.queryByText('1576797855')).not.toBeInTheDocument()
  })

  it('removes mobile music and contact rows while keeping resume access', () => {
    renderNav()
    fireEvent.click(screen.getByRole('button', { name: '打开菜单' }))

    expect(screen.queryByText('MUSIC 音乐')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: '简历 PDF 下载' })).toHaveAttribute('download')
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

})
