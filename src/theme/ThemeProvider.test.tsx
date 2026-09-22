import { act, fireEvent, render, screen } from '@testing-library/react'
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

it('uses the light system preference by default and persists a manual toggle', () => {
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
  render(<ThemeProvider><ThemeProbe /></ThemeProvider>)
  expect(screen.getByRole('button')).toHaveTextContent('light')
  fireEvent.click(screen.getByRole('button'))
  expect(localStorage.getItem('portfolio-theme')).toBe('dark')
})

it('follows a system theme change until the visitor manually chooses a theme', () => {
  let onChange: ((event: MediaQueryListEvent) => void) | undefined
  const removeEventListener = vi.fn((_event, listener) => {
    if (onChange === listener) onChange = undefined
  })
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn((_event, listener) => { onChange = listener }),
    removeEventListener,
  }))

  render(<ThemeProvider><ThemeProbe /></ThemeProvider>)
  expect(screen.getByRole('button')).toHaveTextContent('light')

  act(() => onChange?.({ matches: true } as MediaQueryListEvent))
  expect(screen.getByRole('button')).toHaveTextContent('dark')

  fireEvent.click(screen.getByRole('button'))
  expect(removeEventListener).toHaveBeenCalled()
  act(() => onChange?.({ matches: true } as MediaQueryListEvent))
  expect(screen.getByRole('button')).toHaveTextContent('light')
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
  expect(screen.getByRole('button')).toHaveTextContent('dark')
})
