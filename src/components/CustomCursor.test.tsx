import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CustomCursor } from './CustomCursor'

function setDesktopPointer(matches: boolean) {
  const addEventListener = vi.fn()
  const removeEventListener = vi.fn()
  vi.stubGlobal('PointerEvent', MouseEvent)
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches, addEventListener, removeEventListener }))
  return { addEventListener, removeEventListener }
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

  it('hides when the window loses focus', () => {
    setDesktopPointer(true)
    render(<CustomCursor />)
    fireEvent.pointerMove(window, { clientX: 30, clientY: 40 })

    fireEvent.blur(window)

    expect(screen.getByTestId('custom-cursor')).toHaveAttribute('data-visible', 'false')
  })
})
