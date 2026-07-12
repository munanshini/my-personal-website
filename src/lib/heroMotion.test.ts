import { describe, expect, it } from 'vitest'
import { GRID_CELL, SPOTLIGHT_R, easeToward, getGridTarget } from './heroMotion'

describe('hero motion helpers', () => {
  it('exports the confirmed grid and spotlight constants', () => {
    expect(GRID_CELL).toBe(48)
    expect(SPOTLIGHT_R).toBe(260)
  })

  it('eases only part of the distance to a target', () => {
    expect(easeToward(0, 100, 0.1)).toBe(10)
  })

  it('maps the right bottom corner to positive grid movement', () => {
    expect(
      getGridTarget(100, 100, { left: 0, top: 0, width: 100, height: 100 }),
    ).toEqual({ x: 8, y: 8 })
  })

  it('keeps the grid stable before layout has measurable dimensions', () => {
    expect(
      getGridTarget(0, 0, { left: 0, top: 0, width: 0, height: 0 }),
    ).toEqual({ x: 0, y: 0 })
  })
})
