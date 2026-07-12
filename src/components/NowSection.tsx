import { SectionHeading } from './SectionHeading'

const nowItems = [
  ['THINKING', 'AI 产品如何从 Demo 走到真实工作流'],
  ['MAKING', '个人网站 1.0 与视频内容计划'],
  ['LIVING', '跑步、摄影、旅行，以及保持对世界的感受力'],
]

export function NowSection() {
  return (
    <section id="now" className="bg-[#111417] px-5 py-24 text-white sm:px-8 md:py-32">
      <div className="mx-auto max-w-canvas">
        <SectionHeading index="04" eyebrow="NOW" title="此刻，我在关注什么。" description="一个不断变化的小栏目，用来记录最近的产品问题、创作与生活。" inverse />
        <div className="mt-20 divide-y divide-white/15 border-y border-white/15">
          {nowItems.map(([type, text], index) => (
            <div key={type} className="grid gap-4 py-7 md:grid-cols-[100px_180px_1fr] md:items-center">
              <span className="font-mono text-xs text-signal">0{index + 1}</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">{type}</span>
              <p className="text-xl font-medium tracking-tight sm:text-2xl">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
