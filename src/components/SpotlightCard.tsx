import { useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import './SpotlightCard.css'

export function SpotlightCard({ children, className = '', spotlightColor = 'rgba(255,255,255,.22)' }: { children: ReactNode; className?: string; spotlightColor?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const move = (event: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect || !ref.current) return
    ref.current.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
    ref.current.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
    ref.current.style.setProperty('--spotlight-color', spotlightColor)
  }
  return <div ref={ref} onMouseMove={move} className={`spotlight-card ${className}`.trim()}>{children}</div>
}
