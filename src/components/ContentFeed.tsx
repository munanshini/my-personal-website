import { ArrowUpRight } from 'lucide-react'
import type { WordItem } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

export function ContentFeed({ items }: { items: WordItem[] }) {
  return (
    <section id="words" className="site-page bg-paper text-ink transition-colors duration-700">
      <div className="mx-auto max-w-canvas">
        <SectionHeading level={1} index="03" eyebrow="WORDS & MEDIA" title="持续思考， 也持续公开表达。" description="这里将连接视频号、小红书、B 站、公众号、知乎、人人都是产品经理与 GitHub。" />
        <div className="mt-10 grid divide-y divide-line/15 border-y border-line/15 sm:mt-16 md:grid-cols-3 md:divide-x md:divide-y-0">
          {items.map((item) => {
            const content = (
              <>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-signal">{item.type}</span>
                <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight">{item.title}</h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-muted">{item.description}</p>
              </>
            )
            const className = 'content-directory-row group relative flex flex-col p-6 sm:p-8'

            return item.href ? (
              <a key={item.index} href={item.href} data-testid="content-directory-row" className={className}>
                {content}
                <ArrowUpRight className="mt-auto self-end transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={20} aria-hidden="true" />
              </a>
            ) : (
              <article key={item.index} data-testid="content-directory-row" className={className}>{content}</article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
