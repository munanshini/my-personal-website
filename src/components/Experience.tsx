import { capabilities, experiences } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

export function Experience() {
  return (
    <section id="experience" className="bg-[#f8f7f3] px-5 py-24 text-ink sm:px-8 md:py-32">
      <div className="mx-auto max-w-canvas">
        <SectionHeading
          index="02"
          eyebrow="EXPERIENCE"
          title="从体验出发， 以产品结果落地。"
          description="交互体验设计经理背景，增强了我对专业用户、复杂工作流和产品细节的判断；我的主身份始终是 AI 产品经理。"
        />

        <div className="mt-20 grid gap-16 xl:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">CAREER PATH · SHENZHEN</p>
            <div className="mt-6 border-t border-gray-300">
              {experiences.map((item, index) => (
                <div key={item.company} className="grid gap-4 border-b border-gray-300 py-7 sm:grid-cols-[50px_1fr_auto] sm:items-start">
                  <span className="font-mono text-xs text-signal">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{item.company}</h3>
                    <p className="mt-2 text-sm text-gray-600">{item.role} · {item.focus}</p>
                  </div>
                  <span className="font-mono text-xs text-gray-500">{item.period}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[2rem] bg-gray-300 sm:grid-cols-2">
            {capabilities.map(([number, title, description]) => (
              <article key={number} className="min-h-[260px] bg-paper p-7 sm:p-8">
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                  <span>CAPABILITY</span>
                  <span className="text-signal">{number}</span>
                </div>
                <h3 className="mt-14 text-3xl font-semibold tracking-[-0.045em]">{title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-gray-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
