export const SPOTLIGHT_R = 260
export const GRID_CELL = 48

export const HERO_VIDEO_CUES = {
  light: { start: 0, center: 1.2, end: 3.2 },
  dark: { start: 0, center: 2.2, end: 3.75 },
} as const

export type HeroVideoTheme = keyof typeof HERO_VIDEO_CUES

export function heroVideoTime(progress: number, theme: HeroVideoTheme) {
  const normalized = Math.min(1, Math.max(0, progress))
  const cue = HERO_VIDEO_CUES[theme]

  if (normalized <= 0.5) {
    return cue.start + normalized * 2 * (cue.center - cue.start)
  }

  return cue.center + (normalized - 0.5) * 2 * (cue.end - cue.center)
}

export function easeToward(current: number, target: number, factor: number) {
  return current + (target - current) * factor
}

export interface MotionRect {
  left: number
  top: number
  width: number
  height: number
}

export function getGridTarget(
  pointerX: number,
  pointerY: number,
  rect: MotionRect,
) {
  if (rect.width <= 0 || rect.height <= 0) return { x: 0, y: 0 }
  const cx = (pointerX - rect.left) / rect.width - 0.5
  const cy = (pointerY - rect.top) / rect.height - 0.5
  return { x: cx * 16, y: cy * 16 }
}
