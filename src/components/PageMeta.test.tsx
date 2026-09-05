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

it('adds noindex only for the GitHub Pages deployment', async () => {
  render(<HelmetProvider><PageMeta page="index" target="pages" /></HelmetProvider>)

  await waitFor(() => expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex'))
})

it('adds Person structured data only to the home page', async () => {
  render(<HelmetProvider><PageMeta page="index" target="aliyun" /></HelmetProvider>)

  await waitFor(() => expect(document.head.querySelector('script[type="application/ld+json"]')?.textContent).toContain('"@type":"Person"'))
})
