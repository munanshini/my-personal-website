import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { SitePage } from '../lib/siteRoute'

const TRANSITION_DURATION_MS = 420

type PageLayer = {
  page: SitePage
  children: ReactNode
  status: 'current' | 'exiting'
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
  const [layers, setLayers] = useState<PageLayer[]>([{ page, children, status: 'current' }])
  const [reducedMotion] = useState(prefersReducedMotion)
  const exitTimers = useRef(new Map<SitePage, number>())

  useEffect(() => {
    if (reducedMotion) {
      setLayers([{ page, children, status: 'current' }])
      return
    }

    setLayers((existing) => {
      const current = existing.find((layer) => layer.status === 'current')
      if (current?.page === page) return existing

      const targetExists = existing.some((layer) => layer.page === page)
      const next = existing.map((layer): PageLayer => ({
        ...layer,
        children: layer.page === page ? children : layer.children,
        status: layer.page === page ? 'current' : 'exiting',
      }))

      return targetExists ? next : [...next, { page, children, status: 'current' }]
    })
  }, [children, page, reducedMotion])

  useEffect(() => {
    const exitingPages = new Set(layers.filter((layer) => layer.status === 'exiting').map((layer) => layer.page))

    exitTimers.current.forEach((timer, exitingPage) => {
      if (exitingPages.has(exitingPage)) return
      window.clearTimeout(timer)
      exitTimers.current.delete(exitingPage)
    })

    exitingPages.forEach((exitingPage) => {
      if (exitTimers.current.has(exitingPage)) return
      const timer = window.setTimeout(() => {
        exitTimers.current.delete(exitingPage)
        setLayers((current) => current.filter((layer) => layer.page !== exitingPage || layer.status !== 'exiting'))
      }, TRANSITION_DURATION_MS)
      exitTimers.current.set(exitingPage, timer)
    })
  }, [layers])

  useEffect(() => () => {
    exitTimers.current.forEach((timer) => window.clearTimeout(timer))
    exitTimers.current.clear()
  }, [])

  return (
    <div className="relative">
      {layers.map((layer) => {
        const exiting = layer.status === 'exiting'
        return (
          <div
            key={layer.page}
            data-testid={exiting ? 'page-transition-exit' : 'page-transition'}
            data-page={layer.page}
            aria-hidden={exiting ? 'true' : undefined}
            {...(exiting ? { inert: '' } : {})}
            className={exiting
              ? 'page-exit pointer-events-none absolute inset-x-0 top-0 z-10 w-full'
              : reducedMotion ? undefined : 'page-enter'}
          >
            {layer.children}
          </div>
        )
      })}
    </div>
  )
}
