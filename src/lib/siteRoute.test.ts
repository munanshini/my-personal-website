import { describe, expect, it } from 'vitest'
import { parseSitePage, sitePageHash } from './siteRoute'

describe('siteRoute', () => {
  it.each(['index', 'work', 'words', 'now', 'contact'] as const)(
    'parses #%s as a valid page',
    (page) => expect(parseSitePage(`#${page}`)).toBe(page),
  )

  it('falls back to index for empty and unknown hashes', () => {
    expect(parseSitePage('')).toBe('index')
    expect(parseSitePage('#unknown')).toBe('index')
  })

  it('creates stable hashes', () => {
    expect(sitePageHash('work')).toBe('#work')
  })
})
