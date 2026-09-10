import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { siteNavItems, sitePageFromPath, sitePath } from '../lib/siteRoute'
import { publicPath } from '../lib/publicPath'
import { ThemeProvider } from '../theme/ThemeProvider'
import { AssistantPanel } from './AssistantPanel'
import { CustomCursor } from './CustomCursor'
import { LegacyHashRedirect } from './LegacyHashRedirect'
import { PageMeta } from './PageMeta'
import { PageTransition } from './PageTransition'
import { SpotlightCard } from './SpotlightCard'
import { TopNav } from './TopNav'

export function SiteLayout() {
  const [assistantOpen, setAssistantOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const page = sitePageFromPath(location.pathname)

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    // Wait for the destination route to mount before restoring its chapter.
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'start', behavior: 'auto' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [location.pathname, location.hash])

  return (
    <ThemeProvider>
      <LegacyHashRedirect />
      <PageMeta page={page} pathname={location.pathname} target={import.meta.env.MODE === 'pages' ? 'pages' : 'aliyun'} />
      <div className="page-shell min-h-screen bg-paper text-ink">
        <CustomCursor />
        <TopNav currentPage={page} currentPath={location.pathname} onNavigate={(nextPage) => navigate(sitePath(nextPage))} />
        <PageTransition pageKey={location.pathname}>
          <Outlet />
        </PageTransition>
        <footer className="border-t border-line/15 px-6 py-9 sm:px-8 md:pb-24">
          <div className="mx-auto flex max-w-canvas flex-col justify-between gap-6 sm:flex-row">
            <p className="text-sm leading-7 text-muted">张楠 / AI 产品经理<br /><span className="text-xs">AI Product · Experience · Delivery</span></p>
            <nav aria-label="页脚导航" className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted">
              {siteNavItems.filter((item) => item.page !== 'index').map((item) => <a key={item.page} href={publicPath(item.path, location.pathname)} className="transition-colors hover:text-ink">{item.label}</a>)}
            </nav>
          </div>
        </footer>
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
