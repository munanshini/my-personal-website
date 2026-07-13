import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { TopNav } from './TopNav'

describe('TopNav', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    document.body.innerHTML = ''
  })

  it('selects NOW from scroll position', async () => {
    document.body.innerHTML = '<section id="index"/><section id="work"/><section id="words"/><section id="now"/><section id="contact"/>'
    const positions = { index: -2400, work: -1700, words: -900, now: -120, contact: 800 }
    Object.entries(positions).forEach(([id, top]) => vi.spyOn(document.getElementById(id)!, 'getBoundingClientRect').mockReturnValue({ top } as DOMRect))
    render(<TopNav />)
    fireEvent.scroll(window)
    await waitFor(() => expect(screen.getByRole('link', { name: 'NOW 现在' }).className).toContain('bg-white'))
  })

  it('prevents the native hash jump when a desktop navigation item is selected', () => {
    render(<TopNav />)
    const workLink = screen.getByRole('link', { name: 'WORK 工作' })
    const click = new MouseEvent('click', { bubbles: true, cancelable: true })

    workLink.dispatchEvent(click)

    expect(click.defaultPrevented).toBe(true)
  })

  it('keeps an upward navigation target active while smooth scrolling is locked', () => {
    document.body.innerHTML = '<section id="index"/><section id="work"/><section id="words"/><section id="now"/><section id="contact"/>'
    const positions = { index: -2400, work: -1700, words: -900, now: -120, contact: -20 }
    Object.entries(positions).forEach(([id, top]) => vi.spyOn(document.getElementById(id)!, 'getBoundingClientRect').mockReturnValue({ top } as DOMRect))
    render(<TopNav />)

    fireEvent.click(screen.getByRole('link', { name: 'NOW 现在' }))
    fireEvent.scroll(window)

    expect(screen.getByRole('link', { name: 'NOW 现在' }).className).toContain('bg-white')
  })

  it('updates to the section at rest after smooth scrolling settles without another scroll event', () => {
    vi.useFakeTimers()
    document.body.innerHTML = '<section id="index"/><section id="work"/><section id="words"/><section id="now"/><section id="contact"/>'
    const positions = { index: -2400, work: -1700, words: -900, now: -120, contact: -20 }
    Object.entries(positions).forEach(([id, top]) => vi.spyOn(document.getElementById(id)!, 'getBoundingClientRect').mockReturnValue({ top } as DOMRect))
    render(<TopNav />)

    fireEvent.click(screen.getByRole('link', { name: 'NOW 现在' }))
    for (let elapsed = 0; elapsed < 800; elapsed += 100) {
      vi.advanceTimersByTime(100)
      fireEvent.scroll(window)
    }

    expect(screen.getByRole('link', { name: 'NOW 现在' }).className).toContain('bg-white')

    act(() => vi.advanceTimersByTime(160))

    expect(screen.getByRole('link', { name: 'CONTACT 联系' }).className).toContain('bg-white')
  })

  it('shows the corrected phone number in the Open to Work panel', () => {
    render(<TopNav />)
    fireEvent.click(screen.getByRole('button', { name: /open to work/i }))

    expect(screen.getAllByText('15767978588')).toHaveLength(2)
    expect(screen.queryByText('1576797855')).not.toBeInTheDocument()
  })

  it('removes mobile music and contact rows while keeping resume access', () => {
    render(<TopNav />)
    fireEvent.click(screen.getByRole('button', { name: '打开菜单' }))

    expect(screen.queryByText('MUSIC 音乐')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: '简历 PDF 下载' })).toHaveAttribute('download')
    expect(screen.queryByText('15767978588')).not.toBeInTheDocument()
    expect(screen.queryByText('zn525347603@gmail.com')).not.toBeInTheDocument()
  })

  it('removes the mobile music row and menu separators', () => {
    render(<TopNav />)
    fireEvent.click(screen.getByRole('button', { name: '打开菜单' }))

    expect(screen.queryByText('MUSIC 音乐')).not.toBeInTheDocument()
    const indexLink = screen.getAllByRole('link', { name: 'INDEX 首页' }).find((link) => link.getAttribute('href') === '#index')
    expect(indexLink?.className).not.toContain('border-b')
  })

  it('uses light mobile controls in a dark active section', async () => {
    document.body.innerHTML = '<section id="index"></section><section id="work"></section><section id="words"></section><section id="now"></section><section id="contact"></section>'
    Object.values({ index: -1800, work: -1200, words: -700, now: -80, contact: 900 }).forEach((top, index) => {
      const id = ['index', 'work', 'words', 'now', 'contact'][index]
      vi.spyOn(document.getElementById(id)!, 'getBoundingClientRect').mockReturnValue({ top } as DOMRect)
    })
    render(<TopNav />)
    fireEvent.scroll(window)

    await waitFor(() => expect(screen.getByRole('button', { name: '打开菜单' }).className).toContain('text-white'))
  })

})
