import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AssistantPanel } from './AssistantPanel'

describe('AssistantPanel', () => {
  it('renders a local preset answer without an external request', () => {
    render(<AssistantPanel open onClose={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: '你做过哪些 AI 项目？' }))
    expect(
      screen.getByText(/AI 创意工场、智能仓储调度和 AI IDE/),
    ).toBeInTheDocument()
  })
})
