import type { ReactNode } from 'react'
import type { SitePage } from '../lib/siteRoute'

export function PageTransition({ page, children }: {
  page: SitePage
  children: ReactNode
}) {
  return (
    <div key={page} data-testid="page-transition" data-page={page} className="page-enter">
      {children}
    </div>
  )
}
