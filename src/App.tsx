import type { RouteRecord } from 'vite-react-ssg'
import { Contact } from './components/Contact'
import { ContentFeed } from './components/ContentFeed'
import { Hero } from './components/Hero'
import { NowSection } from './components/NowSection'
import { ProjectGrid } from './components/ProjectGrid'
import { ProjectDetailRoute } from './components/ProjectDetailPage'
import { SiteLayout } from './components/SiteLayout'
import { nowItems, workItems, words } from './data/portfolio'

export const routes: RouteRecord[] = [{
  path: '/',
  element: <SiteLayout />,
  children: [
    { index: true, element: <Hero /> },
    { path: 'work/', element: <ProjectGrid projects={workItems} /> },
    { path: 'work/:slug/', element: <ProjectDetailRoute /> },
    { path: 'words/', element: <ContentFeed items={words} /> },
    { path: 'now/', element: <NowSection items={nowItems} /> },
    { path: 'contact/', element: <Contact /> },
  ],
}]
