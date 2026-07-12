import { useCallback, useRef } from 'react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import './BorderGlow.css'

interface BorderGlowProps {
  children: ReactNode
  className?: string
  glowColor?: string
  backgroundColor?: string
  borderRadius?: number
  glowRadius?: number
  glowIntensity?: number
  coneSpread?: number
  colors?: string[]
}

const positions = ['80% 55%', '69% 34%', '8% 6%', '41% 38%']

export default function BorderGlow({
  children,
  className = '',
  glowColor = '40 80 80',
  backgroundColor = '#111417',
  borderRadius = 999,
  glowRadius = 18,
  glowIntensity = 0.9,
  coneSpread = 30,
  colors = ['#f97316', '#facc15', '#38bdf8'],
}: BorderGlowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const edge = Math.min(Math.max(Math.min(cx / Math.max(Math.abs(x - cx), 1), cy / Math.max(Math.abs(y - cy), 1)) ** -1, 0), 1)
    const angle = (Math.atan2(y - cy, x - cx) * 180) / Math.PI + 90
    element.style.setProperty('--edge-proximity', `${edge * 100}`)
    element.style.setProperty('--cursor-angle', `${angle < 0 ? angle + 360 : angle}deg`)
    const [h, s, l] = glowColor.split(' ')
    element.style.setProperty('--glow-color', `hsl(${h}deg ${s}% ${l}% / ${Math.min(100, glowIntensity * 100)}%)`)
  }, [glowColor, glowIntensity])

  const style = {
    '--card-bg': backgroundColor,
    '--border-radius': `${borderRadius}px`,
    '--glow-padding': `${glowRadius}px`,
    '--cone-spread': coneSpread,
    '--gradient-one': `radial-gradient(at ${positions[0]}, ${colors[0]} 0, transparent 55%)`,
    '--gradient-two': `radial-gradient(at ${positions[1]}, ${colors[1]} 0, transparent 55%)`,
    '--gradient-three': `radial-gradient(at ${positions[2]}, ${colors[2]} 0, transparent 55%)`,
    '--gradient-four': `radial-gradient(at ${positions[3]}, ${colors[0]} 0, transparent 55%)`,
  } as CSSProperties

  return <div ref={ref} onPointerMove={handlePointerMove} className={`border-glow-card ${className}`.trim()} style={style}><span className="edge-light" /><div className="border-glow-inner">{children}</div></div>
}
