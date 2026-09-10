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

function assertNoText(path, text) {
  const contents = readFileSync(resolve(root, path), 'utf8')
  if (contents.includes(text)) throw new Error(`Expected ${path} not to include ${text}`)
}

function assertTextCount(path, text, expectedCount) {
  const contents = readFileSync(resolve(root, path), 'utf8')
  const actualCount = contents.split(text).length - 1
  if (actualCount !== expectedCount) {
    throw new Error(`Expected ${path} to include ${text} ${expectedCount} time(s), found ${actualCount}`)
  }
}

for (const path of ['index.html', 'work/index.html', 'words/index.html', 'now/index.html', 'contact/index.html']) {
  assertExists(path)
}

for (const path of [
  'work/ai-ide/index.html',
  'work/warehouse-scheduling/index.html',
  'work/smart-sales-center/index.html',
]) {
  assertExists(path)
}

for (const path of [
  'index.html',
  'work/index.html',
  'words/index.html',
  'now/index.html',
  'contact/index.html',
  'work/ai-ide/index.html',
  'work/warehouse-scheduling/index.html',
  'work/smart-sales-center/index.html',
]) {
  assertTextCount(path, '<title', 1)
  assertTextCount(path, 'name="description"', 1)
}

for (const slug of ['ai-ide', 'warehouse-scheduling', 'smart-sales-center']) {
  assertText('sitemap.xml', `https://zhangnanai.com/work/${slug}/`)
}

assertText('work/ai-ide/index.html', 'AI IDE 研发助手 · 张楠 AI 产品经理')
assertText('work/ai-ide/index.html', '把不可靠的模型输出')
assertText('work/warehouse-scheduling/index.html', '把管理员经验')
assertText('work/smart-sales-center/index.html', '把一线顾问的讲盘经验')

if (target === 'aliyun') {
  assertExists('sitemap.xml')
  assertExists('robots.txt')
  assertText('sitemap.xml', 'https://zhangnanai.com/work/')
  assertText('work/index.html', 'AI 不止能生成')
} else {
  assertExists('sitemap.xml')
  assertExists('robots.txt')
  assertExists('resume.pdf')
  assertText('sitemap.xml', 'https://zhangnanai.com/work/')
  assertText('index.html', 'href="./assets/')
  assertText('work/index.html', '<base href="../">')
  assertText('work/index.html', 'href="./assets/')
  assertText('work/index.html', 'href="./work/"')
  assertText('work/ai-ide/index.html', 'href="./work/ai-ide/#project-decisions"')
  assertNoText('work/ai-ide/index.html', 'href="#project-')
  assertNoText('index.html', "url('/assets/")
  assertNoText('contact/index.html', 'src="/assets/')
}
