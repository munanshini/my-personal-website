import { useEffect, useRef, useState } from 'react'
import './GooeyNav.css'

export interface GooeyNavItem { label: string; href: string }

export function GooeyNav({ items, activeIndex, onSelect }: { items: GooeyNavItem[]; activeIndex: number; onSelect: (index: number) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const [pill, setPill] = useState({ x: 0, y: 0, width: 0, height: 0 })

  useEffect(() => {
    const update = () => {
      const container = containerRef.current
      const item = itemRefs.current[activeIndex]
      if (!container || !item) return
      const outer = container.getBoundingClientRect()
      const inner = item.getBoundingClientRect()
      setPill({ x: inner.left - outer.left, y: inner.top - outer.top, width: inner.width, height: inner.height })
    }
    update()

    if (typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver(update)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [activeIndex])

  return <div ref={containerRef} className="gooey-nav-container">
    <span className="gooey-pill" style={{ transform: `translate(${pill.x}px, ${pill.y}px)`, width: pill.width, height: pill.height }} />
    <div className="gooey-nav-items">{items.map((item, index) => <a key={item.href} ref={(node) => { itemRefs.current[index] = node }} href={item.href} aria-current={index === activeIndex ? 'page' : undefined} onClick={(event) => { event.preventDefault(); onSelect(index) }} className={index === activeIndex ? 'active' : undefined}>{item.label}</a>)}</div>
  </div>
}
