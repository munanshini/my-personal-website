import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { PageTransition } from './PageTransition'

it('keys the transition surface by page', () => {
  const { rerender } = render(<PageTransition page="work"><div>Work</div></PageTransition>)
  const first = screen.getByTestId('page-transition')

  rerender(<PageTransition page="words"><div>Words</div></PageTransition>)

  expect(screen.getByTestId('page-transition')).not.toBe(first)
})
