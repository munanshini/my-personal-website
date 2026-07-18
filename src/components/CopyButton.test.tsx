import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CopyButton } from './CopyButton'

describe('CopyButton', () => {
  it('uses semantic theme colors for hover feedback', () => {
    render(<CopyButton value="15767978588" label="电话" />)

    const button = screen.getByRole('button', { name: '复制电话' })
    expect(button).toHaveClass('hover:bg-ink', 'hover:text-paper')
    expect(button).not.toHaveClass('hover:bg-black', 'hover:text-white')
  })
})
