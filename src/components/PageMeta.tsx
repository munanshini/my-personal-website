import { Head } from 'vite-react-ssg'
import { getPageMeta, getProjectPageMeta, personJsonLd, projectJsonLd, type DeploymentTarget } from '../lib/siteMeta'
import type { SitePage } from '../lib/siteRoute'

interface PageMetaProps {
  page: SitePage
  pathname?: string
  target: DeploymentTarget
}

export function PageMeta({ page, pathname = '', target }: PageMetaProps) {
  const projectSlug = pathname.match(/^\/work\/([^/]+)\/?$/)?.[1]
  const meta = (projectSlug && getProjectPageMeta(projectSlug, target)) || getPageMeta(page, target)
  const structuredData = projectSlug ? projectJsonLd(projectSlug) : page === 'index' ? personJsonLd : undefined

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.canonical} />
      <meta property="og:type" content={meta.ogType} />
      <meta property="og:image" content={meta.ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.ogImage} />
      {meta.robots && <meta name="robots" content={meta.robots} />}
      {structuredData && <script type="application/ld+json">{JSON.stringify(structuredData)}</script>}
    </Head>
  )
}
