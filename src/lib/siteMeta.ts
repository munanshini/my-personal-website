import { workItemBySlug } from '../data/portfolio'
import { sitePath, type SitePage } from './siteRoute'

export type DeploymentTarget = 'aliyun' | 'pages'

export interface PageMeta {
  title: string
  description: string
  canonical: string
  ogImage: string
  ogType: 'website' | 'article'
  robots?: 'noindex'
}

const pageMeta: Record<SitePage, Pick<PageMeta, 'title' | 'description'>> = {
  index: {
    title: '张楠 · AI 产品经理',
    description: '张楠的 AI 产品经理个人网站，展示我从产品策略、用户体验到 AI 落地交付的实践方法、代表项目与持续思考，面向希望了解产品判断和协作方式的招聘方与业务伙伴。',
  },
  work: {
    title: '工作作品 · 张楠 AI 产品经理',
    description: '张楠的 AI 产品经理工作作品集，聚焦 AI IDE、智能仓储调度与智慧案场等真实项目，呈现从业务问题拆解、产品方案设计到跨团队协作落地的产品实践、阶段性结果与复盘线索。',
  },
  words: {
    title: '内容与思考 · 张楠 AI 产品经理',
    description: '张楠围绕 AI 产品、用户体验、工作方法与创作生活记录的内容页面，持续梳理真实工作中的问题、判断与复盘，为关注 AI 产品实践的人提供可追溯的思考线索。',
  },
  now: {
    title: '现在进行时 · 张楠 AI 产品经理',
    description: '张楠当前正在推进的 AI 产品探索、学习主题与工作状态，记录从需求洞察到交付验证的近期行动，也帮助招聘方快速了解我的关注方向与可合作的工作节奏。',
  },
  contact: {
    title: '联系张楠 · AI 产品经理',
    description: '联系张楠了解 AI 产品经理岗位、项目合作或产品交流。页面提供公开邮箱、微信二维码与简历下载入口，便于招聘方、猎头和业务团队以合适方式建立进一步沟通。',
  },
}

export function getPageMeta(page: SitePage, _target: DeploymentTarget): PageMeta {
  return {
    ...pageMeta[page],
    canonical: `https://zhangnanai.com${sitePath(page)}`,
    ogImage: 'https://zhangnanai.com/social-cover.png',
    ogType: 'website',
    // GitHub Pages also serves the zhangnanai.com custom domain, so this
    // shared artifact must remain indexable and canonicalize to the domain.
    robots: undefined,
  }
}

export function getProjectPageMeta(slug: string, _target: DeploymentTarget): PageMeta | undefined {
  const project = workItemBySlug(slug)
  if (!project?.detail.isReady) return undefined

  return {
    title: project.detail.seoTitle,
    description: project.detail.seoDescription,
    canonical: `https://zhangnanai.com/work/${project.slug}/`,
    ogImage: 'https://zhangnanai.com/social-cover.png',
    ogType: 'article',
    robots: undefined,
  }
}

export function projectJsonLd(slug: string) {
  const project = workItemBySlug(slug)
  if (!project?.detail.isReady) return undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.detail.heroTagline,
    description: project.detail.seoDescription,
    url: `https://zhangnanai.com/work/${project.slug}/`,
    author: {
      '@type': 'Person',
      name: '张楠',
      jobTitle: 'AI 产品经理',
    },
  }
}

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '张楠',
  jobTitle: 'AI 产品经理',
  url: 'https://zhangnanai.com/',
  email: 'zhangnan@zhangnanai.com',
  knowsAbout: ['AI 产品设计', '用户体验设计', '产品策略', '智能体', 'AI 交付'],
  sameAs: ['https://github.com/munanshini'],
}
