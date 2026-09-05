import { describe, expect, it } from 'vitest'
import { publicPath } from './publicPath'

describe('publicPath', () => {
  it('keeps root-hosted links unchanged for the main site', () => {
    expect(publicPath('/work/', '/')).toBe('/work/')
    expect(publicPath('/resume.pdf', '/')).toBe('/resume.pdf')
  })

  it('prefixes navigation and public assets for the GitHub Pages subdirectory', () => {
    expect(publicPath('/work/', '/my-personal-website/')).toBe('/my-personal-website/work/')
    expect(publicPath('/resume.pdf', '/my-personal-website/')).toBe('/my-personal-website/resume.pdf')
  })
})
