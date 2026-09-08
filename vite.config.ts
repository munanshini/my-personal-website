import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { publicSitePaths } from './src/lib/siteRoute'

type DeploymentTarget = 'aliyun' | 'pages'

function writeSiteFiles(target: DeploymentTarget) {
  const outDir = resolve(process.cwd(), 'dist')
  const sitemapPath = resolve(outDir, 'sitemap.xml')
  const robotsPath = resolve(outDir, 'robots.txt')

  const urls = publicSitePaths()
    .map((path) => `  <url><loc>https://zhangnanai.com${path}</loc></url>`)
    .join('\n')
  writeFileSync(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
  writeFileSync(robotsPath, 'User-agent: *\nAllow: /\nSitemap: https://zhangnanai.com/sitemap.xml\n')

  if (target === 'pages') {
    for (const path of publicSitePaths().filter((path) => path !== '/')) {
      const depth = path.split('/').filter(Boolean).length
      const filePath = resolve(outDir, path.replace(/^\//, ''), 'index.html')
      const html = readFileSync(filePath, 'utf8')
      const baseTag = `<base href="${'../'.repeat(depth)}">`
      writeFileSync(filePath, html.replace('<head>', `<head>${baseTag}`))
    }
  }
}

export default defineConfig(({ mode }) => {
  const target: DeploymentTarget = mode === 'pages' ? 'pages' : 'aliyun'

  return {
    base: target === 'pages' ? './' : '/',
    plugins: [react()],
    ssgOptions: {
      entry: 'src/main.tsx',
      dirStyle: 'nested',
      includedRoutes: () => publicSitePaths(),
      onFinished: () => writeSiteFiles(target),
    },
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
  }
})
