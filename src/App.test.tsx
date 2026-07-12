import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the AI product manager identity', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /AI APPLICATION PRODUCT MANAGER/i }),
    ).toBeInTheDocument()
  })
})
