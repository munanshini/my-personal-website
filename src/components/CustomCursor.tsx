import { useEffect, useState } from 'react'
import './CustomCursor.css'

const pointerQuery = '(hover: hover) and (pointer: fine)'
const interactiveSelector = 'a, button, input, textarea, select, summary, [role="button"], [role="link"], [data-cursor="interactive"]'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [interactive, setInteractive] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    if (!window.matchMedia) return
    const media = window.matchMedia(pointerQuery)
    const sync = () => setEnabled(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('custom-cursor-active')
      return
    }

    document.documentElement.classList.add('custom-cursor-active')
    const move = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
      setInteractive(event.target instanceof Element && Boolean(event.target.closest(interactiveSelector)))
      setVisible(true)
    }
    const hide = () => setVisible(false)
    const press = () => setPressed(true)
    const release = () => setPressed(false)

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', press)
    window.addEventListener('pointerup', release)
    window.addEventListener('blur', hide)
    document.documentElement.addEventListener('pointerleave', hide)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
      window.removeEventListener('blur', hide)
      document.documentElement.removeEventListener('pointerleave', hide)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      data-testid="custom-cursor"
      data-visible={visible}
      data-interactive={interactive}
      data-pressed={pressed}
      aria-hidden="true"
      className="custom-cursor pointer-events-none"
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      <div className="custom-cursor__glow" />
      <svg className="custom-cursor__arrow" viewBox="0 0 32 32" focusable="false">
        <path d="M1.5 1.5 23 10.8l-9 3.2 4.5 9.2-5.2 2.4-4.4-9.1-7.4 7.1Z" />
      </svg>
    </div>
  )
}
