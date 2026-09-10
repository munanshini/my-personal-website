import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { ThemeProvider, useTheme } from './ThemeProvider'

function ThemeProbe() {
  const { theme, toggleTheme } = useTheme()
  return <button onClick={toggleTheme}>{theme}</button>
}

beforeEach(() => localStorage.clear())
afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

it('uses the saved theme before the system preference', () => {
  localStorage.setItem('portfolio-theme', 'dark')
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
  render(<ThemeProvider><ThemeProbe /></ThemeProvider>)
  expect(screen.getByRole('button')).toHaveTextContent('dark')
  expect(document.documentElement.dataset.theme).toBe('dark')
})

it('defaults to dark even on a light system and persists toggles', () => {
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
  render(<ThemeProvider><ThemeProbe /></ThemeProvider>)
  expect(screen.getByRole('button')).toHaveTextContent('dark')
  fireEvent.click(screen.getByRole('button'))
  expect(localStorage.getItem('portfolio-theme')).toBe('light')
})

it('keeps the root theme dataset and native color scheme in sync after a toggle', () => {
  localStorage.setItem('portfolio-theme', 'dark')
  render(<ThemeProvider><ThemeProbe /></ThemeProvider>)

  expect(document.documentElement.dataset.theme).toBe('dark')
  expect(document.documentElement.style.colorScheme).toBe('dark')

  fireEvent.click(screen.getByRole('button'))

  expect(document.documentElement.dataset.theme).toBe('light')
  expect(document.documentElement.style.colorScheme).toBe('light')
})

it('still switches when local storage is unavailable', () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked') })
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked') })
  render(<ThemeProvider><ThemeProbe /></ThemeProvider>)
  fireEvent.click(screen.getByRole('button'))
  expect(screen.getByRole('button')).toHaveTextContent('light')
})
