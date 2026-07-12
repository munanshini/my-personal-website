import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const sequence = [55, 55, 82.41, 55, 110, 82.41, 73.42, 110]

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
      const bass = context.createOscillator()
      const lead = context.createOscillator()
      const gain = context.createGain()
      bass.type = 'sawtooth'
      lead.type = 'square'
      bass.frequency.value = sequence[stepRef.current % sequence.length]
      lead.frequency.value = sequence[(stepRef.current + 2) % sequence.length] * 4
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(0.045, now + 0.018)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2)
      bass.connect(gain).connect(context.destination)
      lead.connect(gain)
      bass.start(now)
      lead.start(now)
      bass.stop(now + 0.22)
      lead.stop(now + 0.22)
      stepRef.current += 1
    }
    playNote()
    timerRef.current = window.setInterval(playNote, 240)
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

  return <button type="button" onClick={() => contextRef.current ? stop() : void start()} aria-pressed={playing} className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700" aria-label={playing ? '关闭背景音乐' : '播放背景音乐'}>
    {playing ? <Pause size={13} /> : <Play size={14} fill="currentColor" />}
  </button>
}
