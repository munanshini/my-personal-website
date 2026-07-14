import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CustomCursor } from './CustomCursor'

describe('CustomCursor', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    document.documentElement.classList.remove('custom-cursor-active')
    document.documentElement.style.cursor = ''
    document.body.style.cursor = ''
  })

  it('does not create a second DOM cursor on desktop', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    render(<CustomCursor />)

    expect(screen.queryByTestId('custom-cursor')).not.toBeInTheDocument()
    expect(document.documentElement).not.toHaveClass('custom-cursor-active')
    expect(document.documentElement.style.cursor).toBe('')
    expect(document.body.style.cursor).toBe('')
  })
})
