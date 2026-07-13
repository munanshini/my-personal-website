import { useState } from 'react'
import { SectionHeading } from './SectionHeading'
import type { NowItem } from '../data/portfolio'

export function NowSection({ items }: { items: NowItem[] }) {
  const [page, setPage] = useState(0)
  const pageSize = 5
  const pageCount = Math.ceil(items.length / pageSize)
  const visibleItems = items.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <section id="now" className="border-t border-white/15 bg-[#111417] px-5 py-16 text-white transition-colors duration-700 sm:px-8 md:py-32">
      <div className="mx-auto max-w-canvas">
        <SectionHeading index="04" eyebrow="NOW" title="此刻，我在关注什么。" description="一个不断变化的小栏目，用来记录最近的产品问题、创作与生活。" inverse />
        <div className="mt-12 divide-y divide-white/15 border-y border-white/15 sm:mt-20 sm:min-h-[690px]">
          {visibleItems.map((item, index) => (
            <div key={item.type} className="grid gap-3 py-5 sm:gap-4 sm:py-7 md:grid-cols-[120px_150px_1fr_auto] md:items-center">
              <span className="font-mono text-xs text-signal">0{index + 1}</span>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45"><span>{item.date}</span><br />{item.city}</div>
              <div><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">{item.type}</span><p className="mt-2 text-xl font-medium tracking-tight sm:text-2xl">{item.title}</p><p className="mt-2 max-w-xl text-sm leading-6 text-white/55">{item.description}</p></div>
              <span className="text-xs text-white/45">↗</span>
            </div>
          ))}
        </div>
        {pageCount > 1 && <div className="mt-8 flex items-center justify-between border-t border-white/15 pt-5 text-xs">
          <span className="font-mono text-white/45">PAGE {page + 1} / {pageCount}</span>
          <div className="flex gap-2"><button type="button" onClick={() => setPage((current) => Math.max(0, current - 1))} disabled={page === 0} className="rounded-full border border-white/20 px-4 py-2 disabled:opacity-30">上一页</button><button type="button" onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))} disabled={page === pageCount - 1} className="rounded-full border border-white/20 px-4 py-2 disabled:opacity-30">下一页</button></div>
        </div>}
      </div>
    </section>
  )
}
