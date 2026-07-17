import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useHashRoute } from './useHashRoute'

describe('useHashRoute', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '#index')
    vi.stubGlobal('scrollTo', vi.fn())
  })
  afterEach(() => vi.unstubAllGlobals())

  it('updates after hash navigation', () => {
    const { result } = renderHook(() => useHashRoute())
    act(() => result.current.navigate('work'))
    expect(window.location.hash).toBe('#work')
    expect(result.current.page).toBe('work')
  })

  it('reacts to browser history and repairs invalid hashes', () => {
    const { result } = renderHook(() => useHashRoute())
    act(() => {
      window.history.replaceState(null, '', '#now')
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })
    expect(result.current.page).toBe('now')

    act(() => {
      window.history.replaceState(null, '', '#missing')
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })
    expect(result.current.page).toBe('index')
    expect(window.location.hash).toBe('#index')
  })
})
