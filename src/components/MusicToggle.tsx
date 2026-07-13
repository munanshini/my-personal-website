import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const sequence = [110, 164.81, 146.83, 220, 196, 164.81]

export function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const contextRef = useRef<AudioContext | null>(null)
  const timerRef = useRef<number | null>(null)
  const stepRef = useRef(0)

  const stop = () => {
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = null
    contextRef.current?.close()
    contextRef.current = null
    setPlaying(false)
  }

  const start = async () => {
    if (contextRef.current) return
    const context = new AudioContext()
    contextRef.current = context
    await context.resume()
    const playNote = () => {
      const now = context.currentTime
      const lead = context.createOscillator()
      const pad = context.createOscillator()
      const gain = context.createGain()
      const padGain = context.createGain()
      lead.type = stepRef.current % 2 === 0 ? 'sine' : 'triangle'
      pad.type = 'sine'
      lead.frequency.value = sequence[stepRef.current % sequence.length]
      pad.frequency.value = sequence[(stepRef.current + 2) % sequence.length] / 2
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(0.022, now + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.48)
      padGain.gain.setValueAtTime(0.0001, now)
      padGain.gain.exponentialRampToValueAtTime(0.008, now + 0.08)
      padGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.52)
      lead.connect(gain).connect(context.destination)
      pad.connect(padGain).connect(context.destination)
      lead.start(now)
      pad.start(now)
      lead.stop(now + 0.22)
      pad.stop(now + 0.56)
      stepRef.current += 1
    }
    playNote()
    timerRef.current = window.setInterval(playNote, 560)
    setPlaying(true)
  }

  useEffect(() => {
    const startAfterFirstInteraction = () => { void start() }
    window.addEventListener('pointerdown', startAfterFirstInteraction, { once: true })
    return () => {
      window.removeEventListener('pointerdown', startAfterFirstInteraction)
      stop()
    }
  }, [])

  return <button type="button" onClick={() => contextRef.current ? stop() : void start()} aria-pressed={playing} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700" aria-label={playing ? '关闭背景音乐' : '播放背景音乐'}>
    {playing ? <Pause size={13} /> : <Play size={14} fill="currentColor" />}
  </button>
}
