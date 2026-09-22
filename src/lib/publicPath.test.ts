import { describe, expect, it } from 'vitest'
import { publicPath } from './publicPath'

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
})
