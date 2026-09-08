import { describe, expect, it } from 'vitest'
import { publicPath } from './publicPath'

describe('publicPath', () => {
  it('creates portable relative links from the generated root page', () => {
    expect(publicPath('/work/', '/')).toBe('./work/')
    expect(publicPath('/resume.pdf', '/')).toBe('./resume.pdf')
  })

  it('creates portable relative links from generated nested pages', () => {
    expect(publicPath('/work/', '/work/')).toBe('../work/')
    expect(publicPath('/', '/work/')).toBe('../')
    expect(publicPath('/resume.pdf', '/work/')).toBe('../resume.pdf')
  })
})
