import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Hero } from './Hero'

describe('Hero', () => {
  it('opens the assistant from its visible action', () => {
    const onOpenAssistant = vi.fn()
    render(<Hero onOpenAssistant={onOpenAssistant} />)
    fireEvent.click(screen.getByRole('button', { name: '问我的 AI 助手' }))
    expect(onOpenAssistant).toHaveBeenCalledOnce()
  })
})
