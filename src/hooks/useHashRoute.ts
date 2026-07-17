import { useCallback, useEffect, useState } from 'react'
import { parseSitePage, sitePageHash, type SitePage } from '../lib/siteRoute'

export function useHashRoute() {
  const [page, setPage] = useState<SitePage>(() => parseSitePage(window.location.hash))

  useEffect(() => {
    const sync = () => {
      const next = parseSitePage(window.location.hash)
      if (window.location.hash !== sitePageHash(next)) {
        window.history.replaceState(null, '', sitePageHash(next))
      }
      setPage(next)
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const navigate = useCallback((next: SitePage) => {
    const hash = sitePageHash(next)
    if (window.location.hash === hash) {
      setPage(next)
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    setPage(next)
    window.location.hash = hash
  }, [])

  return { page, navigate }
}
