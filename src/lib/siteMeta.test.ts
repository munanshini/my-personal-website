import { describe, expect, it } from 'vitest'
import { getPageMeta } from './siteMeta'

describe('siteMeta', () => {
  it('uses an absolute canonical URL and sharing image for the main site', () => {
    const meta = getPageMeta('work', 'aliyun')

    expect(meta.canonical).toBe('https://zhangnanai.com/work/')
    expect(meta.ogImage).toBe('https://zhangnanai.com/social-cover.png')
  })

  it('marks only the GitHub Pages build as noindex', () => {
    expect(getPageMeta('index', 'pages').robots).toBe('noindex')
    expect(getPageMeta('index', 'aliyun').robots).toBeUndefined()
  })

  it('gives each first-batch page its own title and description', () => {
    const index = getPageMeta('index', 'aliyun')
    const work = getPageMeta('work', 'aliyun')

    expect(work.title).not.toBe(index.title)
    expect(work.description).not.toBe(index.description)
    expect(work.description.length).toBeGreaterThanOrEqual(80)
  })
})
