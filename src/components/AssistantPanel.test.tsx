import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AssistantPanel } from './AssistantPanel'

describe('AssistantPanel', () => {
  it('places the theme-semantic assistant panel above the centered trigger', () => {
    render(<AssistantPanel open onClose={vi.fn()} />)
    const dialog = screen.getByRole('dialog', { name: '个人 AI 助手' })
    expect(dialog).toHaveClass('items-end', 'justify-center', 'pb-24')
    expect(dialog.className).not.toContain('backdrop-blur-sm')
    expect(screen.getByRole('complementary')).toHaveClass('max-w-[380px]', 'bg-surface', 'text-ink', 'border-line/15')
  })

  it('uses compact mobile assistant spacing', () => {
    render(<AssistantPanel open onClose={vi.fn()} />)
    expect(screen.getByRole('dialog').className).toContain('p-3')
  })

  it('renders a local preset answer without an external request', () => {
    render(<AssistantPanel open onClose={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: '你做过哪些 AI 项目？' }))
    expect(
      screen.getByText(/AI 创意工场、智能仓储调度和 AI IDE/),
    ).toBeInTheDocument()
  })
})
