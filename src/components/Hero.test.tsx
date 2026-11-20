import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ThemeProvider } from '../theme/ThemeProvider'
import { Hero } from './Hero'
import { ThemeToggle } from './ThemeToggle'

function renderHero() {
  return render(<ThemeProvider><Hero /><ThemeToggle /></ThemeProvider>)
}

describe('Hero', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => vi.unstubAllGlobals())

  function moveMouse({ finePointer = true, reducedMotion = false, saveData = false } = {}) {
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: query.includes('prefers-reduced-motion') ? reducedMotion : finePointer }))
    vi.stubGlobal('navigator', { connection: { saveData } })
    const event = new MouseEvent('pointermove', { bubbles: true, clientX: 250 })
    Object.defineProperty(event, 'pointerType', { value: 'mouse' })
    fireEvent(document.getElementById('index')!, event)
  }

  it('renders the concise product-manager introduction', () => {
    renderHero()

    expect(screen.getByText(/7 年 B 端经验的 AI 产品经理/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: /AI PRODUCT MGR/i })).toBeInTheDocument()
    expect(document.getElementById('index')).toHaveClass('hero-screen')
    expect(screen.getByTestId('hero-signature')).toHaveTextContent('张楠 / AI 产品经理')
  })

  it('uses first-person language for the personal product philosophy', () => {
    renderHero()

    expect(screen.getByText(/我擅长场景定义、人机协作/)).toBeInTheDocument()
    expect(screen.queryByText(/我们擅长/)).not.toBeInTheDocument()
  })



  it('links directly to representative work and contact details', () => {
    renderHero()
    expect(screen.getByRole('heading', { name: /AI PRODUCT MGR/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '查看代表项目' })).toHaveAttribute('href', './work/')
    expect(screen.getByRole('link', { name: '联系我' })).toHaveAttribute('href', './contact/')
  })

  it('anchors the portrait to the bottom of the composition', () => {
    renderHero()

    expect(screen.getByTestId('hero-portrait')).toHaveClass('bg-bottom')
  })

  it('keeps the mobile portrait from over-zooming', () => {
    renderHero()

    const portrait = screen.getByTestId('hero-portrait')
    expect(portrait).toHaveClass('bg-cover')
    expect(portrait).toHaveClass('bg-bottom')
    expect(portrait.getAttribute('style')).toContain('hero-portrait-light-poster.jpg')
  })

  it('renders a static portrait without an interactive reveal or light rays', () => {
    const { container } = renderHero()

    expect(screen.queryByTestId('hero-portrait-reveal')).not.toBeInTheDocument()
    expect(container.querySelector('.side-rays-container')).toBeNull()
  })

  it('uses theme-semantic contrast for the portrait veil and copy', () => {
    renderHero()

    expect(screen.getByTestId('hero-portrait').getAttribute('style')).not.toContain('gradient')
    expect(screen.getByText('AI PRODUCT · EXPERIENCE · DELIVERY')).toHaveClass('text-muted')
    expect(screen.getByText(/7 年 B 端经验的 AI 产品经理/)).toHaveClass('text-ink')
    expect(screen.getByText(/Shenzhen · China/i)).toHaveClass('text-muted')
  })

  it('uses the matching portrait video for each color theme', () => {
    renderHero()
    // jsdom has no PointerEvent; supply pointerType on a real event.
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: !query.includes('prefers-reduced-motion') }))
    const event = new MouseEvent('pointermove', { bubbles: true, clientX: 250 })
    Object.defineProperty(event, 'pointerType', { value: 'mouse' })
    fireEvent(document.getElementById('index')!, event)
    const video = screen.getByTestId('hero-video')
    expect(video).toHaveAttribute('src', expect.stringContaining('hero-portrait-light.mp4'))

    fireEvent.click(screen.getByRole('button', { name: '切换到深色模式' }))
    expect(video).toHaveAttribute('src', expect.stringContaining('hero-portrait-dark.mp4'))
  })

  it('keeps the static portrait fallback while the silent video loads', () => {
    renderHero()

    expect(screen.getByTestId('hero-portrait').getAttribute('style')).toContain('hero-portrait-light-poster.jpg')
    expect(screen.getByTestId('hero-video')).toHaveAttribute('preload', 'none')
    expect(screen.getByTestId('hero-video')).not.toHaveAttribute('src')
    expect(screen.getByTestId('hero-video')).toHaveProperty('muted', true)
  })

  it.each([
    { finePointer: false, reducedMotion: false, saveData: false },
    { finePointer: true, reducedMotion: true, saveData: false },
    { finePointer: true, reducedMotion: false, saveData: true },
  ])('keeps video unloaded for restricted motion or data settings: %o', (settings) => {
    renderHero()
    moveMouse(settings)
    expect(screen.getByTestId('hero-video')).not.toHaveAttribute('src')
  })
})
