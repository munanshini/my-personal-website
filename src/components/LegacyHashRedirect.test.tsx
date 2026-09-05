import { render, screen } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { afterEach, expect, it } from 'vitest'
import { LegacyHashRedirect } from './LegacyHashRedirect'

function LocationProbe() {
  const location = useLocation()
  return <output>{location.pathname}</output>
}

afterEach(() => {
  window.history.replaceState(null, '', '/')
})

it('replaces a legacy work hash with its real path', () => {
  window.history.replaceState(null, '', '/#work')

  render(
    <MemoryRouter initialEntries={['/']}>
      <LegacyHashRedirect />
      <LocationProbe />
    </MemoryRouter>,
  )

  expect(screen.getByText('/work/')).toBeInTheDocument()
})
