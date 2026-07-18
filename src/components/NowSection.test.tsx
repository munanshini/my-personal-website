import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { nowItems } from '../data/portfolio'
import { NowSection } from './NowSection'

describe('NowSection', () => {
  it('shows at most five items and keeps a fixed list surface', () => {
    render(<NowSection items={nowItems} />)

    expect(screen.getAllByTestId('now-row')).toHaveLength(5)
    expect(screen.getByTestId('now-list')).toHaveClass('min-h-[690px]')
  })

  it('shows the sixth item on the second page', () => {
    render(<NowSection items={nowItems} />)

    fireEvent.click(screen.getByRole('button', { name: '下一页' }))
    expect(screen.getByText('为个人网站增加可交互的信息入口')).toBeInTheDocument()
  })
})
