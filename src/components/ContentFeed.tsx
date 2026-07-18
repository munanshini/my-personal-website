import { ArrowUpRight } from 'lucide-react'
import type { WordItem } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

export function ContentFeed({ items }: { items: WordItem[] }) {
  return (
    <section id="words" className="border-t border-line/15 bg-paper px-5 py-16 text-ink transition-colors duration-700 sm:px-8 md:py-32">
      <div className="mx-auto max-w-canvas">
        <SectionHeading index="03" eyebrow="WORDS & MEDIA" title="持续思考， 也持续公开表达。" description="这里将连接视频号、小红书、B 站、公众号、知乎、人人都是产品经理与 GitHub。" />
        <div className="mt-10 grid divide-y divide-line/15 border-y border-line/15 sm:mt-16 md:grid-cols-3 md:divide-x md:divide-y-0">
          {items.map((item) => {
            const content = (
              <>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-signal">{item.type}</span>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] md:text-5xl">{item.title}</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted">{item.description}</p>
              </>
            )
            const className = 'content-directory-row group relative flex min-h-[320px] flex-col p-6 sm:min-h-[380px] sm:p-8'

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
