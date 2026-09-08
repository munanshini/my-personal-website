import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App'
import './index.css'

function browserBasename() {
  if (typeof window === 'undefined' || !window.location.hostname.endsWith('.github.io')) return '/'

  const [repository] = window.location.pathname.split('/').filter(Boolean)
  return repository ? `/${repository}/` : '/'
}

export const createRoot = ViteReactSSG({
  routes,
  basename: browserBasename(),
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
})
