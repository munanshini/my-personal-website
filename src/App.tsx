import { useState } from 'react'
import { AssistantPanel } from './components/AssistantPanel'
import { Contact } from './components/Contact'
import { ContentFeed } from './components/ContentFeed'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { NowSection } from './components/NowSection'
import { ProjectGrid } from './components/ProjectGrid'
import { projects } from './data/portfolio'

export default function App() {
  const [assistantOpen, setAssistantOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Hero onOpenAssistant={() => setAssistantOpen(true)} />
      <main>
        <ProjectGrid projects={projects} />
        <Experience />
        <ContentFeed />
        <NowSection />
        <Contact />
      </main>
      <AssistantPanel open={assistantOpen} onClose={() => setAssistantOpen(false)} />
    </div>
  )
}
