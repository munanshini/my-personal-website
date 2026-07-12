import { useEffect, useRef, useState } from 'react'
import heroPortrait from '../assets/hero-portrait.png'
import heroPortraitNatural from '../assets/hero-portrait-natural.png'
import { easeToward } from '../lib/heroMotion'
import { RevealLayer } from './RevealLayer'
import SideRays from './SideRays'
import { TopNav } from './TopNav'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const initialize = () => {
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect) return
      const center = { x: rect.left + rect.width * 0.68, y: rect.top + rect.height * 0.48 }
      mouse.current = center
      smooth.current = center
      setCursor(center)
    }
    initialize()
    window.addEventListener('resize', initialize)
    return () => window.removeEventListener('resize', initialize)
  }, [])

  useEffect(() => {
    let frame = 0
    const animate = () => {
      smooth.current.x = easeToward(smooth.current.x, mouse.current.x, 0.1)
      smooth.current.y = easeToward(smooth.current.y, mouse.current.y, 0.1)
      setCursor({ ...smooth.current })
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section
      id="index"
      ref={sectionRef}
      className="relative h-screen min-h-[720px] w-full overflow-hidden bg-paper"
      onMouseMove={(event) => {
        mouse.current = { x: event.clientX, y: event.clientY }
      }}
    >
      <TopNav />
      <div
        className="absolute inset-0 z-10 bg-cover bg-center bg-no-repeat opacity-[0.78]"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(243,240,233,.98) 0%, rgba(243,240,233,.82) 38%, rgba(243,240,233,.08) 72%), url('${heroPortrait}')` }}
        aria-hidden="true"
      />
      <SideRays intensity={1.25} opacity={0.42} spread={1.6} />
      <RevealLayer cursorX={cursor.x} cursorY={cursor.y} image={heroPortraitNatural} />

      <div className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-t from-paper/70 via-transparent to-paper/10" aria-hidden="true" />

      <div className="absolute bottom-12 left-5 z-50 max-w-[760px] sm:bottom-12 sm:left-8 md:bottom-20 md:left-12 lg:bottom-16 lg:left-[max(3rem,calc((100vw-1700px)/2+3rem))]">
        <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600 sm:text-[11px]">
          <span className="h-2 w-2 rounded-full bg-signal" />
          AI PRODUCT · EXPERIENCE · DELIVERY
        </div>
        <h1 className="max-w-[7ch] text-[clamp(5.6rem,10.5vw,10.5rem)] font-black uppercase leading-[0.8] tracking-[-0.08em] text-ink">
          AI<br />Product<br />Mgr<span className="text-signal">.</span>
        </h1>
        <div className="mt-8 max-w-lg">
          <p className="text-base font-medium leading-relaxed text-gray-800 sm:text-lg">
            你好，我是张楠，一名 AI 产品经理。具备交互与产品思维，聚焦 AI 在内容生产、供应链与开发者工具场景的真实落地。
          </p>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 z-50 hidden text-right text-[10px] font-medium uppercase tracking-[0.18em] text-gray-600 sm:block md:right-8">
        Shenzhen · China<br />6+ years in enterprise products
      </div>
    </section>
  )
}
