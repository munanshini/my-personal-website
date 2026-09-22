import { afterEach, describe, expect, it, vi } from 'vitest'
import { assetPath, publicPath } from './publicPath'

afterEach(() => {
  vi.unstubAllEnvs()
  window.history.replaceState({}, '', '/')
})

describe('publicPath', () => {
  it('creates portable relative links from the generated root page', () => {
    expect(publicPath('/work/', '/')).toBe('./work/')
    expect(publicPath('/contact/', '/')).toBe('./contact/')
  })

  it('creates portable relative links from generated nested pages', () => {
    expect(publicPath('/work/', '/work/')).toBe('../work/')
    expect(publicPath('/', '/work/')).toBe('../')
    expect(publicPath('/contact/', '/work/')).toBe('../contact/')
  })

  it('keeps Pages navigation correct after a nested page is hydrated without a base tag', () => {
    vi.stubEnv('MODE', 'pages')

    expect(publicPath('/work/', '/work/')).toBe('../work/')
    expect(publicPath('/words/interaction-design/', '/words/')).toBe('../words/interaction-design/')
  })

  it('keeps Pages assets rooted correctly after hydration on a nested route', () => {
    vi.stubEnv('MODE', 'pages')
    window.history.replaceState({}, '', '/work/')

    expect(assetPath('/assets/site-logo.png')).toBe('../assets/site-logo.png')
  })
})
