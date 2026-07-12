import { useState } from 'react'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { ProjectGrid } from './components/ProjectGrid'
import { projects } from './data/portfolio'

export default function App() {
  const [, setAssistantOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Hero onOpenAssistant={() => setAssistantOpen(true)} />
      <main>
        <ProjectGrid projects={projects} />
        <Experience />
      </main>
    </div>
  )
}
