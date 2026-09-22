import type { RouteRecord } from 'vite-react-ssg'
import { Contact } from './components/Contact'
import { DesignLab, DesignProjectPage } from './components/DesignLab'
import { ContentFeed } from './components/ContentFeed'
import { Hero } from './components/Hero'
import { NowSection } from './components/NowSection'
import { ProjectGrid } from './components/ProjectGrid'
import { ProjectDetailRoute } from './components/ProjectDetailPage'
import { SiteLayout } from './components/SiteLayout'
import { WordArticleRoute } from './components/WordArticlePage'
import { WordChannelPage } from './components/WordChannelPage'
import { nowItems, wordChannels, workItems, words } from './data/portfolio'

export const routes: RouteRecord[] = [{
  path: '/',
  element: <SiteLayout />,
  children: [
    { index: true, element: <Hero /> },
    { path: 'work/', element: <ProjectGrid projects={workItems} /> },
    { path: 'work/:slug/', element: <ProjectDetailRoute /> },
    { path: 'words/', element: <ContentFeed items={words} /> },
    { path: 'words/articles/', element: <WordChannelPage channel={wordChannels[0]} /> },
    { path: 'words/videos/', element: <WordChannelPage channel={wordChannels[1]} /> },
    { path: 'words/vibe-coding/', element: <WordChannelPage channel={wordChannels[2]} /> },
    { path: 'words/interaction-design/', element: <DesignLab /> },
    { path: 'words/interaction-design/:slug/', element: <DesignProjectPage /> },
    { path: 'words/articles/:slug/', element: <WordArticleRoute /> },
    { path: 'words/:slug/', element: <WordArticleRoute /> },
    { path: 'now/', element: <NowSection items={nowItems} /> },
    { path: 'contact/', element: <Contact /> },
  ],
}]
