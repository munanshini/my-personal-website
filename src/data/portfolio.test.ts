import { describe, expect, it } from 'vitest'
import { experiences, projects, workItems } from './portfolio'

describe('portfolio project readiness', () => {
  it('keeps detail pages out of production until each project copy is ready', () => {
    expect(workItems.map((item) => item.detail.isReady)).toEqual([false, false, false])
  })

  it('uses stable, unique project slugs for future detail routes', () => {
    expect(workItems.map((item) => item.slug)).toEqual([
      'ai-ide',
      'warehouse-scheduling',
      'smart-sales-center',
    ])
  })

  it('keeps the Huawei project period consistent with the experience timeline', () => {
    expect(projects.find((project) => project.title === 'AI IDE 研发助手')?.year).toBe('2025.02 — 2026.06')
    expect(experiences.find((experience) => experience.company === '华为技术有限公司')?.period).toBe('2025.02 — 2026.06')
  })
})
