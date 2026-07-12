import { useEffect, useRef, useState } from 'react'
import { SPOTLIGHT_R } from '../lib/heroMotion'

interface RevealLayerProps {
  cursorX: number
  cursorY: number
  image: string
}

export function RevealLayer({ cursorX, cursorY, image }: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mask, setMask] = useState<string>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof window === 'undefined') return
    const context = canvas.getContext('2d')
    if (!context) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    context.clearRect(0, 0, canvas.width, canvas.height)

    const gradient = context.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      SPOTLIGHT_R,
    )
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.4, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)')
    gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)')
    gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    context.fillStyle = gradient
    context.beginPath()
    context.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2)
    context.fill()
    setMask(`url(${canvas.toDataURL()})`)
  }, [cursorX, cursorY])

  useEffect(() => {
    const resetCanvas = () => {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    window.addEventListener('resize', resetCanvas)
    return () => window.removeEventListener('resize', resetCanvas)
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(243,240,233,.18), rgba(243,240,233,0)), url('${image}')`,
          maskImage: mask,
          WebkitMaskImage: mask,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
        }}
      />
    </>
  )
}
