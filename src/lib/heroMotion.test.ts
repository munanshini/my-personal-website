import { describe, expect, it } from 'vitest'
import {
  GRID_CELL,
  HERO_VIDEO_CUES,
  SPOTLIGHT_R,
  easeToward,
  getGridTarget,
  heroVideoTime,
} from './heroMotion'

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

  it('maps the pointer midpoint to each theme video\'s actual front-facing frame', () => {
    expect(heroVideoTime(0.5, 'light')).toBe(HERO_VIDEO_CUES.light.center)
    expect(heroVideoTime(0.5, 'dark')).toBe(HERO_VIDEO_CUES.dark.center)
  })

  it('maps and clamps the pointer edges to the usable video range', () => {
    expect(heroVideoTime(-1, 'light')).toBe(HERO_VIDEO_CUES.light.start)
    expect(heroVideoTime(1, 'light')).toBe(HERO_VIDEO_CUES.light.end)
    expect(heroVideoTime(2, 'dark')).toBe(HERO_VIDEO_CUES.dark.end)
  })
})
