import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'
import { workItemBySlug, workItems, type WorkItem } from '../data/portfolio'
import { publicPath } from '../lib/publicPath'
import { SectionHeading } from './SectionHeading'

function detailPath(slug: string) {
  return `/work/${slug}/`
}

function ProjectPager({ project }: { project: WorkItem }) {
  const index = workItems.findIndex((item) => item.slug === project.slug)
  const previous = workItems[(index - 1 + workItems.length) % workItems.length]
  const next = workItems[(index + 1) % workItems.length]
  const currentPath = detailPath(project.slug)

  return (
    <nav className="mt-20 border-t border-line/15 pt-6 md:mt-28" aria-label="项目切换">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <a href={publicPath(detailPath(previous.slug), currentPath)} className="group flex items-center gap-3 text-sm font-semibold text-ink transition-colors hover:text-signal">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span><span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">上一个项目</span>{previous.title}</span>
        </a>
        <a href={publicPath(detailPath(next.slug), currentPath)} className="group flex items-center gap-3 self-end text-right text-sm font-semibold text-ink transition-colors hover:text-signal sm:self-auto">
          <span><span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">下一个项目</span>{next.title}</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
      <a href={publicPath('/contact/', currentPath)} className="mt-10 inline-flex items-center gap-3 rounded-full border border-line/25 px-5 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-signal hover:text-signal">
        联系我聊聊 <ArrowUpRight size={16} />
      </a>
    </nav>
  )
}

const projectChapters = [
  ['project-background', '问题背景'],
  ['project-role', '我的角色'],
  ['project-decisions', '关键决策'],
  ['project-outcomes', '结果'],
  ['project-reflection', '复盘'],
] as const

const projectFlows: Record<string, string[]> = {
  'ai-ide': ['理解任务与代码上下文', '检索与生成修改建议', '编译验证与差异审查', '人工确认与反馈迭代'],
  'warehouse-scheduling': ['汇集任务与资源状态', '优先级与规则匹配', '异常识别与动态改派', '人工确认与执行反馈'],
  'smart-sales-center': ['客户接待与需求识别', '可视化讲解与内容复用', '客户意向评估与跟进', 'CRM 回流与持续运营'],
}

export function ProjectDetailPage({ project }: { project: WorkItem }) {
  const { detail } = project
  const currentPath = detailPath(project.slug)
  const leadOutcome = detail.outcomes[0]

  return (
    <main id="project-detail" className="site-page bg-paper text-ink transition-colors duration-700">
      <article className="mx-auto max-w-canvas">
        <nav aria-label="项目详情导航" className="flex items-center justify-between gap-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          <span>WORK / {project.title}</span>
          <a href={publicPath('/work/', currentPath)} className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap transition-colors hover:text-signal">
            <ArrowLeft size={14} /> 返回作品列表
          </a>
        </nav>

        <header className="detail-header">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-signal">{project.category}</p>
            <h1 className="page-title mt-5">{project.title}</h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-muted md:text-xl">{detail.heroTagline}</p>
            <p className="mt-6 text-sm font-medium text-muted">{project.company} · {project.companyPeriod} · {project.companyFocus}</p>
          </div>
          <div className="detail-lead-result">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">核心结果</p>
            <strong>{leadOutcome.metric}</strong>
            <p className="mt-4 text-sm leading-7 text-muted">{leadOutcome.note}</p>
          </div>
        </header>

        <div className="project-flow" aria-label="项目工作流程">
          <p className="text-xs font-semibold tracking-widest text-muted">WORKFLOW / 工作流程</p>
          <ol>{projectFlows[project.slug]?.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol>
        </div>
        <details className="detail-mobile-directory"><summary className="text-sm font-medium">本页目录</summary><nav aria-label="移动端章节导航">{projectChapters.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav></details>
        <div className="detail-layout">
        <nav className="detail-directory" aria-label="章节导航"><p className="mb-3 text-[11px] tracking-widest text-muted">IN THIS PROJECT</p>{projectChapters.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
        <div className="detail-content">
        <section id="project-background" className="detail-section" aria-label="问题背景">
          <SectionHeading index="01" eyebrow="CONTEXT" title="问题背景" />
          <div className="detail-section-body reading-copy space-y-5">
            {detail.background.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section id="project-role" className="detail-section" aria-label="我的角色">
          <SectionHeading index="02" eyebrow="MY ROLE" title="我的角色" />
          <div className="detail-section-body detail-role">
            <p className="max-w-3xl text-lg font-semibold leading-8">{detail.role.scope}</p>
            <ul className="mt-6 grid gap-4 border-t border-line/15 pt-6">
              {detail.role.bullets.map((bullet, index) => (
                <li key={bullet} className="flex gap-3 text-base leading-8 text-muted"><span className="font-mono text-xs text-signal">0{index + 1}</span>{bullet}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="project-decisions" className="detail-section" aria-label="关键决策">
          <SectionHeading index="03" eyebrow="PRODUCT JUDGMENT" title="关键决策" description="这里保留问题、判断与取舍，呈现产品推进中的真实决策过程。" />
          <div className="detail-section-body">
            {detail.decisions.map((decision, index) => (
              <article key={decision.title} className="decision-card">
                <div className="flex items-start gap-4"><span className="font-mono text-xs text-signal">0{index + 1}</span><h3 className="min-w-0">{decision.title}</h3></div>
                <dl className="decision-parts">
                  <div><dt>当时的问题</dt><dd>{decision.problem}</dd></div>
                  <div><dt>我怎么判断</dt><dd>{decision.approach}</dd></div>
                  <div><dt>取舍了什么</dt><dd>{decision.tradeoff}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section id="project-outcomes" className="detail-section" aria-label="结果">
          <SectionHeading index="04" eyebrow="OUTCOME" title="结果" />
          <div className="detail-section-body grid gap-5 sm:grid-cols-2">
            {detail.outcomes.map((outcome) => (
              <div key={outcome.metric} className="outcome-card"><strong>{outcome.metric}</strong><p className="mt-5 text-sm leading-7 text-muted">{outcome.note}</p></div>
            ))}
          </div>
        </section>

        <section id="project-reflection" className="detail-section" aria-label="复盘">
          <SectionHeading index="05" eyebrow="REFLECTION" title="复盘" />
          <p className="detail-section-body reading-copy">{detail.reflection}</p>
        </section>

        {detail.confidentialityNote && <p className="mt-12 text-xs leading-6 text-muted">脱敏说明：{detail.confidentialityNote}</p>}
        <ProjectPager project={project} />
        </div>
        </div>
      </article>
    </main>
  )
}

export function ProjectDetailRoute() {
  const { slug } = useParams()
  const project = workItemBySlug(slug ?? '')

  return project ? <ProjectDetailPage project={project} /> : <Navigate to="/work/" replace />
}
