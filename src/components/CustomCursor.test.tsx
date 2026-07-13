import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CustomCursor } from './CustomCursor'

function setDesktopPointer(matches: boolean) {
  const listeners = new Set<() => void>()
  const media = {
    matches,
    addEventListener: vi.fn((_type: string, listener: () => void) => listeners.add(listener)),
    removeEventListener: vi.fn((_type: string, listener: () => void) => listeners.delete(listener)),
  }
  vi.stubGlobal('PointerEvent', MouseEvent)
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue(media))
  return {
    addEventListener: media.addEventListener,
    removeEventListener: media.removeEventListener,
    setMatches(nextMatches: boolean) {
      media.matches = nextMatches
      listeners.forEach((listener) => listener())
    },
  }
}

describe('CustomCursor', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    document.documentElement.classList.remove('custom-cursor-active')
  })

  it('does not render or hide the native cursor on touch-first devices', () => {
    setDesktopPointer(false)
    render(<CustomCursor />)

    expect(screen.queryByTestId('custom-cursor')).not.toBeInTheDocument()
    expect(document.documentElement).not.toHaveClass('custom-cursor-active')
  })

  it('tracks a fine pointer without intercepting events', () => {
    setDesktopPointer(true)
    render(<CustomCursor />)

    fireEvent.pointerMove(window, { clientX: 120, clientY: 80 })

    const cursor = screen.getByTestId('custom-cursor')
    expect(cursor).toHaveAttribute('data-visible', 'true')
    expect(cursor).toHaveStyle({ transform: 'translate3d(120px, 80px, 0)' })
    expect(cursor).toHaveClass('pointer-events-none')
    expect(document.documentElement).toHaveClass('custom-cursor-active')
  })

  it('marks interactive targets and pressed state', () => {
    setDesktopPointer(true)
    render(<><CustomCursor /><button type="button">Action</button></>)

    const button = screen.getByRole('button', { name: 'Action' })
    fireEvent.pointerMove(button, { clientX: 30, clientY: 40 })
    fireEvent.pointerDown(window)

    expect(screen.getByTestId('custom-cursor')).toHaveAttribute('data-interactive', 'true')
    expect(screen.getByTestId('custom-cursor')).toHaveAttribute('data-pressed', 'true')
  })

  it('resets cursor state when pointer capability is disabled and waits for a new move when re-enabled', () => {
    const media = setDesktopPointer(true)
    render(<><CustomCursor /><button type="button">Action</button></>)

    fireEvent.pointerMove(screen.getByRole('button', { name: 'Action' }), { clientX: 30, clientY: 40 })
    fireEvent.pointerDown(window)

    act(() => media.setMatches(false))
    expect(screen.queryByTestId('custom-cursor')).not.toBeInTheDocument()
    expect(document.documentElement).not.toHaveClass('custom-cursor-active')

    act(() => media.setMatches(true))
    const cursor = screen.getByTestId('custom-cursor')
    expect(cursor).toHaveAttribute('data-visible', 'false')
    expect(cursor).toHaveAttribute('data-interactive', 'false')
    expect(cursor).toHaveAttribute('data-pressed', 'false')
    expect(cursor).toHaveStyle({ transform: 'translate3d(0px, 0px, 0)' })

    fireEvent.pointerMove(window, { clientX: 50, clientY: 60 })
    expect(cursor).toHaveAttribute('data-visible', 'true')
  })

  it('hides and releases pressed state when the pointer leaves the document', () => {
    setDesktopPointer(true)
    render(<CustomCursor />)
    fireEvent.pointerMove(window, { clientX: 30, clientY: 40 })
    fireEvent.pointerDown(window)

    fireEvent.pointerLeave(document.documentElement)

    expect(screen.getByTestId('custom-cursor')).toHaveAttribute('data-visible', 'false')
    expect(screen.getByTestId('custom-cursor')).toHaveAttribute('data-pressed', 'false')
  })

  it('hides and releases pressed state when the pointer is cancelled', () => {
    setDesktopPointer(true)
    render(<CustomCursor />)
    fireEvent.pointerMove(window, { clientX: 30, clientY: 40 })
    fireEvent.pointerDown(window)

    fireEvent.pointerCancel(window)

    expect(screen.getByTestId('custom-cursor')).toHaveAttribute('data-visible', 'false')
    expect(screen.getByTestId('custom-cursor')).toHaveAttribute('data-pressed', 'false')
  })

  it('hides when the window loses focus', () => {
    setDesktopPointer(true)
    render(<CustomCursor />)
    fireEvent.pointerMove(window, { clientX: 30, clientY: 40 })
    fireEvent.pointerDown(window)

    fireEvent.blur(window)

    expect(screen.getByTestId('custom-cursor')).toHaveAttribute('data-visible', 'false')
    expect(screen.getByTestId('custom-cursor')).toHaveAttribute('data-pressed', 'false')
  })
})
