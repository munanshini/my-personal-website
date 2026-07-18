import { useState, type ReactNode } from 'react'
import { Sparkles } from 'lucide-react'
import { AssistantPanel } from './components/AssistantPanel'
import { Contact } from './components/Contact'
import { ContentFeed } from './components/ContentFeed'
import { CustomCursor } from './components/CustomCursor'
import { Hero } from './components/Hero'
import { NowSection } from './components/NowSection'
import { PageTransition } from './components/PageTransition'
import { ProjectGrid } from './components/ProjectGrid'
import { SpotlightCard } from './components/SpotlightCard'
import { TopNav } from './components/TopNav'
import { nowItems, workItems, words } from './data/portfolio'
import { useHashRoute } from './hooks/useHashRoute'
import type { SitePage } from './lib/siteRoute'

const pages: Record<SitePage, ReactNode> = {
  index: <Hero />,
  work: <ProjectGrid projects={workItems} />,
  words: <ContentFeed items={words} />,
  now: <NowSection items={nowItems} />,
  contact: <Contact />,
}

export default function App() {
  const [assistantOpen, setAssistantOpen] = useState(false)
  const { page, navigate } = useHashRoute()

  return (
    <div className="page-shell min-h-screen bg-paper text-ink">
      <CustomCursor />
      <TopNav currentPage={page} onNavigate={navigate} />
      <PageTransition page={page}>{pages[page]}</PageTransition>
      <SpotlightCard className="spotlight-card--assistant spotlight-card--cta spotlight-card--glass fixed bottom-5 right-5 z-[90]" spotlightColor="rgba(56, 189, 248, .40)"><button
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
  )
}
