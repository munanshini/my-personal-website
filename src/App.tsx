import { useState } from 'react'
import { Hero } from './components/Hero'

export default function App() {
  const [, setAssistantOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Hero onOpenAssistant={() => setAssistantOpen(true)} />
    </div>
  )
}
