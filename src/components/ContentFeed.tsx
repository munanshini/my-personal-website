import { ArrowUpRight } from 'lucide-react'
import type { WordItem } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

export function ContentFeed({ items }: { items: WordItem[] }) {
  return (
    <section id="words" className="border-t border-black/10 bg-paper px-5 py-24 text-ink transition-colors duration-700 sm:px-8 md:py-32">
      <div className="mx-auto max-w-canvas">
        <SectionHeading index="03" eyebrow="WORDS & MEDIA" title="持续思考， 也持续公开表达。" description="这里将连接视频号、小红书、B 站、公众号、知乎、人人都是产品经理与 GitHub。" />
        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.index} className={`${item.accent} group flex min-h-[430px] flex-col justify-between rounded-[2rem] p-7 sm:p-8`}>
              <div className="flex items-center justify-between text-gray-600">
                <span className="rounded-full border border-black/20 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em]">{item.type}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRight size={15} /></span>
              </div>
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">0{item.index} · CONTENT FORMAT</p>
                <h3 className="text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-5xl">{item.title}</h3>
                <p className="mt-5 max-w-sm text-sm leading-7 text-gray-600">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
