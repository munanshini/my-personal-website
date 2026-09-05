import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { sitePageFromPath, sitePath } from '../lib/siteRoute'
import { ThemeProvider } from '../theme/ThemeProvider'
import { AssistantPanel } from './AssistantPanel'
import { CustomCursor } from './CustomCursor'
import { LegacyHashRedirect } from './LegacyHashRedirect'
import { PageTransition } from './PageTransition'
import { SpotlightCard } from './SpotlightCard'
import { TopNav } from './TopNav'

export function SiteLayout() {
  const [assistantOpen, setAssistantOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const page = sitePageFromPath(location.pathname)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <ThemeProvider>
      <LegacyHashRedirect />
      <div className="page-shell min-h-screen bg-paper text-ink">
        <CustomCursor />
        <TopNav currentPage={page} onNavigate={(nextPage) => navigate(sitePath(nextPage))} />
        <PageTransition pageKey={location.pathname}>
          <Outlet />
        </PageTransition>
        <SpotlightCard className="spotlight-card--assistant spotlight-card--cta spotlight-card--glass z-[60] mx-auto mb-5 mt-8 w-fit md:fixed md:bottom-5 md:right-5 md:z-[90] md:m-0" spotlightColor="rgba(56, 189, 248, .40)"><button
          type="button"
          onClick={() => setAssistantOpen(true)}
          aria-label="问我的 AI 助手"
          className="flex items-center gap-2 rounded-full px-5 py-3.5 text-xs font-semibold text-white sm:px-6 sm:py-4 sm:text-sm"
        >
          <Sparkles size={15} />
          <span className="sm:hidden">AI 助手</span>
          <span className="hidden sm:inline">问我的 AI 助手</span>
        </button></SpotlightCard>
        <AssistantPanel open={assistantOpen} onClose={() => setAssistantOpen(false)} />
      </div>
    </ThemeProvider>
  )
}
