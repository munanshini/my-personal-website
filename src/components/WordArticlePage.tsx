import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { wordArticleBySlug } from '../data/portfolio'
import { publicPath } from '../lib/publicPath'
import { SectionHeading } from './SectionHeading'

export function WordArticlePage({ slug }: { slug: string }) {
  const location = useLocation()
  const article = wordArticleBySlug(slug)
  if (!article) return <Navigate to="/words/" replace />

  const currentPath = location.pathname
  const chapterHref = (index: number) => `${publicPath(currentPath, currentPath)}#word-section-${index}`

  return (
    <main id="word-article" className="site-page bg-paper text-ink transition-colors duration-700">
      <article className="mx-auto max-w-canvas">
        <nav aria-label="文章详情导航" className="flex items-center justify-between gap-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          <span>WORDS / AI PRODUCT</span>
          <a href={publicPath('/words/', currentPath)} className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap transition-colors hover:text-signal"><ArrowLeft size={14} /> 返回文章列表</a>
        </nav>

        <header className="detail-header word-article-header">
          <div className="detail-hero-copy">
            <p className="detail-kicker"><span>AI PRODUCT ESSAY</span>{article.author}</p>
            <h1>{article.title}</h1>
            <p className="detail-tagline">{article.lead}</p>
            <dl className="detail-meta-list" aria-label="文章概览">
              <div><dt>整理时间</dt><dd>{article.date}</dd></div>
              <div><dt>整理者</dt><dd>{article.author}</dd></div>
              <div><dt>来源</dt><dd>{article.sourceLabel}</dd></div>
            </dl>
          </div>
          <aside className="detail-lead-result">
            <p>KEY INSIGHT</p>
            <strong>{article.keyInsight}</strong>
            <span>{article.description}</span>
          </aside>
        </header>

        <div className="word-article-source" aria-label="文章来源">
          <span>基于公开访谈整理，保留来源链接，不整篇转载。</span>
          <div className="flex flex-wrap gap-4">
            <a href={article.sourceUrl} target="_blank" rel="noreferrer">查看公众号原文 <ArrowUpRight size={14} /></a>
            <a href={article.mirrorUrl} target="_blank" rel="noreferrer">查看公开转载页 <ArrowUpRight size={14} /></a>
          </div>
        </div>

        <details className="detail-mobile-directory"><summary className="text-sm font-medium">本页目录</summary><nav aria-label="移动端章节导航">{article.sections.map((section, index) => <a key={section.heading} href={chapterHref(index)}>{section.heading}</a>)}</nav></details>
        <div className="detail-layout">
          <nav className="detail-directory" aria-label="文章章节导航"><p className="mb-3 text-[11px] tracking-widest text-muted">IN THIS ESSAY</p>{article.sections.map((section, index) => <a key={section.heading} href={chapterHref(index)}>{section.heading}</a>)}</nav>
          <div className="detail-content">
            {article.sections.map((section, index) => (
              <section id={`word-section-${index}`} key={section.heading} className="detail-section word-article-section" aria-label={section.heading}>
                <SectionHeading index={`0${index + 1}`} eyebrow="READING NOTE" title={section.heading} />
                <div className="detail-section-body reading-copy space-y-5">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && <ul className="word-article-bullets">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                </div>
              </section>
            ))}

            <section className="detail-section" aria-label="阅读结论">
              <SectionHeading index={`0${article.sections.length + 1}`} eyebrow="TAKEAWAY" title="带走什么" />
              <blockquote className="detail-section-body detail-reflection">{article.takeaway}</blockquote>
            </section>
          </div>
        </div>
      </article>
    </main>
  )
}

export function WordArticleRoute() {
  const { slug } = useParams()
  return <WordArticlePage slug={slug ?? ''} />
}
