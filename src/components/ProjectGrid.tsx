import type { WorkItem } from '../data/portfolio'
import { publicPath } from '../lib/publicPath'

export function ProjectGrid({ projects }: { projects: WorkItem[] }) {
  return (
    <section id="work" className="bg-paper px-5 py-16 text-ink transition-colors duration-700 sm:px-8 md:py-32">
      <div className="mx-auto max-w-canvas">
        <div className="grid gap-8 pb-10 sm:pb-14 md:grid-cols-[minmax(0,1fr)_minmax(280px,.42fr)] md:items-end md:gap-12 md:pb-20">
          <div className="max-w-5xl">
            <h2 className="text-[clamp(3.25rem,7vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
              AI 不止能生成，<br />还要进入真实工作流。
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted md:justify-self-end md:pb-2 md:text-base">
            三个企业级场景，展示我如何从用户问题出发，定义 AI 能力边界，并把产品推进到可使用、可衡量的结果。
          </p>
        </div>

        <div className="grid gap-4 md:gap-5">
          {projects.map((project) => (
            <article
              key={project.number}
              data-testid="work-row"
              className="group relative grid gap-6 overflow-hidden rounded-[1.75rem] border border-line/15 bg-surface/35 px-5 py-8 transition duration-300 hover:-translate-y-1 hover:border-signal/50 hover:bg-surface/80 hover:shadow-[0_18px_44px_rgb(var(--color-text)/0.10)] focus:border-signal/60 focus:bg-surface/80 focus:outline-none md:grid-cols-[64px_190px_minmax(0,1fr)_minmax(245px,.75fr)] md:px-7 md:py-10"
            >
              <span aria-hidden className="absolute inset-y-6 left-0 w-1 origin-top scale-y-0 bg-signal transition-transform duration-300 group-hover:scale-y-100 group-focus:scale-y-100" />
              <span className="relative font-mono text-xs text-signal">{project.number}</span>
              <div className="relative">
                <p className="text-sm font-semibold leading-6">{project.company}</p>
                <p className="mt-2 text-xs text-muted">{project.companyPeriod}</p>
                <p className="mt-3 text-xs leading-5 text-muted">{project.companyFocus}</p>
              </div>
              <div className="relative">
                <span className="text-[10px] font-semibold uppercase text-signal">{project.category}</span>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-signal group-focus:text-signal md:text-4xl lg:text-5xl">{project.title}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{project.summary}</p>
              </div>
              <div className="relative flex h-full flex-col border-t border-line/15 pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">SELECTED IMPACT</p>
                <p data-testid="work-result" className="mt-4 text-2xl font-semibold leading-tight text-muted transition-colors duration-300 group-hover:text-ink group-focus:text-ink md:text-3xl">{project.results[0]}</p>
                <ul className="mt-4 space-y-2">
                  {project.results.slice(1).map((result) => (
                    <li key={result} className="text-sm text-muted">{result}</li>
                  ))}
                </ul>
                {project.detail.isReady ? (
                  <a
                    href={publicPath(`/work/${project.slug}/`)}
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-all duration-300 hover:translate-x-1 hover:text-signal focus:translate-x-1 focus:text-signal focus:outline-none"
                  >
                    查看项目档案 ↗
                  </a>
                ) : (
                  <p className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    项目档案 · 内容整理中
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
