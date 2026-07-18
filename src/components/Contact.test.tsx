import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Contact } from './Contact'

describe('Contact', () => {
  it('keeps all copy actions and uses semantic surfaces', () => {
    render(<Contact />)

    expect(screen.getByRole('button', { name: '复制电话' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '复制邮箱' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '复制微信' })).toBeInTheDocument()
    expect(screen.getByAltText('添加张楠微信的二维码')).toBeInTheDocument()
    expect(document.getElementById('contact')).toHaveClass('bg-paper')
  })

  it('keeps verified contact details and only links real social destinations', () => {
    render(<Contact />)

    expect(screen.getByRole('link', { name: '15767978588' })).toHaveAttribute('href', 'tel:15767978588')
    expect(screen.getByRole('link', { name: 'zn525347603@gmail.com' })).toHaveAttribute('href', 'mailto:zn525347603@gmail.com')
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/munanshini')
    expect(screen.queryByRole('link', { name: '视频号' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '视频号' })).not.toBeInTheDocument()
    expect(screen.getByText('视频号').closest('span')).not.toHaveAttribute('tabindex')
  })
})
