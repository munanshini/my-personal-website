import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Contact } from './Contact'

describe('Contact', () => {
  it('keeps only email copying and the QR guidance on semantic surfaces', () => {
    render(<Contact />)

    expect(screen.getByRole('button', { name: '复制邮箱' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '复制电话' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '复制微信' })).not.toBeInTheDocument()
    expect(screen.getByText('扫码添加微信')).toBeInTheDocument()
    expect(screen.getByAltText('添加张楠微信的二维码')).toBeInTheDocument()
    expect(document.getElementById('contact')).toHaveClass('bg-paper')
  })

  it('keeps email public while omitting phone and tel links', () => {
    render(<Contact />)

    expect(screen.getByRole('link', { name: 'zn525347603@gmail.com' })).toHaveAttribute('href', 'mailto:zn525347603@gmail.com')
    expect(screen.queryByText(/15767978588/)).not.toBeInTheDocument()
    expect(document.querySelector('a[href^="tel:"]')).toBeNull()
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/munanshini')
    expect(screen.queryByRole('link', { name: '视频号' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '视频号' })).not.toBeInTheDocument()
    expect(screen.getByText('视频号').closest('span')).not.toHaveAttribute('tabindex')
  })
})
