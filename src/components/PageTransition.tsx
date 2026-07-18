import { useEffect, useState, type ReactNode } from 'react'
import type { SitePage } from '../lib/siteRoute'

const TRANSITION_DURATION_MS = 420

type PageLayer = {
  page: SitePage
  children: ReactNode
}

function prefersReducedMotion() {
  try {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  } catch {
    return false
  }
}

export function PageTransition({ page, children }: {
  page: SitePage
  children: ReactNode
}) {
  const [current, setCurrent] = useState<PageLayer>({ page, children })
  const [exiting, setExiting] = useState<PageLayer | null>(null)
  const [reducedMotion] = useState(prefersReducedMotion)

  useEffect(() => {
    if (current.page === page) return

    if (reducedMotion) {
      setExiting(null)
    } else {
      setExiting(current)
    }
    setCurrent({ page, children })
  }, [children, current, page, reducedMotion])

  useEffect(() => {
    if (!exiting) return
    const timer = window.setTimeout(() => setExiting(null), TRANSITION_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [exiting])

  return (
    <div className="relative">
      {exiting && (
        <div
          key={`exit-${exiting.page}`}
          data-testid="page-transition-exit"
          data-page={exiting.page}
          aria-hidden="true"
          {...{ inert: '' }}
          className="page-exit pointer-events-none absolute inset-x-0 top-0 z-10 w-full"
        >
          {exiting.children}
        </div>
      )}
      <div
        key={current.page}
        data-testid="page-transition"
        data-page={current.page}
        className={reducedMotion ? undefined : 'page-enter'}
      >
        {current.children}
      </div>
    </div>
  )
}
