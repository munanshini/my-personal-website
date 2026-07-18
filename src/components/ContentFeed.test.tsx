import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { words } from '../data/portfolio'
import { ContentFeed } from './ContentFeed'

describe('ContentFeed', () => {
  it('makes content type the first label in every entry', () => {
    render(<ContentFeed items={words} />)

    const entries = screen.getAllByTestId('content-directory-row')
    expect(within(entries[0]).getByText('ARTICLE')).toBeInTheDocument()
    expect(within(entries[1]).getByText('VIDEO')).toBeInTheDocument()
    expect(within(entries[2]).getByText('VIBE CODING')).toBeInTheDocument()
  })

  it('only creates links when href exists', () => {
    const linked = [{ ...words[0], href: 'https://example.com/article' }, words[1]]
    render(<ContentFeed items={linked} />)

    expect(screen.getByRole('link', { name: /AI 产品文章/ })).toHaveAttribute('href', 'https://example.com/article')
    expect(screen.queryByRole('link', { name: /视频与公开表达/ })).not.toBeInTheDocument()
  })
})
