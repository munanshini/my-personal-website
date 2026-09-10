import { expect, it, vi } from 'vitest'
import indexHtml from '../../index.html?raw'
import providerSource from './ThemeProvider.tsx?raw'

const script = indexHtml.match(/<script>([\s\S]*?)<\/script>/)?.[1]

function executeStartupTheme({
  getItem,
  matchMedia,
  documentObject,
}: {
  getItem: () => string | null
  matchMedia?: () => { matches: boolean }
  documentObject: object
}) {
  if (!script) throw new Error('Startup theme script is missing')

  const execute = new Function('localStorage', 'window', 'document', script)
  execute(
    { getItem },
    { matchMedia },
    documentObject,
  )
}

function runStartupTheme({
  getItem,
  matchMedia,
}: {
  getItem: () => string | null
  matchMedia?: () => { matches: boolean }
}) {
  const root = { dataset: {} as Record<string, string>, style: {} as Record<string, string> }

  executeStartupTheme({ getItem, matchMedia, documentObject: { documentElement: root } })

  return root
}

it('uses a saved dark theme without depending on matchMedia', () => {
  const matchMedia = vi.fn(() => { throw new Error('unavailable') })
  const root = runStartupTheme({ getItem: () => 'dark', matchMedia })

  expect(matchMedia).not.toHaveBeenCalled()
  expect(root.dataset.theme).toBe('dark')
  expect(root.style.colorScheme).toBe('dark')
})

it('defaults to dark when storage reading is blocked', () => {
  const root = runStartupTheme({
    getItem: () => { throw new Error('blocked') },
    matchMedia: () => ({ matches: true }),
  })

  expect(root.dataset.theme).toBe('dark')
  expect(root.style.colorScheme).toBe('dark')
})

it('falls back safely when the system preference API is unavailable', () => {
  const root = runStartupTheme({ getItem: () => null })

  expect(root.dataset.theme).toBe('dark')
  expect(root.style.colorScheme).toBe('dark')
})

it('does not throw when the root theme properties are unavailable', () => {
  const documentObject = Object.defineProperty({}, 'documentElement', {
    get: () => { throw new Error('unavailable') },
  })

  expect(() => executeStartupTheme({
    getItem: () => 'dark',
    documentObject,
  })).not.toThrow()
})

it('uses the same storage key as ThemeProvider', () => {
  const startupKey = script?.match(/getItem\(['"]([^'"]+)['"]\)/)?.[1]
  const providerKey = providerSource.match(/STORAGE_KEY\s*=\s*['"]([^'"]+)['"]/)?.[1]

  expect(startupKey).toBe('portfolio-theme')
  expect(startupKey).toBe(providerKey)
})

it('retains an explicitly saved light theme', () => {
  const root = runStartupTheme({ getItem: () => 'light' })
  expect(root.dataset.theme).toBe('light')
  expect(root.style.colorScheme).toBe('light')
})
