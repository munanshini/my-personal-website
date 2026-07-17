export const siteNavItems = [
  { page: 'index', label: 'INDEX 首页' },
  { page: 'work', label: 'WORK 工作' },
  { page: 'words', label: 'WORDS 内容' },
  { page: 'now', label: 'NOW 现在' },
  { page: 'contact', label: 'CONTACT 联系' },
] as const

export type SitePage = (typeof siteNavItems)[number]['page']

const pages = new Set<SitePage>(siteNavItems.map((item) => item.page))

export function parseSitePage(hash: string): SitePage {
  const candidate = hash.replace(/^#/, '').split('/')[0] as SitePage
  return pages.has(candidate) ? candidate : 'index'
}

export function sitePageHash(page: SitePage) {
  return `#${page}` as const
}
