import type { WorkItem } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

export function ProjectGrid({ projects }: { projects: WorkItem[] }) {
  return (
    <section id="work" className="border-t border-line/15 bg-paper px-5 py-16 text-ink transition-colors duration-700 sm:px-8 md:py-32">
      <div className="mx-auto max-w-canvas">
        <SectionHeading
          index="01"
          eyebrow="SELECTED WORK"
          title="AI 不止能生成， 还要进入真实工作流。"
          description="三个企业级场景，展示我如何从用户问题出发，定义 AI 能力边界，并把产品推进到可使用、可衡量的结果。"
        />

        <div className="mt-10 border-t border-line/15 sm:mt-16">
          {projects.map((project) => (
            <article
              key={project.number}
              data-testid="work-row"
              className="group grid gap-5 border-b border-line/15 py-8 transition-colors hover:bg-surface/70 md:grid-cols-[64px_190px_minmax(0,1fr)_minmax(260px,.7fr)] md:px-4 md:py-10"
            >
              <span className="font-mono text-xs text-signal">{project.number}</span>
              <div>
                <p className="text-sm font-semibold">{project.company}</p>
                <p className="mt-2 text-xs text-muted">{project.companyPeriod}</p>
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase text-signal">{project.category}</span>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">{project.title}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{project.summary}</p>
              </div>
              <div className="border-l border-line/15 pl-5">
                <p className="text-[10px] font-semibold uppercase text-muted">MY ROLE</p>
                <p className="mt-3 text-sm leading-6">{project.role}</p>
                <ul className="mt-5 space-y-2">
                  {project.results.map((result) => (
                    <li key={result} className="text-sm text-muted">{result}</li>
                  ))}
                </ul>
                {project.detailHref ? (
                  <a href={project.detailHref} className="mt-5 inline-flex text-sm font-semibold">{project.detailLabel}</a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
