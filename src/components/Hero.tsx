import { Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { easeToward, getGridTarget, GRID_CELL } from '../lib/heroMotion'
import { RevealLayer } from './RevealLayer'
import { TopNav } from './TopNav'

const BG_IMAGE_1 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260512_012043_9764f2d0-5c6e-4faa-94a6-a8253df08c5e.png&w=1280&q=85'
const BG_IMAGE_2 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260512_012949_6b24738e-6e5f-4b6f-93d7-5772f4d32285.png&w=1280&q=85'

interface HeroProps {
  onOpenAssistant: () => void
}

export function Hero({ onOpenAssistant }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })
  const offset = useRef({ x: 0, y: 0 })
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [gridOffset, setGridOffset] = useState({ x: 0, y: 0 })

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
      const rect = sectionRef.current?.getBoundingClientRect()
      if (rect) {
        const target = getGridTarget(smooth.current.x, smooth.current.y, rect)
        offset.current.x = easeToward(offset.current.x, target.x, 0.06)
        offset.current.y = easeToward(offset.current.y, target.y, 0.06)
        setGridOffset({ ...offset.current })
      }
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
      <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-10" aria-hidden="true">
        <defs>
          <pattern id="grid" width={GRID_CELL} height={GRID_CELL} patternUnits="userSpaceOnUse" x={gridOffset.x} y={gridOffset.y}>
            <path d={`M ${GRID_CELL} 0 L 0 0 0 ${GRID_CELL}`} fill="none" stroke="#64748b" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div
        className="absolute inset-0 z-10 bg-cover bg-center bg-no-repeat opacity-[0.78]"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(243,240,233,.98) 0%, rgba(243,240,233,.82) 38%, rgba(243,240,233,.08) 72%), url('${BG_IMAGE_1}')` }}
        aria-hidden="true"
      />
      <RevealLayer cursorX={cursor.x} cursorY={cursor.y} image={BG_IMAGE_2} />

      <div className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-t from-paper/70 via-transparent to-paper/10" aria-hidden="true" />

      <div className="absolute bottom-12 left-5 z-50 max-w-[920px] sm:bottom-12 sm:left-8 md:bottom-20 md:left-12 lg:bottom-16 lg:left-[max(3rem,calc((100vw-1700px)/2+3rem))]">
        <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600 sm:text-[11px]">
          <span className="h-2 w-2 rounded-full bg-signal" />
          AI PRODUCT · EXPERIENCE · DELIVERY
        </div>
        <h1 className="text-[clamp(3.3rem,8.2vw,9.2rem)] font-bold uppercase leading-[0.79] tracking-[-0.075em] text-ink">
          AI Application<br />Product Manager<span className="text-signal">.</span>
        </h1>
        <div className="mt-7 grid max-w-[880px] gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-xl text-base font-medium leading-relaxed text-gray-800 sm:text-lg md:text-xl">
            有用户体验思维和产品审美，<br className="hidden sm:block" />懂 AI 落地的 AI 产品经理。
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a href="#work" className="rounded-full bg-gray-900 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-gray-700 sm:px-6 sm:text-sm">
              查看精选案例
            </a>
            <button type="button" onClick={onOpenAssistant} className="flex items-center gap-2 rounded-full border border-gray-900/20 bg-white/60 px-5 py-2.5 text-xs font-medium text-gray-800 backdrop-blur transition-colors hover:bg-white sm:text-sm">
              <Play size={12} className="fill-gray-800" />
              问我的 AI 助手
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 z-50 hidden text-right text-[10px] font-medium uppercase tracking-[0.18em] text-gray-600 sm:block md:right-8">
        Shenzhen · China<br />6+ years in enterprise products
      </div>
    </section>
  )
}
