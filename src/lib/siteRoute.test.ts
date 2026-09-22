import { describe, expect, it } from 'vitest'
import { designProjects } from '../data/designProjects'
import { legacyHashPath, publicSitePaths, publishedProjectPaths, publishedWordArticlePaths, publishedWordChannelPaths, sitePageFromPath, sitePath } from './siteRoute'

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
    expect(sitePageFromPath('/words/articles/')).toBe('words')
    expect(sitePageFromPath('/words/articles/openai-designers-ai-era/')).toBe('words')
    expect(sitePageFromPath('/unknown/')).toBe('index')
  })

  it('exposes the five primary routes, four word channel routes, article routes, and four project routes', () => {
    expect(publicSitePaths()).toEqual([
      '/',
      '/work/',
      '/words/',
      '/now/',
      '/contact/',
      '/words/articles/',
      '/words/videos/',
      '/words/vibe-coding/',
      '/words/interaction-design/',
      '/words/articles/openai-designers-ai-era/',
      '/words/articles/ai-pm-agent-nine-step-design/',
      '/words/openai-designers-ai-era/',
      '/words/ai-pm-agent-nine-step-design/',
      '/work/ai-ide/',
      '/work/pdmc-ai/',
      '/work/warehouse-scheduling/',
      '/work/smart-sales-center/',
      ...designProjects.map(project => `/words/interaction-design/${project.slug}/`),
    ])
    expect(publishedProjectPaths()).toEqual([
      '/work/ai-ide/',
      '/work/pdmc-ai/',
      '/work/warehouse-scheduling/',
      '/work/smart-sales-center/',
    ])
    expect(publishedWordChannelPaths()).toEqual(['/words/articles/', '/words/videos/', '/words/vibe-coding/', '/words/interaction-design/'])
    expect(publishedWordArticlePaths()).toEqual([
      '/words/articles/openai-designers-ai-era/',
      '/words/articles/ai-pm-agent-nine-step-design/',
      '/words/openai-designers-ai-era/',
      '/words/ai-pm-agent-nine-step-design/',
    ])
  })
})
