export const SPOTLIGHT_R = 260
export const GRID_CELL = 48

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
