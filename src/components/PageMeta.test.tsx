import { render, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { afterEach, expect, it } from 'vitest'
import { PageMeta } from './PageMeta'

afterEach(() => {
  document.head.innerHTML = ''
})

it('emits a unique title, canonical URL and absolute sharing image for work', async () => {
  render(<HelmetProvider><PageMeta page="work" target="aliyun" /></HelmetProvider>)

  await waitFor(() => expect(document.title).toContain('工作'))
  expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://zhangnanai.com/work/')
  expect(document.head.querySelector('meta[property="og:image"]')).toHaveAttribute('content', 'https://zhangnanai.com/social-cover.png')
  expect(document.head.querySelector('meta[property="og:url"]')).toHaveAttribute('content', 'https://zhangnanai.com/work/')
})

it('keeps the custom-domain deployment indexable when served by GitHub Pages', async () => {
  render(<HelmetProvider><PageMeta page="index" target="pages" /></HelmetProvider>)

  await waitFor(() => expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://zhangnanai.com/'))
  expect(document.head.querySelector('meta[name="robots"]')).toBeNull()
})

it('adds Person structured data only to the home page', async () => {
  render(<HelmetProvider><PageMeta page="index" target="aliyun" /></HelmetProvider>)

  await waitFor(() => expect(document.head.querySelector('script[type="application/ld+json"]')?.textContent).toContain('"@type":"Person"'))
})

it('uses project metadata and CreativeWork structured data on a detail page', async () => {
  render(<HelmetProvider><PageMeta page="work" pathname="/work/ai-ide/" target="aliyun" /></HelmetProvider>)

  await waitFor(() => expect(document.title).toBe('AI IDE 研发助手 · 张楠 AI 产品经理'))
  expect(document.head.querySelector('meta[name="description"]')?.getAttribute('content')).toContain('RAG')
  expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://zhangnanai.com/work/ai-ide/')
  expect(document.head.querySelector('meta[property="og:type"]')).toHaveAttribute('content', 'article')
  expect(document.head.querySelector('script[type="application/ld+json"]')?.textContent).toContain('"@type":"CreativeWork"')
})
