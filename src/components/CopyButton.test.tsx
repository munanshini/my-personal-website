import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CopyButton } from './CopyButton'

describe('CopyButton', () => {
  it('uses semantic theme colors for hover feedback', () => {
    render(<CopyButton value="test-value" label="示例" />)

    const button = screen.getByRole('button', { name: '复制示例' })
    expect(button).toHaveClass('hover:bg-signal', 'hover:text-white')
    expect(button).not.toHaveClass('hover:bg-black', 'hover:text-white')
  })
})
