import { describe, expect, it } from 'vitest'
import { experiences, projects, workItemBySlug, workItems } from './portfolio'

describe('portfolio project readiness', () => {
  it('keeps detail pages out of production until each project copy is ready', () => {
    expect(workItems.map((item) => item.detail.isReady)).toEqual([false, false, false])
  })

  it('fills every local preview detail with sourced project content instead of placeholders', () => {
    for (const item of workItems) {
      const content = JSON.stringify(item.detail)

      expect(content).not.toContain('待补充')
      expect(content).not.toContain('TODO')
      expect(item.detail.background).toHaveLength(2)
      expect(item.detail.decisions.length).toBeGreaterThanOrEqual(2)
      expect(item.detail.outcomes.length).toBeGreaterThanOrEqual(2)
    }

    expect(workItemBySlug('ai-ide')?.detail.outcomes[0]?.metric).toBe('约 40% → 约 80%')
    expect(workItemBySlug('warehouse-scheduling')?.detail.outcomes[0]?.metric).toBe('秒级响应')
    expect(workItemBySlug('smart-sales-center')?.detail.outcomes[0]?.metric).toBe('10 家房企 · 100+ 售楼处')
  })

  it('uses stable, unique project slugs for future detail routes', () => {
    expect(workItems.map((item) => item.slug)).toEqual([
      'ai-ide',
      'warehouse-scheduling',
      'smart-sales-center',
    ])
  })

  it('finds a preview project by its stable slug without making it public', () => {
    expect(workItemBySlug('ai-ide')?.title).toBe('AI IDE 研发助手')
    expect(workItemBySlug('missing')).toBeUndefined()
  })

  it('keeps the Huawei project period consistent with the experience timeline', () => {
    expect(projects.find((project) => project.title === 'AI IDE 研发助手')?.year).toBe('2025.02 — 2026.06')
    expect(experiences.find((experience) => experience.company === '华为技术有限公司')?.period).toBe('2025.02 — 2026.06')
  })

  it('uses the confirmed Fenglian employment period and avoids unsupported performance rates', () => {
    expect(experiences.find((experience) => experience.company === '深圳丰链科技有限公司')?.period).toBe('2023.04 — 2024.12')
    expect(workItemBySlug('warehouse-scheduling')?.results.join(' ')).not.toMatch(/30%|25%/)
  })
})
