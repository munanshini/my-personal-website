import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { wordChannelBySlug, wordChannelEntries, type WordChannel } from '../data/portfolio'
import { publicPath } from '../lib/publicPath'
import { SectionHeading } from './SectionHeading'

export function WordChannelPage({ channel }: { channel: WordChannel }) {
  const location = useLocation()
  const entries = wordChannelEntries[channel.slug]
  const currentPath = location.pathname

  return (
    <main id="word-channel" className="site-page bg-paper text-ink transition-colors duration-700">
      <article className="mx-auto max-w-canvas">
        <nav aria-label="内容频道导航" className="flex items-center justify-between gap-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          <span>WORDS / {channel.type}</span>
          <a href={publicPath('/words/', currentPath)} className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap transition-colors hover:text-signal"><ArrowLeft size={14} /> 返回内容入口</a>
        </nav>

        <header className="detail-header word-channel-header">
          <div className="detail-hero-copy">
            <p className="detail-kicker"><span>{channel.type}</span>WORDS & MEDIA</p>
            <h1>{channel.title}</h1>
            <p className="detail-tagline">{channel.description}</p>
          </div>
          <aside className="detail-lead-result">
            <p>CHANNEL</p>
            <strong>{entries.length ? `已发布 ${entries.length} 篇` : '持续更新中'}</strong>
            <span>{entries.length ? '从列表进入具体内容，按主题继续阅读。' : '新的内容会先出现在这个列表页，再进入具体内容。'}</span>
          </aside>
        </header>

        <section className="word-channel-list" aria-label={`${channel.title}列表`}>
          <div className="word-channel-list-heading"><span>CONTENT LIST</span><span>{String(entries.length).padStart(2, '0')} ITEMS</span></div>
          {entries.length ? entries.map((entry, index) => (
            <a key={entry.slug} href={publicPath(entry.href, currentPath)} className="word-channel-entry group">
              <span className="word-channel-entry-index">0{index + 1}</span>
              <div><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-signal">{entry.type} · {entry.date}</span><h2>{entry.title}</h2><p>{entry.description}</p></div>
              <ArrowUpRight className="word-channel-entry-arrow transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={20} aria-hidden="true" />
            </a>
          )) : (
            <div className="word-channel-empty"><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-signal">COMING SOON</span><p>内容正在整理中，新的公开表达会先出现在这里。</p></div>
          )}
        </section>
      </article>
    </main>
  )
}

export function WordChannelRoute() {
  const { channel: slug } = useParams()
  const channel = wordChannelBySlug(slug ?? '')
  return channel ? <WordChannelPage channel={channel} /> : <Navigate to="/words/" replace />
}
