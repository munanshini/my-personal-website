import { describe, expect, it } from 'vitest'
import { legacyHashPath, publicSitePaths, publishedProjectPaths, sitePageFromPath, sitePath } from './siteRoute'

describe('siteRoute', () => {
  it.each([
    ['index', '/'],
    ['work', '/work/'],
    ['words', '/words/'],
    ['now', '/now/'],
    ['contact', '/contact/'],
  ] as const)(
    'returns a canonical path for %s',
    (page, path) => expect(sitePath(page)).toBe(path),
  )

  it('maps legacy hashes to matching real paths', () => {
    expect(legacyHashPath('#work')).toBe('/work/')
    expect(legacyHashPath('#unknown')).toBeNull()
  })

  it('normalizes known paths and falls back to the index page', () => {
    expect(sitePageFromPath('/work')).toBe('work')
    expect(sitePageFromPath('/work/')).toBe('work')
    expect(sitePageFromPath('/work/ai-ide/')).toBe('work')
    expect(sitePageFromPath('/unknown/')).toBe('index')
  })

  it('exposes only first-batch public routes', () => {
    expect(publicSitePaths()).toEqual(['/', '/work/', '/words/', '/now/', '/contact/'])
    expect(publishedProjectPaths()).toEqual([])
  })
})
