import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { TopNav } from './TopNav'

describe('TopNav', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    document.body.innerHTML = ''
  })

  it('highlights the section with the strongest visible intersection', async () => {
    let observeCallback: IntersectionObserverCallback | undefined

    class IntersectionObserverMock {
      constructor(callback: IntersectionObserverCallback) {
        observeCallback = callback
      }

      observe() {}

      disconnect() {}
    }

    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
    document.body.innerHTML = '<section id="index"></section><section id="work"></section>'
    render(<TopNav />)

    const indexLink = screen.getByRole('link', { name: 'INDEX 首页' })
    const workLink = screen.getByRole('link', { name: 'WORK 工作' })
    expect(indexLink.className).toContain('bg-white')
    expect(workLink.className).not.toContain('bg-white')

    observeCallback?.([
      { target: document.getElementById('index')!, isIntersecting: true, intersectionRatio: 0.2 } as unknown as IntersectionObserverEntry,
      { target: document.getElementById('work')!, isIntersecting: true, intersectionRatio: 0.8 } as unknown as IntersectionObserverEntry,
    ], {} as IntersectionObserver)

    await waitFor(() => expect(workLink.className).toContain('bg-white'))
    expect(indexLink.className).not.toContain('bg-white')
  })

  it('prevents the native hash jump when a desktop navigation item is selected', () => {
    render(<TopNav />)
    const workLink = screen.getByRole('link', { name: 'WORK 工作' })
    const click = new MouseEvent('click', { bubbles: true, cancelable: true })

    workLink.dispatchEvent(click)

    expect(click.defaultPrevented).toBe(true)
  })

  it('shows the corrected phone number in the Open to Work panel', () => {
    render(<TopNav />)
    fireEvent.click(screen.getByRole('button', { name: /open to work/i }))

    expect(screen.getAllByText('15767978588')).toHaveLength(2)
    expect(screen.queryByText('1576797855')).not.toBeInTheDocument()
  })
})
