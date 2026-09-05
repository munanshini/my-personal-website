import { useEffect, useRef, useState, type ReactNode } from 'react'
const TRANSITION_DURATION_MS = 420

type PageLayer = {
  pageKey: string
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

export function PageTransition({ pageKey, children }: {
  pageKey: string
  children: ReactNode
}) {
  const [layers, setLayers] = useState<PageLayer[]>([{ pageKey, children, status: 'current' }])
  const [reducedMotion] = useState(prefersReducedMotion)
  const exitTimers = useRef(new Map<string, number>())

  useEffect(() => {
    if (reducedMotion) {
      setLayers([{ pageKey, children, status: 'current' }])
      return
    }

    setLayers((existing) => {
      const current = existing.find((layer) => layer.status === 'current')
      if (current?.pageKey === pageKey) return existing

      const targetExists = existing.some((layer) => layer.pageKey === pageKey)
      const next = existing.map((layer): PageLayer => ({
        ...layer,
        children: layer.pageKey === pageKey ? children : layer.children,
        status: layer.pageKey === pageKey ? 'current' : 'exiting',
      }))

      return targetExists ? next : [...next, { pageKey, children, status: 'current' }]
    })
  }, [children, pageKey, reducedMotion])

  useEffect(() => {
    const exitingPages = new Set(layers.filter((layer) => layer.status === 'exiting').map((layer) => layer.pageKey))

    exitTimers.current.forEach((timer, exitingPageKey) => {
      if (exitingPages.has(exitingPageKey)) return
      window.clearTimeout(timer)
      exitTimers.current.delete(exitingPageKey)
    })

    exitingPages.forEach((exitingPageKey) => {
      if (exitTimers.current.has(exitingPageKey)) return
      const timer = window.setTimeout(() => {
        exitTimers.current.delete(exitingPageKey)
        setLayers((current) => current.filter((layer) => layer.pageKey !== exitingPageKey || layer.status !== 'exiting'))
      }, TRANSITION_DURATION_MS)
      exitTimers.current.set(exitingPageKey, timer)
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
            key={layer.pageKey}
            data-testid={exiting ? 'page-transition-exit' : 'page-transition'}
            data-page={layer.pageKey}
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
