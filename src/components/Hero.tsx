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
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-paper sm:min-h-[720px] md:h-screen"
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

      <div className="absolute bottom-8 left-5 z-50 max-w-[calc(100%-2.5rem)] sm:bottom-12 sm:left-8 sm:max-w-[760px] md:bottom-20 md:left-12 lg:bottom-16 lg:left-[max(3rem,calc((100vw-1700px)/2+3rem))]">
        <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600 sm:text-[11px]">
          <span className="h-2 w-2 rounded-full bg-signal" />
          AI PRODUCT · EXPERIENCE · DELIVERY
        </div>
        <h1 className="max-w-[7ch] text-[clamp(4.2rem,18vw,5.6rem)] font-black uppercase leading-[0.8] tracking-[-0.09em] text-ink sm:text-[clamp(5.6rem,10.5vw,10.5rem)]">
          AI<br />Product<br />Mgr<span className="text-signal">.</span>
        </h1>
        <div className="mt-5 max-w-[20rem] sm:mt-8 sm:max-w-[34rem]">
          <p className="text-sm font-medium leading-relaxed text-gray-800 sm:text-base">
            你好，我是张楠，一个画过图、懂交互、有审美，写 PROMPT 比写 PRD 多的 AI 产品经理。
          </p>
          <p className="mt-3 text-sm font-medium leading-relaxed text-gray-800 sm:text-base">
            我们相信好工具优雅、好用，并经得起反复打磨；也坚持通过规划、协调、推进与落实，让想法最终被完美实现。
          </p>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 z-50 hidden text-right text-[10px] font-medium uppercase tracking-[0.18em] text-gray-600 sm:block md:right-8">
        Shenzhen · China<br />6+ years in enterprise products
      </div>
    </section>
  )
}
