import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import heroPortraitDarkPoster from '../assets/hero-portrait-dark-poster.jpg'
import heroPortraitDarkVideo from '../assets/hero-portrait-dark.mp4'
import heroPortraitLightPoster from '../assets/hero-portrait-light-poster.jpg'
import heroPortraitLightVideo from '../assets/hero-portrait-light.mp4'
import { heroVideoTime } from '../lib/heroMotion'
import { assetPath } from '../lib/publicPath'
import { useTheme } from '../theme/ThemeProvider'

const portraitComposition = 'bg-cover bg-bottom'

export function Hero() {
  const { theme } = useTheme()
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetTimeRef = useRef(heroVideoTime(0.5, theme))
  const progressRef = useRef(0.5)
  const seekingRef = useRef(false)
  const frameRef = useRef<number | null>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

  const videoSource = theme === 'dark' ? heroPortraitDarkVideo : heroPortraitLightVideo
  const videoPoster = theme === 'dark' ? heroPortraitDarkPoster : heroPortraitLightPoster

  const seekTowardTarget = () => {
    const video = videoRef.current
    if (!video || seekingRef.current || video.readyState < 1) return

    const difference = targetTimeRef.current - video.currentTime
    if (Math.abs(difference) < 0.015) return

    seekingRef.current = true
    video.currentTime += difference * 0.38
  }

  const scheduleSeek = () => {
    if (frameRef.current !== null) return
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null
      seekTowardTarget()
    })
  }

  const setProgress = (progress: number) => {
    progressRef.current = Math.min(1, Math.max(0, progress))
    targetTimeRef.current = heroVideoTime(progressRef.current, theme)
    scheduleSeek()
  }

  useEffect(() => {
    targetTimeRef.current = heroVideoTime(progressRef.current, theme)
    seekingRef.current = false
    setVideoReady(false)
    setVideoFailed(false)
  }, [theme])

  useEffect(() => () => {
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
  }, [])

  const canScrub = () => (
    window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
    && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || !canScrub()) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect?.width) return
    setProgress((event.clientX - rect.left) / rect.width)
  }

  const handleLoadedMetadata = () => {
    const video = videoRef.current
    if (!video) return
    targetTimeRef.current = heroVideoTime(progressRef.current, theme)
    video.currentTime = targetTimeRef.current
  }

  const handleSeeked = () => {
    seekingRef.current = false
    scheduleSeek()
  }

  return (
    <section
      ref={sectionRef}
      id="index"
      className="hero-screen relative w-full overflow-hidden bg-paper px-6 sm:px-8"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setProgress(0.5)}
    >
      <div className="hero-layout">
      <div className="hero-copy">
        <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted sm:text-[11px]">
          <span className="h-2 w-2 rounded-full bg-signal" />
          AI PRODUCT · EXPERIENCE · DELIVERY
        </div>
        <h1 className="hero-title text-ink">
          AI<br />Product<br />Mgr<span className="text-signal">.</span>
        </h1>
        <div className="mt-8 max-w-[34rem]">
          <p className="reading-copy text-ink">
            你好，我是张楠，7 年 B 端经验的 AI 产品经理。近两年半在华为负责 AI IDE 与企业流程平台 AI 化，从真实业务问题出发，设计人机协作、评测与交付闭环。
          </p>
          <p className="reading-copy mt-4">
            我擅长把模型能力变成可使用、可衡量、可追溯的产品：做场景定义、知识检索、Bad Case 归因，也负责跨团队推进与灰度落地。
          </p>
        </div>
        <div data-testid="hero-signature" className="hero-signature text-muted">
          <p className="text-muted">张楠 / AI 产品经理<br /><span>AI Product · Experience · Delivery</span></p>
          <p className="text-muted">Shenzhen · China<br /><span>6+ years in enterprise products</span></p>
        </div>
      </div>
      <div className="hero-visual">
        <div data-testid="hero-portrait" className={`hero-portrait ${portraitComposition}`} style={{ backgroundImage: `url('${assetPath(videoPoster)}')` }} aria-hidden="true" />
        <video
          ref={videoRef}
          data-testid="hero-video"
          className={`hero-video${videoReady && !videoFailed ? ' is-ready' : ''}`}
          src={assetPath(videoSource)}
          poster={assetPath(videoPoster)}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
          onLoadedMetadata={handleLoadedMetadata}
          onLoadedData={() => setVideoReady(true)}
          onSeeked={handleSeeked}
          onError={() => setVideoFailed(true)}
        />
      </div>
      </div>
    </section>
  )
}
