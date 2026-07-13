import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MusicToggle } from './MusicToggle'

describe('MusicToggle', () => {
  it('uses an icon-only control', () => {
    render(<MusicToggle />)

    expect(screen.getByRole('button', { name: '播放背景音乐' })).toBeInTheDocument()
    expect(screen.queryByText(/music/i)).not.toBeInTheDocument()
  })

  it('keeps a compact labelled audio toggle', () => {
    render(<MusicToggle />)

    expect(screen.getByRole('button', { name: '播放背景音乐' }).className).toContain('h-8')
  })

  it('uses a compact icon-only glass music control', () => {
    render(<MusicToggle />)

    expect(screen.getByRole('button', { name: '播放背景音乐' }).className).toContain('backdrop-blur')
  })
})
