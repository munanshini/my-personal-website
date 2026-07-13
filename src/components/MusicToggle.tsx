import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const sequence = [130.81, 155.56, 196, 174.61, 146.83, 164.81]

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
      const piano = context.createOscillator()
      const pad = context.createOscillator()
      const pianoGain = context.createGain()
      const padGain = context.createGain()
      piano.type = 'triangle'
      pad.type = 'sine'
      piano.frequency.value = sequence[stepRef.current % sequence.length]
      pad.frequency.value = sequence[(stepRef.current + 2) % sequence.length] / 2
      pianoGain.gain.setValueAtTime(0.0001, now)
      pianoGain.gain.exponentialRampToValueAtTime(0.028, now + 0.015)
      pianoGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42)
      padGain.gain.setValueAtTime(0.0001, now)
      padGain.gain.exponentialRampToValueAtTime(0.006, now + 0.12)
      padGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.58)
      piano.connect(pianoGain).connect(context.destination)
      pad.connect(padGain).connect(context.destination)
      piano.start(now)
      pad.start(now)
      piano.stop(now + 0.46)
      pad.stop(now + 0.6)
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

  return <button type="button" onClick={() => contextRef.current ? stop() : void start()} aria-pressed={playing} className="spotlight-card spotlight-card--glass flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 backdrop-blur" aria-label={playing ? '关闭背景音乐' : '播放背景音乐'}>
    {playing ? <Pause size={13} /> : <Play size={14} fill="currentColor" />}
  </button>
}
