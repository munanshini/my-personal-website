import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

const content = [
  { index: '01', type: 'AI PRODUCT', title: 'AI 产品观察与实践思考', description: '记录模型能力如何进入真实场景，以及产品经理在其中如何做判断。', accent: 'bg-[#e7dfcf]' },
  { index: '02', type: 'DESIGN', title: '产品设计与审美', description: '关于体验、界面、人机协作方式与产品细节的持续观察。', accent: 'bg-[#d5e0e1]' },
  { index: '03', type: 'VIDEO', title: '视频与公开表达', description: '把复杂问题讲清楚，也记录自己对技术、产品与生活的感受。', accent: 'bg-[#d9d1c8]' },
]

export function ContentFeed() {
  return (
    <section id="words" className="bg-paper px-5 py-24 text-ink sm:px-8 md:py-32">
      <div className="mx-auto max-w-canvas">
        <SectionHeading index="03" eyebrow="WORDS & MEDIA" title="持续思考， 也持续公开表达。" description="这里将连接视频号、小红书、B 站、公众号、知乎、人人都是产品经理与 GitHub。" />
        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {content.map((item) => (
            <article key={item.index} className={`${item.accent} group flex min-h-[430px] flex-col justify-between rounded-[2rem] p-7 sm:p-8`}>
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.17em] text-gray-600">
                <span>{item.index} / {item.type}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRight size={15} /></span>
              </div>
              <div>
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
