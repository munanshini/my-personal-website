import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { designProjects } from '../data/designProjects'
import { publicPath } from '../lib/publicPath'
import './DesignLab.css'

const labPath = '/words/interaction-design/'

export function DesignLab() {
  const { pathname } = useLocation()
  return (
    <main className="site-page design-lab bg-paper text-ink">
      <div className="design-container">
        <a className="design-back" href={publicPath('/words/', pathname)}><ArrowLeft size={16} /> 返回 WORDS</a>
        <header className="design-intro">
          <p className="design-eyebrow">INTERACTION DESIGN LAB</p>
          <h1>交互设计实验室</h1>
          <p className="design-lead">让复杂的信息清晰，让每一次交互自然。</p>
          <div className="design-intro-bottom"><p>从平台工具、移动体验，到空间可视化与品牌组件。用设计作品，呈现思考与细节。</p><span>{String(designProjects.length).padStart(2, '0')} 个项目</span></div>
        </header>
        <section className="design-grid" aria-label="交互设计项目列表">
          {designProjects.map((project, index) => (
            <a key={project.slug} className="design-card" href={publicPath(`${labPath}${project.slug}/`, pathname)}>
              <div className="design-card-image"><img src={publicPath(project.cover, pathname)} alt={`${project.title}设计预览`} width="960" height="540" loading={index < 2 ? 'eager' : 'lazy'} decoding="async" /></div>
              <div className="design-card-copy"><span className="design-eyebrow">{project.category}</span><h2>{project.title}<ArrowUpRight size={21} aria-hidden="true" /></h2><p>{project.summary}</p><div className="design-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
            </a>
          ))}
        </section>
      </div>
    </main>
  )
}

export function DesignProjectPage() {
  const { slug } = useParams()
  const { pathname } = useLocation()
  const projectIndex = designProjects.findIndex(project => project.slug === slug)
  const project = designProjects[projectIndex]
  if (!project) return <Navigate to={labPath} replace />
  const next = designProjects[(projectIndex + 1) % designProjects.length]
  return (
    <main className="site-page design-lab design-project bg-paper text-ink">
      <article className="design-container">
        <a className="design-back" href={publicPath(labPath, pathname)}><ArrowLeft size={16} /> 返回交互设计实验室</a>
        <header className="design-intro">
          <p className="design-eyebrow">{project.category} / SELECTED PROJECT</p>
          <h1>{project.title}</h1>
          <p className="design-project-summary">{project.summary}</p>
          <div className="design-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </header>
        <div className="design-gallery" aria-label={`${project.title}设计展示`}>
          {project.figures.map((figure, index) => (
            <figure key={figure.src}>
              <figcaption><div><span className="design-figure-number">{String(index + 1).padStart(2, '0')}</span><h2>{figure.caption}</h2></div><a href={publicPath(figure.src, pathname)} target="_blank" rel="noreferrer" aria-label={`查看大图：${figure.caption}（新窗口）`}>查看大图 <ArrowUpRight size={14} /></a></figcaption>
              <a className="design-figure-image" href={publicPath(figure.src, pathname)} target="_blank" rel="noreferrer" aria-label={`打开${figure.caption}原图（新窗口）`}><img src={publicPath(figure.src, pathname)} alt={`${project.title} — ${figure.caption}`} width={figure.width} height={figure.height} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" /></a>
            </figure>
          ))}
        </div>
        <nav className="design-next" aria-label="浏览更多设计项目"><a className="design-back" href={publicPath(labPath, pathname)}><ArrowLeft size={16} /> 全部项目</a><a href={publicPath(`${labPath}${next.slug}/`, pathname)}><span className="design-eyebrow">下一个项目</span><strong>{next.title} <ArrowUpRight size={22} /></strong></a></nav>
      </article>
    </main>
  )
}
