import { act, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { PageTransition } from './PageTransition'

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

it('retains the old page as an inert exit layer until the transition completes', () => {
  vi.useFakeTimers()
  const { rerender } = render(<PageTransition page="work"><div>Work</div></PageTransition>)

  rerender(<PageTransition page="words"><div>Words</div></PageTransition>)

  const exitingPage = screen.getByTestId('page-transition-exit')
  expect(exitingPage).toHaveTextContent('Work')
  expect(exitingPage).toHaveAttribute('aria-hidden', 'true')
  expect(exitingPage).toHaveAttribute('inert')
  expect(exitingPage).toHaveClass('pointer-events-none', 'page-exit', 'z-10')
  expect(screen.getByTestId('page-transition')).toHaveTextContent('Words')

  act(() => vi.advanceTimersByTime(419))
  expect(screen.getByTestId('page-transition-exit')).toBeInTheDocument()

  act(() => vi.advanceTimersByTime(1))
  expect(screen.queryByTestId('page-transition-exit')).not.toBeInTheDocument()
})

it('switches immediately without enter or exit motion when reduced motion is preferred', () => {
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
  const { rerender } = render(<PageTransition page="work"><div>Work</div></PageTransition>)

  rerender(<PageTransition page="words"><div>Words</div></PageTransition>)

  expect(screen.queryByTestId('page-transition-exit')).not.toBeInTheDocument()
  expect(screen.getByTestId('page-transition')).not.toHaveClass('page-enter')
  expect(screen.getByTestId('page-transition')).toHaveTextContent('Words')
})
