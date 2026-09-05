import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { legacyHashPath } from '../lib/siteRoute'

export function LegacyHashRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    const target = legacyHashPath(window.location.hash)
    if (target) navigate(target, { replace: true })
  }, [navigate])

  return null
}
