import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const target = process.argv[2]
const root = resolve(process.cwd(), 'dist')

if (target !== 'aliyun' && target !== 'pages') {
  throw new Error('Usage: npm run verify:static -- <aliyun|pages>')
}

function assertExists(path) {
  if (!existsSync(resolve(root, path))) throw new Error(`Expected ${path} to exist`)
}

function assertMissing(path) {
  if (existsSync(resolve(root, path))) throw new Error(`Expected ${path} to be absent`)
}

function assertText(path, text) {
  const contents = readFileSync(resolve(root, path), 'utf8')
  if (!contents.includes(text)) throw new Error(`Expected ${path} to include ${text}`)
}

for (const path of ['index.html', 'work/index.html', 'words/index.html', 'now/index.html', 'contact/index.html']) {
  assertExists(path)
}

assertMissing('work/ai-ide/index.html')

if (target === 'aliyun') {
  assertExists('sitemap.xml')
  assertExists('robots.txt')
  assertText('sitemap.xml', 'https://zhangnanai.com/work/')
  assertText('work/index.html', 'AI 不止能生成')
} else {
  assertMissing('sitemap.xml')
  assertExists('robots.txt')
  assertExists('resume.pdf')
  assertText('work/index.html', 'name="robots" content="noindex"')
  assertText('work/index.html', 'href="/my-personal-website/work/"')
}
