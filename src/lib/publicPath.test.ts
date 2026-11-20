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

  it('uses the same asset path for SSR and browser imports on nested routes', () => {
    vi.stubEnv('MODE', 'pages')
    window.history.replaceState({}, '', '/work/')

    for (const source of ['./assets/site-logo.png', '/assets/site-logo.png', 'https://zhangnanai.com/assets/site-logo.png']) {
      expect(assetPath(source, '/work/')).toBe('../assets/site-logo.png')
      expect(assetPath(source, '/work/ai-ide/')).toBe('../../assets/site-logo.png')
      expect(assetPath(source)).toBe('./assets/site-logo.png')
    }
    expect(assetPath('https://example.com/portrait.jpg', '/work/')).toBe('https://example.com/portrait.jpg')
  })
})
