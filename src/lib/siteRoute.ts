import { workItems } from '../data/portfolio'

export const siteNavItems = [
  { page: 'index', label: 'INDEX 首页', path: '/' },
  { page: 'work', label: 'WORK 工作', path: '/work/' },
  { page: 'words', label: 'WORDS 内容', path: '/words/' },
  { page: 'now', label: 'NOW 现在', path: '/now/' },
  { page: 'contact', label: 'CONTACT 联系', path: '/contact/' },
] as const

export type SitePage = (typeof siteNavItems)[number]['page']

export function sitePath(page: SitePage) {
  return siteNavItems.find((item) => item.page === page)!.path
}

export function sitePageFromPath(pathname: string): SitePage {
  const normalizedPath = pathname === '/' ? '/' : `${pathname.replace(/\/+$/, '')}/`
  if (normalizedPath.startsWith('/work/')) return 'work'
  return siteNavItems.find((item) => item.path === normalizedPath)?.page ?? 'index'
}

export function legacyHashPath(hash: string) {
  const page = hash.replace(/^#/, '').split('/')[0]
  return siteNavItems.find((item) => item.page === page)?.path ?? null
}

export function publicSitePaths() {
  return [...siteNavItems.map((item) => item.path), ...publishedProjectPaths()]
}

export function publishedProjectPaths() {
  return workItems
    .filter((item) => item.detail.isReady)
    .map((item) => `/work/${item.slug}/`)
}
