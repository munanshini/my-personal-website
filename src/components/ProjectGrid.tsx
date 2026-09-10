import type { WorkItem } from '../data/portfolio'
import { publicPath } from '../lib/publicPath'

function ProjectCard({ project }: { project: WorkItem }) {
  const cardClassName = 'work-card group relative grid overflow-hidden border border-line/15 bg-surface/35 transition duration-300 hover:-translate-y-1 hover:border-signal/50 hover:bg-surface/80 focus:border-signal/60 focus:bg-surface/80 focus:outline-none'
  const content = (
    <>
      <span aria-hidden className="absolute inset-y-6 left-0 w-1 origin-top scale-y-0 bg-signal transition-transform duration-300 group-hover:scale-y-100 group-focus:scale-y-100" />
      <span className="work-card-number relative font-mono text-xs text-signal">{project.number}</span>
      <div className="work-card-meta relative">
        <p className="text-sm font-semibold leading-6">{project.company}</p>
        <p className="mt-2 text-xs text-muted">{project.companyPeriod}</p>
        <p className="mt-3 text-xs leading-5 text-muted">{project.companyFocus}</p>
      </div>
      <div className="work-card-main relative">
        <span className="text-[10px] font-semibold uppercase text-signal">{project.category}</span>
        <h2 className="mt-3 font-semibold transition-colors duration-300 group-hover:text-signal group-focus:text-signal">{project.title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{project.summary}</p>
      </div>
      <div className="work-card-result relative flex h-full flex-col border-line/15 md:border-l md:pl-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">SELECTED IMPACT</p>
        <p data-testid="work-result" className="mt-4 text-2xl font-semibold leading-tight text-muted transition-colors duration-300 group-hover:text-ink group-focus:text-ink md:text-3xl">{project.results[0]}</p>
        <ul className="mt-4 space-y-2">
          {project.results.slice(1).map((result) => (
            <li key={result} className="text-sm text-muted">{result}</li>
          ))}
        </ul>
        {project.detail.isReady ? (
          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-signal group-focus:translate-x-1 group-focus:text-signal">
            查看项目档案 ↗
          </span>
        ) : (
          <p className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            项目档案 · 内容整理中
          </p>
        )}
      </div>
    </>
  )

  if (!project.detail.isReady) {
    return <article data-testid="work-row" className={cardClassName}>{content}</article>
  }

  return (
    <a
      href={publicPath(`/work/${project.slug}/`, '/work/')}
      aria-label={`查看 ${project.title}项目档案`}
      data-testid="work-row"
      className={`${cardClassName} cursor-pointer`}
    >
      {content}
    </a>
  )
}

export function ProjectGrid({ projects }: { projects: WorkItem[] }) {
  return (
    <section id="work" className="site-page bg-paper text-ink transition-colors duration-700">
      <div className="mx-auto max-w-canvas">
        <div className="work-heading">
          <div className="max-w-5xl">
            <h1 className="page-title">
              AI 不止能生成，<br />还要进入真实工作流。
            </h1>
          </div>
          <p className="reading-copy">
            三个企业级场景，展示我如何从用户问题出发，定义 AI 能力边界，并把产品推进到可使用、可衡量的结果。
          </p>
        </div>

        <div className="grid gap-4 md:gap-5">
          {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
        </div>
      </div>
    </section>
  )
}
