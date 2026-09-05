import { Head } from 'vite-react-ssg'
import { getPageMeta, personJsonLd, type DeploymentTarget } from '../lib/siteMeta'
import type { SitePage } from '../lib/siteRoute'

interface PageMetaProps {
  page: SitePage
  target: DeploymentTarget
}

export function PageMeta({ page, target }: PageMetaProps) {
  const meta = getPageMeta(page, target)

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={meta.ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.ogImage} />
      {meta.robots && <meta name="robots" content={meta.robots} />}
      {page === 'index' && <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>}
    </Head>
  )
}
