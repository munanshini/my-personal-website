import { ArrowUpRight } from 'lucide-react'
import type { Project, WorkItem } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

const tones = {
  warm: 'bg-[#e9dfce] text-ink',
  blue: 'bg-[#cbd9dc] text-ink',
  dark: 'bg-[#111417] text-white',
}

export function ProjectGrid({ projects }: { projects: Array<Project | WorkItem> }) {
  return (
    <section id="work" className="border-t border-black/10 bg-paper px-5 py-24 text-ink transition-colors duration-700 sm:px-8 md:py-32">
      <div className="mx-auto max-w-canvas">
        <SectionHeading
          index="01"
          eyebrow="SELECTED WORK"
          title="AI 不止能生成， 还要进入真实工作流。"
          description="三个企业级场景，展示我如何从用户问题出发，定义 AI 能力边界，并把产品推进到可使用、可衡量的结果。"
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.number}
              data-company={'company' in project && project.company === '华为' ? 'huawei' : undefined}
              className={`group relative min-h-[560px] overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10 ${tones[project.tone]} ${index === 0 ? 'lg:col-span-2 lg:min-h-[650px]' : ''}`}
            >
              <div className="relative z-10 flex h-full flex-col">
                <header className={`flex items-start justify-between gap-4 border-b pb-5 text-[10px] font-semibold uppercase tracking-[0.18em] opacity-70 sm:text-xs ${'company' in project && project.company === '华为' ? 'border-current/[.017]' : 'border-current/20'}`}>
                  <span>{project.number} / {project.category}</span>
                  <span>{'companyPeriod' in project ? project.companyPeriod : project.year}</span>
                </header>

                {'company' in project && (
                  <div className={`mt-5 flex flex-wrap items-baseline justify-between gap-3 border-b pb-5 ${project.company === '华为' ? 'border-current/[.017]' : 'border-current/15'}`}>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-55">COMPANY</p>
                      <p className="mt-1 text-lg font-semibold tracking-tight">{project.company}</p>
                    </div>
                    <p className="text-xs opacity-65">{project.companyFocus}</p>
                  </div>
                )}

                <div className={`grid flex-1 gap-10 py-10 ${index === 0 ? 'lg:grid-cols-[1.1fr_.9fr] lg:items-end' : ''}`}>
                  <div className="self-end">
                    <h3 className="max-w-4xl text-[clamp(2.8rem,6.5vw,7.5rem)] font-semibold leading-[0.85] tracking-[-0.065em]">
                      {project.title}
                    </h3>
                    <p className="mt-7 max-w-2xl text-base leading-7 opacity-75 sm:text-lg">{project.summary}</p>
                  </div>
                  <div className={`self-end rounded-3xl border bg-white/10 p-5 backdrop-blur-sm sm:p-6 ${'company' in project && project.company === '华为' ? 'border-current/[.026]' : 'border-current/15'}`}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-55">MY ROLE</p>
                    <p className="mt-3 text-sm leading-6 opacity-80 sm:text-base">{project.role}</p>
                    <ul className={`mt-7 space-y-3 border-t pt-5 ${'company' in project && project.company === '华为' ? 'border-current/[.026]' : 'border-current/15'}`}>
                      {project.results.map((result) => (
                        <li key={result} className="flex gap-3 text-sm font-medium leading-5">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <footer className={`flex flex-wrap items-end justify-between gap-5 border-t pt-5 ${'company' in project && project.company === '华为' ? 'border-current/[.017]' : 'border-current/20'}`}>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className={`rounded-full border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.1em] ${'company' in project && project.company === '华为' ? 'border-current/[.035]' : 'border-current/20'}`}>{tag}</span>
                    ))}
                  </div>
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] opacity-75 transition-transform group-hover:translate-x-1">
                    {'detailLabel' in project ? project.detailLabel : 'View case'} <ArrowUpRight size={17} />
                  </span>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
